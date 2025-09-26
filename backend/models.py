from sqlalchemy import Boolean, Column, DateTime, Integer, String, func
from database import Base

class User(Base):
    """
    SQLAlchemy model representing the 'users' table in the database.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=True)  # Nullable for OAuth users
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
