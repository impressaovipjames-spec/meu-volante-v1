import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Users, DollarSign, Wallet, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { lotteryService } from '../services/api';
import toast from 'react-hot-toast';
import PaywallModal from '../components/PaywallModal';

const Bolao: React.FC = () => {
  const navigate = useNavigate();
  const [boloes, setBoloes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paywall, setPaywall] = useState<{isOpen: boolean, reason?: any, message?: string}>({isOpen: false});

  const loadBoloes = async () => {
    setLoading(true);
    try {
      const resp = await (window as any).api_call('/bolao/meus');
      if (resp.success) {
        setBoloes(resp.data);
      }
    } catch (err) {
      toast.error("Erro ao carregar boles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoloes();
  }, []);

  const totalArrecadado = boloes.reduce((acc, b) => acc + (b.cotas_pagas * b.valor_cota), 0);
  const lucroTotal = boloes.reduce((acc, b) => acc + b.saldo, 0);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-24">
      <PaywallModal 
        isOpen={paywall.isOpen} 
        onClose={() => setPaywall({isOpen: false})}
        reason={paywall.reason}
        message={paywall.message}
      />

      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10 shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-dark-700 rounded-lg">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Gesto de Boloes</h1>
        </div>
        <button 
            onClick={() => {}} // Abrir modal de novo bolao
            className="bg-blue-600 hover:bg-blue-500 text-white p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 font-bold transition-all"
        >
          <Plus size={20} /> <span className="hidden md:block">Novo Bolo</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Dashboard Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors">
                    <Wallet size={100} />
                </div>
                <p className="text-gray-500 text-xs font-black uppercase mb-2 tracking-widest">Arrecadado (Pagas)</p>
                <h3 className="text-3xl font-black text-white">R$ {totalArrecadado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
            </div>
            <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors">
                    <TrendingUp size={100} />
                </div>
                <p className="text-gray-500 text-xs font-black uppercase mb-2 tracking-widest">Resultado Real (Lucro/Prejuz)</p>
                <h3 className={`text-3xl font-black ${lucroTotal >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    R$ {lucroTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </h3>
            </div>
            <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors">
                    <Users size={100} />
                </div>
                <p className="text-gray-500 text-xs font-black uppercase mb-2 tracking-widest">Boloes Ativos</p>
                <h3 className="text-3xl font-black text-white">{boloes.length}</h3>
            </div>
        </div>

        {/* Lista de Boloes */}
        <div className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <Target className="text-blue-500" /> Boles Registrados
            </h2>
            
            {loading ? (
                <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
            ) : boloes.length === 0 ? (
                <div className="text-center py-20 bg-dark-800 rounded-3xl border border-dark-700 border-dashed">
                    <p className="text-gray-500 font-bold uppercase tracking-widest">Nenhum bolo criado ainda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {boloes.map(b => (
                        <div key={b.id} className="bg-dark-800 border border-dark-700 rounded-3xl p-8 hover:border-gray-600 transition-all group flex flex-col md:flex-row justify-between gap-8">
                            <div className="space-y-4 max-w-md">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {b.modalidade}
                                    </div>
                                    <span className="text-xs text-gray-500 font-bold">CONCURSO {b.concurso || 'PENDENTE'}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase">{b.nome}</h3>
                                <div className="flex items-center gap-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-blue-500" />
                                        <span className="font-bold">{b.cotas_vendidas}/{b.total_cotas} Cotas</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={16} className="text-green-500" />
                                        <span className="font-bold">Cota: R$ {b.valor_cota.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-900/50 p-6 rounded-2xl border border-dark-700/50 flex flex-col justify-center items-end min-w-[200px]">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Saldo do Bolo</p>
                                <h4 className={`text-2xl font-black ${b.saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    R$ {b.saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                                </h4>
                                <button 
                                    onClick={() => {}} // Ver detalhes/participantes
                                    className="mt-4 text-[10px] font-black uppercase text-blue-500 hover:text-blue-400 flex items-center gap-2"
                                >
                                    GERENCIAR PARTICIPANTES →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </main>

      {/* Alerta de Investimento */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
        <div className="bg-yellow-500 p-2 rounded-xl text-dark-900 shadow-lg">
            <AlertTriangle size={20} />
        </div>
        <p className="text-yellow-500 text-[10px] md:text-xs font-bold leading-tight">
            ESTA FERRAMENTA  APENAS PARA CONTROLE DE BOLÕES INDIVIDUAIS. 
            NÃO GARANTIMOS O PAGAMENTO DA CAIXA OU DE TERCEIROS.
        </p>
      </div>
    </div>
  );
};

export default Bolao;
