from fastapi import APIRouter, HTTPException, Depends
from schemas.responses import ApiResponse
from routers.pagamentos import PEDIDOS
from datetime import datetime, timedelta

router = APIRouter(prefix="/admin", tags=["admin"])

# Simulao de verificao de admin de acordo com o pedido do Orion
def verify_admin(email: str = "admin@meuvolante.com"):
    if email != "admin@meuvolante.com":
        raise HTTPException(status_code=403, detail="Acesso negado")
    return email

@router.get("/stats", response_model=ApiResponse)
async def get_admin_stats(admin_email: str = Depends(verify_admin)):
    pedidos_lista = list(PEDIDOS.values())
    receita_total = sum(p["valor"] for p in pedidos_lista if p["status"] == "aprovado")
    pedidos_pendentes = [p for p in pedidos_lista if p["status"] == "pendente" and p["comprovante_enviado"]]
    
    return ApiResponse(
        success=True,
        data={
            "receita_total": float(receita_total),
            "usuarios_totais": 125, # Mock para o dashboard
            "premium_ativos": 12,
            "novos_hoje": 5,
            "pedidos_pendentes": pedidos_pendentes
        }
    )

@router.post("/aprovar/{pedido_id}", response_model=ApiResponse)
async def approve_subscription(pedido_id: str, admin_email: str = Depends(verify_admin)):
    if pedido_id in PEDIDOS:
        pedido = PEDIDOS[pedido_id]
        pedido["status"] = "aprovado"
        pedido["aprovado_em"] = datetime.now().isoformat()
        
        # Lgica de Upgrade Instantneo solicitada pelo Orion
        # Aqui atualizaramos o usuario.plano e usuario.expira_em no banco real
        # expira_em = datetime.now() + timedelta(days=30)
        
        print(f"Orion Monitor: Assinatura APROVADA | ID: {pedido_id} | Plano: {pedido['plano_tipo']}")
        return ApiResponse(success=True, message="Assinatura ativada com sucesso!")
        
    raise HTTPException(status_code=404, detail="Pedido no encontrado")
