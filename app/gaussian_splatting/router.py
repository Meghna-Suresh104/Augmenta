import shutil
from pathlib import Path
from typing import List
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..security import get_current_user
from .. import models
from . import crud, schemas
# Import the shared Celery app instance to trigger background tasks
from ..celery_app import celery_app

router = APIRouter(
    prefix="/splatting",
    tags=["Splatting Jobs"]
)

# Define a base path for storing media files
MEDIA_ROOT = Path("media/splatting_inputs")

@router.post("/jobs/", response_model=schemas.SplattingJob)
async def create_splatting_job_endpoint(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Handles image uploads, creates a job record, and triggers the background worker.
    """
    # Create a unique directory for this job to prevent file collisions
    job_dir = MEDIA_ROOT / str(current_user.id) / str(datetime.now(timezone.utc).timestamp())
    job_dir.mkdir(parents=True, exist_ok=True)

    # Save all the uploaded files to the unique job directory
    for file in files:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only image files are allowed.")
        try:
            file_path = job_dir / file.filename
            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        finally:
            file.file.close()
    
    # Create the job record in the database with a 'pending' status
    db_job = crud.create_splatting_job(db=db, user_id=current_user.id, input_path=str(job_dir))

    # --- TRIGGER THE BACKGROUND TASK ---
    # Send the job ID to the Celery worker to start processing.
    celery_app.send_task("process_splatting_job", args=[db_job.id])

    return db_job

@router.get("/jobs/{job_id}", response_model=schemas.SplattingJob)
def get_job_details(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Retrieves the status and details of a specific job.
    Ensures that a user can only access their own jobs.
    """
    db_job = crud.get_splatting_job(db, job_id=job_id)
    if db_job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    # Security check: Ensure the user owns this job
    if db_job.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this job")
    return db_job

@router.get("/jobs/", response_model=List[schemas.SplattingJob])
def get_user_jobs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Retrieves all jobs submitted by the current user.
    """
    jobs = crud.get_splatting_jobs_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
    return jobs

