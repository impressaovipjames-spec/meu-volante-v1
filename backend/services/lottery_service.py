import httpx
import time
from datetime import datetime
from typing import Dict, List, Optional, Any

# Cache Profissional em Memria
# Estrutura: { "slug": { "payload": data, "timestamp": unix_time, "source": "caixa|brasilapi|cache" } }
LOTTERY_CACHE: Dict[str, Any] = {}
CACHE_TTL = 900  # 15 minutos em segundos

SOURCES = {
    "caixa": "https://servicebus2.caixa.gov.br/portaldeloterias/api/",
    "brasilapi": "https://brasilapi.com.br/api/loterias/v1/"
}

class LotteryService:
    @staticmethod
    async def get_latest_result(slug: str) -> Dict[str, Any]:
        global LOTTERY_CACHE
        
        # 1. Verificar Cache
        now = time.time()
        if slug in LOTTERY_CACHE:
            cached_item = LOTTERY_CACHE[slug]
            if now - cached_item["timestamp"] < CACHE_TTL:
                print(f"[{datetime.now()}] Cache Hit para {slug} (Fonte: {cached_item['source']})")
                return cached_item["payload"]

        # 2. Tentar Fonte 1: Caixa
        try:
            print(f"[{datetime.now()}] Tentando Fonte 1 (Caixa) para {slug}...")
            async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
                # Normalizar o slug para o padrão da Caixa (ex: lotofacil -> lotofacil)
                url_slug = slug.replace("-", "")
                response = await client.get(f"{SOURCES['caixa']}{url_slug}")
                
                if response.status_code == 200:
                    data = response.json()
                    result = LotteryService._normalize_caixa_data(data, slug)
                    LotteryService._update_cache(slug, result, "caixa")
                    return result
        except Exception as e:
            print(f"Erro na Fonte 1 (Caixa) para {slug}: {e}")

        # 3. Tentar Fonte 2: BrasilAPI
        try:
            print(f"[{datetime.now()}] Tentando Fonte 2 (BrasilAPI) para {slug}...")
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{SOURCES['brasilapi']}{slug}")
                if response.status_code == 200:
                    data = response.json()
                    result = LotteryService._normalize_brasilapi_data(data, slug)
                    LotteryService._update_cache(slug, result, "brasilapi")
                    return result
        except Exception as e:
            print(f"Erro na Fonte 2 (BrasilAPI) para {slug}: {e}")

        # 4. Fallback Final: Retornar o que houver no cache (mesmo expirado)
        if slug in LOTTERY_CACHE:
            print(f"[{datetime.now()}] Fallback total para cache expirado de {slug}")
            return LOTTERY_CACHE[slug]["payload"]

        raise Exception(f"No foi possvel obter dados para {slug} em nenhuma fonte.")

    @staticmethod
    def _normalize_caixa_data(data: Any, slug: str) -> Dict[str, Any]:
        # A API da Caixa retorna campos como 'listaDezenas', 'numero', 'dataApuracao', etc.
        return {
            "nome": slug.capitalize(),
            "slug": slug,
            "concurso": str(data.get("numero", "")),
            "data": data.get("dataApuracao", ""),
            "dezenas": data.get("listaDezenas", []),
            "premio": f"R$ {data.get('valorEstimadoProximoConcurso', 0):,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "acumulou": data.get("acumulado", False),
            "proximo_concurso_data": data.get("dataProximoConcurso", "")
        }

    @staticmethod
    def _normalize_brasilapi_data(data: Any, slug: str) -> Dict[str, Any]:
        return {
            "nome": slug.capitalize(),
            "slug": slug,
            "concurso": str(data.get("concurso", "")),
            "data": data.get("data", ""),
            "dezenas": data.get("dezenas", []),
            "premio": f"R$ {data.get('valor_estimado_proximo_concurso', 0):,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "acumulou": data.get("acumulado", False),
            "proximo_concurso_data": data.get("data_proximo_concurso", "")
        }

    @staticmethod
    def _update_cache(slug: str, payload: Dict[str, Any], source: str):
        global LOTTERY_CACHE
        LOTTERY_CACHE[slug] = {
            "payload": payload,
            "timestamp": time.time(),
            "source": source
        }
