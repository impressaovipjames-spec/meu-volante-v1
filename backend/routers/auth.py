from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..database import get_db
from ..models import Usuario
from ..schemas.requests import LoginRequest
from ..schemas.responses import ApiResponse
from ..services.auth_service import hash_password, verify_password, create_access_token
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: str
    password: str

@router.post("/login", response_model=ApiResponse)
async def login(credentials: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario).where(Usuario.email == credentials.email))
    user = result.scalars().first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Usurio no encontrado")
    
    if not verify_password(credentials.password, user.senha_hash):
        raise HTTPException(status_code=401, detail="Senha invlida")
        
    token = create_access_token(data={"sub": user.email, "id": str(user.id)})
    
    return ApiResponse(
        success=True,
        data={
            "token": token, 
            "user": {
                "id": str(user.id),
                "email": user.email, 
                "plano": user.plano
            }
        }
    )

@router.post("/register", response_model=ApiResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Verificar se j existe
    result = await db.execute(select(Usuario).where(Usuario.email == data.email))
    if result.scalars().first():
        return ApiResponse(success=False, message="E-mail j cadastrado")

    new_user = Usuario(
        email=data.email,
        senha_hash=hash_password(data.password),
        plano="free"
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    token = create_access_token(data={"sub": new_user.email, "id": str(new_user.id)})

    return ApiResponse(
        success=True,
        data={
            "token": token,
            "user": {"id": str(new_user.id), "email": new_user.email, "plano": new_user.plano}
        }
    )
