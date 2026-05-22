import { Milestone } from './types';

export const MILESTONES: Milestone[] = [
  {
    id: 1,
    titulo: "Cimiento y unificación de capacidades",
    impactoTitulo: "Sinergia operativa",
    impactoDetalle: "Unifica el lenguaje técnico y de negocio entre tres compañías distintas (Aliar, Asimetrix y Premex Allius) y establece la línea base de conocimiento para que el proyecto se construya sobre cimientos firmes y garantice la usabilidad futura.",
    cronologia: "Enero - Febrero 2026",
    equipo: "15 personas en total (6 de TIC Aliar, 6 de Asimetrix y 3 de Premex Allius)",
    esfuerzo: "Taller presencial de más de 6 horas continuas de co-creación con equipos cruzados de negocio y tecnología.",
    esfuerzoNivel: "Medio",
    actividadesClave: [
      "Realización de talleres de inicio e integración presenciales en Medellín."
    ],
    categoria: "Personalización de plataforma",
    estado: "Completado",
    fase: "Fase 1 - Q1 2026 (Finalizado)"
  },
  {
    id: 2,
    titulo: "Gobierno de datos y aval estratégico",
    impactoTitulo: "Desbloqueo legal y operativo",
    impactoDetalle: "Concede la autorización crítica para interconectar bases de datos confidenciales (Datalakes) y desplegar sensores en campo (Insylo). Sin este hito político-estratégico, el desarrollo tecnológico posterior habría sido inviable.",
    cronologia: "19 de Marzo de 2026",
    equipo: "3 Representantes de alta dirección y aliados tecnológicos",
    esfuerzo: "Sesión ejecutiva presencial y mesas formales de gobernanza regulada de más de 4 horas de evaluación estratégica.",
    esfuerzoNivel: "Alto",
    actividadesClave: [
      "Celebración del comité de alta dirección en Bucaramanga.",
      "Definición de lineamientos de seguridad de la información y permisos de integración.",
      "Aprobación estratégica para la interconexión de bases de datos."
    ],
    categoria: "Personalización de plataforma",
    estado: "Completado",
    fase: "Fase 1 - Q1 2026 (Aprobado)"
  },
  {
    id: 3,
    titulo: "Construcción de infraestructura digital y DataLake",
    impactoTitulo: "Fuente única y confiable",
    impactoDetalle: "Construcción de un repositorio unificado para conectar datos de sensores, sistemas operativos y procesos de negocio. Reduce inconsistencias y habilita una base escalable para el Digital Twin, reportes ejecutivos y analítica posterior.",
    cronologia: "Marzo - Mayo 2026",
    equipo: "12 personas en total (6 de TIC Aliar y 6 de Asimetrix)",
    esfuerzo: "Ingeniería de datos continua con desarrollo de 3 a 5 días hábiles promedio por reporte o tablero interactivo.",
    esfuerzoNivel: "Continuo",
    actividadesClave: [
      "Frente Agriness: Extracción automática de 6 reportes (cría semanal/mensual, fallos, partos/nacimientos, mapa de servicios y preceba) con validación de integridad.",
      "Frente SAP: Construcción por parte de Aliar de un Web Service para entregar datos a Asimetrix.",
      "Frente Consolidación: Integración de fuentes en el pipeline de datos de Know para alimentar Qlik Cloud (recargas cada 2 horas) y la API REST.",
      "Diseño y construcción de tableros de visualización (modelos nuevos con hasta 20 días hábiles de desarrollo)."
    ],
    categoria: "Personalización de plataforma",
    estado: "Completado",
    fase: "Fase 2 - Q2 2026 (Producción)"
  },
  {
    id: 4,
    titulo: "Estandarización de indicadores de negocio (porcicultura)",
    impactoTitulo: "Garantía de valor práctico",
    impactoDetalle: "Traduce la estrategia abstracta en métricas matemáticas del mundo real (Indicadores de Porcicultura PRC). Blinda al proyecto de construir software costoso que no resuelva los dolores reales del negocio.",
    cronologia: "Abril 2026",
    equipo: "15 personas en total",
    esfuerzo: "Mesas multidisciplinarias de alta intensidad técnica para la estandarización metodológica del core de negocio.",
    esfuerzoNivel: "Alto",
    actividadesClave: [
      "Mapeo y definición matemática de variables críticas de negocio.",
      "Conducción de mesas técnicas internas de alineación con líderes de terreno."
    ],
    categoria: "Personalización de plataforma",
    estado: "Completado",
    fase: "Fase 2 - Q2 2026 (Estandarizado)"
  },
  {
    id: 5,
    titulo: "Despliegue y mantenimiento de PigVision – granjas de ceba (Sitio 3)",
    impactoTitulo: "Precisión comercial y operativa",
    impactoDetalle: "Habilita la validación exacta del peso promedio de los cerdos al momento de salida, sirviendo de soporte clave a comercialización para estimar los kilogramos de carne esperados.",
    cronologia: "Monitoreo Continuo 2026",
    equipo: "Equipo líder de cada sitio de producción y soporte técnico Asimetrix",
    esfuerzo: "Campañas técnicas quincenales programadas para el total de la población de la granja Sitio 3.",
    esfuerzoNivel: "Continuo",
    actividadesClave: [
      "Instalación y operación en el 100% de las granjas de Ceba del sitio 3.",
      "Revisión de mantenimiento preventivo y correctivo de los equipos PigVision.",
      "Análisis quincenal de resultados zootécnicos basados en mediciones de campo."
    ],
    categoria: "Dispositivos & IoT",
    estado: "Completado",
    fase: "Monitoreo Continuo"
  },
  {
    id: 6,
    titulo: "Implementación del dashboard de curvas de crecimiento",
    impactoTitulo: "Planeación productiva predictiva",
    impactoDetalle: "Ofrece una mayor visibilidad del comportamiento de crecimiento del lote para realizar ajustes oportunos de manejo, alimentación y estrategia comercial.",
    cronologia: "Uso quincenal 2026",
    equipo: "Equipo técnico de cada sitio y analistas de datos",
    esfuerzo: "Análisis y modelación matemática avanzada aplicada en comités zootécnicos quincenales.",
    esfuerzoNivel: "Medio",
    actividadesClave: [
      "Procesamiento de la información histórica y actual capturada por PigVision.",
      "Despliegue de visualizaciones con proyecciones de peso al finalizar el lote.",
      "Contraste y calibración de las curvas proyectadas frente a las mediciones reales en campo."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Fase 1 - Q1 2026"
  },
  {
    id: 7,
    titulo: "Distribución del reporte diario de indicadores zootécnicos",
    impactoTitulo: "Eficiencia en tiempo real",
    impactoDetalle: "Permite a los gerentes y líderes planificar la operación de salida núcleo por núcleo mediante el envío automatizado de métricas unificadas.",
    cronologia: "Diario 2026 (Automatizado)",
    equipo: "Líderes de sitio y destinatarios gerenciales (Wilmer, Daniel, Sergio)",
    esfuerzo: "Canal de consumo directo de datos procesados mediante pipeline y procesamiento server-side diario.",
    esfuerzoNivel: "Automatizado",
    actividadesClave: [
      "Integración diaria de datos: peso (PigVision) + mortalidad diaria + consumo de alimento diario.",
      "Generación del reporte por núcleo (Machigure, Barlovento, Gammon Fray, Cascabeles) con KPIs de ganancia animal/día, % mortalidad y conversión alimenticia.",
      "Envío de reportes consolidados por núcleos ordenados de mayor a menor edad y exportación general a Excel."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Fase 1 - Q1 2026 (Automatizado)"
  },
  {
    id: 8,
    titulo: "Activación del algoritmo de detección de anomalías",
    impactoTitulo: "Enfoque preventivo y proactivo",
    impactoDetalle: "Proporciona una alerta temprana automatizada que mitiga pérdidas financieras al detectar desviaciones antes de que se vuelvan críticas.",
    cronologia: "Operativo (Ejecución Diaria 2026)",
    equipo: "Líderes de producción de cada sitio y algoritmos Asimetrix",
    esfuerzo: "Cálculos predictivos automáticos y control de estabilidad de parámetros productivos.",
    esfuerzoNivel: "Automatizado",
    actividadesClave: [
      "Procesamiento automático diario de la ganancia animal/día de los últimos 7 días contra los 7 días anteriores.",
      "Disparo de alertas automatizadas ante decrecimientos o anomalías a los líderes de producción.",
      "Validación en campo de causas raíz (problemas de manejo, consumo de alimento o síntomas clínicos)."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Fase 1 - Q1 2026 (Operativo)"
  },
  {
    id: 9,
    titulo: "Despliegue y capacitación de OptiMarket",
    impactoTitulo: "Maximización del margen por lote",
    impactoDetalle: "Permite planificar el calendario ideal de despachos considerando las limitantes físicas de la granja y el comportamiento real del animal.",
    cronologia: "Desplegado (Monitoreo Continuo 2026)",
    equipo: "Líderes de producción (usuarios finales) y consultores de Asimetrix",
    esfuerzo: "Talleres presenciales intensivos con líderes de sitio y seguimiento periódico de usabilidad avanzada.",
    esfuerzoNivel: "Medio",
    actividadesClave: [
      "Integración del optimizador de peso de salida dentro del portal web de Asimetrix.",
      "Parametrización de restricciones: Peso meta, permanencia máxima y ganancia histórica/actual por PigVision.",
      "Planificación de los próximos pasos para elevar el uso diario y maximizar el valor de salida de los lotes."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Fase 2 - Q2 2026"
  },
  {
    id: 10,
    titulo: "Adopción de Know productivo (cría, precebo y ceba)",
    impactoTitulo: "Soporte a bonificaciones y desempeño",
    impactoDetalle: "Sirve como la herramienta oficial muy utilizada por los líderes de sitio para calcular y validar las bonificaciones por granja.",
    cronologia: "Desplegado (Monitoreo Continuo 2026)",
    equipo: "Líderes de sitio de cría, precebo, ceba y analistas de datos",
    esfuerzo: "Auditorías de datos mensuales interactivos para el cálculo estratégico de bonificaciones por lote.",
    esfuerzoNivel: "Alto",
    actividadesClave: [
      "Consolidación de datos de Agriness y archivos Excel de lotes liquidados de Precebo y Ceba.",
      "Despliegue de resúmenes de lotes terminados y tendencias comparativas entre sitios de producción.",
      "Planificación de desarrollos pendientes para la vista de Cría (tamaño de camada, número de partos, fallas reproductivas y mortalidad de hembras)."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Monitoreo Mensual"
  },
  {
    id: 11,
    titulo: "Implementación de Know de sanidad y bioseguridad",
    impactoTitulo: "Decisiones médicas basadas en evidencia",
    impactoDetalle: "Soporta directamente las estrategias de control sanitario. El plan de medicación de Aliar se estructuró con base en la evidencia de costo y resistencia de estos tableros.",
    cronologia: "Desplegado (Monitoreo Continuo 2026)",
    equipo: "Equipo de sanidad liderado por Adriana Patiño",
    esfuerzo: "Evaluación médica recurrente basada en laboratorios biológicos cruzados y costes en agua/alimento.",
    esfuerzoNivel: "Continuo",
    actividadesClave: [
      "Mapeo del estatus de bioseguridad mediante listas de chequeo con seguimiento histórico por granja y sitio.",
      "Cruce de bacteriología (resistencia bacteriana) con el consumo y costos de antibióticos en agua, alimento y parenterales.",
      "Integración con datos productivos semanales de cría para medir impactos en mortalidad.",
      "Desarrollo en curso de KPIs de costo y consumo de antibióticos por kilogramo producido (requiere lotes terminados de ceba) y nuevo tablero de bienestar animal."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Control Clínico Continuo"
  },
  {
    id: 12,
    titulo: "Consolidación de Know de comité \"Todos Ponen\"",
    impactoTitulo: "Alineación estratégica transversal",
    impactoDetalle: "Reúne a directores y líderes en torno al indicador macro del negocio, facilitando la toma de decisiones unificadas entre las áreas productivas, calidad y planta de beneficio.",
    cronologia: "Desplegado (Monitoreo Continuo 2026)",
    equipo: "Alta dirección, líderes de calidad, producción y planta",
    esfuerzo: "Mesa mensual estratégica de nivel ejecutivo de porcicultura y directores técnicos de Aliar S.A.",
    esfuerzoNivel: "Alto",
    actividadesClave: [
      "Centralización de KPIs de cría, precebo, ceba, calidad de Know y OKUO.",
      "Integración de datos de planta de beneficio y canales de Alura (% magro y grasa dorsal).",
      "Seguimiento sistemático al KPI principal: Kilogramos liquidados por hembra año."
    ],
    categoria: "Analítica & Operaciones",
    estado: "Completado",
    fase: "Fase de Control Continuo"
  },
  {
    id: 13,
    titulo: "Ejecución y mitigación técnica del piloto Insylo",
    impactoTitulo: "Control de inventarios y costos",
    impactoDetalle: "Busca validar la estabilidad de dispositivos de telemetría IoT en silos para transformarlos en una fuente confiable de medición de consumo de alimento.",
    cronologia: "Piloto en ejecución (Más de un año de datos)",
    equipo: "Responsables técnicos: Wilmer y Carlos, en conjunto con Asimetrix",
    esfuerzo: "Seguimiento técnico permanente en granjas piloto y asistencia correctiva a las capas físicas del IoT.",
    esfuerzoNivel: "Medio",
    actividadesClave: [
      "Monitoreo automatizado de los 4 silos de la granja piloto (Machijure 15).",
      "Mitigación de problemas de conectividad en campo mediante la instalación de antenas de alta recepción.",
      "Gestión de la actualización tecnológica del dispositivo a la versión 2.",
      "Tarea pendiente: Estructurar un plan de validación sistemático para contrastar los pesos de Insylo contra las cargas reales de los camiones."
    ],
    categoria: "Dispositivos & IoT",
    estado: "En Ejecución",
    fase: "Fase de Prueba Activa"
  },
  {
    id: 14,
    titulo: "Etapa de discovery y entendimiento del negocio (fase actual)",
    impactoTitulo: "Estructura funcional del Digital Twin",
    impactoDetalle: "Asegura que el gemelo digital se construya sobre información confiable, consistente y con un entendimiento nítido de las palancas de valor productivas y económicas de Aliar.",
    cronologia: "Mayo 2026 (Fase actual)",
    equipo: "Especialistas técnicos y líderes de los negocios de Agricultura y Porcicultura",
    esfuerzo: "Más de 40 horas de inmersión técnica exhaustiva en plantas de secado y mapeo integral de palancas económicas.",
    esfuerzoNivel: "Intensivo",
    actividadesClave: [
      "Identificación detallada de las etapas del proceso productivo, palancas económicas y cuellos de botella para agricultura y porcicultura.",
      "Mapeo profundo del proceso agrícola (siembra, planeación, cosecha, mantenimiento de maquinaria) con foco crítico en la Planta de Secado para optimización de costos.",
      "Identificación de más de 12 fuentes de información relevantes para el modelado, determinando qué datos deben consolidarse y disponibilizarse en el DataLake."
    ],
    categoria: "Digital Twin",
    estado: "En Ejecución",
    fase: "Fase 2 - Q2 2026 (Actual)"
  },
  {
    id: 15,
    titulo: "Construcción de arquitectura e implementación del Digital Twin",
    impactoTitulo: "Optimización automatizada y margen",
    impactoDetalle: "Permite construir capacidades de simulación, análisis predictivo y control en tiempo real de las variables críticas de costos, mantenimiento, operaciones agrícolas y la eficiencia de las plantas de secado, transformando los datos históricos en decisiones predictivas que aumentan el margen del negocio y anticipan escenarios.",
    cronologia: "Mayo 2026 (Proyección de cierre)",
    equipo: "4 Especialistas técnicos (incluyendo 1 consultor externo)",
    esfuerzo: "Desarrollo simultáneo de arquitectura funcional, levantamiento de fuentes de datos y simulaciones piloto.",
    esfuerzoNivel: "Alto",
    actividadesClave: [
      "Mapeo exhaustivo de las fuentes de información definitivas.",
      "Consolidación final de las bases de datos identificadas en el DataLake.",
      "Identificación y corrección de inconsistencias remanentes de datos.",
      "Definición de la estructura de integración final del gemelo digital.",
      "Alineación final de criterios e indicadores entre las áreas técnicas y operativas de Aliar."
    ],
    categoria: "Digital Twin",
    estado: "Pendiente",
    fase: "Fase 2 - Q2 2026 (Proyección)"
  },
  {
    id: 16,
    titulo: "Comité mensual Porcicultura",
    impactoTitulo: "Toma de decisiones directivas y productividad",
    impactoDetalle: "Integración de indicadores principales del negocio para revisión por parte del equipo técnico directivo, para validar meta y seguimiento de la productividad de la compañía. Con base en esto se toman decisiones de ajustes y mejoras que se deben hacer en la producción o retos que se visualizan con base en esta información.",
    cronologia: "Mensual a partir de Mayo 2026",
    equipo: "Equipo técnico directivo porcícola e ingenieros consultores",
    esfuerzo: "Sesiones de alineamiento de alta dirección zootécnica y consolidación de tableros directivos.",
    esfuerzoNivel: "Alto",
    actividadesClave: [
      "Consolidación mensual de indicadores clave del negocio (PRC) en el dintel técnico.",
      "Sesión formal del comité directivo de co-evaluación ejecutiva.",
      "Identificación de brechas de productividad y definición de ajustes zootécnicos correctivos de inmediato.",
      "Análisis prospectivo de retos productivos y sanitarios de mediano plazo."
    ],
    categoria: "Personalización de plataforma",
    estado: "En Ejecución",
    fase: "Mensual Q2 2026 (Activo)"
  },
  {
    id: 17,
    titulo: "Instalación y configuración de 380 Insylos",
    impactoTitulo: "Telemetría de silos masiva en tiempo real",
    impactoDetalle: "Habilita la monitorización automatizada y optimización del abastecimiento de alimento mediante la instalación de 380 sensores IoT Insylo, eliminando el pesaje manual y el riesgo de escasez.",
    cronologia: "Proyectado Q3 - Q4 2026",
    equipo: "Personal técnico de operaciones Aliar S.A. y soporte de infraestructura IoT",
    esfuerzo: "Plan general de instalación, configuración de red, calibración, pruebas de tolerancia y transmisión continua.",
    esfuerzoNivel: "Intensivo",
    actividadesClave: [
      "Planificación y ruta terrestre logística de instalación de los 380 sensores.",
      "Montaje físico robustecido en cúpulas de silos y pruebas iniciales de peso volumétrico.",
      "Habilitación de telecomunicaciones inalámbricas y paso del flujo telemétrico al DataLake.",
      "Ajuste y validación del modelo analítico de consumo de alimento en la granja."
    ],
    categoria: "Dispositivos & IoT",
    estado: "Pendiente",
    fase: "Proyección Q3-Q4 2026"
  }
];
