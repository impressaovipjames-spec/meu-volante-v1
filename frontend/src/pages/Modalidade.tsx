import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calculator, PenTool, LayoutDashboard, Target } from 'lucide-react';
import { lotteryService } from '../services/api';
import LoadingOverlay from '../components/LoadingOverlay';
import ResultDisplay from '../components/ResultDisplay';
import VolanteUniversal from '../components/VolanteUniversal';
import toast from 'react-hot-toast';

const Modalidade: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jogos, setJogos] = useState<any[]>([]);
  const [modo, setModo] = useState<'menu' | 'engine' | 'palpite'>('menu');

  const configs: Record<string, any> = {
    'mega-sena': { nome: 'Mega-Sena', cor: '#209869', range: 60, limite: 6 },
    'lotofacil': { nome: 'Lotofcil', cor: '#930089', range: 25, limite: 15 },
    'quina': { nome: 'Quina', cor: '#260085', range: 80, limite: 5 },
    'dupla-sena': { nome: 'Dupla Sena', cor: '#a61324', range: 50, limite: 6 },
    'dia-de-sorte': { nome: 'Dia de Sorte', cor: '#cb852b', range: 31, limite: 7 },
  };

  const info = configs[slug || ''] || { nome: 'Loteria', cor: '#3b82f6', range: 60, limite: 6 };

  const handleGenerate = async () => {
    setLoading(true);
    setJogos([]);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const response = await lotteryService.generateGames(slug || '', 5);
      if (response.success) {
        setJogos(response.data.jogos);
        setModo('engine');
        toast.success("Jogos gerados com sucesso!");
      }
    } catch (error) {
      toast.error("Erro na engine. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSistema = async (game: any) => {
    try {
      const resp = await lotteryService.saveTicket({
        modalidade: slug!,
        numeros: game.numeros,
        origem: 'sistema',
        score: game.score,
        extra: game.extra
      });
      if (resp.success) toast.success("Jogo do Sistema salvo!");
    } catch (err) {
      toast.error("Erro ao salvar ticket");
    }
  };

  const handleSaveManual = async (numeros: string[], extra?: any) => {
    setLoading(true);
    try {
      const resp = await lotteryService.saveTicket({
        modalidade: slug!,
        numeros: numeros,
        origem: 'usuario',
        extra: extra
      });
      if (resp.success) {
        toast.success("Seu palpite foi salvo!");
        navigate('/meus-jogos');
      }
    } catch (err) {
      toast.error("Erro ao salvar palpite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-24">
      {loading && <LoadingOverlay message="Processando estatstica..." />}
      
      {/* Header */}
      <header 
        className="sticky top-0 z-10 py-4 px-6 md:px-12 flex justify-between items-center text-white shadow-xl transition-all"
        style={{ backgroundColor: info.cor }}
      >
        <button 
          onClick={() => modo === 'menu' ? navigate('/dashboard') : setModo('menu')}
          className="p-2 hover:bg-white/20 rounded-xl transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
            <h1 className="text-xs font-bold opacity-70 uppercase tracking-tighter">
                {modo === 'menu' ? 'Escolher Modo' : modo === 'engine' ? 'Engine Orion' : 'Meu Palpite'}
            </h1>
            <p className="text-xl font-black uppercase tracking-widest leading-none">{info.nome}</p>
        </div>
        <button onClick={() => navigate('/meus-jogos')} className="p-2 hover:bg-white/20 rounded-xl">
            <Target size={24} />
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {modo === 'menu' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                    onClick={handleGenerate}
                    className="flex flex-col items-center gap-6 bg-dark-800 border-2 border-transparent p-10 rounded-3xl hover:border-blue-500/50 hover:bg-dark-700 transition-all group shadow-2xl"
                >
                    <div className="bg-blue-600 p-5 rounded-2xl text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                        <Calculator size={40} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-black">Gerar com Matemtica</h3>
                        <p className="text-xs text-gray-500 uppercase mt-2 tracking-widest font-bold">Algoritmo Orion v2.0</p>
                    </div>
                </button>

                <button 
                    onClick={() => setModo('palpite')}
                    className="flex flex-col items-center gap-6 bg-dark-800 border-2 border-transparent p-10 rounded-3xl hover:border-purple-500/50 hover:bg-dark-700 transition-all group shadow-2xl"
                >
                    <div className="bg-purple-600 p-5 rounded-2xl text-white shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
                        <PenTool size={40} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-black">Meu Palpite</h3>
                        <p className="text-xs text-gray-500 uppercase mt-2 tracking-widest font-bold">Marcar Volante Digital</p>
                    </div>
                </button>
            </div>
        )}

        {modo === 'engine' && (
            <ResultDisplay 
                jogos={jogos} 
                cor={info.cor} 
                onSave={handleSaveSistema} 
            />
        )}

        {modo === 'palpite' && (
            <VolanteUniversal 
                modalidade={slug!} 
                range={info.range} 
                limite={info.limite} 
                cor={info.cor} 
                onSave={handleSaveManual} 
            />
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-dark-800/80 backdrop-blur-md border-t border-dark-700 p-4 flex justify-around md:hidden">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 text-gray-400">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold">INICIO</span>
        </button>
        <button onClick={() => navigate('/meus-jogos')} className="flex flex-col items-center gap-1 text-gray-400">
          <Target size={24} />
          <span className="text-[10px] font-bold">JOGOS</span>
        </button>
      </nav>
    </div>
  );
};

export default Modalidade;
