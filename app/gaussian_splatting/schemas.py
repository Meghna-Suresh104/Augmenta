from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel
from ..auth.schemas import UserOut # Import UserOut for displaying owner info

class JobStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

# ===================================================================
# SPLATTING JOB SCHEMAS
# ===================================================================

class SplattingJobBase(BaseModel):
    pass # No fields needed for base, as it's just a marker

class SplattingJobCreate(SplattingJobBase):
    # No fields needed for creation via API, as the system sets everything
    pass

class SplattingJobUpdate(SplattingJobBase):
    status: Optional[JobStatus] = None
    output_url: Optional[str] = None

class SplattingJob(SplattingJobBase):
    id: int
    owner_id: int
    status: JobStatus
    input_path: str
    output_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    owner: UserOut # Nested schema to display job owner

    class Config:
        from_attributes = True

