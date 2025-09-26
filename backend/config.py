import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Database Config ---
DB_USER = os.getenv("DATABASE_USERNAME")
DB_PASSWORD = os.getenv("DATABASE_PASSWORD")
DB_HOST = os.getenv("DATABASE_HOSTNAME")
DB_PORT = os.getenv("DATABASE_PORT")
DB_NAME = os.getenv("DATABASE_NAME")

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# --- Security & JWT Config ---
SECRET_KEY = os.getenv("SECRET_KEY", "a_default_secret_key_for_development")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# --- Google OAuth Config ---
GOOGLE_OAUTH_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID")
GOOGLE_OAUTH_CLIENT_SECRET = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

# --- Validation ---
# In a real app, you might use Pydantic's BaseSettings for more robust validation
if not all([SECRET_KEY, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_REDIRECT_URI]):
    # This check is now primarily for non-DB variables as the engine creation will fail otherwise.
    print("Warning: One or more environment variables are missing.")
