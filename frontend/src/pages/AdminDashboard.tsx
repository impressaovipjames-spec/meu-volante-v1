import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart3, Users, DollarSign, Clock, Check, X, ShieldAlert, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      // Mock de chamada ao backend admin/stats
      const resp = await (window as any).api_call('/admin/stats');
      if (resp.success) {
        setStats(resp.data);
      }
    } catch (err) {
      toast.error("Erro ao carregar estatsticas admin");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const resp = await (window as any).api_call(`/admin/aprovar/${id}`, 'POST');
      if (resp.success) {
        toast.success("Assinatura liberada!");
        loadStats();
      }
    } catch (err) {
      toast.error("Erro ao aprovar pedido");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Simulao de Segurana Orion: Verificar se usurio  admin
  // Em produo, isso seria checado via Token + Backend
  const user_email = "admin@meuvolante.com"; // Mock

  if (user_email !== "admin@meuvolante.com") {
    return (
        <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-6 text-center">
            <ShieldAlert size={64} className="text-red-500 mb-6" />
            <h1 className="text-2xl font-black text-white uppercase mb-2">ACESSO NEGADO</h1>
            <p className="text-gray-500 max-w-xs">Voc no tem permissão para acessar esta  rea administrativa.</p>
            <button onClick={() => navigate('/dashboard')} className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-xs">Voltar para Home</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-24">
      <header className="bg-dark-800 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-10 shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-dark-700 rounded-lg">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-blue-500" />
            <h1 className="text-xl font-black italic tracking-tighter uppercase">Painel Admin</h1>
          </div>
        </div>
        <div className="bg-blue-600/10 text-blue-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-600/20">
            Administrador Master
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {loading ? (
             <div className="flex justify-center py-40"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
            <>
                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-dark-800 border border-white/5 p-8 rounded-[2rem] shadow-lg relative overflow-hidden group">
                        <Users className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors" size={100} />
                        <p className="text-gray-500 text-[10px] font-black uppercase mb-2 tracking-widest">Usurios Totais</p>
                        <h3 className="text-4xl font-black text-white">{stats.usuarios_totais}</h3>
                    </div>
                    <div className="bg-dark-800 border border-white/5 p-8 rounded-[2rem] shadow-lg relative overflow-hidden group">
                        <Zap className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors" size={100} />
                        <p className="text-yellow-500 text-[10px] font-black uppercase mb-2 tracking-widest">Premium Ativos</p>
                        <h3 className="text-4xl font-black text-white">{stats.premium_ativos}</h3>
                    </div>
                    <div className="bg-dark-800 border border-white/5 p-8 rounded-[2rem] shadow-lg relative overflow-hidden group">
                        <DollarSign className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors" size={100} />
                        <p className="text-green-500 text-[10px] font-black uppercase mb-2 tracking-widest">Receita Acumulada</p>
                        <h3 className="text-4xl font-black text-white">R$ {stats.receita_total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
                    </div>
                    <div className="bg-dark-800 border border-white/5 p-8 rounded-[2rem] shadow-lg relative overflow-hidden group">
                        <Clock className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors" size={100} />
                        <p className="text-blue-500 text-[10px] font-black uppercase mb-2 tracking-widest">Novos Hoje</p>
                        <h3 className="text-4xl font-black text-white">{stats.novos_hoje}</h3>
                    </div>
                </div>

                {/* Pedidos Pendentes */}
                <div className="bg-dark-800 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Pedidos Pendentes (Aprovao PIX)</h3>
                        <div className="bg-yellow-500 text-dark-900 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">
                            {stats.pedidos_pendentes.length} AGUARDANDO
                        </div>
                    </div>
                    
                    <div className="divide-y divide-white/5">
                        {stats.pedidos_pendentes.length === 0 ? (
                            <div className="p-20 text-center">
                                <p className="text-gray-500 font-bold uppercase tracking-widest">Nenhum pedido pendente no momento.</p>
                            </div>
                        ) : (
                            stats.pedidos_pendentes.map((pedido: any) => (
                                <div key={pedido.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-white/[0.02] transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-dark-700 p-4 rounded-2xl text-blue-500">
                                            <DollarSign size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white uppercase leading-none mb-1">PLANO {pedido.plano_tipo}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Usurio ID: {pedido.usuario_id.substring(0,8)}... | VALOR: R$ {pedido.valor.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => handleApprove(pedido.id)}
                                            className="bg-green-600 hover:bg-green-500 text-white font-black px-8 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-green-600/10"
                                        >
                                            <Check size={16} /> APROVAR PAGAMENTO
                                        </button>
                                        <button className="bg-dark-700 hover:bg-red-500/20 text-gray-400 hover:text-red-500 font-bold px-4 py-3 rounded-xl text-xs transition-all">
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
