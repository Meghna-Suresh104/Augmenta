import shutil
from pathlib import Path
from typing import List
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session

# Corrected import to get user-related schemas from the new auth module
from ..auth import schemas as auth_schemas
from ..database import get_db
from ..security import get_current_user
from .. import models
from . import crud, schemas

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
    Handles image uploads, creates a unique directory for the job,
    and creates a job record in the database.
    """
    # Create a unique directory for this job using user ID and a timestamp
    job_dir = MEDIA_ROOT / str(current_user.id) / str(datetime.now(timezone.utc).timestamp())
    job_dir.mkdir(parents=True, exist_ok=True)

    # Save uploaded files
    for file in files:
        # Basic validation for image files
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only image files are allowed.")
        try:
            file_path = job_dir / file.filename
            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        finally:
            file.file.close()
    
    # Create the job record in the database
    db_job = crud.create_splatting_job(db=db, user_id=current_user.id, input_path=str(job_dir))
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
