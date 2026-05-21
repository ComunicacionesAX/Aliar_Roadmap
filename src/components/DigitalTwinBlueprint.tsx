import React, { useState } from 'react';
import { Milestone } from '../types';
import { Network, Database, Cpu, TrendingUp, HelpCircle, Activity } from 'lucide-react';

interface BlueprintProps {
  milestones: Milestone[];
  onSelectMilestone: (id: number) => void;
}

export const DigitalTwinBlueprint: React.FC<BlueprintProps> = ({ milestones, onSelectMilestone }) => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  // Group milestones by conceptual architecture layer
  const layers = [
    {
      id: "raw-data",
      title: "1. Datos crudos e infraestructura IoT",
      desc: "Dispositivos de telemetría y sensores en silo (Insylo) y bases de datos iniciales.",
      icon: <Database className="w-5 h-5 text-ax-primary" />,
      colorClass: "border-ax-border bg-white hover:bg-ax-bg-2 text-ax-fg-1",
      pillColor: "bg-ax-primary-soft text-ax-primary",
      milestoneIds: [1, 2, 5, 13]
    },
    {
      id: "ingestion",
      title: "2. Ingestión y DataLake unificado",
      desc: "Fuentes unificadas en el pipeline de datos (SAP, Agriness, Qlik Cloud) con autorización estratégica.",
      icon: <Network className="w-5 h-5 text-ax-primary" />,
      colorClass: "border-ax-border bg-white hover:bg-ax-bg-2 text-ax-fg-1",
      pillColor: "bg-ax-primary-soft text-ax-primary",
      milestoneIds: [3, 4]
    },
    {
      id: "analytics",
      title: "3. Inteligencia y modelación algorítmica",
      desc: "Curvas de crecimiento, detección automatizada de anomalías y optimizador OptiMarket.",
      icon: <Cpu className="w-5 h-5 text-ax-primary" />,
      colorClass: "border-ax-border bg-white hover:bg-ax-bg-2 text-ax-fg-1",
      pillColor: "bg-ax-primary-soft text-ax-primary",
      milestoneIds: [6, 7, 8, 9]
    },
    {
      id: "strategic",
      title: "4. Control estratégico y comités",
      desc: "Alineamiento transversal de directores, sanidad basada en evidencia y comités 'Todos Ponen'.",
      icon: <TrendingUp className="w-5 h-5 text-ax-primary" />,
      colorClass: "border-ax-border bg-white hover:bg-ax-bg-2 text-ax-fg-1",
      pillColor: "bg-ax-primary-soft text-ax-primary",
      milestoneIds: [10, 11, 12]
    },
    {
      id: "twin",
      title: "5. Gemelo digital operativo (Digital Twin)",
      desc: "Simulaciones y control predictivo en plantas, optimizando rentabilidad en agricultura y porcicultura.",
      icon: <Activity className="w-5 h-5 text-ax-primary animate-pulse" />,
      colorClass: "border-ax-border bg-white hover:bg-ax-bg-2 text-ax-fg-1",
      pillColor: "bg-ax-primary-soft text-ax-primary",
      milestoneIds: [14, 15]
    }
  ];

  return (
    <div className="bg-white border border-ax-border rounded-xl p-6 shadow-xs mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-ax-border">
        <div>
          <span className="text-xs font-bold text-ax-primary bg-ax-primary-soft px-2.5 py-1 rounded-full tracking-wider">
            Arquitectura de valor
          </span>
          <h3 className="text-xl font-bold text-ax-fg-1 mt-2">
            Estructura de captura de valor del gemelo digital
          </h3>
          <p className="text-xs text-ax-fg-2 mt-1">
            Visualice cómo los hitos de Aliar convergen desde la base de datos hasta las decisiones predictivas automatizadas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start font-mono text-xs text-ax-fg-3 bg-ax-bg-2 px-3 py-1.5 rounded-lg border border-ax-border">
          <HelpCircle className="w-4 h-4 text-ax-fg-3" />
          <span>Haga clic en un hito para inspeccionarlo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Schematic diagram of connected layers */}
        <div className="lg:col-span-7 flex flex-col gap-3 relative">
          {/* Vertical connecting pipe background */}
          <div className="absolute left-[26px] top-4 bottom-4 w-1 bg-gradient-to-b from-ax-primary-soft via-ax-border to-ax-primary-hover rounded-full z-0 pointer-events-none opacity-60 hidden sm:block" />

          {layers.map((layer) => {
            const isHovered = activeLayer === layer.id;
            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className={`z-10 flex gap-4 p-4 border rounded-xl transition-all duration-300 cursor-pointer ${
                  isHovered ? 'scale-[1.01] shadow-md border-ax-border-strong' : 'shadow-xs border-ax-border'
                } ${layer.colorClass}`}
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center border border-ax-border shadow-xs">
                  {layer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-ax-fg-1">{layer.title}</h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${layer.pillColor}`}>
                      {layer.milestoneIds.length} Hitos
                    </span>
                  </div>
                  <p className="text-xs text-ax-fg-2 mt-1 leading-relaxed">{layer.desc}</p>
                  
                  {/* Inline interactive list of milestone references */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {layer.milestoneIds.map((id) => {
                      const m = milestones.find(mil => mil.id === id);
                      if (!m) return null;
                      return (
                        <button
                          key={id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectMilestone(id);
                          }}
                          className={`text-[10px] font-semibold px-2 py-1 rounded-md border transition-all ${
                            m.estado === 'Completado'
                              ? 'bg-[#E5F2EB] text-[#2E8B57] border-[#E5F2EB] hover:bg-[#E5F2EB]/80'
                              : m.estado === 'En Ejecución'
                              ? 'bg-ax-primary-soft text-ax-primary border-ax-border hover:bg-ax-primary-soft/80 font-bold ring-2 ring-ax-primary/20'
                              : 'bg-ax-bg-2 text-ax-fg-1 border-ax-border hover:bg-ax-bg-3'
                          }`}
                        >
                          Hito {m.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed context panel about the Digital Twin value lever */}
        <div className="lg:col-span-5 bg-ax-bg-2 rounded-xl p-5 border border-ax-border flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-ax-fg-1 tracking-wider mb-3 font-mono">
              Palancas de optimización
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white p-3.5 rounded-xl border border-ax-border shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 bg-ax-primary rounded-full" />
                  <span className="text-xs font-bold text-ax-fg-1">Planta de Secado & Agricultura</span>
                </div>
                <p className="text-xs text-ax-fg-2 leading-relaxed">
                  Optimización de costos térmicos y eléctricos transformando fuentes del DataLake en modelos analíticos que predicen el margen del grano. (Hitos 3, 14, 15)
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ax-border shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 bg-ax-primary rounded-full" />
                  <span className="text-xs font-bold text-ax-fg-1">Silos de Alimento IoT</span>
                </div>
                <p className="text-xs text-ax-fg-2 leading-relaxed">
                  Integración de sensores remotos Insylo (Hito 13) para automatizar el control físico del almacén y contrastar cargas de camiones reales sistemáticamente.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ax-border shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 bg-ax-primary rounded-full" />
                  <span className="text-xs font-bold text-ax-fg-1">Bioseguridad y Sanidad</span>
                </div>
                <p className="text-xs text-ax-fg-2 leading-relaxed">
                  Cruce automatizado de bacteriología clínica con curvas de costos y consumo zootécnico (Hitos 10, 11) para un control médico basado en evidencia dura.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ax-border text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-ax-fg-3 font-medium">
              <span>Metodología por</span>
              <span className="font-bold text-ax-primary bg-ax-primary-soft px-2 py-0.5 rounded-md border border-ax-border">
                Asimetrix • Aliar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
