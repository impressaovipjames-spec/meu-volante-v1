import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Target, BrainCircuit, Wallet, ArrowRight } from 'lucide-react';
import bgHero from '../assets/bg-hero.jpg';
import logoMeuVolante from '../assets/logo-meuvolante.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-darkBg text-gray-100 selection:bg-gold selection:text-darkBg">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-darkBg/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <img src={logoMeuVolante} alt="Meu Volante Logo" className="h-8 md:h-10 object-contain" />
        </div>
        <div className="hidden md:flex items-center gap-8">
            <a href="#funciona" className="text-sm font-bold text-gray-400 hover:text-gold transition-colors">COMO FUNCIONA</a>
            <a href="#planos" className="text-sm font-bold text-gray-400 hover:text-gold transition-colors">PLANOS</a>
            <button 
                onClick={() => navigate('/login')}
                className="bg-gold text-darkBg px-6 py-2 rounded-full font-black text-xs hover:bg-yellow-400 transition-all shadow-[0_0_10px_rgba(250,204,21,0.3)]"
            >
                ENTRAR
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-6 md:px-12 md:py-48 flex flex-col items-center text-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
            <div className="bg-greenPrimary/20 border border-greenPrimary/40 px-4 py-1 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <p className="text-greenPrimary text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">O Futuro da Loteria Chegou</p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                Jogue com mais estratégia.<br/>
                <span className="text-gold italic drop-shadow-lg">Organize seus palpites.</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-12 animate-in fade-in duration-1000 drop-shadow-md">
                Resultados, estatísticas e geração inteligente em um só lugar. 
                Aproveite a matemática e pare de contar apenas com a sorte pura.
            </p>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 animate-in fade-in zoom-in duration-1000">
                <button 
                    onClick={() => navigate('/login')}
                    className="btn-gold flex items-center justify-center gap-3 text-lg md:text-xl md:px-10 md:py-5 group"
                >
                    COMEÇAR GRÁTIS <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#planos" className="bg-transparent border border-white/20 text-white px-10 py-4 md:py-5 rounded-lg font-black text-lg md:text-xl hover:bg-white/5 transition-all text-center">
                    VER PLANOS
                </a>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="p-10 bg-dark-800 border border-white/5 rounded-2xl hover:border-gold/30 transition-all group shadow-xl">
                <BrainCircuit className="text-greenPrimary mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Geração Inteligente</h3>
                <p className="text-gray-400 leading-relaxed font-medium">Nossos motores de IA analisam milhares de concursos passados para filtrar combinações improváveis.</p>
            </div>
            <div className="p-10 bg-dark-800 border border-white/5 rounded-2xl hover:border-gold/30 transition-all group shadow-xl">
                <Target className="text-gold mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Volante Digital</h3>
                <p className="text-gray-400 leading-relaxed font-medium">Marque seus palpites de forma rápida e organizada em um volante interativo exclusivo.</p>
            </div>
            <div className="p-10 bg-dark-800 border border-white/5 rounded-2xl hover:border-gold/30 transition-all group shadow-xl">
                <Wallet className="text-greenPrimary mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Gestão de Bolões</h3>
                <p className="text-gray-400 leading-relaxed font-medium">Controle financeiro completo de participantes, cotas e pagamentos de forma profissional.</p>
            </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="funciona" className="py-24 px-6 md:px-12 bg-dark-800 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">COMO O SISTEMA FUNCIONA?</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center">
            <div className="relative">
                <span className="text-8xl font-black text-gold/5 absolute -top-12 left-1/2 -translate-x-1/2 select-none">01</span>
                <div className="relative z-10 md:px-4">
                    <h4 className="text-xl md:text-2xl font-black text-gold mb-3">CONECTE-SE</h4>
                    <p className="text-gray-400 text-sm md:text-base">Crie sua conta em segundos e acesse o painel oficial Órion.</p>
                </div>
            </div>
            <div className="relative">
                <span className="text-8xl font-black text-gold/5 absolute -top-12 left-1/2 -translate-x-1/2 select-none">02</span>
                <div className="relative z-10 md:px-4">
                    <h4 className="text-xl md:text-2xl font-black text-gold mb-3">ESCOLHA O MODO</h4>
                    <p className="text-gray-400 text-sm md:text-base">Use nossa IA estatística ou marque seu palpite manual no volante.</p>
                </div>
            </div>
            <div className="relative">
                <span className="text-8xl font-black text-gold/5 absolute -top-12 left-1/2 -translate-x-1/2 select-none">03</span>
                <div className="relative z-10 md:px-4">
                    <h4 className="text-xl md:text-2xl font-black text-gold mb-3">SALVE E ACOMPANHE</h4>
                    <p className="text-gray-400 text-sm md:text-base">Mantenha seu histórico organizado e receba alertas de prêmios.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">ESCOLHA SEU NÍVEL</h2>
            <p className="text-gray-400 md:text-xl font-medium">Planos flexíveis para apostadores inteligentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Plano Free */}
            <div className="bg-dark-800 border-white/10 p-10 md:p-14 rounded-3xl border hover:border-gold/30 transition-all flex flex-col justify-between">
                <div>
                    <h3 className="text-sm md:text-base font-black text-gray-500 uppercase tracking-widest mb-6">Plano Free</h3>
                    <div className="text-5xl font-black text-white mb-8">Grátis</div>
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-gray-300 md:text-lg font-bold"><ArrowRight size={18} className="text-greenPrimary" /> 3 gerações/dia</li>
                        <li className="flex items-center gap-3 text-gray-300 md:text-lg font-bold"><ArrowRight size={18} className="text-greenPrimary" /> 10 tickets salvos</li>
                        <li className="flex items-center gap-3 text-gray-300 md:text-lg font-bold"><ArrowRight size={18} className="text-greenPrimary" /> Histórico básico</li>
                    </ul>
                </div>
                <button onClick={() => navigate('/login')} className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 md:py-5 rounded-xl transition-all text-lg">COMEÇAR AGORA</button>
            </div>
            
            {/* Plano Premium */}
            <div className="bg-dark-800 border-gold p-10 md:p-14 rounded-3xl border-2 shadow-[0_0_40px_-10px_rgba(250,204,21,0.2)] relative flex flex-col justify-between transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-darkBg text-xs md:text-sm font-black px-6 py-2 rounded-full uppercase tracking-wider">MAIS POPULAR</div>
                <div>
                    <h3 className="text-sm md:text-base font-black text-gold uppercase tracking-widest mb-6 mt-2">Plano Premium</h3>
                    <div className="text-5xl font-black text-white mb-8">R$ 19,90 <span className="text-gray-500 text-xl font-bold">/mês</span></div>
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-white md:text-lg font-bold"><ArrowRight size={18} className="text-gold" /> Geração IA Ilimitada</li>
                        <li className="flex items-center gap-3 text-white md:text-lg font-bold"><ArrowRight size={18} className="text-gold" /> Volante Digital Ilimitado</li>
                        <li className="flex items-center gap-3 text-white md:text-lg font-bold"><ArrowRight size={18} className="text-gold" /> Gestão de Bolões VIP</li>
                        <li className="flex items-center gap-3 text-white md:text-lg font-bold"><ArrowRight size={18} className="text-gold" /> Histórico Completo & Alertas</li>
                    </ul>
                </div>
                <button onClick={() => navigate('/login')} className="w-full btn-gold text-lg md:py-5 rounded-xl">QUERO SER PREMIUM</button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-12 border-t border-white/5 bg-darkBg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
                <img src={logoMeuVolante} alt="Meu Volante Logo" className="h-6 md:h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-tight text-center">© 2024 MEU VOLANTE. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-xs md:text-sm font-bold text-gray-500 uppercase">
                <a href="#" className="hover:text-gold transition-colors">Privacidade</a>
                <a href="#" className="hover:text-gold transition-colors">Termos</a>
            </div>
        </div>
        <p className="text-center text-[10px] md:text-xs text-gray-700 mt-12 max-w-2xl mx-auto italic">
            Aviso: O Meu Volante é uma ferramenta estatística. Não garantimos premiações em sorteios oficiais da loteria. Jogue com moderação e responsabilidade.
        </p>
      </footer>

    </div>
  );
};

export default LandingPage;
