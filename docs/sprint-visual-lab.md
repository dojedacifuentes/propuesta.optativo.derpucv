# Sprint Visual + Laboratorio — propuesta.optativo.derpucv

> Prerequisito: Sprint 1 (reestructura) cerrado. Este documento extiende CLAUDE.md; en caso de conflicto, CLAUDE.md manda.

## 0. Filtro anti-genérico (regla de oro)

**Cada efecto visual o sonoro debe encarnar un concepto del Método Constitucional (construir / verificar / gobernar). Si un efecto no puede justificar qué concepto expresa, no entra.** Prohibidos explícitamente: partículas flotantes, lluvia Matrix, glitch text, neón saturado, cursores custom tipo blob, tilt 3D en cards, contadores animados de cifras. Todo eso es cyber de stock.

Presupuesto de movimiento: máximo un efecto protagonista por macro-sección. `prefers-reduced-motion` desactiva TODO movimiento no esencial y todo sonido, sin excepciones.

---

## 1. Stack de efectos (todo gratuito, todo vanilla-compatible)

| Herramienta | Para qué | Peso | Licencia |
|---|---|---|---|
| **GSAP core + ScrollTrigger** | Orquestación de scroll y timelines | ~70kb min | Gratis, uso comercial OK (Webflow) |
| **GSAP DrawSVG** | Dibujo de trazos del flujograma | plugin | Gratis |
| **GSAP SplitText** | Animación tipográfica de las 2 frases clave | plugin | Gratis |
| **GSAP Flip** | Transiciones de estado en la anatomía de 9 capas | plugin | Gratis |
| **OGL** (github.com/oframe/ogl) | WebGL minimalista para el shader de fondo | ~20kb | MIT |
| **Web Audio API** | Sonido sintetizado (sin samples) | nativo | — |
| **CSS Scroll-Driven Animations** | Progreso y reveals ligeros sin JS | nativo | — |
| **View Transitions API** | Navegación entre páginas del sitio | nativo | — |

Instalar las skills de GSAP en Claude Code antes de partir: `npx skills add` (buscar gsap-core, gsap-scrolltrigger, gsap-plugins, gsap-performance). Con eso Claude Code anima con conocimiento del ecosistema, no adivinando API.

Carga: GSAP y plugins desde jsDelivr con `defer`; OGL como módulo ES. Nada bloquea el primer render.

---

## 2. Módulos de efectos reutilizables (carpeta /fx)

Cada módulo es un archivo JS independiente con la misma interfaz: `init(el, opts)` / `destroy()`, cero dependencias entre sí, documentado en su cabecera. Eso los hace reutilizables en ScribeClaro, SEED OS o cualquier proyecto futuro.

