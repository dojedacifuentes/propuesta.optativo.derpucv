Añade o edita un módulo de contenido del curso.

Pasos:
1. Abre `index.html` y localiza el array `MODULES` (al inicio del `<script>`).
2. Agrega/edita un objeto: `{mx:'M·NN', kind:'', t:'Título', sub:'Subtítulo', teoria:['...'], practica:['...'], entregable:['...']}`. ABP: siempre las tres columnas. `kind`: `'spine'` (columna vertebral, va primero) / `'final'` (defensa, va último) / `''`.
3. Mantén el orden con sentido: el desarrollo de aplicaciones es la columna vertebral (empieza ahí); el cierre es el prototipo funcional sobre Supabase.
4. Si cambia el alcance/horas, refléjalo en `CONTEXTO.md`. Verifica el acordeón de la sección Ruta y que no haya `\uXXXX` en el HTML.

Pídeme el título, el subtítulo y los tres bloques (teoría, práctica, entregable) si no me los das.
