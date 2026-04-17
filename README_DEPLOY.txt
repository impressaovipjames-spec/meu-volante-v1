======================================================
🚀 PROTOCOLO DE DECOLAGEM RENDER — MEU VOLANTE V1.0 🚀
======================================================

Neste arquivo esto as coordenadas exatas para criar os
servios na sua conta Render. Siga exatamente isso.

------------------------------------------------------
PASSO 1: INICIALIZAR RENDER A PARTIR DO GITHUB
------------------------------------------------------
1. Acesse https://dashboard.render.com/
2. Clique em "New" -> "Blueprint"
3. Conecte ao seu repositrio github onde o Meu Volante foi enviado.
4. O Render ler o arquivo `render.yaml` automaticamente.
5. Clique em "Apply". (Ele vai detectar a API e o Frontend).

------------------------------------------------------
PASSO 2: URLS DOS PROJETOS GERADOS
------------------------------------------------------
Aps clicar Apply, o Render criar 2 caixas de servio.
Anote as URLs que ele deu para cada um:

-> URL do Backend (ex: https://meu-volante-api.onrender.com)
-> URL do Frontend (ex: https://meu-volante-app.onrender.com)

------------------------------------------------------
PASSO 3: COLAR AS CHAVES L EM CADA SERVIO (ENVIRONMENT)
------------------------------------------------------

🔗 NO SERVIÇO 'meu-volante-api' (BACKEND)
V na aba "Environment" e cole:

FRONTEND_URL = (cole a URL do Frontend aqui)
DATABASE_URL = postgresql+asyncpg://postgres.zkchudspvytqwukwjulu:VipVolante2024%23@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET = orion_security_secret_key_v1_0
(Opcional) SUPABASE_URL e SUPABASE_KEY se preferir via REST futuro.

🔗 NO SERVIÇO 'meu-volante-app' (FRONTEND)
V na aba "Environment" e cole:

VITE_API_URL = (cole a URL do Backend aqui)


------------------------------------------------------
FIM DO PROCESSO. BEM-VINDO NUVEM.
O SUCESSO ACONTECE NA VISO DO OBJETIVO CONCLUDO.
