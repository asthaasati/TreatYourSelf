import sys
from datetime import datetime, timedelta
from sqlmodel import Session, create_engine
from app.models.user import Patient, Doctor
from app.models.clinical import VitalLog
from app.models.commerce import Slot
from app.core.security import get_password_hash
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

def seed():
    with Session(engine) as session:
        # 1. Create a Verified Doctor
        dr_smith = Doctor(
            name="Dr. Sarah Smith",
            email="dr.smith@med.com",
            hashed_password=get_password_hash("doctor123"),
            role="DOCTOR",
            specialty="Cardiology",
            license_number="MED-99210",
            status="ACTIVE"
        )
        session.add(dr_smith)
        session.flush() # Get the ID

        # 2. Create a Patient
        patient_john = Patient(
            name="John Doe",
            email="john@patient.com",
            hashed_password=get_password_hash("patient123"),
            role="PATIENT"
        )
        session.add(patient_john)
        session.flush()

        # 3. Create Historical Vitals (Trailing 7 days)
        for i in range(7):
            vital = VitalLog(
                patient_id=patient_john.id,
                systolic=120 + i,
                diastolic=80,
                sugar_level=105,
                heart_rate=72,
                timestamp=datetime.utcnow() - timedelta(days=i)
            )
            session.add(vital)

        # 4. Create Availability Slots for Dr. Smith
        for i in range(1, 5):
            slot = Slot(
                doctor_id=dr_smith.id,
                start_time=datetime.utcnow() + timedelta(days=1, hours=i),
                is_booked=False
            )
            session.add(slot)

        session.commit()
        print("✅ Database Seeded Successfully!")

if __name__ == "__main__":
    seed()