import React from 'react';
import { Milestone } from '../types';
import { Calendar, Users, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

interface CardProps {
  milestone: Milestone;
  onSelect: () => void;
  isActive: boolean;
}

export const MilestoneCard: React.FC<CardProps> = ({ milestone, onSelect, isActive }) => {
  // Color configuration depending on category
  const getCategoryTheme = (cat: Milestone['categoria']) => {
    switch (cat) {
      case 'Cimientos':
        return {
          bg: 'bg-[#FBF1D6] text-[#E0A100] border-[#FBF1D6]',
          dot: 'bg-[#E0A100]',
          text: 'text-[#E0A100]'
        };
      case 'Gobernanza & Datos':
        return {
          bg: 'bg-ax-primary-soft text-ax-primary border-[#D8DCE0]',
          dot: 'bg-ax-primary',
          text: 'text-ax-primary'
        };
      case 'Dispositivos & IoT':
        return {
          bg: 'bg-ax-primary-soft text-ax-primary border-[#D8DCE0]',
          dot: 'bg-ax-primary',
          text: 'text-ax-primary'
        };
      case 'Analítica & Operaciones':
        return {
          bg: 'bg-ax-primary-soft text-ax-primary border-[#D8DCE0]',
          dot: 'bg-ax-primary',
          text: 'text-ax-primary'
        };
      case 'Digital Twin':
        return {
          bg: 'bg-[#E5F2EB] text-[#2E8B57] border-[#E5F2EB]',
          dot: 'bg-[#2E8B57]',
          text: 'text-[#2E8B57]'
        };
    }
  };

  const getStatusBadge = (status: Milestone['estado']) => {
    switch (status) {
      case 'Completado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2E8B57] bg-[#E5F2EB] border border-[#E5F2EB] px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57]" />
            <span>Listo</span>
          </span>
        );
      case 'En Ejecución':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ax-primary bg-ax-primary-soft border border-ax-border px-2 py-0.5 rounded-full ring-2 ring-ax-primary-soft">
            <span className="w-1.5 h-1.5 bg-ax-primary rounded-full ring-pulse" />
            <span>Fase actual</span>
          </span>
        );
      case 'Pendiente':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ax-fg-3 bg-ax-bg-2 border border-ax-border px-2 py-0.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-ax-fg-3" />
            <span>Proyección</span>
          </span>
        );
    }
  };

  const theme = getCategoryTheme(milestone.categoria);

  return (
    <div
      onClick={onSelect}
      className={`group relative overflow-hidden bg-white rounded-xl border transition-all duration-300 cursor-pointer ${
        isActive
          ? 'border-ax-primary shadow-md ring-2 ring-ax-primary/10 scale-[1.01]'
          : 'border-ax-border shadow-xs hover:shadow-md hover:border-ax-border-strong'
      }`}
    >
      {/* Visual background pattern/accent */}
      <div className={`absolute top-0 left-0 w-1.5 h-full ${theme.dot}`} />

      <div className="p-5 pl-7">
        {/* Header containing metadata tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-ax-fg-3 bg-ax-bg-2 border border-ax-border px-1.5 py-0.5 rounded">
              H-{String(milestone.id).padStart(2, '0')}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${theme.bg}`}>
              {milestone.categoria}
            </span>
          </div>
          {getStatusBadge(milestone.estado)}
        </div>

        {/* Milestone Title */}
        <h4 className="text-base font-bold text-ax-fg-1 group-hover:text-ax-primary transition-colors leading-tight mb-2">
          {milestone.titulo}
        </h4>

        {/* Impact summary brief */}
        <p className="text-xs text-ax-fg-2 line-clamp-2 leading-relaxed mb-4">
          <strong className="text-ax-fg-1 font-semibold">{milestone.impactoTitulo}: </strong>
          {milestone.impactoDetalle}
        </p>

        {/* Footer containing quick parameters */}
        <div className="pt-3 border-t border-ax-bg-2 flex flex-wrap items-center justify-between gap-y-2 text-ax-fg-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-ax-bg-2 px-2 py-1 rounded-lg text-ax-fg-1">
              <Calendar className="w-3.5 h-3.5 text-ax-fg-3" />
              <span className="font-medium text-[11px] truncate max-w-[120px]">
                {milestone.cronologia}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-ax-fg-2">
              <Users className="w-3.5 h-3.5 text-ax-fg-3" />
              <span className="text-[11px] max-w-[100px] truncate">
                {milestone.equipo.split('(')[0].trim()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-ax-primary group-hover:translate-x-1 transition-transform">
            <span className="text-[11px]">Ver actividades</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
