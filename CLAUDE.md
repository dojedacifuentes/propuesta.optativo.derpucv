# CLAUDE.md — Instrucciones para desarrollar el curso DIAT

Este archivo orienta a Claude Code para **seguir desarrollando** el curso de IA y Derecho (PUCV · DIAT): modificar contenidos, adaptar la plataforma y mantener la coherencia. Lee también `CONTEXTO.md` (contexto y decisiones) antes de cambios de fondo.

> Skill asociada: `.claude/skills/diat-curso/SKILL.md`. Comandos: `.claude/commands/`.

---

## Qué es este proyecto

Suite de materiales para dos cursos de IA y Derecho. La pieza central es **`app.html`**, una plataforma operativa (SPA de un solo archivo, sin build, sin backend). Todo es HTML/CSS/JS autocontenido y se abre directo en el navegador. Se despliega como sitio estático (Vercel).

**Principio rector:** el curso enseña a *construir, verificar y gobernar*, no solo a usar. No diluir esa tesis (ver `CONTEXTO.md` §2).

---

## Reglas de oro (no romper)

1. **Sin frameworks, sin build, sin backend.** Vanilla HTML/CSS/JS. El estado del panel/bandeja es **en memoria** (no hay base de datos). No introducir `localStorage` salvo que se pida explícitamente.
2. **Bug de escapes Unicode en HTML.** Dentro de HTML/CSS/SVG usa **caracteres UTF-8 reales o entidades** (`—`, `→`, `°`, `&mdash;`, `&rarr;`). **Nunca** secuencias estilo `\u2014`: en HTML se renderizan literales. (Dentro de `<script>`, en cadenas JS, `\uXXXX` sí funciona.)
3. **Estándar visual DIAT** (abajo): cualquier UI nueva usa estos tokens y fuentes. No introducir paletas ni tipografías nuevas sin acordarlo.
4. **Guardarraíles de honestidad** (`CONTEXTO.md` §4): nada de testimonios/cifras/urgencia inventados; normativa "a reconfirmar"; doctrina "a curar por la cátedra".
5. **Verificar siempre el render.** Tras editar, abrir el archivo en un navegador (o capturar con un headless) y revisar. Respetar `prefers-reduced-motion`.

---

## Estándar visual DIAT v1 (tokens exactos)

```css
:root{
  --void:#070A12; --void-2:#0A0F1A; --panel:#0D1422; --panel-2:#101A2B;
  --line:#1B2840; --line-soft:#141E30;
  --ink:#EAEEF6; --ink-dim:#97A3B8; --ink-faint:#5C6A82;
  --cyan:#56C7F2; --cyan-deep:#2C7FB8; --cyan-glow:rgba(86,199,242,.14);
  --gold:#E0B04A; --mint:#54D6A0; --coral:#EC7E72;
}
```
- **Tipografías:** Space Grotesk (display/títulos), IBM Plex Mono (etiquetas, datos, códigos), Inter (cuerpo).
- **Motivos:** fondo con grilla técnica tenue + glow radial; eyebrows mono con guion de acento; corner-brackets cian en paneles spec/CTA; barra de sistema con reloj y coordenadas de Valparaíso (`33°02′S 71°37′O`); código de curso `DER-IA · OPT-2026`.
- **Semántica de color:** cian = acento/foco; oro = dato/marca PUCV; verde menta = "no negociable"/positivo; coral = límites/riesgo. Usar con moderación (minimalismo).
- **Efectos (sin sobrecargar):** fondo de constelación reactivo al mouse, tilt 3D en `.tilt`/`.feat`, transición de vista, contador animado. Nada más sin pedirlo.

---

## Mapa de contenidos en `app.html` (dónde editar qué)

`app.html` se compone de: `<style>` (todo el CSS) · vistas `.view` con `id="v-..."` · un `<script>` final con los datos y la lógica. **Los contenidos editables viven casi todos como arrays JS al final del `<script>`:**

- **Módulos del curso** → constante `MODS` (array). Cada módulo: `{ mx, ti, sub, cont:[...], apr:[...] }` donde `cont` = contenidos y `apr` = aprendizajes esperados. Se renderiza en la vista **Contenidos** (`#accWrap`).
- **Escenarios del proyecto** → constante `SCN` (array): `{ t, brief, tools }`. Vista **Herramientas**.
- **Bandeja de entrada** → constante `INBOX` (array): `{ f, s, b, t, r }` (remitente, asunto, cuerpo, hora, leído).
- **Detector de alfabetización** → constante `QS` (array de preguntas) + función `submitDet()` (umbrales de nivel). Vista de modal.
- **Clasificador de riesgo** → función `calcRisk()` + opciones en `#riskOpts` (atributo `data-w` = peso: `bio`/`alto`/`lim`).
- **Objetivos** → HTML estático en la vista `#v-objetivos` (general + OE1–OE8).
- **Materiales** → HTML estático en la vista `#v-materiales` (normativa, plataformas, plantillas).
- **Panel** → HTML estático en `#v-panel` (anillo de progreso, escalera, próxima entrega, accesos).
- **Hero/stats** → HTML estático en `#v-inicio`.

> Mantén la coherencia: si cambias un módulo aquí, refléjalo también en `optativo.html`, `landing.html` y, si aplica, en los `.docx` y en `CONTEXTO.md`.

---

## Playbooks de edición

**Añadir o cambiar un módulo de contenido:** edita `MODS` en `app.html` (y la malla en `optativo.html`). Cada módulo necesita `cont` (contenidos) y `apr` (aprendizajes esperados). Ver `/nuevo-modulo`.

**Actualizar normativa o datos de mercado:** busca menciones a "21.719", "16.821-19", "24%", "dic. 2026" en todos los `.html`; actualiza y vuelve a marcar "a reconfirmar". Ver `/actualizar-normativa`.

**Añadir una vista nueva a la plataforma:** 1) agrega un `<div class="view" id="v-NOMBRE">` en `app.html`; 2) agrega su `<div class="tab" data-view="NOMBRE">` en `#tabs`; 3) usa secciones con `.ey`/`h2` y tarjetas `.card`. El router ya conecta `data-view`/`data-go` automáticamente. Ver `/nueva-vista`.

**Reskin o ajuste visual:** cambia solo los tokens `:root`; no hardcodees colores. Verifica contraste y `prefers-reduced-motion`.

**Crear la versión gemela del trayecto de egresados:** clona `app.html`/`landing.html`, ajusta `MODS` a los tres niveles (N1/N2/N3) y el código a `DER-IA · EC-2026`.

---

## Previsualizar y desplegar

- **Previsualizar:** abrir el `.html` en un navegador. Las fuentes (Google Fonts) y nada más cargan por CDN; el resto es autocontenido.
- **Desplegar (Vercel):** sitio estático. `vercel.json` activa `cleanUrls` (rutas `/app`, `/landing`, `/optativo`, `/informe`). Desde la carpeta: `vercel` (preview) o `vercel --prod`. O conectar el repo a Vercel para auto-deploy en cada push.

## Verificación rápida tras un cambio
- ¿Quedó algún `\uXXXX` en el HTML? (no debe).
- ¿Render correcto en escritorio y móvil?
- ¿La consola del navegador queda sin errores?
- ¿Se respetan los guardarraíles de honestidad?
