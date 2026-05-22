import React from 'react';
import { Milestone } from '../types';
import { Layers, Users, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StatsProps {
  milestones: Milestone[];
}

export const RoadmapStats: React.FC<StatsProps> = ({ milestones }) => {
  const total = milestones.length;
  const completed = milestones.filter(m => m.estado === 'Completado').length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Integration teams */}
      <div className="bg-white border border-ax-border rounded-xl p-5 shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-ax-primary/30">
        <div className="p-3 bg-ax-primary-soft text-ax-primary rounded-lg">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-ax-fg-3 tracking-wider leading-none mb-1">
            Alianza técnica
          </h4>
          <p className="text-base font-bold text-ax-fg-1">
            3 organizaciones
          </p>
          <p className="text-[11px] text-ax-fg-2 mt-0.5">
            Aliar S.A. | Asimetrix | Premex Allius
          </p>
        </div>
      </div>

      {/* Percentage gauge card */}
      <div className="bg-white border border-ax-border rounded-xl p-5 shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-[#2E8B57]/30">
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          {/* Circular progress SVG */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              className="stroke-ax-bg-3"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              className="stroke-[#2E8B57] transition-all duration-500"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - percentage / 100)}
            />
          </svg>
          <div className="absolute font-mono text-sm font-bold text-ax-fg-1">
            {percentage}%
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-ax-fg-3 tracking-wider leading-none mb-1">
            Progreso
          </h4>
          <p className="text-base font-bold text-ax-fg-1">
            {completed}/{total} hitos listos
          </p>
          <span className="text-xs text-[#2E8B57] bg-[#E5F2EB] px-1.5 py-0.5 rounded-md font-medium mt-1 inline-block">
            Maturidad alta
          </span>
        </div>
      </div>

      {/* Discovery actual card */}
      <div className="bg-white border border-ax-border rounded-xl p-5 shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-ax-primary/30">
        <div className="p-3 bg-ax-primary-soft text-ax-primary rounded-lg">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-ax-fg-3 tracking-wider leading-none mb-1">
            Fase actual
          </h4>
          <p className="text-sm font-bold text-ax-fg-1 leading-tight">
            Hito 14: Discovery
          </p>
          <p className="text-xs text-ax-fg-2 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 bg-ax-primary rounded-full inline-block ring-pulse" />
            Mayo 2026
          </p>
        </div>
      </div>

      {/* Data sources integrated */}
      <div className="bg-white border border-ax-border rounded-xl p-5 shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-ax-primary/30">
        <div className="p-3 bg-ax-primary-soft text-ax-primary rounded-lg">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-ax-fg-3 tracking-wider leading-none mb-1">
            DataLake
          </h4>
          <p className="text-base font-bold text-ax-fg-1">
            +12 Fuentes
          </p>
          <p className="text-[11px] text-ax-primary font-medium mt-0.5">
            Agriness, SAP & Sensores
          </p>
        </div>
      </div>
    </div>
  );
};
