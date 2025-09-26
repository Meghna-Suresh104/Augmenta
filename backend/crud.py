from sqlalchemy.orm import Session
import models, schemas
from security import get_password_hash

def get_user(db: Session, username: str):
    """
    Fetch a single user by their username.
    """
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    """
    Fetch a single user by their email address.
    """
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Create a new user in the database with a hashed password.
    """
    hashed_password = get_password_hash(user.password)
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
    """
    Create a new user from Google OAuth details.
    Password is None as they authenticate via Google.
    """
    # Use email as username for simplicity, or generate a unique one.
    db_user = models.User(
        username=email,
        email=email,
        hashed_password=None
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
