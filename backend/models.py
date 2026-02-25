from pydantic import BaseModel, EmailStr, validator
from typing import Optional

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    
    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username должен содержать минимум 3 символа')
        if len(v) > 20:
            raise ValueError('Username не должен превышать 20 символов')
        if not v.isalnum():
            raise ValueError('Username может содержать только буквы и цифры')
        return v
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Пароль должен содержать минимум 6 символов')
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    userId: int
    message: str

class UserInfo(BaseModel):
    id: int
    username: str
    email: str

class ErrorResponse(BaseModel):
    detail: str