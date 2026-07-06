# CONTEXTO — Curso IA y Derecho · Diego Ojeda Cifuentes · Escuela de Derecho PUCV

Documento de contexto portátil: quién, qué, por qué y las decisiones tomadas, para retomar el desarrollo sin perder el hilo. **El documento rector de arquitectura, guardarraíles y sprints es `CLAUDE.md`**; si este archivo lo contradice, manda `CLAUDE.md`.

---

## 1. Quién y dónde

- **Autor:** Diego Hernán Ojeda Cifuentes, Licenciado en Ciencias Jurídicas.
- **Institución destinataria:** Pontificia Universidad Católica de Valparaíso (PUCV), Escuela de Derecho. Propuesta a presentar a la Dirección (prof. Eduardo Aldunate, constitucionalista).
- **Naturaleza:** proyecto **personal e independiente** del autor. No usar marcas de otros programas en el contenido visible.
- **Encuadre (decisión 2026-07):** se presenta como **propuesta PRELIMINAR, base de trabajo** — no versión final. Todo el copy debe sostener ese encuadre.
- **Dos ofertas, claramente separadas:**
  - **Optativo de pregrado** (`DER-IA · OPT 2026`): semestral (16 semanas), 1 sesión/semana de 90 min, sin requisito técnico. ABP, prototipos primero, cierre con prototipo funcional sobre Supabase.
  - **Trayecto de educación continua** (`educacion-continua.html`), para egresados y abogados: tres programas modulares — *Abogado Aumentado* (usa) → *Ingeniero Jurídico* (construye) → *Arquitecto Jurídico-Algorítmico* (gobierna). Hay un renaming propuesto en comentario HTML de esa página, **pendiente de decisión del autor**.

## 2. Tesis y posicionamiento (no cambiar sin discutirlo)

> **La fortaleza teórica de la Escuela —que parecía ajena a la tecnología— es la competencia más escasa del momento.**

Cuando todos sepan *usar* la IA, lo escaso será saber *fijar reglas* y *gobernar sistemas*. Eso es lo que la tradición teórica de la Escuela ya enseña.

