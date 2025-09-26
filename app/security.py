import re
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .config import settings
from .database import get_db
from .auth import crud as auth_crud # Use the new auth-specific crud

# Use Argon2 as the primary hashing algorithm, with bcrypt as a fallback for old passwords.
pwd_context = CryptContext(schemes=["argon2", "bcrypt"], deprecated="auto")

# The tokenUrl should point to the full path of your token endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def validate_password(password: str):
    """Validates the password complexity."""
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")
    if len(password.encode('utf-8')) > 1024:
        # A generous limit to prevent denial-of-service with huge passwords
        raise HTTPException(status_code=400, detail="Password is too long")
    if not re.search(r"[a-z]", password) or not re.search(r"[A-Z]", password) or not re.search(r"\d", password):
        raise HTTPException(status_code=400, detail="Password must contain an uppercase letter, a lowercase letter, and a number.")
    return password

def verify_password(plain_password, hashed_password):
    """Verifies a plain password against a hashed one."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Hashes a plain password."""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Creates a new JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Use the expiration time from settings, defaulting to 15 minutes
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES or 15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Decodes the JWT token to get the current user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Use the user-specific CRUD function to fetch the user
    user = auth_crud.get_user(db, username=username)
    if user is None:
        raise credentials_exception
    return user

