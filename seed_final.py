import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.orm import declarative_base
from sqlalchemy.future import select
from passlib.context import CryptContext
from datetime import datetime, timedelta
import uuid
from sqlalchemy.dialects.postgresql import UUID

# Configurao Direta (Vindo do .env via Pooler)
DATABASE_URL = "postgresql+asyncpg://postgres.zkchudspvytqwukwjulu:VipVolante2024%23@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"

engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    plano = Column(String, default="free")
    expira_em = Column(DateTime, nullable=True)

async def run_seed():
    print("ORION SEED: Gerando contas de Teste Real...")
    async with AsyncSessionLocal() as db:
        users = [
            ("user_free@meuvolante.com.br", "volante2024", "free", None),
            ("user_premium@meuvolante.com.br", "volante2024", "premium", datetime.utcnow() + timedelta(days=32)),
            ("admin@meuvolante.com.br", "volante2024_admin", "admin", None)
        ]
        
        for email, pwd, plano, expira in users:
            res = await db.execute(select(Usuario).where(Usuario.email == email))
            if not res.scalars().first():
                new_user = Usuario(
                    email=email,
                    senha_hash=pwd_context.hash(pwd),
                    plano=plano,
                    expira_em=expira
                )
                db.add(new_user)
                print(f"OK: Criado: {email} | Senha: {pwd}")
            else:
                print(f"AVISO: {email} j existe.")
        
        await db.commit()
    print("SISTEMA: CONTAS ATIVAS. MEU VOLANTE PRONTO PARA MERCADO.")

if __name__ == "__main__":
    asyncio.run(run_seed())
