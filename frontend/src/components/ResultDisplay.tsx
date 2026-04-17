import React from 'react';
import { Save, ShieldCheck } from 'lucide-react';

interface Game {
  numeros: string[];
  score: number;
  categoria: string;
}

interface ResultDisplayProps {
  jogos: Game[];
  cor: string;
  onSave: (game: Game) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ jogos, cor, onSave }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Resultados Gerados</h3>
        <span className="text-xs text-gray-400 bg-dark-700 px-3 py-1 rounded-full border border-dark-600">
          Algoritmo Orion v2.0
        </span>
      </div>

      {jogos.map((jogo, idx) => (
        <div 
          key={idx} 
          className="bg-dark-800 border-l-4 p-6 rounded-r-2xl border-dark-700 relative overflow-hidden group transition-all hover:bg-dark-700/50"
          style={{ borderLeftColor: cor }}
        >
          {/* Background Badge */}
          <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors">
            <ShieldCheck size={120} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Dezenas */}
            <div className="flex flex-wrap gap-2">
              {jogo.numeros.map((num, nIdx) => (
                <div 
                  key={nIdx}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg"
                  style={{ backgroundColor: cor }}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Score e Aes */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-gray-500 text-xs uppercase font-bold">Score Orion</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-white">{jogo.score}</span>
                  <span 
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                    style={{ backgroundColor: `${cor}20`, color: cor }}
                  >
                    {jogo.categoria}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => onSave(jogo)}
                className="bg-dark-600 hover:bg-dark-500 p-3 rounded-xl text-white transition-colors"
                title="Salvar Jogo"
              >
                <Save size={24} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Aviso Legal solicitado pelo Orion */}
      <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
        <p className="text-yellow-500/70 text-xs text-center italic">
          Aviso: Esta  uma ferramenta de auxlio estatstico baseada em probabilidades histricas. 
          O uso desta ferramenta no garante premiao em sorteios oficiais da Caixa Econmica Federal. 
          Jogue com responsabilidade.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
