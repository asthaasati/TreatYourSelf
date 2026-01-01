from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.patient import Patient  # Ensure your model is defined
from app.schemas.auth import UserLogin, Token, UserCreate
from app.core import security
from app.models.audit import AuditLog

router = APIRouter()

@router.post("/signup", response_model=Token)
async def signup(user_in: UserCreate, db: Session = Depends(get_session)):
    """Registers a new patient and creates their initial profile."""
    # Check if user exists
    existing_user = db.exec(select(Patient).where(Patient.email == user_in.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user with hashed password
    db_user = Patient(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        name=user_in.name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Log the signup event
    audit_event = AuditLog(
        actor_id=db_user.id,
        event="USER_SIGNUP",
        target=f"Patient:{db_user.id}",
        status="Success"
    )
    db.add(audit_event)
    db.commit()

    return {
        "access_token": security.create_access_token(db_user.id),
        "token_type": "bearer"
    }

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, db: Session = Depends(get_session)):
    """Authenticates a user and returns a session token."""
    user = db.exec(select(Patient).where(Patient.email == user_in.email)).first()
    
    if not user or not security.verify_password(user_in.password, user.hashed_password):
        # Audit failed login attempt
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    return {
        "access_token": security.create_access_token(user.id),
        "token_type": "bearer"
    }