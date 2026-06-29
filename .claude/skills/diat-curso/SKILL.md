---
name: diat-curso
description: Desarrollar y mantener la plataforma-propuesta del curso de IA y Derecho de Diego Ojeda (Escuela de Derecho PUCV, fuera del programa DIAT). Úsala al editar index.html: modificar contenidos, añadir o reordenar módulos, herramientas, competencias o secciones, actualizar normativa o datos de mercado, y mantener la estética y los guardarraíles de honestidad.
---

# Skill: desarrollar la plataforma del curso (IA y Derecho · PUCV)

Procedimiento para evolucionar la plataforma sin romper su coherencia. Lee primero `CLAUDE.md` (mapa, tokens, reglas) y `CONTEXTO.md` (tesis, hechos, guardarraíles).

> Proyecto independiente de **Diego Hernán Ojeda Cifuentes**, **fuera del programa DIAT**. No usar marca DIAT en lo visible.

## Antes de editar
1. Todo vive en un solo archivo: **`index.html`**.
2. El contenido editable está como **arrays JS** al inicio del `<script>`: `EXPERIENCE`, `MODULES`, `TOOLS_CORE`, `TOOLS_AGENTS`, `DIFFS`, `COMPS`, `EC`, `TICKER`. El resumen ejecutivo (hero) es HTML estático en `#s-resumen`.
3. Carga mentalmente la estética (tokens en `CLAUDE.md`): cian/oro/menta/coral sobre void; Cinzel / JetBrains Mono / Inter.

## Reglas que esta skill siempre hace cumplir
- **Sin frameworks/build/backend.** Estado en memoria, no `localStorage`.
- **Nunca `\uXXXX` en HTML/CSS/SVG** — usa UTF-8 real o entidades. (En JS sí.)
- **Sin marca DIAT** en el contenido visible.
- **Honestidad:** sin testimonios/cifras/urgencia inventados; normativa "a reconfirmar"; doctrina "a curar por la cátedra"; cifras de mercado como tendencia.
- **ABP:** todo módulo conserva las tres columnas — `teoria`, `practica`, `entregable`.
- **Coherencia:** un cambio de contenido o cifra se refleja también en `CONTEXTO.md`.

## Tareas frecuentes (paso a paso)

### A. Añadir/editar/reordenar un módulo
1. Edita el array `MODULES`. Formato: `{ mx:'M·07', kind:'', t:'Título', sub:'Subtítulo', teoria:[...], practica:[...], entregable:[...] }`.
2. `kind`: `"spine"` = columna vertebral (M0, desarrollo de apps, va primero); `"final"` = defensa del prototipo (va último); `""` = intermedio.
3. Verifica el acordeón en la sección Ruta.

### B. Añadir/editar una herramienta del stack
1. `TOOLS_CORE` (flujo troncal: construir/versionar/publicar/datos) o `TOOLS_AGENTS` (agentes/conocimiento).
2. Formato: `{ k:'glifo', name, tag, url:'https://oficial', color:'#hex', body, steps:['cuenta','workflow','prototipo'] }`. La tarjeta es clicable completa.

### C. Actualizar normativa o datos de mercado
1. Busca en `index.html` y `CONTEXTO.md`: `21.719`, `16.821-19`, `24%`, `dic. 2026`.
2. Actualiza con la fuente nueva y conserva el matiz "a reconfirmar a la fecha".

### D. Añadir/editar una sección o el resumen ejecutivo
1. Secciones = `<section class="section-view" id="s-NOMBRE">` + su botón `data-go="NOMBRE"` en `.mode-switch`. El router (delegación sobre `data-go`) ya la conecta.
2. El resumen para dirección (hero, specs, stats) es HTML estático en `#s-resumen`: cuídalo, es lo primero que ve Aldunate.

### E. Reskin / ajuste visual
- Cambia solo los tokens en `:root`. No hardcodees colores. Efectos medidos; respeta `prefers-reduced-motion`.

## Verificación de salida (siempre)
1. Sin `\uXXXX` en HTML. 2. Render correcto escritorio/móvil. 3. Consola sin errores. 4. Sin marca DIAT. 5. Guardarraíles respetados.
