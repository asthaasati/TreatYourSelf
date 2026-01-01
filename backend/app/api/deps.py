from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlmodel import Session
from app.core.config import settings
from app.core.db import engine
from app.core import security
from app.models.doctor import Doctor

# This tells FastAPI where to look for the token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_db() -> Generator:
    """
    Dependency to provide a database session to each request.
    Ensures the connection is closed after the request is done.
    """
    with Session(engine) as session:
        yield session

def get_current_doctor(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> Doctor:
    """
    Ensures the user is an authenticated doctor.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the JWT
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        doctor_id: str = payload.get("sub")
        if doctor_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Fetch the doctor from the database
    doctor = db.get(Doctor, int(doctor_id))
    if not doctor:
        raise credentials_exception
    return doctor