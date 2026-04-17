import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
import os
import sys
from datetime import datetime, timedelta

# Adiciona o diretrio pai ao path para importar models e database
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import DATABASE_URL
from backend.models import Usuario, Base
from backend.services.auth_service import hash_password

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed():
    print("🚀 Iniciando Seed de Usurios Teste MEU VOLANTE...")
    
    async with AsyncSessionLocal() as db:
        test_users = [
            {
                "email": "user_free@meuvolante.com.br",
                "password": "volante2024_free",
                "plano": "free",
                "expira_em": None
            },
            {
                "email": "user_premium@meuvolante.com.br",
                "password": "volante2024_premium",
                "plano": "premium",
                "expira_em": datetime.utcnow() + timedelta(days=32)
            },
            {
                "email": "admin@meuvolante.com.br",
                "password": "volante2024_admin",
                "plano": "admin",
                "expira_em": None
            }
        ]

        for u_data in test_users:
            # Verificar se usurio j existe
            result = await db.execute(select(Usuario).where(Usuario.email == u_data["email"]))
            user_exists = result.scalars().first()
            
            if not user_exists:
                print(f"➕ Criando usurio: {u_data['email']}")
                new_user = Usuario(
                    email=u_data["email"],
                    senha_hash=hash_password(u_data["password"]),
                    plano=u_data["plano"],
                    expira_em=u_data["expira_em"]
                )
                db.add(new_user)
            else:
                print(f"⚠️ Usurio {u_data['email']} j existe. Pulando.")
        
        await db.commit()
        print("✅ Seed concludo com sucesso!")

if __name__ == "__main__":
    asyncio.run(seed())
