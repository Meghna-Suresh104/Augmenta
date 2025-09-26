from celery import Celery
from .config import settings

# Create a shared Celery application instance
celery_app = Celery("worker", broker=settings.CELERY_BROKER_URL, backend=settings.CELERY_RESULT_BACKEND)

celery_app.conf.update(
    task_track_started=True,
)
