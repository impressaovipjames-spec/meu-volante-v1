from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, engine, tickets, bolao, alertas, pagamentos
import time

app = FastAPI(title="Meu Volante API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://meu-volante-app.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"[{request.method}] {request.url.path} - {response.status_code} - {process_time:.4f}s")
    return response

app.include_router(auth.router)
app.include_router(engine.router)
app.include_router(tickets.router)
app.include_router(bolao.router)
app.include_router(alertas.router)
app.include_router(pagamentos.router)

@app.on_event("startup")
async def startup():
    print("Orion System: Backend iniciado. Aguardando requisições.")

@app.get("/")
async def root():
    return {"status": "online", "engine": "Orion V1.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}
