# CLAUDE.md — Cómo seguir desarrollando esta plataforma

Orienta a Claude Code para **seguir desarrollando** la propuesta del curso de IA y Derecho de **Diego Hernán Ojeda Cifuentes** (Lic. Ciencias Jurídicas) para la Escuela de Derecho PUCV. Lee también `CONTEXTO.md` (tesis, decisiones, hechos, guardarraíles) antes de cambios de fondo.

> **Importante:** este es un proyecto **independiente, fuera del programa DIAT**. No introducir marca, logos ni nomenclatura "DIAT" en el contenido visible. El autor pertenece a DIAT, pero estos cursos están fuera de esa esfera.

> Skill: `.claude/skills/diat-curso/SKILL.md`. Comandos: `.claude/commands/`.

---

## Qué es este proyecto

Una **única plataforma**: `index.html`, SPA de un solo archivo, autocontenida (HTML/CSS/JS), sin build ni backend. Se abre directo en el navegador y se despliega como sitio estático (Vercel). Vende la **experiencia** del curso optativo a la dirección de la Escuela (audiencia: director, poco tiempo → abre con resumen ejecutivo).

**Principio rector:** el curso enseña a *construir, verificar y gobernar*, no solo a usar. El módulo de desarrollo de aplicaciones es la **columna vertebral** (empieza ahí) y el curso cierra con un **prototipo funcional sobre Supabase**. Metodología **ABP**: cada sesión es teórico-práctica. No diluir esa tesis (ver `CONTEXTO.md` §2).

---

## Reglas de oro (no romper)

1. **Sin frameworks, sin build, sin backend.** Vanilla HTML/CSS/JS, todo en `index.html`. Estado **en memoria** (no `localStorage` salvo que se pida).
2. **Bug de escapes Unicode en HTML.** En HTML/CSS/SVG usa **caracteres UTF-8 reales o entidades** (`—`, `→`, `°`, `·`, `&mdash;`). **Nunca** `\uXXXX` (en HTML se renderiza literal). Dentro de `<script>`, en cadenas JS, `\uXXXX` sí vale.
3. **Sin marca DIAT** en el contenido visible. Atribución: Diego Hernán Ojeda Cifuentes · Escuela de Derecho PUCV.
4. **Guardarraíles de honestidad** (`CONTEXTO.md` §4): nada de testimonios/cifras de matrícula/urgencia inventados; normativa "a reconfirmar"; doctrina "a curar por la cátedra"; cifras de mercado como tendencia de industria.
5. **Verificar el render** tras editar (abrir en navegador). Respetar `prefers-reduced-motion`.

---

## Estándar visual (tokens exactos)

Estética cyber-jurídica legible (registro "war room": fondo neural reactivo al mouse, scanlines, HUD), formal y académica. Tokens en `:root` de `index.html`:

```css
--bg:#020306; --panel:rgba(5,10,14,0.86);
--cyan:#4be7ff; --cyan-soft:#8df6ff;
--gold:#e0b04a; --mint:#54d6a0; --red-bright:#e44949;
--white:#f6f0df; --muted:#9ba7ad;
```
- **Tipografías:** Cinzel (títulos display), JetBrains Mono (etiquetas/datos/código), Inter (cuerpo).
- **Semántica de color:** cian = acento/foco; oro = dato/marca/tesis; verde menta = práctica/"constructor"; coral/rojo = riesgo/límite. Con moderación.
- **Efectos (sin sobrecargar):** canvas neural reactivo al cursor + glow que lo sigue, scanlines, vignette HUD, sonido opt-in (WebAudio), tarjetas con hover-lift. Nada más sin pedirlo.

---

## Mapa de contenidos en `index.html` (dónde editar qué)

`index.html` = `<style>` (todo el CSS) · `<main>` con seis `<section class="section-view">` (`resumen`, `experiencia`, `ruta`, `herramientas`, `sello`, `egresados`) · un `<script>` final con los datos y la lógica. **Casi todo el contenido editable vive como arrays JS al inicio del `<script>`:**

- **Arco de la experiencia** → `EXPERIENCE` (array): `{ n, t, d, pills:[[clase,label]] }`. Sección Experiencia.
- **Módulos del curso** → `MODULES` (array): `{ mx, kind, t, sub, teoria:[], practica:[], entregable:[] }`. `kind` = `"spine"` (M0, columna vertebral) / `"final"` (defensa) / `""`. Sección Ruta (acordeón).
- **Herramientas** → `TOOLS_CORE` y `TOOLS_AGENTS` (arrays): `{ k(glifo), name, tag, url, color, body, steps:[] }`. Tarjetas clicables. Sección Stack.
- **Diferenciadores** → `DIFFS` · **Competencias** → `COMPS` (`{t,d,ic}`, `ic` = icono lucide). Sección Sello.
- **Trayecto egresados** → `EC` (array N1/N2/N3). Sección Egresados.
- **Ticker** → `TICKER` (array de strings).
- **Resumen ejecutivo** (hero, specs, stats) → HTML estático dentro de `#s-resumen`.

> Coherencia: si cambias un módulo o cifra, refléjalo también en `CONTEXTO.md`.

---

## Playbooks de edición

**Añadir/cambiar un módulo:** edita `MODULES`. Cada módulo necesita `teoria`, `practica` y `entregable` (ABP: siempre las tres). El primero (`kind:"spine"`) y el último (`kind:"final"`) marcan la columna vertebral y la defensa.

**Añadir una herramienta:** agrega un objeto a `TOOLS_CORE` (flujo troncal: construir/versionar/publicar/datos) o `TOOLS_AGENTS` (agentes/conocimiento). Da `url` oficial, `color` de marca y `steps` (mini-tutorial: cuenta + workflow).

**Actualizar normativa o datos de mercado:** busca `21.719`, `16.821-19`, `24%`, `dic. 2026` en `index.html` y `CONTEXTO.md`; actualiza y conserva "a reconfirmar".

**Reskin/ajuste visual:** cambia solo los tokens en `:root`. No hardcodees colores. Verifica contraste y `prefers-reduced-motion`.

**Versión gemela de egresados:** expandir la sección `egresados` / `EC` a su propia experiencia con los tres niveles y sus requisitos distintos (educación continua, mayor carga, casos reales). Código `DER-IA · EC-2026`.

---

## Previsualizar y desplegar

- **Previsualizar:** abrir `index.html` en el navegador. Solo fuentes (Google Fonts) e iconos (lucide) cargan por CDN; el resto es autocontenido.
- **Desplegar (Vercel):** sitio estático. Conectar el repo a Vercel → auto-deploy en cada push a `main`. `vercel.json` activa `cleanUrls`.

## Verificación rápida tras un cambio
- ¿Quedó algún `\uXXXX` en el HTML? (no debe).
- ¿Render correcto en escritorio y móvil? ¿Consola sin errores?
- ¿Sin marca DIAT en lo visible? ¿Se respetan los guardarraíles de honestidad?
