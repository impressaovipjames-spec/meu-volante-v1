-- Schema Inicial - Meu Volante MVP

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    plano TEXT DEFAULT 'free', -- 'free' ou 'premium'
    expira_em DATE,
    geracoes_hoje INTEGER DEFAULT 0,
    ultimo_uso_ia DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Tickets do Usuário
CREATE TABLE IF NOT EXISTS tickets_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    modalidade TEXT NOT NULL, -- mega-sena, lotofacil, etc.
    numeros JSONB NOT NULL,
    nome_ticket TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Listas Geradas (Persistência de Auditoria e Histórico)
CREATE TABLE IF NOT EXISTS listas_geradas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    modalidade TEXT NOT NULL,
    modo TEXT NOT NULL,
    numeros JSONB NOT NULL,
    score INTEGER,
    extra JSONB,
    origem TEXT DEFAULT 'sistema', -- 'sistema' ou 'usuario'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Bolos
CREATE TABLE IF NOT EXISTS boloes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    modalidade TEXT NOT NULL,
    concurso TEXT,
    valor_total DECIMAL(10,2) NOT NULL,
    valor_cota DECIMAL(10,2) NOT NULL,
    total_cotas INTEGER NOT NULL,
    encerrado BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Participantes de Bolos
CREATE TABLE IF NOT EXISTS bolao_participantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bolao_id UUID REFERENCES boloes(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    telefone TEXT,
    cotas INTEGER DEFAULT 1,
    pago BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Alertas
CREATE TABLE IF NOT EXISTS alertas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL, -- 'premio', 'acumulado', 'resultado'
    modalidade TEXT NOT NULL,
    valor_gatilho DECIMAL(15,2),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Mtricas (Logs Onion)
CREATE TABLE IF NOT EXISTS metricas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    evento TEXT NOT NULL, -- 'upgrade_click', 'limite_atingido', etc.
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Pedidos de Assinatura (Checkout MVP)
CREATE TABLE IF NOT EXISTS pedidos_assinatura (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    plano_tipo TEXT NOT NULL, -- 'mensal', 'trimestral', 'anual'
    valor DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pendente', -- 'pendente', 'aprovado', 'cancelado'
    comprovante_enviado BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    aprovado_em TIMESTAMP WITH TIME ZONE
);

-- Inserção de usuário admin mock para teste local (senha 123456 - hash mockado)
-- Nota: Em produção, usar hash real.
INSERT INTO usuarios (email, senha_hash, plano) 
VALUES ('admin@meuvolante.com', 'pbkdf2:sha256:260000$mockhash', 'admin')
ON CONFLICT (email) DO NOTHING;
