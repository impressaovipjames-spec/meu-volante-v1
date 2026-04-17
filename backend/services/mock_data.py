def get_mock_modalidades():
    return [
        {
            "id": 1,
            "nome": "Mega-Sena",
            "slug": "mega-sena",
            "cor": "#209869",
            "concurso": "2715",
            "data_sorteio": "18/04/2026",
            "premio_estimado": "R$ 40.000.000,00",
            "acumulou": True,
            "icone": "monetization_on"
        },
        {
            "id": 2,
            "nome": "Lotofácil",
            "slug": "lotofacil",
            "cor": "#930089",
            "concurso": "3082",
            "data_sorteio": "18/04/2026",
            "premio_estimado": "R$ 1.700.000,00",
            "acumulou": False,
            "icone": "auto_awesome"
        },
        {
            "id": 3,
            "nome": "Quina",
            "slug": "quina",
            "cor": "#260085",
            "concurso": "6418",
            "data_sorteio": "18/04/2026",
            "premio_estimado": "R$ 15.000.000,00",
            "acumulou": True,
            "icone": "star"
        },
        {
            "id": 4,
            "nome": "Dupla Sena",
            "slug": "dupla-sena",
            "cor": "#a61324",
            "concurso": "2651",
            "data_sorteio": "19/04/2026",
            "premio_estimado": "R$ 5.000.000,00",
            "acumulou": True,
            "icone": "filter_2"
        },
        {
            "id": 5,
            "nome": "Dia de Sorte",
            "slug": "dia-de-sorte",
            "cor": "#cb852b",
            "concurso": "902",
            "data_sorteio": "18/04/2026",
            "premio_estimado": "R$ 300.000,00",
            "acumulou": False,
            "icone": "calendar_today"
        }
    ]

def get_mock_resultados():
    return {
        "mega-sena": ["02", "15", "23", "34", "41", "58"],
        "lotofacil": ["01", "02", "04", "05", "06", "08", "09", "12", "13", "14", "17", "18", "21", "22", "25"]
    }
