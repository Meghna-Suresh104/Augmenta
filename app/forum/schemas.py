from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from ..auth.schemas import UserOut # Correctly import UserOut for displaying owner info

# ===================================================================
# COMMENT SCHEMAS
# ===================================================================

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    owner_id: int
    post_id: int
    created_at: datetime
    owner: UserOut  # Nested schema to display user information

    class Config:
        from_attributes = True

# ===================================================================
# POST SCHEMAS
# ===================================================================

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    owner_id: int
    created_at: datetime
    owner: UserOut          # Nested schema to display owner information
    comments: List[Comment] = [] # Nested list to display all comments for the post

    class Config:
        from_attributes = True

