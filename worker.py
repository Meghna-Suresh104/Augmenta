import os
import subprocess
from pathlib import Path
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# Imports from your FastAPI application structure
from app.config import settings
from app.gaussian_splatting import crud as splatting_crud
from app.gaussian_splatting import schemas as splatting_schemas
from app.celery_app import celery_app

# --- Database Setup for the Worker ---
engine = create_engine(settings.SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@celery_app.task(name="process_splatting_job")
def process_splatting_job(job_id: int):
    """
    The main background task to process a Gaussian Splatting job.
    This function will now run the full pipeline: COLMAP conversion and training.
    """
    db = SessionLocal()
    try:
        # 1. Update job status to 'processing'
        print(f"Starting processing for job {job_id}...")
        splatting_crud.update_job_status(db, job_id=job_id, status=splatting_schemas.JobStatus.PROCESSING)

        job = splatting_crud.get_splatting_job(db, job_id=job_id)
        if not job:
            print(f"Job {job_id} not found.")
            return

        # 2. Define all necessary paths
        project_root = Path("D:/HeritageLens/Augmenta") # Use an absolute path for clarity
        model_repo_path = project_root / "gsplat-model"
        input_images_path = project_root / job.input_path
        output_dir = Path("media/splatting_outputs") / str(job.id)
        output_dir.mkdir(parents=True, exist_ok=True)
        final_model_path = output_dir / "point_cloud/iteration_30000/point_cloud.ply" # Default output location

        # Path to the python executable in the CONDA environment
        conda_python_executable = "C:/Users/YourUser/miniconda3/envs/gaussian_splatting/python.exe" # <-- !!! EDIT THIS PATH !!!

        # --- SUB-STEP A: Run the COLMAP data processing script (convert.py) ---
        print(f"Running COLMAP conversion for job {job_id}...")
        colmap_command = [
            conda_python_executable,
            str(model_repo_path / "convert.py"),
            "-s", str(input_images_path)
        ]
        
        colmap_result = subprocess.run(colmap_command, capture_output=True, text=True)
        if colmap_result.returncode != 0:
            print(f"!!! COLMAP failed for job {job_id} !!!")
            print(f"Stderr: {colmap_result.stderr}")
            raise Exception(f"COLMAP script failed: {colmap_result.stderr}")

        # --- SUB-STEP B: Run the training script (train.py) ---
        print(f"Starting training for job {job_id}...")
        train_command = [
            conda_python_executable,
            str(model_repo_path / "train.py"),
            "-s", str(input_images_path), # The source is the same directory, now processed by COLMAP
            "-m", str(output_dir)
        ]

        train_result = subprocess.run(train_command, capture_output=True, text=True)
        if train_result.returncode != 0:
            print(f"!!! Training failed for job {job_id} !!!")
            print(f"Stderr: {train_result.stderr}")
            raise Exception(f"Training script failed: {train_result.stderr}")

        print(f"Model execution finished for job {job_id}. Output at: {final_model_path}")
        
        # 4. Update job status to 'complete' with the final output path
        splatting_crud.update_job_status(
            db, 
            job_id=job_id, 
            status=splatting_schemas.JobStatus.COMPLETE,
            output_path=str(final_model_path)
        )
        print(f"Successfully completed job {job_id}.")

    except Exception as e:
        # 5. If anything goes wrong, update status to 'failed'
        print(f"An error occurred while processing job {job_id}: {e}")
        splatting_crud.update_job_status(db, job_id=job_id, status=splatting_schemas.JobStatus.FAILED)
    
    finally:
        db.close()

