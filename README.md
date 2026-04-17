# Meu Volante - MVP

Plataforma brasileira inteligente de loterias.

## Estrutura do Projeto

- `/frontend`: React + Vite + TypeScript + Tailwind CSS
- `/backend`: FastAPI (Python)
- `/docs`: Documentao e SQL do banco de dados

## Como Rodar Localmente

### 1. Backend (FastAPI)

Pr-requisitos: Python 3.10+

```bash
cd backend
pip install fastapi uvicorn pydantic
python main.py
```
A API estar disponvel em: `http://localhost:8000`
Healthcheck: `http://localhost:8000/health`

### 2. Frontend (React)

Pr-requisitos: Node.js 18+

```bash
cd frontend
npm install
npm run dev
```
O app estar disponvel em: `http://localhost:5173`

## Credenciais de Acesso (MVP)

- **E-mail:** `admin@meuvolante.com`
- **Senha:** `123456`

## Stack Tecnolgica

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, React Router.
- **Backend:** FastAPI, Uvicorn, Pydantic.
- **Banco de Dados (MVP):** Supabase (PostgreSQL) - Schema disponvel em `/docs/schema.sql`.

---
Desenvolvido por **Antigravity** sob superviso do Engenheiro Chefe **Orion**.
