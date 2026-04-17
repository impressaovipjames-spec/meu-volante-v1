import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, QrCode, Copy, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [plano, setPlano] = useState<any>(null);
  const [pedidoId, setPedidoId] = useState('');

  const planos = [
    { id: 'mensal', nome: 'MENSAL', valor: 19.90, desc: 'Acesso por 30 dias' },
    { id: 'trimestral', nome: 'TRIMESTRAL', valor: 49.90, desc: '90 dias (Economize R$ 10)', destaque: true },
    { id: 'anual', nome: 'ANUAL', valor: 97.00, desc: '1 ano (Melhor Custo-Benefcio)' }
  ];

  const handleSelectPlano = async (p: any) => {
    setPlano(p);
    try {
        const resp = await (window as any).api_call('/assinatura/criar', 'POST', {
            plano_tipo: p.id,
            valor: p.valor
        });
        if (resp.success) {
            setPedidoId(resp.data.id);
            setStep(2);
        }
    } catch (e) {
        toast.error("Erro ao gerar pedido. Tente novamente.");
    }
  };

  const handleConfirmPay = async () => {
    try {
        const resp = await (window as any).api_call(`/assinatura/confirmar/${pedidoId}`, 'POST');
        if (resp.success) {
            setStep(3);
            toast.success("Solicitao enviada!");
            
            // Monitoramento GA: Converso
            if ((window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                    transaction_id: pedidoId,
                    value: plano?.valor || 0,
                    currency: 'BRL',
                    items: [{ item_name: plano?.nome || 'Plano Premium' }]
                });
            }
        }
    } catch (e) {
        toast.error("Erro ao confirmar. Tente novamente.");
    }
  };

  const copyPix = () => {
    navigator.clipboard.writeText("financeiro@meuvolante.com.br");
    toast.success("Chave PIX copiada!");
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
      <header className="py-6 px-6 md:px-12 bg-dark-800 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="p-2 hover:bg-dark-700 rounded-lg">
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-black italic tracking-tighter uppercase">Finalizar Assinatura</h1>
         </div>
         <div className="hidden md:flex items-center gap-2 text-blue-500 font-bold text-xs">
            <ShieldCheck size={16} /> CHECKOUT SEGURO
         </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Esquerda: Info e Benefcios */}
            <div className="hidden md:block space-y-8">
                <div>
                    <h2 className="text-4xl font-black text-white mb-4 leading-tight">Prepare-se para uma nova experincia de jogo.</h2>
                    <p className="text-gray-500">Ao assinar o Premium, voc remove todas as barreiras e acessa o poder total do Algoritmo Orion.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                        <CheckCircle size={18} className="text-green-500" /> Consultas de Resultados Ilimitadas
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                        <CheckCircle size={18} className="text-green-500" /> Histrico Completo + Rankings
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                        <CheckCircle size={18} className="text-green-500" /> Gesto de Boloes Sem Limites
                    </div>
                </div>
            </div>

            {/* Direita: Interface de Checkout */}
            <div className="bg-dark-800 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all duration-500">
                {/* Step 1: Selecionar Plano */}
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="text-xl font-black text-white uppercase mb-8">Escolha seu plano</h3>
                        <div className="space-y-3">
                            {planos.map(p => (
                                <button 
                                    key={p.id}
                                    onClick={() => handleSelectPlano(p)}
                                    className={`
                                        w-full p-6 rounded-2xl border-2 flex justify-between items-center transition-all group
                                        ${p.destaque ? 'border-blue-600 bg-blue-600/5' : 'border-dark-700 hover:border-white/20'}
                                    `}
                                >
                                    <div className="text-left">
                                        <h4 className="font-black text-white uppercase">{p.nome}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">{p.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-white">R$ {p.valor.toFixed(2)}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Pagamento PIX */}
                {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 text-center">
                        <div>
                            <h3 className="text-xl font-black text-white uppercase mb-2">QUASE L!</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Plano {plano?.nome} - R$ {plano?.valor.toFixed(2)}</p>
                        </div>

                        <div className="bg-white p-4 rounded-3xl w-48 h-48 mx-auto shadow-2xl border-4 border-blue-600">
                             <QrCode size={192} className="text-dark-900" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs text-gray-500 font-bold uppercase">Ou cope a chave PIX (E-mail)</p>
                            <button 
                                onClick={copyPix}
                                className="w-full bg-dark-900 border border-white/5 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold hover:bg-dark-700 transition-all group"
                            >
                                financeiro@meuvolante.com.br <Copy size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="pt-4 space-y-4">
                            <button 
                                onClick={handleConfirmPay}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-blue-600/20 transition-all"
                            >
                                J PAGUEI
                            </button>
                            <p className="text-[10px] text-gray-600 font-bold uppercase italic p-4 bg-dark-900/50 rounded-xl">
                                Aps clicar em "J Paguei", nosso financeiro ir validar o recebimento e liberar seu acesso em at 10 minutos.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 3: Sucesso e Explicao */}
                {step === 3 && (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500 text-center py-10">
                        <div className="bg-green-600/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-xl shadow-green-600/10">
                            <CheckCircle size={64} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase mb-2">PAGAMENTO RECEBIDO!</h3>
                            <p className="text-gray-400 font-medium">Nossa IA Orion e nossa equipe financeira j esto processando sua liberao.</p>
                        </div>
                        <div className="bg-dark-900/50 p-6 rounded-2xl border border-white/5 space-y-3">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Tempo Estimado</p>
                            <p className="text-xl font-black text-white italic">At 10 Minutos</p>
                            <p className="text-[10px] text-gray-600 font-bold uppercase">Voc ver um badge de "Pendente" no seu Dashboard at a liberao final.</p>
                        </div>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="w-full bg-white text-dark-900 font-black py-5 rounded-2xl text-lg hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                        >
                            VOLTAR PARA O DASHBOARD
                        </button>
                    </div>
                )}
            </div>
        </div>
      </main>

      <footer className="py-8 px-6 md:px-12 text-center">
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
            Ambiente Seguro & Protegido pela Orion Security
        </p>
      </footer>
    </div>
  );
};

export default Checkout;
