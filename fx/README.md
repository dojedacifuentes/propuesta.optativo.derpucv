# /fx — Sistema de efectos del sitio

Módulos de efectos reutilizables. Regla de oro (CLAUDE.md): **cada efecto encarna un concepto del Método Constitucional o no existe**. Interfaz común: cada módulo exporta `{ nombre, init(root, opts), destroy() }` y se registra vía `FX.registrar()`.

## Integración (Fase A)

1. Copiar la carpeta `/fx` a la raíz del sitio.
2. Antes de `</body>` en `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/DrawSVGPlugin.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js" defer></script>
<script type="module" src="/fx/bootstrap.js"></script>
```

3. Marcar el HTML:
   - Cada macro-sección: `data-fx-articulo="Nombre de la sección"` (las 9 del orden canónico).
   - En el nav: `<span id="fx-articulo" aria-live="polite"></span>` y `<span id="fx-linea" aria-hidden="true"></span>` (el nav necesita `position: relative`).
   - El flujograma: `class="fx-trazo"` en el `<svg>`; etapas del proceso con `<g data-fx-orden="1">`, `<g data-fx-orden="2">`, etc.
   - Las DOS frases clave: `class="fx-frase"` (el módulo ignora una tercera y lo advierte en consola — presupuesto en código).
   - Las frases clave requieren fuente variable con eje `wght` (IBM Plex Sans Var, Inter var o similar).

## Garantías

- **Reduced-motion**: con `prefers-reduced-motion: reduce`, todo queda en estado final estático (trazos dibujados, frases en peso final). El gate vive en `core.js`; los módulos consultan `FX.motionOK`.
- **Sin GSAP no pasa nada**: si el CDN falla, los módulos degradan a estático con warning en consola. Un efecto jamás rompe la página.
- **Eventos**: los módulos emiten `fx:progreso:seccion`, `fx:trazo:etapa`, `fx:frase:entra` por el bus de `core.js`. `fx-audio` (Fase B) y el registro de auditoría (Fase C) se suscriben ahí — no habrá que tocar estos módulos.

## QA de la fase

- [ ] Con reduced-motion activado (DevTools → Rendering → Emulate CSS prefers-reduced-motion): página estática, flujograma completo, frases en peso 650.
- [ ] Bloqueando jsdelivr en DevTools (Network request blocking): la página funciona, consola muestra warnings, cero errores.
- [ ] Lighthouse: sin regresión de performance (los scripts van defer, la línea de progreso es nativa donde hay soporte).
- [ ] Teclado: el progreso `aria-live` anuncia la sección al lector de pantalla sin spamear (cambia solo al cruzar secciones).
