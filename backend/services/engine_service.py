import random
from typing import List, Dict, Any

class EngineService:
    @staticmethod
    def generate_mega_sena(qtd_jogos: int) -> List[Dict[str, Any]]:
        jogos = []
        for _ in range(qtd_jogos):
            while True:
                numeros = sorted(random.sample(range(1, 61), 6))
                if EngineService._validate_mega(numeros):
                    break
            
            score = random.randint(75, 98)
            jogos.append({
                "numeros": [str(n).zfill(2) for n in numeros],
                "score": score,
                "categoria": EngineService._get_categoria(score)
            })
        return sorted(jogos, key=lambda x: x["score"], reverse=True)

    @staticmethod
    def generate_lotofacil(qtd_jogos: int) -> List[Dict[str, Any]]:
        jogos = []
        for _ in range(qtd_jogos):
            while True:
                numeros = sorted(random.sample(range(1, 26), 15))
                if EngineService._validate_lotofacil(numeros):
                    break
            
            score = random.randint(70, 99)
            jogos.append({
                "numeros": [str(n).zfill(2) for n in numeros],
                "score": score,
                "categoria": EngineService._get_categoria(score)
            })
        return sorted(jogos, key=lambda x: x["score"], reverse=True)

    @staticmethod
    def generate_quina(qtd_jogos: int) -> List[Dict[str, Any]]:
        jogos = []
        for _ in range(qtd_jogos):
            while True:
                numeros = sorted(random.sample(range(1, 81), 5))
                if EngineService._validate_quina(numeros):
                    break
            
            score = random.randint(70, 95)
            jogos.append({
                "numeros": [str(n).zfill(2) for n in numeros],
                "score": score,
                "categoria": EngineService._get_categoria(score)
            })
        return sorted(jogos, key=lambda x: x["score"], reverse=True)

    @staticmethod
    def generate_dupla_sena(qtd_jogos: int) -> List[Dict[str, Any]]:
        jogos = []
        for _ in range(qtd_jogos):
            while True:
                numeros = sorted(random.sample(range(1, 51), 6))
                if EngineService._validate_mega(numeros): # Usa mesma lgica de equilbrio da Mega
                    break
            
            score = random.randint(70, 95)
            jogos.append({
                "numeros": [str(n).zfill(2) for n in numeros],
                "score": score,
                "categoria": EngineService._get_categoria(score)
            })
        return sorted(jogos, key=lambda x: x["score"], reverse=True)

    @staticmethod
    def generate_dia_de_sorte(qtd_jogos: int) -> List[Dict[str, Any]]:
        meses = ["Janeiro", "Fevereiro", "Maro", "Abril", "Maio", "Junho", 
                 "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        jogos = []
        for _ in range(qtd_jogos):
            while True:
                numeros = sorted(random.sample(range(1, 32), 7))
                if EngineService._validate_dia_de_sorte(numeros):
                    break
            
            score = random.randint(70, 95)
            jogos.append({
                "numeros": [str(n).zfill(2) for n in numeros],
                "extra": {"mes": random.choice(meses)},
                "score": score,
                "categoria": EngineService._get_categoria(score)
            })
        return sorted(jogos, key=lambda x: x["score"], reverse=True)

    @staticmethod
    def _validate_mega(nums: List[int]) -> bool:
        pares = [n for n in nums if n % 2 == 0]
        if len(pares) > 4 or len(pares) < 2: return False
        for i in range(len(nums) - 3):
            if nums[i+3] == nums[i] + 3: return False
        faixas = set((n - 1) // 10 for n in nums)
        if len(faixas) < 4: return False
        return True

    @staticmethod
    def _validate_lotofacil(nums: List[int]) -> bool:
        moldura_set = {1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25}
        in_moldura = [n for n in nums if n in moldura_set]
        in_centro = [n for n in nums if n not in moldura_set]
        if len(in_moldura) < 9 or len(in_moldura) > 11: return False
        if len(in_centro) < 4 or len(in_centro) > 6: return False
        return True

    @staticmethod
    def _validate_quina(nums: List[int]) -> bool:
        pares = [n for n in nums if n % 2 == 0]
        if len(pares) > 4 or len(pares) < 1: return False
        soma = sum(nums)
        if soma < 150 or soma > 250: return False
        return True

    @staticmethod
    def _validate_dia_de_sorte(nums: List[int]) -> bool:
        pares = [n for n in nums if n % 2 == 0]
        if len(pares) > 5 or len(pares) < 2: return False
        return True

    @staticmethod
    def _get_categoria(score: int) -> str:
        if score >= 90: return "Excelente"
        if score >= 75: return "Forte"
        if score >= 60: return "Boa"
        return "Regular"
