import hashlib
import secrets
from typing import Optional

class AuthService:
    @staticmethod
    def hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
        if salt is None:
            salt = secrets.token_hex(16)
        
        password_salt = password + salt
        password_hash = hashlib.sha256(password_salt.encode()).hexdigest()
        
        return password_hash, salt
    
    @staticmethod
    def verify_password(password: str, stored_hash: str, salt: str) -> bool:
        password_hash, _ = AuthService.hash_password(password, salt)
        return password_hash == stored_hash
    
    @staticmethod
    def generate_session_token() -> str:
        return secrets.token_urlsafe(32)