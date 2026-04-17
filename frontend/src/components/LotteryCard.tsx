import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface LotteryCardProps {
  nome: string;
  slug: string;
  cor: string;
  concurso: string;
  data_sorteio: string;
  premio_estimado: string;
  acumulou: boolean;
  icone: string;
}

const LotteryCard: React.FC<LotteryCardProps> = ({
  nome,
  slug,
  cor,
  concurso,
  data_sorteio,
  premio_estimado,
  acumulou,
  icone
}) => {
  const navigate = useNavigate();
  
  // Mapeamento simples de cones baseados em string (pode ser melhorado)
  const IconComponent = (LucideIcons as any)[icone] || LucideIcons.HelpCircle;

  return (
    <div 
      className="card group cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/modalidade/${slug}`)}
    >
      <div className="flex justify-between items-start mb-6">
        <div 
          className="p-3 rounded-xl text-white shadow-lg"
          style={{ backgroundColor: cor }}
        >
          <IconComponent size={24} />
        </div>
        {acumulou && (
          <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
            <Trophy size={12} /> ACUMULOU!
          </span>
        )}
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-1">{nome}</h3>
        <p className="text-gray-400 text-sm mb-4">Concurso {concurso} • {data_sorteio}</p>
        
        <div className="mb-4">
          <p className="text-gray-500 text-xs uppercase font-semibold">Prmio Estimado</p>
          <p className="text-2xl font-black text-white" style={{ color: cor }}>
            {premio_estimado}
          </p>
        </div>
      </div>

      <button 
        className="w-full mt-4 flex items-center justify-between px-4 py-3 rounded-lg bg-dark-700 text-white font-semibold transition-all group-hover:bg-gray-700"
      >
        Acessar <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default LotteryCard;
