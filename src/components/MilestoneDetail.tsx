import React, { useState, useEffect } from 'react';
import { Milestone } from '../types';
import { Calendar, Users, Zap, CheckCircle2, Award, ClipboardList, Info, HelpCircle, AlertCircle, RefreshCw, Sliders } from 'lucide-react';

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

  // INTERACTIVE EXPERIMENTAL WIDGET STATES
  // Silo IoT states
  const [silos, setSilos] = useState([
    { id: 1, name: 'Silo A (Maíz)', fill: 82, temp: 19.4, rssi: -65 },
    { id: 2, name: 'Silo B (Soya)', fill: 45, temp: 21.0, rssi: -72 },
    { id: 3, name: 'Silo C (Sorgo)', fill: 12, temp: 22.8, rssi: -88 },
    { id: 4, name: 'Silo D (Maíz Molido)', fill: 94, temp: 18.1, rssi: -58 }
  ]);

  // Digital Twin Simulator states
  const [driedPlantTemp, setDriedPlantTemp] = useState(72); // Temperature of drying plant C°
  const [humidityIn, setHumidityIn] = useState(18.5); // Grain humidity input %
  const [driedPlantMoisture, setDriedPlantMoisture] = useState(13.2); // Current output moisture
  const [simulateSpeed, setSimulateSpeed] = useState(24); // t/h input speed

  // Calculated formulas for twin simulation
  const targetMoisture = 13.0; // target moisture %
  const errorRate = Math.abs(driedPlantMoisture - targetMoisture);
  const calculatedSavings = Math.max(0, Math.round(((85 - driedPlantTemp) * 0.12 + (humidityIn - driedPlantMoisture) * 5.4 - errorRate * 25) * simulateSpeed));
  const efficiencyScore = Math.max(50, Math.min(100, Math.round(100 - (errorRate * 90) - (Math.abs(driedPlantTemp - 75) * 0.6))));

  useEffect(() => {
    // Dynamic adjustment helper
    const calculatedMoisture = Math.max(11.0, Math.min(17.0, Number((humidityIn - (driedPlantTemp * 0.08) - (20 / simulateSpeed)).toFixed(1))));
    setDriedPlantMoisture(calculatedMoisture);
  }, [driedPlantTemp, humidityIn, simulateSpeed]);

  // Optical Market optimization states
  const [weightTarget, setWeightTarget] = useState(115); // target weight kg
  const [feedCostFactor, setFeedCostFactor] = useState(1.2); 
  const [pigPriceFactor, setPigPriceFactor] = useState(2.8);

  const optimalDays = Math.round((weightTarget - 80) / 0.82);
  const marginsPerPig = Number((weightTarget * pigPriceFactor - optimalDays * feedCostFactor * 2.1).toFixed(2));

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
              Hito {milestone.id} de 15
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
              Evaluación de impacto: {milestone.impactoTitulo}
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
            <p className="text-[10px] text-ax-dark-fg-3 mt-1 truncate">
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
            <p className="text-[10px] text-ax-dark-fg-3 mt-1 truncate">
              Equipo: {milestone.equipo.split('(')[0]}
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

      {/* SPECIAL INTERACTIVE SIMULATORS */}
      <div className="mt-6 pt-5 border-t border-ax-dark-border bg-ax-dark-bg-2 -mx-6 -mb-6 p-6 rounded-b-xl">
        {/* Sim 1: Silos IoT (Hito 13) */}
        {milestone.id === 13 && (
          <div>
            <div className="flex items-center justify-between mb-3 text-white">
              <h4 className="text-xs font-mono font-bold text-ax-primary-soft tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Telemetría IoT en silos (piloto Insylo)
              </h4>
              <button 
                onClick={() => {
                  setSilos(prev => prev.map(s => ({
                    ...s,
                    fill: Math.max(5, Math.min(100, Math.round(s.fill + (Math.random() * 10 - 5)))),
                    temp: Number((s.temp + (Math.random() * 1 - 0.5)).toFixed(1))
                  })));
                }}
                className="text-[10px] font-mono text-ax-primary bg-ax-primary-soft hover:bg-ax-primary/10 border border-ax-primary px-2 py-1 rounded flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 animate-spin" /> Actualizar datos
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {silos.map(s => (
                <div key={s.id} className="bg-ax-dark-bg-1 border border-ax-dark-border p-2.5 rounded-xl">
                  <div className="flex justify-between items-center text-[10px] text-ax-dark-fg-3 font-semibold mb-1 truncate">
                    <span>{s.name}</span>
                  </div>
                  
                  {/* Barrel visualization */}
                  <div className="relative h-16 w-full bg-ax-dark-bg-2 border border-ax-dark-border rounded-lg overflow-hidden flex flex-col justify-end">
                    <div 
                      className={`w-full transition-all duration-700 ease-out ${
                        s.fill > 60 ? 'bg-ax-primary/70' : s.fill > 20 ? 'bg-[#2E8B57]/70' : 'bg-[#C62828]/70'
                      }`}
                      style={{ height: `${s.fill}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-black text-white drop-shadow-sm">
                      {s.fill}%
                    </div>
                  </div>

                  <div className="flex justify-between font-mono text-[9px] text-[#8C92AD] mt-2">
                    <span>Temp: {s.temp}°C</span>
                    <span className={s.rssi < -75 ? 'text-[#E0A100]' : 'text-[#2E8B57]'}>
                      RSSI: {s.rssi}dB
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-ax-dark-fg-3 mt-2 text-center italic">
              * Piloto en Machijure 15 transmitiendo mediante antenas de alta recepción.
            </p>
          </div>
        )}

        {/* Sim 2: Digital Twin planta secado (Hito 14 & 15) */}
        {(milestone.id === 15 || milestone.id === 14) && (
          <div>
            <div className="mb-3">
              <h4 className="text-xs font-mono font-bold text-ax-primary-soft tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 animate-pulse" /> Simulador de eficiencia: planta de secado Aliar
              </h4>
              <p className="text-[11px] text-[#C7CCE0] mt-0.5">
                Ajuste variables críticas de operación para estimar el impacto predictivo de rentabilidad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-ax-dark-bg-1 border border-ax-dark-border p-3.5 rounded-xl">
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] text-ax-dark-fg-3 font-semibold mb-1">
                    <span>Temperatura Caldera (70-95°C)</span>
                    <span className="text-[#2E8B57] font-mono">{driedPlantTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="95"
                    value={driedPlantTemp}
                    onChange={(e) => setDriedPlantTemp(Number(e.target.value))}
                    className="w-full accent-ax-primary h-1.5 bg-ax-dark-bg-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-ax-dark-fg-3 font-semibold mb-1">
                    <span>Humedad Entrada Grano</span>
                    <span className="text-ax-primary-soft font-mono">{humidityIn}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="22"
                    step="0.5"
                    value={humidityIn}
                    onChange={(e) => setHumidityIn(Number(e.target.value))}
                    className="w-full accent-ax-primary h-1.5 bg-ax-dark-bg-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center border-y md:border-y-0 md:border-x border-ax-dark-border py-3 md:py-0 px-4">
                <span className="text-[10px] font-mono text-ax-dark-fg-3 tracking-wider mb-1">
                  Humedad de salida (opt: 13.0%)
                </span>
                <span className={`text-2xl font-black font-mono tracking-tight ${
                  errorRate < 0.3 ? 'text-[#2E8B57]' : errorRate < 1.0 ? 'text-[#E0A100]' : 'text-[#C62828]'
                }`}>
                  {driedPlantMoisture}%
                </span>
                <span className="text-[10px] text-[#8C92AD] font-medium">
                  Desviación: {errorRate.toFixed(1)}%
                </span>
              </div>

              <div className="flex flex-col justify-between p-2 rounded-lg bg-ax-dark-bg-3 border border-ax-dark-border">
                <div className="flex justify-between text-[10px] font-mono text-ax-dark-fg-3">
                  <span>Ahorro predictivo</span>
                  <span>Eficiencia</span>
                </div>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-xl font-bold font-mono text-[#2E8B57]">
                    +${calculatedSavings.toLocaleString()} COP/h
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {efficiencyScore}%
                  </span>
                </div>
                <p className="text-[9px] text-[#8C92AD] leading-tight mt-2 italic border-t border-ax-dark-border pt-1.5">
                  El Gemelo Digital previene la sobredesecación o el recalentamiento térmico del grano.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sim 3: Algoritmo Detección Anomalías (Hito 8) */}
        {milestone.id === 8 && (
          <div>
            <h4 className="text-xs font-mono font-bold text-[#E0A100] tracking-wider flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" /> Estado del monitor: algoritmo de anomalías Aliar
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-ax-dark-bg-1 border border-ax-dark-border p-3.5 rounded-xl text-xs">
              <div className="space-y-1.5 leading-relaxed text-[#C7CCE0]">
                <p>
                  <strong>Frecuencia:</strong> Computado automáticamente cada 24 horas.
                </p>
                <div className="p-2.5 bg-ax-dark-bg-3 border border-ax-dark-border rounded-lg text-[11px] text-[#C7CCE0]">
                  <span className="font-bold text-[#E0A100]">Último disparo de alerta:</span> San Barlovento, Sitio 3, Núcleo 2. Decrecimiento de ganancia diaria del 14.2% detectado en 7 días móviles.
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-3 rounded-lg bg-ax-dark-bg-3 text-center">
                <span className="text-[10px] font-mono tracking-wider text-[#8C92AD]">
                  Estado del motor de inferencia
                </span>
                <span className="text-[#2E8B57] font-bold mt-1 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#2E8B57] rounded-full inline-block ring-pulse" />
                  Activo y analizando 100% núcleos
                </span>
                <p className="text-[9px] text-ax-dark-fg-3 mt-2">
                  Integrado directamente con pesaje automatizado PigVision.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sim 4: OptiMarket Weights (Hito 9) */}
        {milestone.id === 9 && (
          <div>
            <h4 className="text-xs font-mono font-bold text-ax-primary-soft tracking-wider flex items-center gap-1.5 mb-2">
              <Sliders className="w-4 h-4 shrink-0" /> Simulador de cálculo OptiMarket (margen por lote)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-ax-dark-bg-1 border border-ax-dark-border p-3.5 rounded-xl text-xs">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] text-[#8C92AD] font-semibold mb-1">
                    <span>Peso de Salida Meta: {weightTarget} kg</span>
                  </div>
                  <input
                    type="range"
                    min="105"
                    max="125"
                    value={weightTarget}
                    onChange={(e) => setWeightTarget(Number(e.target.value))}
                    className="w-full accent-ax-primary h-1 bg-ax-dark-bg-2 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div className="flex justify-between gap-2">
                  <div className="w-1/2">
                    <span className="text-[10px] text-[#8C92AD] block mb-1">Costo Alimento</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0.5" 
                      max="3.0"
                      value={feedCostFactor} 
                      onChange={(e) => setFeedCostFactor(Number(e.target.value))}
                      className="w-full text-white bg-ax-dark-bg-2 border border-ax-dark-border rounded px-1.5 py-0.5 text-xs font-mono font-bold" 
                    />
                  </div>
                  <div className="w-1/2">
                    <span className="text-[10px] text-[#8C92AD] block mb-1">Precio Porcino / Kg</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="1.5" 
                      max="5.0"
                      value={pigPriceFactor} 
                      onChange={(e) => setPigPriceFactor(Number(e.target.value))}
                      className="w-full text-white bg-ax-dark-bg-2 border border-ax-dark-border rounded px-1.5 py-0.5 text-xs font-mono font-bold" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center py-2 border-y md:border-y-0 md:border-x border-ax-dark-border">
                <span className="text-[10px] font-mono text-[#8C92AD] mb-1">Días de permanencia promedio</span>
                <span className="text-xl font-bold font-mono text-ax-primary-soft">{optimalDays} días</span>
                <p className="text-[9px] text-[#8C92AD] mt-1 italic">Desde peso base (80kg)</p>
              </div>

              <div className="flex flex-col justify-center p-3 rounded-lg bg-ax-dark-bg-3 border border-ax-dark-border">
                <span className="text-[10.5px] font-mono text-[#8C92AD]">Margen estimado por lote</span>
                <div className="text-xl font-mono font-black text-[#2E8B57] mt-1">
                  ${marginsPerPig} COP/Cerd.
                </div>
                <p className="text-[9px] text-ax-dark-fg-3 leading-tight mt-1">
                  Calculado considerando restricciones del portal web Asimetrix.
                </p>
              </div>
            </div>

            {/* Custom high-fidelity quote requirement implementation */}
            <div className="mt-4 p-3 bg-ax-primary-soft text-ax-primary rounded-lg border border-ax-primary/20 text-xs italic leading-relaxed text-center font-medium">
              "Conoce el peso de tus lotes de cerdos en engorde con nuestras cámaras de medición precisa en tiempo real."
            </div>
          </div>
        )}

        {/* Sim 5: General Roadmap overview placeholder (For other milestones) */}
        {! [8, 9, 13, 14, 15].includes(milestone.id) && (
          <div className="flex items-center gap-3 text-ax-dark-fg-2 leading-relaxed text-xs">
            <Info className="w-5 h-5 text-ax-primary-soft shrink-0" />
            <p className="text-ax-dark-fg-2">
              Usted está visualizando el <strong className="text-white">Hito {milestone.id}</strong> que forma parte del cimiento funcional liderado por el equipo de <span className="text-white underline decoration-ax-primary/45">{milestone.equipo.split('(')[0].trim()}</span>. El despliegue de esta iniciativa ya es operativo para el beneficio de Aliar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
