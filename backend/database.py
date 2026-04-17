from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Engine assncrona compatvel com Supabase Pooler (PgBouncer)
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    connect_args={
        "prepared_statement_cache_size": 0,
        "statement_cache_size": 0,
    }
)

# Fabrica de sesses assncronas
AsyncSessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

Base = declarative_base()

# Dependência para o FastAPI
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
