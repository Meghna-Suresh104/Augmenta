import os
import subprocess
import time
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# Important: These imports are from your FastAPI application structure
from app.config import settings
from app.gaussian_splatting import crud as splatting_crud
from app.gaussian_splatting import schemas as splatting_schemas
# Import the shared Celery app instance from its new location
from app.celery_app import celery_app

# --- Database Setup for the Worker ---
# The worker is a separate process, so it needs its own database connection.
engine = create_engine(settings.SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# --- Define the Background Task ---
@celery_app.task(name="process_splatting_job")
def process_splatting_job(job_id: int):
    """
    The main background task to process a Gaussian Splatting job.
    """
    db = SessionLocal()
    try:
        # 1. Update job status to 'processing'
        print(f"Starting processing for job {job_id}...")
        splatting_crud.update_job_status(db, job_id=job_id, status=splatting_schemas.JobStatus.PROCESSING)

        # 2. Get job details from the database
        job = splatting_crud.get_splatting_job(db, job_id=job_id)
        if not job:
            print(f"Job {job_id} not found.")
            return

        # --- THIS IS WHERE YOU CALL YOUR MODEL SCRIPT ---
        # 3. Prepare and run the model script as a subprocess
        # You will need to replace 'path/to/your/model_script.py' with the actual path.
        
        # For now, we will simulate a long-running process
        print(f"Simulating model execution for job {job_id}. This will take 30 seconds.")
        time.sleep(30) # Simulate a long process
        
        # Let's define a simulated output path
        output_path = f"media/splatting_outputs/{job.id}/output.ply"
        print(f"Model execution finished for job {job_id}. Output at: {output_path}")
        
        # 4. Update job status to 'complete' with the output path
        splatting_crud.update_job_status(
            db, 
            job_id=job_id, 
            status=splatting_schemas.JobStatus.COMPLETE,
            output_path=output_path
        )
        print(f"Successfully completed job {job_id}.")

    except Exception as e:
        # 5. If anything goes wrong, update status to 'failed'
        print(f"An error occurred while processing job {job_id}: {e}")
        splatting_crud.update_job_status(db, job_id=job_id, status=splatting_schemas.JobStatus.FAILED)
    
    finally:
        db.close()

