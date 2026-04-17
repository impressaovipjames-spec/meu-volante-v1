from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: str
    password: str

class EngineRequest(BaseModel):
    qtd_jogos: int = 5
