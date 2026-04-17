from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db
from models import PedidoAssinatura, Usuario
from schemas.responses import ApiResponse
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter(prefix="/assinatura", tags=["assinatura"])

class CheckoutRequest(BaseModel):
    usuario_id: str
    plano_tipo: str
    valor: float

@router.post("/criar", response_model=ApiResponse)
async def criar_pedido(data: CheckoutRequest, db: AsyncSession = Depends(get_db)):
    new_pedido = PedidoAssinatura(
        usuario_id=data.usuario_id,
        plano_tipo=data.plano_tipo,
        valor=data.valor,
        status="pendente"
    )
    db.add(new_pedido)
    await db.commit()
    await db.refresh(new_pedido)
    
    return ApiResponse(success=True, data={"id": str(new_pedido.id)})

@router.post("/confirmar/{pedido_id}", response_model=ApiResponse)
async def confirmar_envio_comprovante(pedido_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PedidoAssinatura).where(PedidoAssinatura.id == pedido_id))
    pedido = result.scalars().first()
    
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
        
    pedido.comprovante_enviado = True
    await db.commit()
    
    return ApiResponse(success=True, message="Status atualizado: Pagamento em Anlise")

@router.get("/minha/{usuario_id}", response_model=ApiResponse)
async def status_assinatura(usuario_id: str, db: AsyncSession = Depends(get_db)):
    # Busca o ultimo pedido pendente ou aprovado
    result = await db.execute(
        select(PedidoAssinatura)
        .where(PedidoAssinatura.usuario_id == usuario_id)
        .order_by(PedidoAssinatura.created_at.desc())
    )
    ultimo_pedido = result.scalars().first()
    
    if not ultimo_pedido:
        return ApiResponse(success=True, data={"status": "nenhum"})
        
    return ApiResponse(success=True, data={
        "status": ultimo_pedido.status,
        "plano": ultimo_pedido.plano_tipo,
        "comprovante_enviado": ultimo_pedido.comprovante_enviado
    })

# Rota Admin para Listar Pedidos
@router.get("/admin/pedidos", response_model=ApiResponse)
async def admin_listar_pedidos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(PedidoAssinatura, Usuario)
        .join(Usuario, PedidoAssinatura.usuario_id == Usuario.id)
        .order_by(PedidoAssinatura.created_at.desc())
    )
    pedidos = result.all()
    
    return ApiResponse(
        success=True,
        data=[{
            "id": str(p.PedidoAssinatura.id),
            "email": p.Usuario.email,
            "plano": p.PedidoAssinatura.plano_tipo,
            "valor": float(p.PedidoAssinatura.valor),
            "status": p.PedidoAssinatura.status,
            "data": p.PedidoAssinatura.created_at
        } for p in pedidos]
    )

@router.post("/admin/aprovar/{pedido_id}", response_model=ApiResponse)
async def admin_aprovar_pedido(pedido_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PedidoAssinatura).where(PedidoAssinatura.id == pedido_id))
    pedido = result.scalars().first()
    
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
        
    pedido.status = "aprovado"
    pedido.aprovado_em = datetime.utcnow()
    
    # Atualiza o plano do usurio
    res_user = await db.execute(select(Usuario).where(Usuario.id == pedido.usuario_id))
    user = res_user.scalars().first()
    
    if user:
        user.plano = "premium"
        # Adiciona 30 dias (simplificao MVP)
        user.expira_em = datetime.utcnow() + timedelta(days=32)
        
    await db.commit()
    
    return ApiResponse(success=True, message="Pedido aprovado e Plano Premium liberado!")
