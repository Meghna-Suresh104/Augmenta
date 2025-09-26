from fastapi import FastAPI
from .database import engine, Base

# --- Import all models so that Base has them before create_all ---
# This step is crucial to ensure SQLAlchemy creates all your tables on startup.
from . import models
from .forum import models as forum_models
from .gaussian_splatting import models as splatting_models

# --- Import all the different routers from your feature modules ---
from .auth import router as auth_router
from .forum import router as forum_router
from .gaussian_splatting import router as splatting_router

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HeritageLens API",
    description="Backend services for the HeritageLens application.",
    version="1.0.0",
)

# --- Include all routers in the main FastAPI application ---
# This makes all the endpoints from your different modules available.
app.include_router(auth_router.router)
app.include_router(forum_router.router)
app.include_router(splatting_router.router)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the HeritageLens API"}

