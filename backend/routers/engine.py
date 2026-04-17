from fastapi import APIRouter, HTTPException
from schemas.responses import ApiResponse
from schemas.requests import EngineRequest
from services.engine_service import EngineService
from services.limit_service import LimitService
import time

router = APIRouter(prefix="/engine", tags=["engine"])

@router.post("/{slug}/gerar", response_model=ApiResponse)
async def generate_games(slug: str, request: EngineRequest):
    # 1. Verificar Limites de Plano
    user_id = "admin" # Mock
    limit_check = await LimitService.check_limit(user_id, "gerar_ia")
    if not limit_check["allow"]:
        return ApiResponse(success=False, message=limit_check["message"], data={"error_code": limit_check["reason"]})

    start_time = time.time()
    
    try:
        if slug == "mega-sena":
            jogos = EngineService.generate_mega_sena(request.qtd_jogos)
        # ... resto do cdigo
        elif slug == "lotofacil":
            jogos = EngineService.generate_lotofacil(request.qtd_jogos)
        elif slug == "quina":
            jogos = EngineService.generate_quina(request.qtd_jogos)
        elif slug == "dupla-sena":
            jogos = EngineService.generate_dupla_sena(request.qtd_jogos)
        elif slug == "dia-de-sorte":
            jogos = EngineService.generate_dia_de_sorte(request.qtd_jogos)
        else:
            raise HTTPException(status_code=404, detail="Modalidade nio encontrada")
        
        execution_time = time.time() - start_time
        
        # Log de Monitoramento Orion
        print(f"Orion Monitor: [{slug}] Geração: {execution_time:.2f}s | Jogos: {request.qtd_jogos}")
        
        # Incrementar uso no sucesso
        LimitService.increment_usage(user_id, "gerar_ia")
        
        return ApiResponse(
            success=True, 
            data={
                "jogos": jogos,
                "tempo_execucao": f"{execution_time:.2f}s",
                "aviso": "Ferramenta estatstica. No garante premiao."
            }
        )
    except Exception as e:
        print(f"Erro Orion Engine {slug}: {e}")
        return ApiResponse(success=False, message=str(e))
