from fastapi import APIRouter
from schemas.responses import ApiResponse
from services.mock_data import get_mock_resultados

router = APIRouter(prefix="/resultados", tags=["resultados"])

@router.get("/mock", response_model=ApiResponse)
async def get_resultados():
    data = get_mock_resultados()
    return ApiResponse(success=True, data=data)
