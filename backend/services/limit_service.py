from typing import Dict, Any, Optional
from datetime import date

# Simulao de banco de dados para o MVP (Sprint 04)
# Em produo, estes dados estariam na tabela 'usuarios'
USER_LIMITS = {
    "admin": {
        "id": "admin-123",
        "plano": "free",
        "geracoes_hoje": 0,
        "ultimo_uso_ia": str(date.today()),
        "tickets_totais": 0,
        "boloes_ativos": 0,
        "alertas_ativos": 0
    }
}

class LimitService:
    @staticmethod
    async def check_limit(user_id: str, acao: str) -> Dict[str, Any]:
        global USER_LIMITS
        
        user = USER_LIMITS.get(user_id)
        if not user:
            return {"allow": True, "message": "Usurio no encontrado"}

        if user["plano"] == "premium":
            return {"allow": True}

        # Regras para Plano FREE solicitadas pelo Orion
        if acao == "gerar_ia":
            # Reset diário mock
            today = str(date.today())
            if user["ultimo_uso_ia"] != today:
                user["geracoes_hoje"] = 0
                user["ultimo_uso_ia"] = today
            
            if user["geracoes_hoje"] >= 3:
                return {
                    "allow": False, 
                    "reason": "limite_geracao", 
                    "message": "Voc atingiu seu limite dirio de geraes (3/3). Desbloqueie o Premium para uso ilimitado!"
                }
            
        elif acao == "salvar_ticket":
            if user["tickets_totais"] >= 10:
                return {
                    "allow": False, 
                    "reason": "limite_tickets", 
                    "message": "Voc atingiu o limite de 10 tickets ativos. Faa o upgrade para salvar jogos ilimitados!"
                }

        elif acao == "criar_bolao":
            if user["boloes_ativos"] >= 1:
                return {
                    "allow": False, 
                    "reason": "limite_bolao", 
                    "message": "Usurios FREE podem gerenciar apenas 1 bolo ativo. Desbloqueie o Premium!"
                }

        elif acao == "criar_alerta":
            if user["alertas_ativos"] >= 2:
                return {
                    "allow": False, 
                    "reason": "limite_alertas", 
                    "message": "Limite de 2 alertas ativos atingido. Upgrade para Premium agora!"
                }

        return {"allow": True}

    @staticmethod
    def increment_usage(user_id: str, acao: str):
        global USER_LIMITS
        user = USER_LIMITS.get(user_id)
        if not user: return

        if acao == "gerar_ia":
            user["geracoes_hoje"] += 1
        elif acao == "salvar_ticket":
            user["tickets_totais"] += 1
        elif acao == "criar_bolao":
            user["boloes_ativos"] += 1
        elif acao == "criar_alerta":
            user["alertas_ativos"] += 1

    @staticmethod
    def decrement_usage(user_id: str, acao: str):
        global USER_LIMITS
        user = USER_LIMITS.get(user_id)
        if not user: return

        if acao == "salvar_ticket":
            user["tickets_totais"] = max(0, user["tickets_totais"] - 1)
        elif acao == "criar_bolao":
            user["boloes_ativos"] = max(0, user["boloes_ativos"] - 1)
        elif acao == "criar_alerta":
            user["alertas_ativos"] = max(0, user["alertas_ativos"] - 1)
