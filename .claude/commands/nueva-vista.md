Añade una vista nueva a la plataforma operativa (`app.html`).

Pasos:
1. Crea `<div class="view" id="v-NOMBRE"> … </div>` siguiendo la estructura de las vistas existentes (sección con `.ey` + `h2` + tarjetas `.card`).
2. Añade su pestaña: `<div class="tab" data-view="NOMBRE">Etiqueta</div>` dentro de `#tabs`.
3. No hace falta tocar el router: la delegación sobre `data-view`/`data-go` ya conecta la pestaña.
4. Usa solo tokens DIAT (`:root`) y efectos medidos. Verifica render y consola.

Pídeme el nombre de la vista y su contenido si no te lo doy.
