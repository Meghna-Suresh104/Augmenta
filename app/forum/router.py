from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

# Corrected imports for the new project structure
from ..database import get_db
from ..security import get_current_user
from .. import models
from ..auth import schemas as auth_schemas
from . import crud, schemas

router = APIRouter(
    prefix="/forum",
    tags=["Forum"]
)

@router.post("/posts/", response_model=schemas.Post)
def create_new_post(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    # Correctly type-hint the dependency to expect the SQLAlchemy model
    current_user: models.User = Depends(get_current_user)
):
    # Pass the user's ID to the CRUD function for clarity
    return crud.create_post(db=db, post=post, user_id=current_user.id)

@router.get("/posts/", response_model=List[schemas.Post])
def read_all_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts

@router.get("/posts/{post_id}", response_model=schemas.Post)
def read_single_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return db_post

@router.post("/posts/{post_id}/comments/", response_model=schemas.Comment)
def create_new_comment(
    post_id: int,
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # First, check if the post exists before allowing a comment
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    return crud.create_comment(db=db, comment=comment, post_id=post_id, user_id=current_user.id)

