from sqlalchemy.orm import Session
from . import models, schemas

# --- Splatting Job CRUD ---

def create_splatting_job(db: Session, user_id: int, input_path: str) -> models.SplattingJob:
    """
    Creates a new splatting job record in the database.
    """
    db_job = models.SplattingJob(
        owner_id=user_id,
        input_path=input_path
        # The status defaults to "pending" as defined in the model.
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def get_splatting_job(db: Session, job_id: int) -> models.SplattingJob | None:
    """
    Retrieves a specific splatting job by its ID.
    """
    return db.query(models.SplattingJob).filter(models.SplattingJob.id == job_id).first()

def get_splatting_jobs_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> list[models.SplattingJob]:
    """
    Retrieves all splatting jobs for a specific user.
    """
    return db.query(models.SplattingJob).filter(models.SplattingJob.owner_id == user_id).order_by(models.SplattingJob.created_at.desc()).offset(skip).limit(limit).all()

def update_job_status(db: Session, job_id: int, status: schemas.JobStatus, output_url: str | None = None) -> models.SplattingJob | None:
    """
    Updates the status and optionally the output URL of a job.
    Used by the background worker.
    """
    db_job = get_splatting_job(db, job_id=job_id)
    if db_job:
        db_job.status = status
        if output_url:
            db_job.output_url = output_url
        db.commit()
        db.refresh(db_job)
    return db_job

