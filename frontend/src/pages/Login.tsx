import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, UserPlus, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('mv_token', response.data.data.token);
        localStorage.setItem('mv_user_info', JSON.stringify(response.data.data.user));
        toast.success("Acesso autorizado! Bem-vindo.");
        navigate('/dashboard');
      } else {
        toast.error("Credenciais inválidas.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Erro de conexão. Servidor indisponível.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-dark-900 selection:bg-blue-500">
      
      {/* Lado Esquerdo: Branding e Prova Social (Oculto em Mobile pequeno) */}
      <div className="hidden lg:flex flex-1 bg-blue-600 p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-white p-2 rounded-xl text-blue-600 shadow-xl">
                    <Zap size={32} />
                </div>
                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">MEU VOLANTE</h1>
            </div>
            <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">
                Sua sorte<br/>
                <span className="text-dark-900/50 italic">merece tcnica.</span>
            </h2>
        </div>

        <div className="relative z-10 bg-dark-900/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-sm">
            <p className="text-white font-bold leading-relaxed mb-4">
                "O Meu Volante mudou a forma como organizo meus boles. A estatstica me d segurana."
            </p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20"></div>
                <div>
                    <p className="text-white text-xs font-black uppercase">Carlos Alberto</p>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Usurio Premium</p>
                </div>
            </div>
        </div>
      </div>

      {/* Lado Direito: Formulrio */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-20 relative">
        <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden flex flex-col items-center">
                <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-xl shadow-blue-600/20">
                    <Zap size={32} className="text-white" />
                </div>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">MEU VOLANTE</h1>
            </div>

            <div className="mb-8">
                <h3 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Entrar</h3>
                <p className="text-gray-500 font-medium">Acesse sua central de estratgia orion.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@meuvolante.com"
                        className="w-full bg-dark-800 border border-dark-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600 font-bold"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-dark-800 border border-dark-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600 font-bold"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button type="button" className="text-xs font-bold text-gray-500 hover:text-blue-500 transition-colors">Esqueceu a senha?</button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 group"
                >
                    {loading ? 'AUTORIZANDO...' : 'ACESSAR AGORA'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <div className="mt-12 pt-8 border-t border-dark-800">
                <div className="flex flex-col gap-4">
                    <button onClick={() => navigate('/register')} className="flex items-center justify-between p-4 bg-dark-800/50 border border-dark-700 rounded-2xl group hover:border-blue-500/30 transition-all text-left w-full">
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Novo por aqui?</p>
                            <p className="text-sm font-black text-white uppercase italic">Criar Conta Gratuita</p>
                        </div>
                        <UserPlus size={20} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
                    </button>
                    
                    <div className="flex items-center gap-3 text-gray-600 p-2">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Ambiente Blindagem Orion V1.0</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
