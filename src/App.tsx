import { useState, useMemo, useEffect, useRef } from 'react';
import { MILESTONES } from './data';
import { Milestone, TimelineLayout } from './types';
import { RoadmapStats } from './components/RoadmapStats';
import { DigitalTwinBlueprint } from './components/DigitalTwinBlueprint';
import { MilestoneCard } from './components/MilestoneCard';
import { MilestoneDetail } from './components/MilestoneDetail';
import { 
  Compass, 
  Layers, 
  ListOrdered, 
  Search, 
  SlidersHorizontal, 
  Maximize2, 
  HelpCircle, 
  ChevronRight, 
  Download,
  Flame,
  Binary,
  Cpu
} from 'lucide-react';

export default function App() {
  // State managers
  const [selectedId, setSelectedId] = useState<number>(14); // Hito 14 selected by default (Fase Actual)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Reverse chronological by default for immediate value relevance (15 to 1)
  const [activeLayout, setActiveLayout] = useState<TimelineLayout>('sinuous');
  
  // Scans for mobile layout to handle auto scrolling to inspector
  const detailRef = useRef<HTMLDivElement>(null);

  // Retrieve current active milestone object
  const activeMilestone = useMemo(() => {
    return MILESTONES.find(m => m.id === selectedId) || MILESTONES[0];
  }, [selectedId]);

  // Handle navigation buttons in detail view
  const hasPrev = selectedId > 1;
  const hasNext = selectedId < MILESTONES.length;

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedId(prev => prev - 1);
      scrollToInspectorMobile();
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setSelectedId(prev => prev + 1);
      scrollToInspectorMobile();
    }
  };

  const handleSelectMilestone = (id: number) => {
    setSelectedId(id);
    scrollToInspectorMobile();
  };

  const scrollToInspectorMobile = () => {
    if (window.innerWidth < 1024) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Categories list
  const categories = ['Todos', 'Personalización de plataforma', 'Dispositivos & IoT', 'Digital Twin', 'Analítica & Operaciones'];
  
  // Status list
  const statuses = ['Todos', 'Completado', 'En Ejecución', 'Pendiente'];

  // Filtered and sorted milestones list
  const filteredMilestones = useMemo(() => {
    let result = [...MILESTONES];

    // Search query query mapping
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.titulo.toLowerCase().includes(q) ||
        m.impactoTitulo.toLowerCase().includes(q) ||
        m.impactoDetalle.toLowerCase().includes(q) ||
        m.cronologia.toLowerCase().includes(q) ||
        m.equipo.toLowerCase().includes(q) ||
        m.actividadesClave.some(act => act.toLowerCase().includes(q))
      );
    }

    // Category filter mapping
    if (selectedCategory !== 'Todos') {
      result = result.filter(m => m.categoria === selectedCategory);
    }

    // Status filter mapping
    if (selectedStatus !== 'Todos') {
      result = result.filter(m => m.estado === selectedStatus);
    }

    // Sort order definition
    result.sort((a, b) => {
      if (sortOrder === 'asc') return a.id - b.id;
      return b.id - a.id;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedStatus, sortOrder]);

  // Export metadata checklist as JSON/Text representation
  const handleExportRoadmap = () => {
    const rawText = MILESTONES.map(m => `Hito ${m.id}: ${m.titulo}\nFase: ${m.fase}\nImpacto: [${m.impactoTitulo}] ${m.impactoDetalle}\nCronología: ${m.cronologia}\nEquipo: ${m.equipo}\nEsfuerzo: ${m.esfuerzo}\nActividades:\n${m.actividadesClave.map((a,i) => ` - [ ] ${a}`).join('\n')}\n\n`).join('---\n\n');
    const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Roadmap_Aliar_Digital_Twin.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="applet-root" className="min-h-screen bg-ax-bg-2 text-ax-fg-1 font-sans selection:bg-ax-primary selection:text-white antialiased">
      {/* Top Professional Navigation Header */}
      <header id="applet-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-ax-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-ax-primary bg-ax-primary-soft border border-ax-primary/20 px-2 py-0.5 rounded">
                  Aliar S.A.
                </span>
                <span className="text-[10px] font-bold text-[#004F77] bg-[#E6F2F7] border border-[#006394]/20 px-2 py-0.5 rounded">
                  Asimetrix
                </span>
                <span className="text-[10px] font-bold text-[#4B1E78] bg-[#F2ECF7] border border-[#4B1E78]/20 px-2 py-0.5 rounded">
                  Premex Allius
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-ax-fg-1 tracking-tight mt-0.5">
                Roadmap de transformación
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportRoadmap}
              className="text-xs font-bold text-ax-fg-1 bg-white hover:bg-ax-bg-2 border border-ax-border px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Descargar ficha descriptiva completa del proyecto"
            >
              <Download className="w-4 h-4 text-ax-fg-2" />
              <span className="hidden sm:inline">Exportar ficha completa</span>
              <span className="sm:hidden">Exportar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main id="applet-main" className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        
        {/* Banner with contextual goal values */}
        <div className="mb-6 bg-ax-dark-bg-1 p-6 md:p-8 rounded-xl text-white relative overflow-hidden shadow-sm border border-ax-dark-border">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#006394]/20 to-transparent pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#006394]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-3xl z-15">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ax-primary-soft bg-[#E6F2F7]/10 border border-[#006394]/20 px-3 py-1 rounded-full tracking-wider mb-4 font-mono">
              Proyección mayo 2026
            </span>
            
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Alineación de infraestructura y capacidades predictivas
            </h2>
            <p className="text-xs md:text-sm text-[#C7CCE0] mt-2.5 leading-relaxed">
              El Gemelo Digital (Digital Twin) de Aliar consolidará {MILESTONES.length} hitos de ingeniería de datos, optimización automatizada de gránulos de plantas de secado, dispositivos IoT de silaje de alimentos e inteligencia productiva (Porcicultura & Agro) para garantizar una toma de decisiones predictiva que maximice el margen operativo del negocio.
            </p>
          </div>
        </div>

        {/* Dashboard Status numbers component */}
        <RoadmapStats milestones={MILESTONES} />

        {/* Interactive layout filter block */}
        <div className="bg-white border border-ax-border rounded-xl p-5 mb-8 shadow-xs">
          <div className="flex flex-col gap-4">
            {/* Top row filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search Element */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ax-fg-3" />
                <input
                  type="text"
                  placeholder="Buscar hitos, responsables, tecnologías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-2.5 bg-ax-bg-2 hover:bg-ax-bg-3/50 focus:bg-white rounded-xl border border-ax-border outline-hidden transition-all focus:border-ax-primary focus:ring-1 focus:ring-ax-primary/20 text-ax-fg-1"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ax-fg-3 hover:text-ax-fg-1 bg-ax-bg-3 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Advanced controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Horizontal / Vertical layout choice */}
                <div className="bg-ax-bg-2 p-1 rounded-xl border border-ax-border flex items-center">
                  <button
                    onClick={() => setActiveLayout('sinuous')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeLayout === 'sinuous'
                        ? 'bg-white text-ax-fg-1 shadow-xs'
                        : 'text-ax-fg-3 hover:text-ax-fg-2'
                    }`}
                  >
                    Mapa infográfico
                  </button>
                  <button
                    onClick={() => setActiveLayout('vertical')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeLayout === 'vertical'
                        ? 'bg-white text-ax-fg-1 shadow-xs'
                        : 'text-ax-fg-3 hover:text-ax-fg-2'
                    }`}
                  >
                    Flujo continuo
                  </button>
                  <button
                    onClick={() => setActiveLayout('grid')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeLayout === 'grid'
                        ? 'bg-white text-ax-fg-1 shadow-xs'
                        : 'text-ax-fg-3 hover:text-ax-fg-2'
                    }`}
                  >
                    Bento grupos
                  </button>
                </div>

                {/* Sort Order Toggler */}
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="text-xs font-semibold text-ax-fg-1 bg-white hover:bg-ax-bg-2 border border-ax-border px-3.5 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  title={sortOrder === 'asc' ? 'Ver el más reciente primero' : 'Ver el más antiguo primero'}
                >
                  <ListOrdered className="w-4 h-4 text-ax-fg-3" />
                  <span>Orden: {sortOrder === 'asc' ? `Id (1-${MILESTONES.length})` : `Id (${MILESTONES.length}-1)`}</span>
                </button>
              </div>
            </div>

            {/* Bottom row: Category Filter Pills */}
            <div className="pt-3 border-t border-ax-border">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-ax-fg-3 mr-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Categoría:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-ax-primary text-white border-ax-primary shadow-xs'
                        : 'bg-white text-ax-fg-2 border-ax-border hover:bg-ax-bg-2 hover:border-ax-border-strong'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* State toggle filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-ax-fg-3 mr-2">Estado técnico:</span>
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`text-xs px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-ax-fg-1 text-white border-ax-fg-1 font-bold'
                      : 'bg-ax-bg-2 text-ax-fg-2 border-ax-border hover:bg-ax-bg-3'
                  }`}
                >
                  {st === 'Todos' ? 'Todos' : st === 'Completado' ? 'Listo (Completados)' : st === 'En Ejecución' ? 'Fase actual' : 'Proyección (Pendiente)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic split view layout: Left (List/Timeline) and Right (Active inspector drawer) */}
        <div id="timeline-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main timeline listing */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* If zero search results found */}
            {filteredMilestones.length === 0 && (
              <div className="bg-white border border-ax-border rounded-xl p-12 text-center text-ax-fg-2 flex flex-col items-center justify-center">
                <div className="p-4 bg-ax-bg-2 rounded-full text-ax-fg-3 mb-3 block">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-ax-fg-1">No se encontraron hitos</h4>
                <p className="text-sm text-ax-fg-3 mt-1 max-w-md mx-auto">
                  Por favor intente ajustando los filtros de búsqueda o categoría. Use términos más simples como 'IoT', 'Twin' o 'DataLake'.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Todos');
                    setSelectedStatus('Todos');
                  }}
                  className="mt-4 text-xs font-bold text-ax-primary bg-ax-primary-soft hover:bg-ax-primary/10 border border-ax-primary/20 px-4 py-2 rounded-xl cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            )}

            {/* LAYOUT 1: Sinuous alternating path */}
            {activeLayout === 'sinuous' && filteredMilestones.length > 0 && (
              <div className="relative flex flex-col gap-6">
                
                {/* Horizontal indicator connectors */}
                <div className="absolute left-6 top-8 bottom-8 w-1 bg-ax-border rounded-full z-0 pointer-events-none hidden md:block" />

                {filteredMilestones.map((milestone, idx) => {
                  const isLeft = idx % 2 === 0;

                  return (
                    <div 
                      key={milestone.id} 
                      className={`relative z-10 flex flex-col md:flex-row items-stretch ${
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Timeline Central Ball connector on desktop */}
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1.5 w-4 h-4 bg-white border-2 border-ax-primary rounded-full z-20 pointer-events-none shadow-xs hidden md:block group-hover:scale-125 transition-transform" />

                      {/* Content Card Wrapper */}
                      <div className="w-full md:w-[94%] ml-0 md:ml-6">
                        <MilestoneCard
                          milestone={milestone}
                          onSelect={() => handleSelectMilestone(milestone.id)}
                          isActive={selectedId === milestone.id}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LAYOUT 2: Vertical stream (Simplified narrative sequence) */}
            {activeLayout === 'vertical' && filteredMilestones.length > 0 && (
              <div className="bg-white border border-ax-border rounded-xl p-6 shadow-xs flex flex-col gap-8 relative">
                <div className="absolute left-10 top-8 bottom-8 w-1 bg-ax-border/40 z-0 pointer-events-none" />

                {filteredMilestones.map((milestone) => {
                  const isActive = selectedId === milestone.id;
                  
                  return (
                    <div 
                      key={milestone.id}
                      onClick={() => handleSelectMilestone(milestone.id)}
                      className="relative z-10 flex gap-4 group cursor-pointer"
                    >
                      {/* Interactive dot */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isActive 
                            ? 'bg-ax-primary text-white ring-4 ring-ax-primary-soft shadow-md' 
                            : 'bg-ax-bg-2 text-ax-fg-3 group-hover:bg-ax-bg-3 border border-ax-border'
                        }`}>
                          <span className="font-mono text-[10px] font-bold">
                            {milestone.id}
                          </span>
                        </div>
                        {milestone.estado === 'En Ejecución' && (
                          <span className="h-6 w-1 bg-[#E0A100] rounded-full mt-1.5 ring-pulse" />
                        )}
                      </div>

                      {/* Summary details */}
                      <div className={`flex-1 p-4 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-ax-bg-2 border-ax-primary/50 shadow-xs'
                          : 'border-ax-border hover:bg-ax-bg-2/40'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="text-[11px] font-mono text-ax-fg-3 font-bold">
                            Hito {milestone.id} • {milestone.cronologia}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            milestone.estado === 'Completado' 
                              ? 'bg-[#EAF5EC] text-[#2E8B57]' 
                              : milestone.estado === 'En Ejecución'
                              ? 'bg-[#FFF6E5] text-[#E0A100]'
                              : 'bg-ax-bg-2 text-ax-fg-3'
                          }`}>
                            {milestone.estado}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-ax-fg-1 mt-1 leading-tight group-hover:text-ax-primary">
                          {milestone.titulo}
                        </h4>
                        <p className="text-[11.5px] text-ax-fg-2 mt-1 line-clamp-1">
                          {milestone.impactoTitulo}: {milestone.impactoDetalle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LAYOUT 3: Bento Grid grouped */}
            {activeLayout === 'grid' && filteredMilestones.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMilestones.map((milestone) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    onSelect={() => handleSelectMilestone(milestone.id)}
                    isActive={selectedId === milestone.id}
                  />
                ))}
              </div>
            )}

            {/* Help guidelines banner */}
            <div className="bg-ax-bg-3/40 rounded-xl p-4 border border-ax-border flex gap-3 text-xs text-ax-fg-2">
              <Compass className="w-5 h-5 text-ax-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-ax-fg-1 block">Navegación interactiva:</span>
                Seleccionando cualquiera de los {MILESTONES.length} hitos, se actualizará dinámicamente la ficha técnica de auditoría, las métricas de esfuerzo y los simuladores de gemelos digitales en el panel derecho de la consola.
              </div>
            </div>

          </div>

          {/* Right Floating Inspecting Drawer Console (Sticky position) */}
          <div ref={detailRef} className="lg:col-span-5 lg:sticky lg:top-[90px]">
            <MilestoneDetail
              milestone={activeMilestone}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>

        </div>

        {/* Digital Twin conceptual diagram section - visible only when Digital Twin category is active */}
        {selectedCategory === 'Digital Twin' && (
          <section id="twin-architecture" className="mt-12 pt-8 border-t border-ax-border">
            <DigitalTwinBlueprint 
              milestones={MILESTONES}
              onSelectMilestone={handleSelectMilestone}
            />
          </section>
        )}

      </main>

      {/* Humble Footer */}
      <footer id="applet-footer" className="bg-ax-dark-bg-1 text-[#C7CCE0] py-12 px-6 border-t border-ax-dark-border mt-16 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ax-dark-bg-2 rounded-lg text-white">
              <Compass className="w-5 h-5 text-ax-primary-soft" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">Aliar S.A. Digital Twin Roadmap</span>
              <p className="text-xs text-[#8C92AD] mt-0.5">Control de eficiencia térmica, IoT, sanidad y gestión porcícola.</p>
            </div>
          </div>
          <p className="text-xs text-[#8C92AD] text-center md:text-right">
            © {new Date().getFullYear()} Aliar, S.A. • Asimetrix • Premex Allius. Proyección Mayo 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