### fx-campo.js — Fondo generativo "campo normativo" (concepto: la norma como campo de fuerza)
Shader WebGL propio sobre OGL: un campo de interferencia monocromo, lentísimo, casi subliminal (opacidad 4-8% sobre #020306), con nueve bandas horizontales apenas perceptibles que corresponden a las nueve capas de la Constitución. Reacciona al cursor con un desplazamiento sutil de fase, nunca con estela. No es "partículas": es un shader único del proyecto. Fallback: gradiente estático si no hay WebGL. Se pausa fuera de viewport y con `prefers-reduced-motion`.

### fx-trazo.js — Dibujo de diagramas (concepto: verificar = proceso trazable)
DrawSVG + ScrollTrigger: el flujograma por zonas se dibuja trazo a trazo a medida que el lector hace scroll, con cada zona completándose antes de iniciar la siguiente. Genérico en la técnica, propio en la coreografía: el orden de dibujo ES el orden del proceso de verificación. Reutilizable para cualquier SVG con clase `.fx-trazo`.

### fx-capas.js — Anatomía de 9 capas expandida (concepto: la Constitución como estructura)
Rediseño del componente estrella: vista "explotada" de las nueve capas usando transforms 3D CSS + GSAP Flip para transiciones de estado. Hover/focus en una capa: las demás bajan a 20% de opacidad y se separan en el eje Z; la capa activa muestra su descripción. Cada capa tiene asignada una nota (ver sonido). Navegable por teclado (las 9 capas son focusables, Enter expande).

### fx-tipografia.js — Peso variable en frases clave (concepto: el argumento que toma cuerpo)
Las DOS frases clave del documento usan una fuente variable (IBM Plex Sans var o similar) y SplitText: al entrar en viewport, cada palabra interpola su eje de peso de 300 a 650 en cascada. Elegante, raro de ver, cero cliché. NO usar ScrambleText (el efecto "descifrado" ya es un lugar común).

### fx-progreso.js — Progreso como articulado (concepto: gobernar = codificar)
En vez de una barra de progreso genérica, el indicador del nav muestra el avance como articulado legal: "Art. 3° de 9" con el nombre de la macro-sección activa. CSS Scroll-Driven Animations para la línea, IntersectionObserver para el artículo. Nadie más tiene un scroll progress así, y es exactamente el registro del sitio.

### fx-transicion.js — View Transitions entre páginas
Navegación a /educacion-continua, /aula y /laboratorio con View Transitions API: el header persiste, el contenido hace cross-fade con desplazamiento mínimo. Progressive enhancement puro: en navegadores sin soporte, navegación normal.

---

## 3. Sistema de sonido (fx-audio.js)

**Base: portar la arquitectura del módulo Web Audio de SEED OS** (ya resuelta: AudioContext único, master gain, síntesis sin samples). Adaptación al registro institucional:

- **Paleta sintetizada, no samples**: osciladores sine/triangle con envolventes cortas (5-40ms attack, decay rápido) y filtro lowpass. Sonido de "instrumento de precisión", no de videojuego.
- **El acorde constitucional**: cada una de las 9 capas de la anatomía tiene asignada una nota de una escala pentatónica extendida (dos octavas, graves = capas fundacionales). Recorrer las capas ES escuchar la estructura. Activar la vista completa reproduce el acorde arpegiado en ~600ms. Este es el momento sonoro firma del sitio.
- **Micro-feedback**: tick filtrado (<20ms) en cambio de sección del nav; tono grave breve tipo "timbre seco" al presionar el CTA primario. Nada más. Dos sonidos de UI en total.
- **Reglas duras**: TODO silenciado por defecto (además la autoplay policy del navegador exige gesto del usuario). Toggle de sonido visible en el nav con estado persistido en localStorage. `prefers-reduced-motion` implica silencio. Volumen master a -18dB percibido: el sonido se intuye, no se impone.

---

## 4. El Laboratorio (/laboratorio) — de landing a plataforma

Página hermana con el mismo layout. Cuatro instrumentos, en este orden de construcción:

### 4.1 Sala de Verificación (policy gate en vivo) — SIN API, prioridad 1
Motor de reglas client-side: el visitante elige o escribe una consulta y ve, capa por capa, cómo la Constitución del agente la evalúa — qué capa la autoriza, qué capa la bloquea, con cita textual de la cláusula constitucional aplicada. Visual: la consulta "desciende" por las 9 capas (reutiliza fx-capas + el acorde: cada capa que aprueba suena su nota; un bloqueo suena una disonancia breve). Incluir 6-8 consultas precargadas, al menos 2 que el gate rechaza. Rotulado honesto: "Simulación con motor de reglas local — sin IA en vivo". **Es el Método Constitucional demostrado, no descrito, y funciona sin dependencias.**

### 4.2 Generador de Constitución
Wizard de 9 pasos (uno por capa): finalidad, ámbito, fuentes, límites, escalamiento, etc. Output: documento markdown renderizado + descarga (.md y PDF vía jsPDF). El visitante se lleva un artefacto real del método. Guardar borrador en localStorage.

### 4.3 Registro de auditoría de la página (meta-demo)
Panel colapsable, fijo abajo a la derecha: cada interacción significativa del visitante en el Laboratorio (consulta evaluada, constitución generada, capa explorada) se registra con timestamp en un log visible estilo terminal sobrio. Mensaje al abrirlo: "Todo agente gobernado deja registro. Esta página también." Solo client-side, se declara explícitamente que nada se envía a ningún servidor. Gobernar = registrar, hecho experiencia.

### 4.4 ContratoClaro en vivo — CON API, prioridad última
Versión A (default): simulación con 3-4 escenarios precalculados, incluido uno rechazado por el policy gate. Versión B (opcional, decisión de costo): Vercel serverless function como proxy a la API de Anthropic (la key vive en variable de entorno de Vercel, NUNCA en el cliente), con rate limit por IP y presupuesto mensual tope. Si B se activa, el toggle "simulación / en vivo" es visible — coherencia con el guardarraíl de honestidad.

### Integraciones externas
- **Supabase**: formulario de interés en el piloto (nombre, correo PUCV, motivación corta) → tabla simple + contador honesto de interesados SOLO si el número es real y digno de mostrar.
- **GitHub API**: "Bitácora de construcción" en el footer del Laboratorio — últimos 5 commits del repo, en vivo. Transparencia radical: el sitio muestra cómo se construye a sí mismo. Cero backend (API pública de GitHub, cache de 10 min en sessionStorage).
- **Anthropic API**: solo vía la serverless function de 4.4-B.

---

## 5. Orden de ejecución e issues

**Fase A — Infraestructura fx (1 sesión de Claude Code, modelo: Opus)**
- [S2] Crear carpeta /fx con la interfaz común init/destroy, cargar GSAP+plugins con defer, gate global de prefers-reduced-motion, y fx-progreso.js.
- [S2] fx-trazo.js aplicado al flujograma existente.
- [S2] fx-tipografia.js en las dos frases clave.

**Fase B — Identidad (1-2 sesiones, modelo: Fable si el shader se pone difícil)**
- [S2] fx-campo.js: shader OGL con las nueve bandas. Iterar hasta que sea subliminal: si se nota demasiado, está mal.
- [S2] fx-capas.js: rediseño de la anatomía con Flip + accesibilidad por teclado.
- [S2] fx-audio.js: portar módulo SEED OS, implementar el acorde constitucional y los 2 sonidos de UI. Toggle en nav.

**Fase C — Laboratorio (2-3 sesiones, modelo: Fable para el motor de reglas, Opus para el resto)**
- [S3] /laboratorio con Sala de Verificación (motor de reglas + integración fx-capas + audio).
- [S3] Generador de Constitución con descarga md/PDF.
- [S3] Registro de auditoría client-side.
- [S3] Bitácora GitHub en footer + formulario Supabase.
- [S4] ContratoClaro versión B (serverless) — SOLO tras decidir presupuesto de API.

**Prompts de arranque para Claude Code:**

Fase A: "Lee CLAUDE.md y docs/sprint-visual-lab.md. Ejecuta la Fase A completa. Antes de escribir código, propón la interfaz común de los módulos /fx y espera mi OK. Verifica con prefers-reduced-motion activado que la página queda estática."

Fase B (shader): "Lee la sección fx-campo.js de docs/sprint-visual-lab.md. Implementa el shader con OGL. Criterio de aceptación: a un metro de la pantalla el fondo parece estático; a 30cm se percibe el movimiento. Dame 3 variantes de intensidad para elegir."

Fase C (sala): "Lee la sección 4.1. Diseña primero el esquema JSON del motor de reglas (consulta → evaluación por capa → veredicto → cláusula citada) y muéstramelo antes de implementar. Las 9 capas deben mapear 1:1 con las de la anatomía existente."

---

## 6. Qué NO hacer (extensión del CLAUDE.md)

- Ningún efecto sin concepto del método que lo justifique.
- Ningún sonido con samples ni volumen protagonista; sonido apagado por defecto siempre.
- Ninguna librería de animación adicional a GSAP + OGL (nada de three.js completo, Lottie, tsParticles, Lenis).
- El Laboratorio nunca simula ser IA en vivo cuando no lo es: el rótulo de simulación es innegociable.
- La API key de Anthropic jamás toca el cliente.
