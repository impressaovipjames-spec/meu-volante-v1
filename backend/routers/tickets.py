from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..database import get_db
from ..models import TicketUsuario
from ..schemas.responses import ApiResponse
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/tickets", tags=["tickets"])

class SaveTicketRequest(BaseModel):
    usuario_id: str
    modalidade: str
    numeros: List[int]
    nome_ticket: Optional[str] = "Meu Jogo"

@router.post("/salvar", response_model=ApiResponse)
async def salvar_ticket(data: SaveTicketRequest, db: AsyncSession = Depends(get_db)):
    try:
        new_ticket = TicketUsuario(
            usuario_id=data.usuario_id,
            modalidade=data.modalidade,
            numeros=data.numeros,
            nome_ticket=data.nome_ticket
        )
        db.add(new_ticket)
        await db.commit()
        await db.refresh(new_ticket)
        
        return ApiResponse(success=True, message="Ticket salvo com sucesso!", data={"id": str(new_ticket.id)})
    except Exception as e:
        return ApiResponse(success=False, message=f"Erro ao salvar: {str(e)}")

@router.get("/meus/{usuario_id}", response_model=ApiResponse)
async def listar_tickets(usuario_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TicketUsuario).where(TicketUsuario.usuario_id == usuario_id).order_by(TicketUsuario.created_at.desc()))
    tickets = result.scalars().all()
    
    return ApiResponse(
        success=True, 
        data=[{
            "id": str(t.id),
            "modalidade": t.modalidade,
            "numeros": t.numeros,
            "nome": t.nome_ticket,
            "data": t.created_at
        } for t in tickets]
    )

@router.delete("/{ticket_id}", response_model=ApiResponse)
async def deletar_ticket(ticket_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TicketUsuario).where(TicketUsuario.id == ticket_id))
    ticket = result.scalars().first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
        
    await db.delete(ticket)
    await db.commit()
    
    return ApiResponse(success=True, message="Ticket removido")
