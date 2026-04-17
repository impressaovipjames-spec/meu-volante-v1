from typing import Any, Optional
from pydantic import BaseModel

class ApiResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
