/**
 * fx/bootstrap.js — Arranque del sistema fx en cada página
 *
 * Incluir al final del body:
 *   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
 *   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
 *   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/DrawSVGPlugin.min.js" defer></script>
 *   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js" defer></script>
 *   <script type="module" src="/fx/bootstrap.js"></script>
 */

import { FX } from './core.js';
import { fxProgreso } from './fx-progreso.js';
import { fxTrazo } from './fx-trazo.js';
import { fxTipografia } from './fx-tipografia.js';
import { fxCampo } from './fx-campo.js';
import { fxCapas } from './fx-capas.js';
import { fxAudio } from './fx-audio.js';

function arrancar() {
  FX.registrar(fxProgreso);
  FX.registrar(fxTrazo);
  FX.registrar(fxTipografia);
  FX.registrar(fxCampo);   // Fase B: fondo "campo normativo" (shader OGL, 9 bandas)
  FX.registrar(fxCapas);   // Fase B: anatomía explotada + eventos para el audio
  FX.registrar(fxAudio);   // Fase B: acorde constitucional + 2 sonidos de UI
}

// Los scripts de GSAP van con defer: al llegar aquí (module = defer implícito,
// ejecuta después de los defer clásicos) los globals ya existen.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', arrancar, { once: true });
} else {
  arrancar();
}

// Si el usuario cambia prefers-reduced-motion en vivo, re-arrancamos en el modo nuevo.
FX.on('motion:cambio', () => arrancar());
