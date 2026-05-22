export type EsfuerzoNivel = 'Bajo' | 'Medio' | 'Alto' | 'Intensivo' | 'Automatizado' | 'Continuo';

export interface Milestone {
  id: number;
  titulo: string;
  impactoTitulo: string;
  impactoDetalle: string;
  cronologia: string;
  equipo: string;
  esfuerzo: string;
  esfuerzoNivel: EsfuerzoNivel;
  actividadesClave: string[];
  categoria: 'Personalización de plataforma' | 'Analítica & Operaciones' | 'Dispositivos & IoT' | 'Digital Twin';
  estado: 'Completado' | 'En Ejecución' | 'Pendiente';
  fase: string; // e.g., "Q1 2026", "Q2 2026", "Continuo"
}

export type TimelineLayout = 'sinuous' | 'vertical' | 'grid';
