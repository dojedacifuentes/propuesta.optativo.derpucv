---
name: diat-curso
description: Desarrollar y mantener el curso DIAT de IA y Derecho (PUCV). Úsala al editar cualquier archivo del curso (app.html, landing.html, optativo.html, informe.html): modificar contenidos, añadir módulos, escenarios, vistas o herramientas, actualizar normativa o datos de mercado, y mantener el estándar visual DIAT y los guardarraíles de honestidad.
---

# Skill: desarrollar el curso DIAT (IA y Derecho · PUCV)

Procedimiento para evolucionar la suite del curso sin romper su coherencia. Lee primero `CLAUDE.md` (mapa, tokens, reglas) y `CONTEXTO.md` (tesis, hechos, guardarraíles).

## Antes de editar
1. Identifica el archivo correcto (ver tabla en `CONTEXTO.md` §6).
2. Si tocas contenido del curso, recuerda que **vive como arrays JS** al final de `<script>` en `app.html` (`MODS`, `SCN`, `INBOX`, `QS`) y como HTML estático en las vistas `#v-objetivos` / `#v-materiales`.
3. Carga mentalmente el estándar visual DIAT (tokens en `CLAUDE.md`).

## Reglas que esta skill siempre hace cumplir
- **Sin frameworks/build/backend.** Estado en memoria, no `localStorage`.
- **Nunca `\uXXXX` en HTML/CSS/SVG** — usa UTF-8 real o entidades. (En JS sí.)
- **Honestidad:** sin testimonios/cifras/urgencia inventados; normativa "a reconfirmar"; doctrina "a curar por la cátedra"; cifras de proveedor marcadas como tendencia.
- **Coherencia cruzada:** un cambio de contenido se refleja en `app.html`, `optativo.html`, `landing.html`, los `.docx` (si aplica) y `CONTEXTO.md`.

## Tareas frecuentes (paso a paso)

### A. Añadir/editar un módulo
1. En `app.html`, edita el array `MODS`. Formato: `{mx:'M·07', ti:'Título', sub:'Subtítulo', cont:['...'], apr:['...']}`. `cont` = contenidos; `apr` = aprendizajes esperados (verbos medibles).
2. Refleja el cambio en la malla de `optativo.html` (tabla de 16 semanas) y, si cambia el alcance, en los `.docx`.
3. Verifica el acordeón en la vista Contenidos.

### B. Añadir/editar un escenario o herramienta del proyecto
1. Escenarios: array `SCN` en `app.html` (`{t, brief, tools}`) + una tarjeta `.scn` con `data-scn` en `#scnGrid`.
2. Herramienta interactiva nueva: añade un bloque `.tool` en la vista Herramientas; si tiene lógica, agrégala al `<script>` siguiendo el patrón de `calcRisk()`.

### C. Actualizar normativa o datos de mercado
1. Busca en todos los `.html`: `21.719`, `16.821-19`, `24%`, `dic. 2026`, `segundo trámite`.
2. Actualiza con la fuente nueva y conserva el matiz "a reconfirmar a la fecha".
3. Si cambia una cifra de mercado, ajústala también en los gráficos SVG de `informe.html`.

### D. Añadir una vista a la plataforma
1. `<div class="view" id="v-NOMBRE">…</div>` en `app.html`.
2. `<div class="tab" data-view="NOMBRE">Etiqueta</div>` en `#tabs`.
3. Estructura con `.ey` + `h2` + tarjetas `.card`. El router (delegación sobre `data-view`/`data-go`) ya la conecta.

### E. Reskin / ajuste visual
- Cambia solo los tokens en `:root`. No hardcodees colores. Mantén el minimalismo (efectos medidos).

## Verificación de salida (siempre)
1. Sin `\uXXXX` en HTML. 2. Render correcto escritorio/móvil. 3. Consola sin errores. 4. Guardarraíles respetados. 5. Coherencia entre archivos.
