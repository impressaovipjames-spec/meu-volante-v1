import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Target, BarChart3, ShieldCheck, HelpCircle, ArrowRight, BrainCircuit, Wallet } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 selection:bg-blue-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Zap size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight italic">MEU VOLANTE</h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
            <a href="#funciona" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">COMO FUNCIONA</a>
            <a href="#planos" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">PLANOS</a>
            <button 
                onClick={() => navigate('/login')}
                className="bg-white text-dark-900 px-6 py-2 rounded-full font-black text-xs hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5"
            >
                ENTRAR
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full"></div>

        <div className="bg-blue-600/10 border border-blue-600/20 px-4 py-1 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">O Futuro da Loteria Chegou</p>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-700">
            Jogue com mais estratgia.<br/>
            <span className="text-blue-600 italic">Organize seus palpites.</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mb-12 animate-in fade-in duration-1000">
            Resultados, estatsticas e gerao inteligente em um s lugar. 
            Aproveite a matemtica e pare de contar apenas com a sorte pura.
        </p>

        <div className="flex flex-col md:flex-row gap-4 animate-in fade-in zoom-in duration-1000">
            <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 transition-all shadow-2xl shadow-blue-600/30 group"
            >
                COMEAR GRTIS <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-dark-800 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-dark-700 transition-all">
                VER PLANOS
            </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                <BrainCircuit className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Gerao Inteligente</h3>
                <p className="text-gray-500 leading-relaxed font-medium">Nossos motores de IA analisam milhares de concursos passados para filtrar combinaes improvveis.</p>
            </div>
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                <Target className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Volante Digital</h3>
                <p className="text-gray-500 leading-relaxed font-medium">Marque seus palpites de forma rpida e organizada em um volante interativo exclusivo.</p>
            </div>
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                <Wallet className="text-green-500 mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Gesto de Boloes</h3>
                <p className="text-gray-500 leading-relaxed font-medium">Controle financeiro completo de participantes, cotas e pagamentos de forma profissional.</p>
            </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="funciona" className="py-24 px-6 md:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">COMO O SISTEMA FUNCIONA?</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="relative">
                <span className="text-8xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2 select-none">01</span>
                <div className="relative z-10">
                    <h4 className="text-xl font-black text-white mb-3">CONECTE-SE</h4>
                    <p className="text-gray-500 text-sm">Crie sua conta em segundos e acesse o painel oficial Orion.</p>
                </div>
            </div>
            <div className="relative">
                <span className="text-8xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2 select-none">02</span>
                <div className="relative z-10">
                    <h4 className="text-xl font-black text-white mb-3">ESCOLHA O MODO</h4>
                    <p className="text-gray-500 text-sm">Use nossa IA estatstica ou marque seu palpite manual no volante.</p>
                </div>
            </div>
            <div className="relative">
                <span className="text-8xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2 select-none">03</span>
                <div className="relative z-10">
                    <h4 className="text-xl font-black text-white mb-3">SALVE E ACOMPANHE</h4>
                    <p className="text-gray-500 text-sm">Mantenha seu histrico organizado e receba alertas de prmios.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Planos (Reutilizando Estilo Anterior com Refino) */}
      <section id="planos" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">ESCOLHA SEU NIVEL</h2>
            <p className="text-gray-500 font-medium">Planos flexveis para todos os tipos de apostadores.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-dark-800/50 border-white/5 p-12 rounded-[2.5rem] border hover:border-white/10 transition-all">
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6">Plano Free</h3>
                <div className="text-4xl font-black text-white mb-8">Grátis</div>
                <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-gray-400 text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> 3 geraes/dia</li>
                    <li className="flex items-center gap-3 text-gray-400 text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> 10 tickets salvos</li>
                    <li className="flex items-center gap-3 text-gray-400 text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> Histrico bsico</li>
                </ul>
                <button onClick={() => navigate('/login')} className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl transition-all">COMEAR AGORA</button>
            </div>
            <div className="bg-dark-800 border-blue-600 p-12 rounded-[2.5rem] border-2 shadow-[0_0_50px_-12px_rgba(37,99,235,0.3)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full">POPULAR</div>
                <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-6">Plano Premium</h3>
                <div className="text-4xl font-black text-white mb-8">R$ 19,90 <span className="text-gray-600 text-lg font-bold">/ms</span></div>
                <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-white text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> Gerao IA Ilimitada</li>
                    <li className="flex items-center gap-3 text-white text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> Volante Digital Ilimitado</li>
                    <li className="flex items-center gap-3 text-white text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> Gesto de Boloes</li>
                    <li className="flex items-center gap-3 text-white text-sm font-bold"><ArrowRight size={14} className="text-blue-500" /> Histrico Completo</li>
                </ul>
                <button onClick={() => navigate('/login')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all">QUERO SER PREMIUM</button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-dark-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                <h1 className="text-xl font-bold tracking-tight italic">MEU VOLANTE</h1>
            </div>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-tight"> 2024 MEU VOLANTE. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-xs font-bold text-gray-600 uppercase">
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
        </div>
        <p className="text-center text-[10px] text-gray-700 mt-12 max-w-lg mx-auto italic">
            Aviso: O Meu Volante  uma ferramenta estatstica. No garantimos premiaes em sorteios oficiais. Jogue com responsabilidade.
        </p>
      </footer>

    </div>
  );
};

export default LandingPage;
