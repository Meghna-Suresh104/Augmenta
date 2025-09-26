from sqlalchemy.orm import Session
from . import schemas
from .. import models, security

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_oauth_user(db: Session, email: str):
    """Creates a user from OAuth without a password."""
    db_user = models.User(
        username=email,  # Use email as username for simplicity
        email=email,
        hashed_password=None
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
