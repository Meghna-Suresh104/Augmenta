from sqlalchemy import Boolean, Column, DateTime, Integer, String, func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

    # Relationships to models in other modules.
    # The 'back_populates' argument tells SQLAlchemy how to link these relationships together.
    posts = relationship("Post", back_populates="owner")
    comments = relationship("Comment", back_populates="owner")
    splatting_jobs = relationship("SplattingJob", back_populates="owner")

