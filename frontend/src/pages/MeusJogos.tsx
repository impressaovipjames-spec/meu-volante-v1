import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Trash2, Copy, Target, User as UserIcon, ChevronLeft, Filter } from 'lucide-react';
import { lotteryService } from '../services/api';
import toast from 'react-hot-toast';

const MeusJogos: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<string>('todos');

  const loadTickets = async () => {
    setLoading(true);
    try {
      const resp = await lotteryService.getTickets({ origem: filtro === 'todos' ? undefined : filtro });
      if (resp.success) {
        setTickets(resp.data);
      }
    } catch (err) {
      toast.error("Erro ao carregar seus jogos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [filtro]);

  const handleDelete = async (id: string) => {
    try {
      const resp = await lotteryService.deleteTicket(id);
      if (resp.success) {
        toast.success("Jogo excludo!");
        loadTickets();
      }
    } catch (err) {
      toast.error("Erro ao excluir");
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const resp = await lotteryService.duplicateTicket(id);
      if (resp.success) {
        toast.success("Jogo duplicado com sucesso!");
        loadTickets();
      }
    } catch (err) {
      toast.error("Erro ao duplicar");
    }
  };

  const getCor = (mod: string) => {
    switch (mod) {
      case 'mega-sena': return '#209869';
      case 'lotofacil': return '#930089';
      case 'quina': return '#260085';
      case 'dupla-sena': return '#a61324';
      case 'dia-de-sorte': return '#cb852b';
      default: return '#3b82f6';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-20">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-dark-700 rounded-lg">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black italic tracking-tighter">MEUS JOGOS</h1>
        </div>
        <div className="flex bg-dark-900 p-1 rounded-xl border border-dark-700">
            <button 
                onClick={() => setFiltro('todos')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtro === 'todos' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}
            >
                TODOS
            </button>
            <button 
                onClick={() => setFiltro('sistema')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtro === 'sistema' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}
            >
                🎯 SISTEMA
            </button>
            <button 
                onClick={() => setFiltro('usuario')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtro === 'usuario' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}
            >
                👤 USURIO
            </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-20 bg-dark-800 rounded-3xl border border-dark-700 border-dashed">
            <Filter size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 font-bold">Nenhum jogo encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gray-600 transition-all group"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: getCor(ticket.modalidade) }}
                    >
                        {ticket.origem === 'sistema' ? <Target size={24} /> : <UserIcon size={24} />}
                    </div>
                    <div>
                        <h3 className="font-black uppercase text-white leading-none mb-1">{ticket.modalidade.replace('-', ' ')}</h3>
                        <p className="text-[10px] font-bold text-gray-500">{new Date(ticket.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center flex-grow">
                    {ticket.numeros.map((num: string, idx: number) => (
                        <span 
                            key={idx}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                            style={{ backgroundColor: `${getCor(ticket.modalidade)}40`, border: `1px solid ${getCor(ticket.modalidade)}` }}
                        >
                            {num}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {ticket.score && (
                        <div className="mr-4 text-center">
                            <p className="text-[8px] font-bold text-gray-500 uppercase">Score</p>
                            <p className="text-xl font-black text-blue-500 leading-none">{ticket.score}</p>
                        </div>
                    )}
                    <button 
                        onClick={() => handleDuplicate(ticket.id)}
                        className="p-3 bg-dark-700 rounded-xl hover:bg-dark-600 text-gray-400 hover:text-white transition-all"
                        title="Duplicar"
                    >
                        <Copy size={20} />
                    </button>
                    <button 
                        onClick={() => handleDelete(ticket.id)}
                        className="p-3 bg-dark-700 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all"
                        title="Excluir"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-dark-800/80 backdrop-blur-md border-t border-dark-700 p-4 flex justify-around md:hidden">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 text-gray-500">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold">DASHBOARD</span>
        </button>
        <button onClick={() => navigate('/meus-jogos')} className="flex flex-col items-center gap-1 text-blue-500">
          <Target size={24} />
          <span className="text-[10px] font-bold">MEUS JOGOS</span>
        </button>
      </nav>
    </div>
  );
};

export default MeusJogos;
