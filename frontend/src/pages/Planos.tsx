import React from 'react';
import { Crown, Check, ChevronLeft, Zap, ShieldCheck, BarChart3, BellRing, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Planos: React.FC = () => {
  const navigate = useNavigate();

  const planos = [
    {
      nome: 'FREE',
      preco: 'Grátis',
      cor: 'gray',
      features: [
        '3 gerações IA p/ dia',
        '10 tickets ativos',
        '1 bolão ativo',
        '2 alertas ativos',
        'Histórico (10 concursos)'
      ],
      botao: 'PLANO ATUAL',
      destaque: false
    },
    {
      nome: 'PREMIUM',
      preco: 'R$ 19,90',
      periodo: '/mês',
      cor: 'yellow',
      features: [
        'Gerações IA ILIMITADAS',
        'Tickets ILIMITADOS',
        'Boloes ILIMITADOS',
        'Alertas ILIMITADOS',
        'Histórico Completo',
        'Ranking de Dezenas',
        'Sem Anúncios',
        'Suporte Prioritário'
      ],
      botao: 'QUERO SER PREMIUM',
      destaque: true
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 pb-20">
      <header className="bg-dark-800 border-b border-dark-700 py-6 px-6 md:px-12 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-dark-700 rounded-lg transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black italic tracking-tighter uppercase">Planos & Upgrade</h1>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Aumente sua produtividade</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">
                Economize tempo com nossas engrenagens inteligentes e mantenha seus jogos organizados com ferramentas profissionais.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {planos.map((plano) => (
                <div 
                    key={plano.nome}
                    className={`
                        relative p-10 rounded-[2.5rem] border-2 transition-all duration-300
                        ${plano.destaque 
                            ? 'bg-dark-800 border-yellow-500 shadow-[0_0_50px_-12px_rgba(234,179,8,0.2)]' 
                            : 'bg-dark-800/50 border-dark-700'}
                    `}
                >
                    {plano.destaque && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-dark-900 text-[10px] font-black px-4 py-1 rounded-full shadow-lg">
                            RECOMENDADO
                        </div>
                    )}

                    <div className="mb-8">
                        <p className={`text-xs font-black mb-1 uppercase tracking-widest ${plano.destaque ? 'text-yellow-500' : 'text-gray-500'}`}>Plano {plano.nome}</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-white">{plano.preco}</span>
                            {plano.periodo && <span className="text-gray-500 font-bold">{plano.periodo}</span>}
                        </div>
                    </div>

                    <ul className="space-y-4 mb-10">
                        {plano.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className={`p-1 rounded-full ${plano.destaque ? 'bg-yellow-500 text-dark-900' : 'bg-dark-700 text-gray-500'}`}>
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className={`text-sm font-bold ${plano.destaque ? 'text-gray-100' : 'text-gray-500'}`}>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button 
                        disabled={!plano.destaque}
                        className={`
                            w-full py-5 rounded-2xl font-black text-lg transition-all
                            ${plano.destaque 
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-dark-900 shadow-xl shadow-yellow-500/10' 
                                : 'bg-dark-700 text-gray-600 cursor-not-allowed'}
                        `}
                    >
                        {plano.botao}
                    </button>
                    
                    {!plano.destaque && (
                        <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-tighter">
                            Voc j possui este plano.
                        </p>
                    )}
                </div>
            ))}
        </div>

        {/* Benefits Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-dark-800/30 p-8 rounded-3xl border border-dark-700/50">
                <Zap className="text-yellow-500 mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Sem Limites</h4>
                <p className="text-gray-500 text-sm">Gere quantos jogos quiser e salve todos os seus palpites sem restries.</p>
            </div>
            <div className="bg-dark-800/30 p-8 rounded-3xl border border-dark-700/50">
                <BarChart3 className="text-blue-500 mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Dados Completos</h4>
                <p className="text-gray-500 text-sm">Acesse o histrico completo de todos os concursos j realizados.</p>
            </div>
            <div className="bg-dark-800/30 p-8 rounded-3xl border border-dark-700/50">
                <ShieldCheck className="text-green-500 mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Organizao</h4>
                <p className="text-gray-500 text-sm">Gesto financeira séria para seus boloes individuais e em grupo.</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Planos;
