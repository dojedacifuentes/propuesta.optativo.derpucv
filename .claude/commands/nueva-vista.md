Añade una sección nueva a la plataforma (`index.html`).

Pasos:
1. Crea `<section class="section-view" id="s-NOMBRE"> … </section>` siguiendo la estructura de las existentes (`.section-head` con `.eyebrow` + `h2`, y tarjetas/grids `.grid-3` / `.link-card`).
2. Añade su botón de navegación: `<button type="button" class="mode-btn" data-go="NOMBRE"><i data-lucide="ICONO"></i><span>Etiqueta</span></button>` dentro de `.mode-switch`.
3. No hace falta tocar el router: la delegación sobre `data-go` ya conecta el botón con la sección `s-NOMBRE`.
4. Si la sección tiene contenido repetitivo, añádelo como array JS y renderízalo (patrón de `renderModules`/`renderTools`).
5. Usa solo tokens de `:root` y efectos medidos. Verifica render y consola.

Pídeme el nombre de la sección, su icono y su contenido si no te lo doy.
