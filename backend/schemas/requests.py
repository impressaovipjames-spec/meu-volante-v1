from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class EngineRequest(BaseModel):
    qtd_jogos: int = 5
