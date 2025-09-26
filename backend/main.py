import requests
from datetime import timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Import modules from the current application package
import crud, models, schemas, security
from config import (ACCESS_TOKEN_EXPIRE_MINUTES, GOOGLE_OAUTH_CLIENT_ID,
                     GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_REDIRECT_URI)
from database import engine, get_db

# This command creates all the tables defined in models.py in the database.
# For production, it's better to use a migration tool like Alembic.
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ===================================================================
# API ENDPOINTS
# ===================================================================

@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    if crud.get_user(db, username=user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    if user.email and crud.get_user_by_email(db, email=user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate password before creating user
    security.validate_password(user.password)
    
    return crud.create_user(db=db, user=user)

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.get_user(db, username=form_data.username)
    if not user or not user.hashed_password or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/google/login")
async def login_google():
    params = {
        "response_type": "code", "client_id": GOOGLE_OAUTH_CLIENT_ID,
        "redirect_uri": GOOGLE_REDIRECT_URI, "scope": "openid email profile",
        "access_type": "offline"
    }
    query_string = "&".join(f"{k}={v}" for k, v in params.items())
    url = f"https://accounts.google.com/o/oauth2/v2/auth?{query_string}"
    return RedirectResponse(url)

@app.get("/auth/google", response_model=schemas.Token)
async def auth_google(code: str, db: Session = Depends(get_db)):
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code, "client_id": GOOGLE_OAUTH_CLIENT_ID,
        "client_secret": GOOGLE_OAUTH_CLIENT_SECRET, "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to exchange code for token")
    
    access_token = response.json()["access_token"]
    user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    headers = {"Authorization": f"Bearer {access_token}"}
    user_response = requests.get(user_info_url, headers=headers)
    user_info = user_response.json()
    user_email = user_info.get("email")

    if not user_email:
        raise HTTPException(status_code=400, detail="Could not fetch email from Google")
    
    user = crud.get_user_by_email(db, email=user_email)
    if not user:
        user = crud.create_oauth_user(db, email=user_email)
    
    app_access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    app_access_token = security.create_access_token(
        data={"sub": user.username}, expires_delta=app_access_token_expires
    )
    return {"access_token": app_access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.UserOut)
async def read_users_me(current_user: models.User = Depends(security.get_current_user)):
    return current_user
