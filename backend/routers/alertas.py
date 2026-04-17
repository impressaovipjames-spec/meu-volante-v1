from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db
from models import Alerta
from schemas.responses import ApiResponse
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/alertas", tags=["alertas"])

class CreateAlertaRequest(BaseModel):
    usuario_id: str
    tipo: str # 'premio', 'acumulado', 'resultado'
    modalidade: str
    valor_gatilho: Optional[float] = None

@router.post("/criar", response_model=ApiResponse)
async def criar_alerta(data: CreateAlertaRequest, db: AsyncSession = Depends(get_db)):
    new_alerta = Alerta(
        usuario_id=data.usuario_id,
        tipo=data.tipo,
        modalidade=data.modalidade,
        valor_gatilho=data.valor_gatilho
    )
    db.add(new_alerta)
    await db.commit()
    await db.refresh(new_alerta)
    
    return ApiResponse(success=True, data={"id": str(new_alerta.id)})

@router.get("/meus/{usuario_id}", response_model=ApiResponse)
async def listar_alertas(usuario_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Alerta).where(Alerta.usuario_id == usuario_id).order_by(Alerta.created_at.desc()))
    alertas = result.scalars().all()
    
    return ApiResponse(
        success=True,
        data=[{
            "id": str(a.id),
            "tipo": a.tipo,
            "modalidade": a.modalidade,
            "ativo": a.ativo,
            "valor": float(a.valor_gatilho) if a.valor_gatilho else None
        } for a in alertas]
    )

@router.delete("/{alerta_id}", response_model=ApiResponse)
async def deletar_alerta(alerta_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Alerta).where(Alerta.id == alerta_id))
    alerta = result.scalars().first()
    
    if not alerta:
        raise HTTPException(status_code=404, detail="Alerta no encontrado")
        
    await db.delete(alerta)
    await db.commit()
    
    return ApiResponse(success=True, message="Alerta removido")
