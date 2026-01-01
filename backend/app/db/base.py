from sqlmodel import SQLModel
# Import all models here to ensure they are registered with SQLModel
from app.models.user import Patient, Doctor
from app.models.clinical import VitalLog, AISummary
from app.models.commerce import Appointment, Slot
from app.models.audit import SecureAuditLog