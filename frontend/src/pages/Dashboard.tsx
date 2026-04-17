import React, { useEffect, useState } from 'react';
import LotteryCard from '../components/LotteryCard';
import { LayoutDashboard, LogOut, RefreshCw, Crown, Bell, Wallet, History, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { lotteryService } from '../services/api';
import PaywallModal from '../components/PaywallModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [modalidades, setModalidades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false); // Mock
  const [hasPendingPayment, setHasPendingPayment] = useState(false); // Mock
  const [paywall, setPaywall] = useState<{isOpen: boolean, reason?: any, message?: string}>({isOpen: false});
  
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await lotteryService.getModalidades();
      if (response.success) {
        setModalidades(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar modalidades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Simulao de verificao de pagamento pendente
    const checkPayment = async () => {
        try {
            const resp = await (window as any).api_call('/assinatura/minha');
            if (resp.success && resp.data?.status === 'pendente' && resp.data?.comprovante_enviado) {
                setHasPendingPayment(true);
            }
        } catch (e) {}
    };
    checkPayment();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mv_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-20">
      <PaywallModal 
        isOpen={paywall.isOpen} 
        onClose={() => setPaywall({isOpen: false})}
        reason={paywall.reason}
        message={paywall.message}
      />

      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold hidden md:block tracking-tight italic">MEU VOLANTE</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => navigate('/alertas')} className="p-2 text-gray-400 hover:text-white relative">
                  <Bell size={24} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              </button>
              <button onClick={() => navigate('/bolao')} className="p-2 text-gray-400 hover:text-white">
                  <Wallet size={24} />
              </button>
              <button onClick={() => navigate('/historico')} className="p-2 text-gray-400 hover:text-white">
                  <History size={24} />
              </button>
          </div>

          {hasPendingPayment && !isPremium && (
            <div className="hidden lg:flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Pagamento em Anlise</span>
            </div>
          )}

          <div className="flex items-center gap-4 border-l border-dark-700 pl-6">
            <button 
                onClick={() => navigate('/planos')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isPremium ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-gray-600 text-gray-500 hover:border-white hover:text-white'}`}
            >
              <Crown size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">{isPremium ? 'Premium' : 'Free Upgrade'}</span>
            </button>
            <button onClick={handleLogout} className="bg-dark-700 p-2 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6 md:px-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-white mb-3">Painel Orion</h2>
            <p className="text-gray-400 max-w-lg">
              Dados reais sincronizados diretamente da Caixa. Planos FREE com limites diários de geração.
            </p>
          </div>
          <button 
                onClick={loadData}
                className="bg-dark-800 border border-dark-700 px-6 py-3 rounded-2xl flex items-center gap-3 font-bold hover:bg-dark-700 transition-all shadow-lg"
            >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Sincronizar Dados
          </button>
        </div>

        {/* CTA Premium se for FREE */}
        {!isPremium && (
            <div className="mb-10 bg-yellow-500 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-yellow-500/10 animate-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-6 text-dark-900">
                    <div className="bg-dark-900/10 p-4 rounded-2xl">
                        <Crown size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black uppercase leading-tight">Chega de Limites!</h3>
                        <p className="font-bold opacity-80 uppercase text-[10px] tracking-widest">Upgrade para Premium por apenas R$ 19,90/mês</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/planos')}
                    className="bg-dark-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-xl"
                >
                    Assinar Agora
                </button>
            </div>
        )}

        {loading && modalidades.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-64 bg-dark-800 rounded-2xl border border-dark-700"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modalidades.map((mod) => (
              <LotteryCard key={mod.slug} {...mod} />
            ))}
          </div>
        )}
      </main>

      {/* Footer Mobile Nav */}
      <nav className="fixed bottom-0 w-full bg-dark-800/80 backdrop-blur-md border-t border-dark-700 p-4 flex justify-around md:hidden z-50">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 text-blue-500">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold">INICIO</span>
        </button>
        <button onClick={() => navigate('/meus-jogos')} className="flex flex-col items-center gap-1 text-gray-500">
          <History size={24} />
          <span className="text-[10px] font-bold">JOGOS</span>
        </button>
        <button onClick={() => navigate('/bolao')} className="flex flex-col items-center gap-1 text-gray-500">
          <Wallet size={24} />
          <span className="text-[10px] font-bold">BOLÃO</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
