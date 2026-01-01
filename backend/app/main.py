from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, patient, doctors, appointments, consultation, prescriptions, governance, ai_insights
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Backend for TreatYourSelf Clinical Platform"
)

# CORS Configuration for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Route Inclusion
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(patient.router, prefix="/api/v1/patient", tags=["Patient Dashboard"])
app.include_router(doctors.router, prefix="/api/v1/doctors", tags=["Doctor Discovery"])
app.include_router(appointments.router, prefix="/api/v1/appointments", tags=["Scheduling"])
app.include_router(consultation.router, prefix="/api/v1/consultation", tags=["Live Consultation"])
app.include_router(prescriptions.router, prefix="/api/v1/prescriptions", tags=["Prescriptions"])
app.include_router(ai_insights.router, prefix="/api/v1/ai", tags=["AI Safety & Insights"])
app.include_router(governance.router, prefix="/api/v1/governance", tags=["Platform Governance"])

@app.get("/health")
async def health_check():
    return {"status": "System Optimal", "timestamp": "2026-01-01T10:34:55Z"}