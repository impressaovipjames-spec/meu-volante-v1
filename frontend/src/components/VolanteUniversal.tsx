import React, { useState, useMemo, useCallback } from 'react';
import { Save, Trash2, Calendar } from 'lucide-react';

interface VolanteProps {
  modalidade: string;
  range: number;
  limite: number;
  cor: string;
  onSave: (numeros: string[], extra?: any) => void;
}

// Sub-componente memoizado para o boto de nmero para evitar rerenders massivos
const NumeroBotao = React.memo(({ 
  num, 
  isSelected, 
  onClick, 
  cor 
}: { 
  num: number, 
  isSelected: boolean, 
  onClick: (num: number) => void, 
  cor: string 
}) => {
  return (
    <button
      onClick={() => onClick(num)}
      className={`
        w-10 h-10 md:w-12 md:h-12 rounded-lg text-sm md:text-base font-bold transition-all duration-200
        ${isSelected 
          ? 'scale-90 shadow-inner' 
          : 'bg-dark-700 text-gray-400 hover:bg-dark-600 border border-dark-600'}
      `}
      style={{ 
        backgroundColor: isSelected ? cor : undefined,
        color: isSelected ? 'white' : undefined
      }}
    >
      {String(num).padStart(2, '0')}
    </button>
  );
});

// Extenso para Number (zfill local)
const formatNum = (n: number) => n.toString().padStart(2, '0');

const VolanteUniversal: React.FC<VolanteProps> = ({ 
  modalidade, 
  range, 
  limite, 
  cor, 
  onSave 
}) => {
  const [selecionados, setSelecionados] = useState<Set<number>>(new Set());
  const [mesSorte, setMesSorte] = useState<string>("Janeiro");

  const meses = ["Janeiro", "Fevereiro", "Maro", "Abril", "Maio", "Junho", 
                 "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const toggleNumero = useCallback((num: number) => {
    setSelecionados(prev => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else if (next.size < limite) {
        next.add(num);
      }
      return next;
    });
  }, [limite]);

  const handleSave = () => {
    if (selecionados.size !== limite) return;
    const numerosSorted = Array.from(selecionados).sort((a,b) => a-b).map(formatNum);
    const extra = modalidade === 'dia-de-sorte' ? { mes: mesSorte } : undefined;
    onSave(numerosSorted, extra);
  };

  const handleClear = () => setSelecionados(new Set());

  // Gerar array de nmeros para o map
  const numerosArray = useMemo(() => Array.from({ length: range }, (_, i) => i + 1), [range]);

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-3xl p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Marcar Volante</h3>
          <p className="text-sm text-gray-500 font-medium">Selecione <span className="text-white font-bold">{limite}</span> nmeros</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-dark-900 px-4 py-2 rounded-xl border border-dark-700 flex items-center gap-3">
            <span className="text-xs text-gray-500 font-bold uppercase">Selecionados</span>
            <span className={`text-xl font-black ${selecionados.size === limite ? 'text-green-500' : 'text-white'}`}>
              {selecionados.size}/{limite}
            </span>
          </div>
          <button 
            onClick={handleClear}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Grid de Nmeros */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 md:gap-3 mb-10 place-items-center">
        {numerosArray.map(n => (
          <NumeroBotao 
            key={n} 
            num={n} 
            isSelected={selecionados.has(n)} 
            onClick={toggleNumero} 
            cor={cor}
          />
        ))}
      </div>

      {/* Extra: Mes da Sorte */}
      {modalidade === 'dia-de-sorte' && (
        <div className="mb-10 p-6 bg-dark-900 rounded-2xl border border-dark-700">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-4 uppercase tracking-tighter">
            <Calendar size={16} /> Escolher Mês da Sorte
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {meses.map(mes => (
              <button
                key={mes}
                onClick={() => setMesSorte(mes)}
                className={`
                  text-[10px] md:text-xs font-bold py-2 rounded-lg transition-all border
                  ${mesSorte === mes 
                    ? 'border-transparent shadow-lg text-white' 
                    : 'bg-dark-800 border-dark-700 text-gray-500 hover:border-gray-600'}
                `}
                style={{ backgroundColor: mesSorte === mes ? cor : undefined }}
              >
                {mes.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ao de Salvar */}
      <button
        onClick={handleSave}
        disabled={selecionados.size !== limite}
        className={`
          w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl
          ${selecionados.size === limite 
            ? 'hover:scale-[1.02] shadow-blue-600/20 text-white' 
            : 'bg-dark-700 text-gray-600 cursor-not-allowed'}
        `}
        style={{ backgroundColor: selecionados.size === limite ? cor : undefined }}
      >
        <Save size={24} /> SALVAR TICKET
      </button>

      <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-tighter">
        Dica: Clique novamente para remover um nmero selecionado.
      </p>
    </div>
  );
};

export default VolanteUniversal;
