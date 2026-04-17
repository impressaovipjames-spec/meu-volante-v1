from fastapi import APIRouter
from schemas.responses import ApiResponse
from services.lottery_service import LotteryService
import asyncio

router = APIRouter(prefix="/modalidades", tags=["modalidades"])

@router.get("", response_model=ApiResponse)
async def list_modalidades():
    slugs = ["mega-sena", "lotofacil", "quina", "dupla-sena", "dia-de-sorte"]
    
    # Cores e cones so persistentes
    meta_info = {
        "mega-sena": {"cor": "#209869", "icone": "CircleDollarSign"},
        "lotofacil": {"cor": "#930089", "icone": "Zap"},
        "quina": {"cor": "#260085", "icone": "Star"},
        "dupla-sena": {"cor": "#a61324", "icone": "Layers"},
        "dia-de-sorte": {"cor": "#cb852b", "icone": "Calendar"}
    }

    async def fetch_result(slug):
        try:
            res = await LotteryService.get_latest_result(slug)
            # Mesclar info visual
            res.update(meta_info.get(slug, {}))
            return res
        except:
            # Fallback mock se tudo falhar
            return {"slug": slug, "nome": slug.capitalize(), "concurso": "N/A", "premio": "R$ 0,00", "acumulou": False, **meta_info.get(slug, {})}

    # Buscar todos em paralelo para performance (< 2s)
    results = await asyncio.gather(*[fetch_result(s) for s in slugs])
    
    return ApiResponse(success=True, data=results)
