from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Database
from services import UserService
from models import UserRegister, UserLogin, UserResponse, ErrorResponse

app = FastAPI(
    title="Library Portal API",
    description="API для системы управления библиотекой",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Database()
user_service = UserService(db)

@app.on_event("startup")
async def startup_event():
    print("📚 Library Portal API запущен...")

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Library Portal API is running", "version": "1.0.0"}

@app.post(
    "/api/register", 
    response_model=UserResponse,
    responses={400: {"model": ErrorResponse}},
    tags=["Authentication"]
)
async def register(user: UserRegister):
    try:
        return user_service.register_user(user)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

@app.post(
    "/api/login",
    response_model=UserResponse,
    responses={401: {"model": ErrorResponse}},
    tags=["Authentication"]
)
async def login(user: UserLogin):
    try:
        return user_service.login_user(user)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

@app.get(
    "/api/user/{user_id}",
    tags=["Users"]
)
async def get_user(user_id: int):
    try:
        return user_service.get_user_info(user_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")