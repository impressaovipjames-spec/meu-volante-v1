import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap, Trophy, Calendar, Target, TrendingUp, Info } from 'lucide-react';
import { lotteryService } from '../../services/api';

const ResultadoHoje: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const configs: Record<string, any> = {
    'mega-sena': { nome: 'Mega-Sena', cor: '#209869' },
    'lotofacil': { nome: 'Lotofcil', cor: '#930089' },
    'quina': { nome: 'Quina', cor: '#260085' },
    'dupla-sena': { nome: 'Dupla Sena', cor: '#a61324' },
    'dia-de-sorte': { nome: 'Dia de Sorte', cor: '#cb852b' },
  };

  const modSlug = slug?.replace('-resultado-hoje', '') || '';
  const config = configs[modSlug] || configs['mega-sena'];

  useEffect(() => {
    const load = async () => {
        setLoading(true);
        try {
            // Reutilizando servio existente
            const resp = await lotteryService.getModalidades();
            if (resp.success) {
                const found = resp.data.find((m: any) => m.slug === modSlug);
                setData(found);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    load();
  }, [modSlug]);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-20">
      {/* Header SEO */}
      <header className="bg-dark-800 border-b border-white/5 py-8 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: config.cor }}></div>
        <button onClick={() => navigate('/')} className="absolute left-6 top-1/2 -translate-y-1/2 p-2 hover:bg-dark-700 rounded-lg">
            <ChevronLeft size={24} />
        </button>
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Resultado {config.nome} <span className="text-blue-500">Hoje</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                Confira os números sorteados, premiao e anlise estatstica.
            </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {loading ? (
             <div className="flex justify-center py-40"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
        ) : data ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Result Card */}
                <div className="bg-dark-800 border-2 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden" style={{ borderColor: `${config.cor}40` }}>
                    <div className="absolute -right-10 -top-10 opacity-5" style={{ color: config.cor }}>
                        <Trophy size={200} />
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                        <div className="space-y-2">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Concurso {data.concurso}</p>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Calendar size={14} />
                                <span className="text-xs font-bold uppercase">Sorteado em {data.data_sorteio}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Prmio Estimado</p>
                             <h2 className="text-3xl font-black text-white">R$ {data.valor_premio}</h2>
                             {data.acumulou && <p className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mt-1">Acumulou!</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {data.dezenas.map((n: string, i: number) => (
                            <span 
                                key={i} 
                                className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl md:text-3xl font-black border-4 shadow-xl transition-transform hover:scale-110"
                                style={{ 
                                    backgroundColor: `${config.cor}10`, 
                                    borderColor: config.cor,
                                    color: 'white',
                                    textShadow: '0 0 20px rgba(255,255,255,0.2)'
                                }}
                            >
                                {n}
                            </span>
                        ))}
                    </div>
                </div>

                {/* SEO Content / Analise */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-dark-800 border border-white/5 p-8 rounded-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="text-blue-500" />
                            <h3 className="text-xl font-black text-white uppercase">Anlise Orion</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                            Este concurso apresentou uma distribuio de equilbrio mdio. Nossos algoritmos identificaram um padro de dezenas atrasadas que foram sorteadas.
                        </p>
                        <button 
                            onClick={() => navigate(`/modalidade/${modSlug}`)}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/10"
                        >
                            GERAR JOGOS PARA O PRXIMO
                        </button>
                    </div>

                    <div className="bg-dark-800 border border-white/5 p-8 rounded-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="text-purple-500" />
                            <h3 className="text-xl font-black text-white uppercase">Como Funciona?</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                            O Meu Volante utiliza estatstica aplicada para filtrar jogos. Cadastre-se agora para ver o ranking de dezenas para {config.nome}.
                        </p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="w-full bg-white text-dark-900 font-black py-4 rounded-2xl transition-all shadow-xl shadow-white/5"
                        >
                            COMEAR GRTIS AGORA
                        </button>
                    </div>
                </div>

                {/* Info Legal SEO */}
                <div className="p-8 border-t border-white/5 flex items-start gap-4">
                    <Info className="text-gray-600 shrink-0" size={20} />
                    <p className="text-[10px] text-gray-600 font-medium leading-relaxed uppercase tracking-tighter italic">
                        As informaes exibidas aqui so obtidas atravs de integrao oficial com sistemas de loterias. O Meu Volante no realiza apostas, sendo apenas uma ferramenta de apoio estatstico e organizao.
                    </p>
                </div>

            </div>
        ) : (
            <div className="text-center py-40">
                <p className="text-gray-500 font-bold uppercase">Modalidade no encontrada.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default ResultadoHoje;
