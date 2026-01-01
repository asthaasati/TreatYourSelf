from pydantic import BaseModel
from datetime import datetime

class VitalCreate(BaseModel):
    systolic: int
    diastolic: int
    sugar_level: int
    heart_rate: int

class HealthSnapshot(BaseModel):
    current_vitals: VitalCreate
    ai_insight: str
    status: str