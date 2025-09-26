from sqlalchemy.orm import Session
from . import models, schemas

# --- Post CRUD ---

def get_post(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Post).order_by(models.Post.created_at.desc()).offset(skip).limit(limit).all()

def create_post(db: Session, post: schemas.PostCreate, user_id: int):
    # Use .model_dump() for Pydantic v2
    db_post = models.Post(**post.model_dump(), owner_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

# --- Comment CRUD ---

def create_comment(db: Session, comment: schemas.CommentCreate, post_id: int, user_id: int):
    # Use .model_dump() for Pydantic v2
    db_comment = models.Comment(**comment.model_dump(), owner_id=user_id, post_id=post_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

