from pydantic import BaseModel, EmailStr
from typing import Optional, List

# 1. Schema for Login requests
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# 2. Schema for JWT Token responses
class Token(BaseModel):
    access_token: str
    token_type: str

# 3. Schema for creating new users (Missing previously)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "PATIENT"  # Default role