from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.doctor import Doctor
from app.schemas.auth import UserLogin, Token
from app.core import security
from app.models.audit import AuditLog

router = APIRouter()

@router.post("/login", response_model=Token)
async def doctor_login(user_in: UserLogin, db: Session = Depends(get_session)):
    """Authenticates doctor and verifies ACTIVE status before granting access."""
    # 1. Fetch doctor by email
    doctor = db.exec(select(Doctor).where(Doctor.email == user_in.email)).first()
    
    # 2. Verify credentials and account status
    if not doctor or not security.verify_password(user_in.password, doctor.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if doctor.status != "ACTIVE":
        raise HTTPException(
            status_code=403, 
            detail="Account pending verification by platform governance"
        )

    # 3. Log access in immutable audit trail
    audit = AuditLog(
        actor_id=str(doctor.id),
        event="DOCTOR_LOGIN",
        target="DoctorDashboard",
        status="Success"
    )
    db.add(audit)
    db.commit()

    # 4. Return JWT with role=DOCTOR claim
    return {
        "access_token": security.create_access_token(doctor.id, role="DOCTOR"),
        "token_type": "bearer"
    }