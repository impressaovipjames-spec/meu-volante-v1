import asyncio
import asyncpg
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def run():
    print("Conectando ao Supabase Pooler IPv4...")
    try:
        conn = await asyncpg.connect(
            user="postgres.zkchudspvytqwukwjulu",
            password="VipVolante2024#",
            database="postgres",
            host="aws-0-sa-east-1.pooler.supabase.com",
            port=6543
        )
        print("Conectado com sucesso. Inserindo test users...")
        
        users = [
            ("user_free@meuvolante.com.br", "volante2024", "free"),
            ("user_premium@meuvolante.com.br", "volante2024", "premium"),
            ("admin@meuvolante.com.br", "volante2024", "admin")
        ]
        
        for email, pwd, plano in users:
            hashed = pwd_context.hash(pwd)
            try:
                await conn.execute('''
                    INSERT INTO usuarios (email, senha_hash, plano)
                    VALUES ($1, $2, $3)
                    ON CONFLICT(email) DO NOTHING
                ''', email, hashed, plano)
                print(f"User {email} inserido/verificado. (Senha: {pwd})")
            except Exception as ex:
                print(f"Erro inserindo {email}: {ex}")
                
        await conn.close()
        print("Finalizado.")
    except Exception as e:
        print(f"ERRO DE CONEXAO: {e}")

asyncio.run(run())
