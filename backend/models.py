from sqlalchemy import Column, String, Integer, DateTime, Boolean, DECIMAL, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    plano = Column(String, default="free")
    expira_em = Column(DateTime, nullable=True)
    geracoes_hoje = Column(Integer, default=0)
    ultimo_uso_ia = Column(DateTime, default=func.now())
    created_at = Column(DateTime, default=func.now())

class TicketUsuario(Base):
    __tablename__ = "tickets_usuario"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id", ondelete="CASCADE"))
    modalidade = Column(String, nullable=False)
    numeros = Column(JSON, nullable=False)
    nome_ticket = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())

class Bolao(Base):
    __tablename__ = "boloes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id", ondelete="CASCADE"))
    nome = Column(String, nullable=False)
    modalidade = Column(String, nullable=False)
    concurso = Column(String, nullable=True)
    valor_total = Column(DECIMAL(10, 2), nullable=False)
    valor_cota = Column(DECIMAL(10, 2), nullable=False)
    total_cotas = Column(Integer, nullable=False)
    encerrado = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

class BolaoParticipante(Base):
    __tablename__ = "bolao_participantes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    bolao_id = Column(UUID(as_uuid=True), ForeignKey("boloes.id", ondelete="CASCADE"))
    nome = Column(String, nullable=False)
    telefone = Column(String, nullable=True)
    cotas = Column(Integer, default=1)
    pago = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

class Alerta(Base):
    __tablename__ = "alertas"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id", ondelete="CASCADE"))
    tipo = Column(String, nullable=False)
    modalidade = Column(String, nullable=False)
    valor_gatilho = Column(DECIMAL(15, 2), nullable=True)
    ativo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

class PedidoAssinatura(Base):
    __tablename__ = "pedidos_assinatura"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id", ondelete="CASCADE"))
    plano_tipo = Column(String, nullable=False)
    valor = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String, default="pendente")
    comprovante_enviado = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    aprovado_em = Column(DateTime, nullable=True)
