import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BellRing, Plus, Trash2, BellOff, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const Alertas: React.FC = () => {
  const navigate = useNavigate();
  const [alertas, setAlertas] = useState<any[]>([
    { id: '1', tipo: 'premio', modalidade: 'mega-sena', valor_gatilho: 50000000, ativo: true },
    { id: '2', tipo: 'acumulado', modalidade: 'lotofacil', ativo: true }
  ]);

  const handleDelete = (id: string) => {
    setAlertas(prev => prev.filter(a => a.id !== id));
    toast.success("Alerta removido");
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-20">
      <header className="bg-dark-800 border-b border-dark-700 py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-dark-700 rounded-lg transition-all">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Alertas Inteligentes</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 font-bold transition-all">
          <Plus size={20} /> <span className="hidden md:block">Novo Alerta</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="mb-12 bg-blue-600/5 border border-blue-600/20 p-8 rounded-3xl flex items-start gap-6">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-600/20">
                <BellRing size={32} />
            </div>
            <div>
                <h3 className="text-xl font-black text-white uppercase mb-2">Nunca perca uma oportunidade</h3>
                <p className="text-gray-500 text-sm">Configure alertas para ser avisado quando um prêmio atingir um valor específico ou quando uma modalidade estiver acumulada há muitos sorteios.</p>
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest pl-2">Alertas Ativos</h2>
            {alertas.length === 0 ? (
                <div className="text-center py-20 bg-dark-800 rounded-3xl border border-dark-700 border-dashed">
                    <BellOff size={48} className="mx-auto text-gray-700 mb-4" />
                    <p className="text-gray-500 font-bold">Nenhum alerta configurado.</p>
                </div>
            ) : (
                alertas.map(alerta => (
                    <div key={alerta.id} className="bg-dark-800 border border-dark-700 p-6 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center text-blue-500">
                                <Info size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-white uppercase leading-none mb-1">
                                    {alerta.tipo === 'premio' ? `Prmio > R$ ${alerta.valor_gatilho.toLocaleString()}` : 'Acumulado'}
                                </h4>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{alerta.modalidade}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDelete(alerta.id)}
                            className="p-3 bg-dark-700 rounded-xl hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))
            )}
        </div>

        {/* Info Mock Alertas */}
        <div className="mt-12 p-6 bg-dark-800/50 rounded-2xl border border-dark-700 flex items-center gap-4">
             <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                 <Info size={20} />
             </div>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                 Nesta fase MVP, os alertas so notificados via badge interno e e-mail cadastrado.
             </p>
        </div>
      </main>
    </div>
  );
};

export default Alertas;
