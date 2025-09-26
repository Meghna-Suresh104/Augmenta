from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, func, Enum
from sqlalchemy.orm import relationship
import enum
from ..database import Base

class JobStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETE = "complete"
    FAILED = "failed"

class SplattingJob(Base):
    __tablename__ = "splatting_jobs"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(Enum(JobStatus), default=JobStatus.PENDING, nullable=False)
    
    # Store paths relative to a base media directory
    input_path = Column(String(1024), nullable=False) # Path to the folder of uploaded images
    output_path = Column(String(1024), nullable=True) # Path to the resulting .ply file
    
    created_at = Column(DateTime, default=func.now())
    completed_at = Column(DateTime, nullable=True)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="splatting_jobs")
