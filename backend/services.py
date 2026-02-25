from fastapi import HTTPException
from database import Database
from auth import AuthService
from models import UserRegister, UserLogin, UserResponse, UserInfo

class UserService:
    def __init__(self, db: Database):
        self.db = db
        self.auth = AuthService()
    
    def register_user(self, user_data: UserRegister) -> UserResponse:
        if self.db.check_user_exists(user_data.username, user_data.email):
            raise HTTPException(
                status_code=400, 
                detail="Пользователь с таким именем или email уже существует"
            )
        
        password_hash, salt = self.auth.hash_password(user_data.password)
        
        stored_hash = f"{password_hash}:{salt}"
        user_id = self.db.create_user(
            username=user_data.username,
            email=user_data.email,
            password_hash=stored_hash
        )
        
        return UserResponse(
            userId=user_id,
            message="Пользователь успешно зарегистрирован"
        )
    
    def login_user(self, login_data: UserLogin) -> UserResponse:
        user = self.db.get_user_by_username(login_data.username)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Неверное имя пользователя или пароль"
            )
        
        stored_data = user['password_hash'].split(':')
        if len(stored_data) != 2:
            stored_hash = user['password_hash']
            old_hash = AuthService.hash_password(login_data.password)[0]
            if old_hash != stored_hash:
                raise HTTPException(
                    status_code=401,
                    detail="Неверное имя пользователя или пароль"
                )
        else:
            stored_hash, salt = stored_data
            if not self.auth.verify_password(login_data.password, stored_hash, salt):
                raise HTTPException(
                    status_code=401,
                    detail="Неверное имя пользователя или пароль"
                )
        
        return UserResponse(
            userId=user['id'],
            message="Авторизация успешна"
        )
    
    def get_user_info(self, user_id: int) -> UserInfo:
        user = self.db.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=404,
                detail="Пользователь не найден"
            )
        
        return UserInfo(
            id=user['id'],
            username=user['username'],
            email=user['email']
        )