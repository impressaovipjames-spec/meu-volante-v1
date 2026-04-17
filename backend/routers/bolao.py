from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..database import get_db
from ..models import Bolao, BolaoParticipante
from ..schemas.responses import ApiResponse
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/bolao", tags=["bolao"])

class CreateBolaoRequest(BaseModel):
    usuario_id: str
    nome: str
    modalidade: str
    concurso: Optional[str]
    valor_total: float
    valor_cota: float
    total_cotas: int

class AddParticipanteRequest(BaseModel):
    nome: str
    telefone: Optional[str]
    cotas: int = 1

@router.post("/criar", response_model=ApiResponse)
async def criar_bolao(data: CreateBolaoRequest, db: AsyncSession = Depends(get_db)):
    new_bolao = Bolao(
        usuario_id=data.usuario_id,
        nome=data.nome,
        modalidade=data.modalidade,
        concurso=data.concurso,
        valor_total=data.valor_total,
        valor_cota=data.valor_cota,
        total_cotas=data.total_cotas
    )
    db.add(new_bolao)
    await db.commit()
    await db.refresh(new_bolao)
    
    return ApiResponse(success=True, data={"id": str(new_bolao.id)})

@router.get("/meus/{usuario_id}", response_model=ApiResponse)
async def listar_meus_boloes(usuario_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Bolao).where(Bolao.usuario_id == usuario_id).order_by(Bolao.created_at.desc()))
    boloes = result.scalars().all()
    
    return ApiResponse(
        success=True,
        data=[{
            "id": str(b.id),
            "nome": b.nome,
            "modalidade": b.modalidade,
            "cotas_totais": b.total_cotas,
            "valor_total": float(b.valor_total),
            "encerrado": b.encerrado
        } for b in boloes]
    )

@router.get("/{bolao_id}/detalhes", response_model=ApiResponse)
async def detalhes_bolao(bolao_id: str, db: AsyncSession = Depends(get_db)):
    # Buscar bolao
    res_bolao = await db.execute(select(Bolao).where(Bolao.id == bolao_id))
    bolao = res_bolao.scalars().first()
    
    if not bolao:
        raise HTTPException(status_code=404, detail="Bolao no encontrado")
        
    # Buscar participantes
    res_part = await db.execute(select(BolaoParticipante).where(BolaoParticipante.bolao_id == bolao_id))
    participantes = res_part.scalars().all()
    
    return ApiResponse(
        success=True,
        data={
            "info": {
                "nome": bolao.nome,
                "modalidade": bolao.modalidade,
                "valor_total": float(bolao.valor_total),
                "valor_cota": float(bolao.valor_cota),
                "total_cotas": bolao.total_cotas,
                "encerrado": bolao.encerrado
            },
            "participantes": [{
                "id": str(p.id),
                "nome": p.nome,
                "cotas": p.cotas,
                "pago": p.pago
            } for p in participantes]
        }
    )

@router.post("/{bolao_id}/participantes", response_model=ApiResponse)
async def adicionar_participante(bolao_id: str, data: AddParticipanteRequest, db: AsyncSession = Depends(get_db)):
    new_p = BolaoParticipante(
        bolao_id=bolao_id,
        nome=data.nome,
        telefone=data.telefone,
        cotas=data.cotas
    )
    db.add(new_p)
    await db.commit()
    await db.refresh(new_p)
    
    return ApiResponse(success=True, message="Participante adicionado")

@router.put("/participante/{p_id}/pagar", response_model=ApiResponse)
async def marcar_pago(p_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BolaoParticipante).where(BolaoParticipante.id == p_id))
    p = result.scalars().first()
    
    if not p:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
        
    p.pago = True
    await db.commit()
    
    return ApiResponse(success=True, message="Pagamento confirmado")
