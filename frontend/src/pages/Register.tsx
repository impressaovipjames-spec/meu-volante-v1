import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/register', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('mv_token', response.data.data.token);
        localStorage.setItem('mv_user_info', JSON.stringify(response.data.data.user));
        toast.success("Conta criada com sucesso! Bem-vindo.");
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || "Erro ao criar conta.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Erro de conexão com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-dark-900 selection:bg-blue-500">
      
      {/* Lado Esquerdo: Branding */}
      <div className="hidden lg:flex flex-1 bg-greenPrimary p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-darkBg p-2 rounded-xl text-greenPrimary shadow-xl">
                    <Zap size={32} />
                </div>
                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">MEU VOLANTE</h1>
            </div>
            <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">
                Criar conta<br/>
                <span className="text-darkBg/50 italic">e dominar a Loteria.</span>
            </h2>
        </div>
      </div>

      {/* Lado Direito: Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-20 relative">
        <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden flex flex-col items-center">
                <div className="bg-greenPrimary p-3 rounded-2xl mb-4 shadow-xl">
                    <Zap size={32} className="text-white" />
                </div>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">MEU VOLANTE</h1>
            </div>

            <div className="mb-8">
                <h3 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Cadastre-se</h3>
                <p className="text-gray-500 font-medium">Acesso imediato à plataforma Órion.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-dark-800 border border-dark-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-greenPrimary transition-all placeholder:text-gray-600 font-bold"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Senha (Mín. 6 dígitos)</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        minLength={6}
                        className="w-full bg-dark-800 border border-dark-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-greenPrimary transition-all placeholder:text-gray-600 font-bold"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-xl group"
                >
                    {loading ? 'CRIANDO...' : 'CRIAR CONTA GRATUITA'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <div className="mt-12 pt-8 border-t border-dark-800">
                <div className="flex flex-col gap-4">
                    <button onClick={() => navigate('/login')} className="flex items-center justify-between p-4 bg-dark-800/50 border border-dark-700 rounded-2xl group hover:border-greenPrimary/30 transition-all text-left">
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Já tem uma conta?</p>
                            <p className="text-sm font-black text-white uppercase italic">Fazer Login agora</p>
                        </div>
                        <UserCheck size={20} className="text-gray-600 group-hover:text-greenPrimary transition-colors" />
                    </button>
                    
                    <div className="flex items-center gap-3 text-gray-600 p-2 mt-4">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cadastro seguro encriptado</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
