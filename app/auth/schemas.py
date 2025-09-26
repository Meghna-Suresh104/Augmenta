from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

# ===================================================================
# TOKEN SCHEMAS
# ===================================================================

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# ===================================================================
# USER SCHEMAS
# ===================================================================

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

