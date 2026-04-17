import React from 'react';
import { Crown, Check, X, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'limite_geracao' | 'limite_tickets' | 'limite_bolao' | 'limite_alertas';
  message?: string;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, reason, message }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/planos');
  };

  const getReasonTitle = () => {
    switch (reason) {
      case 'limite_geracao': return 'Limite de Gerao IA Atingido';
      case 'limite_tickets': return 'Limite de Tickets Esgotado';
      case 'limite_bolao': return 'Mximo de Bolões Criados';
      case 'limite_alertas': return 'Limite de Alertas Ativos';
      default: return 'Recurso Premium';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-dark-800 border-2 border-yellow-500/30 rounded-[2.5rem] w-full max-w-lg overflow-hidden relative shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)]">
        
        {/* Header Decorativo */}
        <div className="bg-yellow-500 py-8 flex flex-col items-center relative">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-yellow-900/50 hover:text-yellow-900 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="bg-dark-800 p-4 rounded-3xl shadow-xl mb-3">
            <Crown size={48} className="text-yellow-500" />
          </div>
          <h2 className="text-dark-900 text-2xl font-black uppercase tracking-tight text-center px-10 leading-none">
            {getReasonTitle()}
          </h2>
        </div>

        <div className="p-10">
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl mb-8">
            <p className="text-yellow-500 text-sm font-bold text-center italic">
              "{message || 'Desbloqueie o potencial mximo do Meu Volante e aumente suas chances!'}"
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500 mt-1">
                    <Zap size={18} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Geraes de IA Ilimitadas</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Sem limites por dia</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500 mt-1">
                    <ShieldCheck size={18} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Gesto Completa de Boloes</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Controle financeiro total</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500 mt-1">
                    <BarChart3 size={18} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Estatsticas Avanadas</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Histrico completo e rankings</p>
                </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleUpgrade}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-dark-900 font-black py-5 rounded-2xl text-xl transition-all shadow-xl shadow-yellow-500/20"
            >
              QUERO SER PREMIUM
            </button>
            <button 
              onClick={onClose}
              className="w-full text-gray-500 font-bold py-2 hover:text-white transition-colors"
            >
              Depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
