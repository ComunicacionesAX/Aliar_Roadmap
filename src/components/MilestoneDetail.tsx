import React, { useState, useEffect } from 'react';
import { Milestone } from '../types';
import { MILESTONES } from '../data';
import { Award, ClipboardList, Info } from 'lucide-react';

interface DetailProps {
  milestone: Milestone;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const MilestoneDetail: React.FC<DetailProps> = ({
  milestone,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) => {
  // Activity checkbox status map (persisted in component state or local state based on milestone ID)
  const [checkedActivities, setCheckedActivities] = useState<Record<string, boolean>>({});

  // Reset or load initial checkboxes when milestone changes
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    milestone.actividadesClave.forEach((act, idx) => {
      // By default represent everything as checked for 'Completado' and unchecked or partially checked for 'En Ejecución/Pendiente'
      const key = `${milestone.id}-${idx}`;
      initial[key] = milestone.estado === 'Completado';
    });
    setCheckedActivities(initial);
  }, [milestone]);

  const toggleActivity = (idx: number) => {
    const key = `${milestone.id}-${idx}`;
    setCheckedActivities(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getEffortBg = (level: Milestone['esfuerzoNivel']) => {
    switch (level) {
      case 'Bajo': return 'bg-[#2E8B57]';
      case 'Medio': return 'bg-[#E0A100]';
      case 'Alto': return 'bg-[#C62828]';
      case 'Intensivo': return 'bg-[#C62828]';
      case 'Automatizado': return 'bg-ax-primary';
      case 'Continuo': return 'bg-ax-primary';
      default: return 'bg-slate-500';
    }
  };

  const completedActivitiesCount = milestone.actividadesClave.filter((_, idx) => 
    checkedActivities[`${milestone.id}-${idx}`]
  ).length;

  const totalActivitiesCount = milestone.actividadesClave.length;
  const progressPercent = totalActivitiesCount > 0 
    ? Math.round((completedActivitiesCount / totalActivitiesCount) * 100) 
    : 100;

  return (
    <div className="bg-ax-dark-bg-1 text-[#C7CCE0] rounded-xl p-6 shadow-xl border border-ax-dark-border flex flex-col h-full justify-between">
      <div>
        {/* Navigation & Title */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-ax-dark-border">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white font-semibold">
              Detalle técnico
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                hasPrev 
                  ? 'border-ax-dark-border hover:bg-ax-dark-bg-2 text-ax-dark-fg-1 cursor-pointer' 
                  : 'border-ax-dark-border text-ax-dark-fg-3 cursor-not-allowed'
              }`}
            >
              Anterior
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                hasNext 
                  ? 'border-ax-dark-border hover:bg-ax-dark-bg-2 text-ax-dark-fg-1 cursor-pointer' 
                  : 'border-ax-dark-border text-ax-dark-fg-3 cursor-not-allowed'
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Milestone full Title */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-ax-primary-soft text-sm font-bold">
              Hito {milestone.id} de {MILESTONES.length}
            </span>
            <span className="text-xs text-ax-dark-fg-3">•</span>
            <span className="text-xs text-ax-dark-fg-2 font-medium">{milestone.cronologia}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
            {milestone.titulo}
          </h2>
        </div>

        {/* Highlight Impact Card */}
        <div className="mt-5 bg-ax-dark-bg-2 border border-ax-dark-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-ax-primary-soft">
            <Award className="w-5 h-5 shrink-0" />
            <h4 className="text-xs font-mono font-semibold tracking-wider">
              Impacto: {milestone.impactoTitulo}
            </h4>
          </div>
          <p className="text-xs md:text-sm text-ax-dark-fg-2 leading-relaxed">
            {milestone.impactoDetalle}
          </p>
        </div>

        {/* Metadata Details (Effort, Timeline, Team) */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="bg-ax-dark-bg-2 p-3.5 rounded-xl border border-ax-dark-border/40">
            <span className="text-[10px] font-mono tracking-wider text-[#8C92AD] block mb-1">
              Nivel de esfuerzo
            </span>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${getEffortBg(milestone.esfuerzoNivel)}`} />
              <span className="text-xs font-bold text-[#FFFFFF]">
                {milestone.esfuerzoNivel}
              </span>
            </div>
            <p className="text-[11px] text-ax-dark-fg-2 mt-1 leading-relaxed">
              {milestone.esfuerzo}
            </p>
          </div>

          <div className="bg-ax-dark-bg-2 p-3.5 rounded-xl border border-ax-dark-border/40">
            <span className="text-[10px] font-mono tracking-wider text-[#8C92AD] block mb-1">
              Fase logística
            </span>
            <span className="text-xs font-bold text-[#FFFFFF] block">
              {milestone.fase}
            </span>
            <p className="text-[11px] text-ax-dark-fg-2 mt-1 leading-relaxed">
              <strong>Equipo:</strong> {milestone.equipo}
            </p>
          </div>
        </div>

        {/* Key Activities with state interactions */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-ax-dark-fg-2">
              <ClipboardList className="w-4 h-4 text-ax-primary-soft" />
              <h3 className="text-xs font-mono font-bold tracking-wider">
                Actividades clave y auditoría ({completedActivitiesCount}/{totalActivitiesCount})
              </h3>
            </div>
            <span className="text-xs font-mono text-ax-primary-soft bg-ax-dark-border/40 px-2 py-0.5 rounded border border-[#2A3270]/30">
              {progressPercent}% Completado
            </span>
          </div>

          {/* Activity Progress bar container */}
          <div className="w-full h-1.5 bg-ax-dark-bg-2 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-[#2E8B57] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="space-y-2 bg-ax-dark-bg-2 p-2.5 rounded-xl border border-ax-dark-border/60 max-h-52 overflow-y-auto">
            {milestone.actividadesClave.map((activity, idx) => {
              const isChecked = !!checkedActivities[`${milestone.id}-${idx}`];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleActivity(idx)}
                  className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                    isChecked 
                      ? 'bg-ax-dark-border/10 text-ax-dark-fg-3' 
                      : 'text-ax-dark-fg-2 hover:bg-ax-dark-bg-3'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // Handled by parent div click
                    className="mt-0.5 accent-ax-primary h-3.5 w-3.5 shrink-0 rounded border-slate-400 cursor-pointer"
                  />
                  <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-ax-dark-fg-3/50' : ''}`}>
                    {activity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ROADMAP OVERVIEW */}
      <div className="mt-6 pt-5 border-t border-ax-dark-border bg-ax-dark-bg-2 -mx-6 -mb-6 p-6 rounded-b-xl">
        <div className="flex items-center gap-3 text-ax-dark-fg-2 leading-relaxed text-xs">
          <Info className="w-5 h-5 text-ax-primary-soft shrink-0" />
          <p className="text-ax-dark-fg-2">
            Usted está visualizando el <strong className="text-white">Hito {milestone.id}</strong> que forma parte de la alineación e infraestructura liderada por el equipo de <span className="text-white underline decoration-ax-primary/45">{milestone.equipo.split('(')[0].trim()}</span>. El despliegue de esta iniciativa ya es operativo o proyectado para el beneficio de Aliar S.A.
          </p>
        </div>
      </div>
    </div>
  );
};
