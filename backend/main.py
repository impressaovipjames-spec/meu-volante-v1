from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, engine, tickets, bolao, alertas, pagamentos
from .database import engine as db_engine, Base
import asyncio
import time
import os
from fastapi import Request

app = FastAPI(title="Meu Volante API", version="1.0.0")

# Segurana de CORS: Limitado apenas url de frontend configurada ou universal para fallback.
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url] if frontend_url != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware de Monitoramento (Logs Backend)
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"[{request.method}] {request.url.path} - {response.status_code} - {process_time:.4f}s")
    return response

# Insero dos Roteadores Industriais
app.include_router(auth.router)
app.include_router(engine.router)
app.include_router(tickets.router)
app.include_router(bolao.router)
app.include_router(alertas.router)
app.include_router(pagamentos.router)

@app.on_event("startup")
async def startup():
    # Garante que as tabelas existem (segurana extra)
    # Nota: O Orion prefere rodar via SQL Editor, mas o SQLAlchemy 
    # pode criar o que faltar aqui se necessário.
    async with db_engine.begin() as conn:
        # await conn.run_sync(Base.metadata.create_all)
        pass
    print("Orion System: Banco de Dados Conectado e Pool Ativo.")

@app.get("/")
async def root():
    return {
        "status": "online",
        "engine": "Orion V1.0",
        "database": "Supabase Realtime Persisted"
    }

@app.get("/health")
async def health():
    return {"status": "ok"}
