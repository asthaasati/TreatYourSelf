from celery import Celery
from app.core.config import settings

# Celery handles long-running tasks like PDF generation and AI transcription
celery_app = Celery(
    "worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.task_routes = {
    "app.services.pdf_service.generate_prescription_pdf": "main-queue",
    "app.services.ai_engine.process_heavy_transcript": "ai-queue"
}