- **Marca metodológica: el "Método Constitucional"** — cada agente jurídico de IA opera bajo una **constitución escrita** (fuentes autorizadas, reglas duras vs. preferencias, límites, revisión humana) que el estudiante redacta y defiende. Es teoría de la normatividad aplicada, no un eslogan: la plataforma lo presenta como metodología, con la anatomía de 9 capas y el **"umbral constitucional"** (término acordado; nunca "policy gate").
- **Definición operativa (fijada en #metodo):** por *agente jurídico de IA* se entiende un sistema que ejecuta tareas jurídicas delimitadas dentro de un marco fijado de antemano; **no** un chat de uso libre.
- **Formulación del objetivo (hero y objetivo general):** formar estudiantes capaces de **comprender, diseñar y evaluar** agentes de IA en el trabajo jurídico.
- **Cinco diferenciadores:** construir además de usar · el Método Constitucional · anclaje chileno y regulatorio (Ley 21.719 + proyecto de IA; marco europeo solo como contraste) · verificación como competencia troncal · ciberseguridad y anonimización integradas.
- **Eje pedagógico:** del *prompt* → al *flujo* → a la *herramienta* → al *agente*. Escalera: 1 Alfabetización → 2 Usuario crítico → 3 Constructor → 4 Arquitecto. El optativo cubre 1→3; el trayecto de egresados llega a 4.

## 3. Hechos verificados (reconfirmar a la fecha de uso)

**Regulación chilena (redacción vigente en la plataforma, fechada):** «Estado regulatorio actualizado al **1 de julio de 2026**: Ley N.° 21.719 publicada (datos personales; crea la Agencia de Protección de Datos), vigencia diferida al **1 de diciembre de 2026**; proyecto de ley de IA en **segundo trámite constitucional** (Senado), Boletín 16.821-19 refundido con 15.869-19, modelo basado en riesgos.»

**Mercado (corpus de investigación 2025–26, solo contexto interno):** adopción de IA legal en Chile ≈ 24% (bajo el promedio regional); CAGR software de IA legal ≈ 29,4%. **Estas cifras fueron retiradas de la plataforma** (guardarraíl: sin KPIs de proveedor como dato establecido); no reintroducirlas sin fuente verificable de primera mano.

**Benchmark de escuelas (contexto interno):** Harvard, USC Gould, U. Chicago, Berkeley, Cornell, Drake, Suffolk, UBA/IALAB, U. de La Sabana, PUC Chile. Hallazgo: el mundo enseña a *entender* y *regular*; casi nadie enseña a *construir*; casi ninguno integra ciberseguridad/anonimización como troncal. **En la plataforma esto se expresa solo como "vacíos formativos que este curso cubre", sin nombrar ni compararse con terceros** (guardarraíl vigente).

## 4. Guardarraíles de honestidad (CRÍTICO — audiencia académica)

Detalle canónico en `CLAUDE.md`. Resumen operativo:
- Nada inventado: ni testimonios, ni matrículas, ni avales, ni urgencia falsa, ni KPIs sin fuente.
- Disclaimers **solo** en `#nota` (no salpicados por página).
- **Sin comparaciones con terceros** nombrados.
- Toda demostración rotulada como **simulación local con motor de reglas — sin IA en vivo**. Su función declarada: mostrar cómo un estudiante diseñaría un agente delimitado (fuentes, reglas, límites, revisión humana).
- La única escasez afirmable es la real: capacidad de acompañamiento docente (cupo 20–30).
- **Registro de tono (decisión 2026-07): formal, sin tutear al lector, sin frases de venta.** Cualquier copy nuevo debe mantenerlo.

## 5. Estándar visual

Dark técnico-institucional sobrio (derivado del "war room", ya sin partículas: el filtro anti-genérico de `CLAUDE.md` las prohíbe). Fondo = **campo normativo** (shader WebGL de 9 bandas, `fx-campo`, variantes `?campo=1|2|3`, degradación elegante y respeto de `prefers-reduced-motion`). Tipografías variables: **Space Grotesk** (títulos), **Inter** (texto), **JetBrains Mono** (datos). Máximo 2 frases destacadas (`.fx-frase`). Audio opt-in, apagado por defecto: acorde constitucional de 9 notas + solo 2 sonidos de UI. Tokens exactos en `CLAUDE.md`.

## 6. Entregables del proyecto (en este repo)

| Ruta | Qué es |
|---|---|
| `index.html` | La propuesta: 9 secciones canónicas `#hero #problema #metodo #prueba #curso #beneficios #direccion #decision #nota`; modo presentación; PDFs vectoriales (pdfmake + IBM Plex). |
| `laboratorio.html` | Sala de Verificación (motor determinista, spec en `docs/esquema-motor-reglas.json`), Generador de Constitución (9 pasos, .md/PDF), auditoría local, bitácora GitHub en vivo. |
| `educacion-continua.html` | Los 3 programas de egresados, fuera del optativo. |
| `resumen-ejecutivo.html` | Minuta imprimible de 2 páginas. |
| `fx/` | 6 módulos de efectos con registro común y bus de eventos. |

> Histórico: hubo versiones separadas (`app.html`, `landing.html`, `optativo.html`, `informe.html`) y dos `.docx`; se unificaron y eliminaron el 2026-06-29. Los `.docx` formales para tramitación académica se regenerarán cuando se necesiten.

## 7. Historia de decisiones (resumen)

- Del contraste brainstorm ↔ investigación de mercado salieron la tesis, los 5 diferenciadores y el cambio de paradigma.
- 2026-06: unificación en una plataforma; reframe institucional para la Dirección; secciones de logística, perfil de egreso, FAQ; demo interactiva.
- 2026-07 (kit + sprints): `CLAUDE.md` canónico; reorden físico a 9 secciones con la **prueba antes de la decisión**; "policy gate" → **umbral constitucional**; educación continua a página propia; sistema `fx/` (Fases A y B); **laboratorio** (Fase C) con motor de reglas honesto.
- 2026-07 (pasada de sobriedad, previa al envío): encuadre "propuesta preliminar / base de trabajo"; **cero tuteo**; método explicado como metodología con definición de agente; doctrina en expandible; sin comparaciones con terceros; selector de lectura por rol en el hero (Dirección / Estudiante / Académico).
- Secuencia de implementación recomendada: **piloto primero** (valida demanda, certifica cumplimiento 21.719), luego escalar. No construir `/aula` ni conectar APIs reales antes de aprobar el piloto (regla de `CLAUDE.md`).
