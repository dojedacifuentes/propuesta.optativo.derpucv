# CLAUDE.md — propuesta.optativo.derpucv

## Qué es este proyecto

Landing/plataforma de la propuesta de curso optativo de pregrado **"Derecho + Inteligencia Artificial: Construir, Verificar y Gobernar" (DER-IA·OPT-2026)** para la Escuela de Derecho PUCV, dirigida por Diego Ojeda Cifuentes (Subdirector de Talleres, programa DIAT). Audiencia primaria: la Dirección de la Escuela (Eduardo Aldunate). Audiencias secundarias: estudiantes y académicos.

Deploy: Vercel, sitio estático. Stack: HTML + CSS + JS vanilla, sin frameworks, sin build step. Fondo institucional oscuro (#020306), registro serio tipo MIT/Anthropic — nunca decorativo, nunca "AI-generated look".

## Principios innegociables (guardarraíl de honestidad)

1. **Cero fabricación**: nada de testimonios inventados, cifras de matrícula ficticias, urgencia artificial ni contadores falsos. La escasez solo puede ser estructural y real (cupos del piloto, calendario académico).
2. **Datos verificados o fuera**: ninguna cifra se muestra en formato KPI si no está verificada con fuente. Los datos "a reconfirmar" NO van como estadística destacada; van en la nota metodológica única al pie o se eliminan.
3. **Disclaimers consolidados**: existe UNA sola "Nota metodológica" al final del documento. No se dispersan asteriscos "a reconfirmar" por las secciones.
4. **La demo se declara como lo que es**: si ContratoClaro es maqueta o simulación client-side, se rotula "simulación con respuestas precalculadas". Si consume API real, se rotula como demo en vivo.
5. **Afirmaciones sobre nosotros, no sobre otros**: no hay comparaciones contra "el enfoque típico" ni terceros implícitos. El posicionamiento se expresa como "vacíos que este curso cubre".

## Narrativa maestra

La lógica persuasiva del sitio es: **problema → tesis → prueba → operación → decisión**. Ningún contenido conceptual puede aparecer después del paquete de decisión. La demo (la prueba) va ANTES de pedir la decisión, nunca después.

El Método Constitucional se explica en profundidad **una sola vez** (sección canónica). Cualquier otra mención es referencia breve con ancla a esa sección. Máximo **dos** "frases clave/visuales" en toda la página.

## Arquitectura de secciones (orden canónico — 9 macro-secciones)

1. `#hero` — Hero + lectura de 60 segundos. Incluye selector de ruta por rol (Dirección / Estudiante / Académico).
2. `#problema` — El problema y la oportunidad (fusión de las antiguas secciones "problema" y "oportunidad").
3. `#metodo` — El Método Constitucional, sección canónica única. Absorbe: sello de la casa, Constitución del agente, anatomía de nueve capas (interactiva, se conserva), el agente como institución mínima.
4. `#prueba` — La prueba: ContratoClaro + flujograma por zonas. Sube desde el final del documento a esta posición.
5. `#curso` — Cómo se vive: anatomía de sesión, arco del semestre, programa de 16 semanas, stack tecnológico.
6. `#beneficios` — Qué gana la Escuela / qué se llevan los estudiantes / perfil de egreso (fusión de los tres bloques dispersos).
7. `#direccion` — Para la Dirección: requisitos, rúbrica, calendario, riesgos y mitigación, estructura del piloto, FAQ.
8. `#decision` — Decisión sugerida. UN CTA primario ("Agendar conversación sobre el piloto") + UN secundario ("Descargar dossier PDF"). Nada más.
9. `#nota` — Nota metodológica (disclaimers consolidados) + link discreto a educación continua: "Esta lógica también escala a egresados →".

**Educación continua** vive en página propia (`/educacion-continua.html`), fuera de la columna vertebral del optativo. Revisar el naming de los programas: evitar etiquetas tipo "Arquitecto Jurídico-Algorítmico" que suenen a LinkedIn; preferir nombres sobrios e institucionales.

## Navegación

- Nav sticky con las 9 anclas reales (el nav no puede mentir sobre la escala del documento).
- Indicador de progreso de scroll.
- Resaltado de sección activa vía IntersectionObserver.
- Modo presentación (pitch 5 minutos) se conserva y se integra a la ruta "Dirección".

## Copy

- Chileno, sobrio, institucional. Sin anglicismos innecesarios, sin tono marketero.
- Párrafos-argumento largos se reducen a síntesis de 2-3 líneas + expandible (`<details>` estilizado o acordeón propio) para quien quiera profundidad.
- El clímax retórico se reserva: dos frases destacadas en todo el documento, ubicadas en `#metodo` y `#decision`.

## Roadmap de sprints

- **Sprint 1 — Reestructura (P0)**: reorden de secciones, cierre con CTA único, saneamiento de datos, consolidación del método y de disclaimers, educación continua a página propia. (Issues en `docs/issues-sprint-1.md`.)
- **Sprint 2 — Navegación y respiración (P1)**: nav real con progreso, rutas por rol, poda de copy, reencuadre del posicionamiento.
- **Sprint 3 — Interactividad (P2)**: ContratoClaro interactivo (versión A: simulación client-side con 3-4 escenarios precalculados, incluido uno rechazado por el policy gate; versión B: API real solo si se decide asumir la dependencia), generador de Constitución de 9 capas con descarga, formulario de interés con Supabase.
- **Sprint 4 — Plataforma**: `/aula` semana a semana y dashboard del piloto. **No se construye antes de que el piloto sea aprobado** — coherencia con el principio de no lanzar antes de validar.

## Convenciones técnicas

- Un solo archivo CSS global; variables CSS para color y espaciado; nada de estilos inline nuevos.
- JS vanilla, módulos por funcionalidad (`nav.js`, `anatomia.js`, `demo.js`), sin dependencias npm salvo necesidad justificada.
- Accesibilidad mínima: contraste AA sobre fondo oscuro, `prefers-reduced-motion` respetado en toda animación, navegación por teclado en la anatomía interactiva y acordeones.
- Performance: sin librerías de animación pesadas; el nivel "cyber" se logra con tipografía, grid, línea y micro-interacción, no con efectos.
- Commits en español, imperativo, con prefijo de sprint: `[S1] Reordena secciones según arquitectura canónica`.

## Qué NO hacer

- No agregar secciones nuevas a la columna vertebral sin eliminar o fusionar otra (presupuesto fijo: 9 macro-secciones).
- No reintroducir explicaciones paralelas del método.
- No mostrar cifras sin fuente verificada.
- No agregar CTAs al cierre.
- No usar comparaciones contra terceros, nombrados o implícitos.
