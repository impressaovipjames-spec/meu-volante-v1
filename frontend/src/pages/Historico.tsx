import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart3, Lock, Trophy, Timer, Flame, Layers } from 'lucide-react';
import PaywallModal from '../components/PaywallModal';

const Historico: React.FC = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false); // Mock
  const [paywall, setPaywall] = useState(false);
  const [modalidade, setModalidade] = useState('mega-sena');

  const configs: Record<string, any> = {
    'mega-sena': { cor: '#209869' },
    'lotofacil': { cor: '#930089' },
    'quina': { cor: '#260085' },
    'dupla-sena': { cor: '#a61324' },
    'dia-de-sorte': { cor: '#cb852b' },
  };

  const handleVerHistoricoCompleto = () => {
    if (!isPremium) {
      setPaywall(true);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-20">
      <PaywallModal 
        isOpen={paywall} 
        onClose={() => setPaywall(false)}
        reason="limite_geracao"
        message="Acesse o histrico completo de todos os concursos j realizados!"
      />

      <header className="bg-dark-800 border-b border-dark-700 py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-dark-700 rounded-lg">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Anlise de Histrico</h1>
        </div>
        <div className="flex gap-2">
            {Object.keys(configs).map(key => (
                <button 
                  key={key}
                  onClick={() => setModalidade(key)}
                  className={`w-3 h-3 rounded-full transition-all ${modalidade === key ? 'scale-150' : 'opacity-30'}`}
                  style={{ backgroundColor: configs[key].cor }}
                />
            ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Rankings - PREMIUM ONLY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl relative overflow-hidden group">
                {!isPremium && (
                    <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                        <Lock className="text-yellow-500 mb-2" size={32} />
                        <p className="text-xs font-black text-white uppercase mb-4">Ranking de Dezenas Quentes</p>
                        <button onClick={handleVerHistoricoCompleto} className="bg-yellow-500 text-dark-900 text-[10px] font-black px-4 py-2 rounded-xl">LIBERAR AGORA</button>
                    </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                    <Flame className="text-orange-500" />
                    <h3 className="font-black uppercase tracking-tight">Mais Sorteadas (Quentes)</h3>
                </div>
                <div className="space-y-3">
                    {[10, 53, 5, 37, 21].map((n, i) => (
                        <div key={i} className="flex items-center justify-between bg-dark-900 p-3 rounded-xl border border-dark-700">
                            <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-black">{n.toString().padStart(2, '0')}</span>
                            <span className="text-xs font-bold text-gray-500">245 VEZES</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-dark-800 border border-dark-700 p-8 rounded-3xl relative overflow-hidden group">
                 {!isPremium && (
                    <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                        <Lock className="text-yellow-500 mb-2" size={32} />
                        <p className="text-xs font-black text-white uppercase mb-4">Ranking de Dezenas Atrasadas</p>
                        <button onClick={handleVerHistoricoCompleto} className="bg-yellow-500 text-dark-900 text-[10px] font-black px-4 py-2 rounded-xl">LIBERAR AGORA</button>
                    </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                    <Timer className="text-blue-500" />
                    <h3 className="font-black uppercase tracking-tight">Mais Atrasadas (Delay)</h3>
                </div>
                <div className="space-y-3">
                    {[12, 44, 2, 59, 31].map((n, i) => (
                        <div key={i} className="flex items-center justify-between bg-dark-900 p-3 rounded-xl border border-dark-700">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-black">{n.toString().padStart(2, '0')}</span>
                            <span className="text-xs font-bold text-gray-500">18 CONCURSOS SORTE</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Histrico de Resultados */}
        <div className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-dark-700 bg-dark-700/30 flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">ltimos Resultados</h3>
                <Layers size={20} className="text-gray-500" />
            </div>
            
            <div className="divide-y divide-dark-700">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                    <div key={c} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-dark-700/20 transition-all">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Concurso {2710 - c}</p>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Sorteio em 1{c}/03/2024</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['04', '12', '25', '33', '41', '58'].map((n, i) => (
                                <span key={i} className="w-10 h-10 rounded-full border border-dark-600 flex items-center justify-center text-sm font-black text-white" style={{ backgroundColor: `${configs[modalidade].cor}20`, borderColor: configs[modalidade].cor }}>
                                    {n}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Barreira FREE ao chegar no 10 concurso */}
                {!isPremium && (
                    <div className="p-12 text-center bg-dark-900/50">
                         <Trophy className="mx-auto text-yellow-500 mb-4" size={40} />
                         <h4 className="text-white font-black text-xl mb-2 italic">QUER VER O RESTANTE?</h4>
                         <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">Usurios FREE veem apenas os últimos 10 concursos. Faa o upgrade para ver o histórico completo de anos!</p>
                         <button onClick={handleVerHistoricoCompleto} className="bg-yellow-500 hover:bg-yellow-400 text-dark-900 font-black px-10 py-4 rounded-2xl text-lg shadow-xl shadow-yellow-500/20 transition-all">
                             ASSINAR PREMIUM
                         </button>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default Historico;
