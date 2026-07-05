/**
 * fx/fx-tipografia.js — El argumento que toma cuerpo
 * Concepto del método: la frase clave gana peso a medida que entra en escena.
 *
 * Las DOS frases clave del documento (presupuesto duro de CLAUDE.md)
 * interpolan el eje de peso de su fuente variable, palabra por palabra,
 * de 300 a 650 al entrar en viewport. Nada de scramble ni glitch.
 *
 * Uso HTML:
 *   <p class="fx-frase">La Constitución no restringe al agente: lo constituye.</p>
 *   Requiere una fuente variable con eje wght (ej. IBM Plex Sans Var).
 *
 * Requiere globals: gsap, ScrollTrigger, SplitText.
 * Con reduced-motion: peso final (650) aplicado en estático.
 * PRESUPUESTO: si hay más de 2 .fx-frase, solo se animan las 2 primeras
 * y se advierte en consola — el límite vive en el código, no en la memoria.
 */

import { FX } from './core.js';

const PESO_INICIAL = 300;
const PESO_FINAL = 650;
const PRESUPUESTO = 2;

let splits = [];
let triggers = [];

function inyectarEstilos() {
  if (document.getElementById('fx-tipografia-css')) return;
  const css = document.createElement('style');
  css.id = 'fx-tipografia-css';
  css.textContent = `
    .fx-frase { font-weight: ${PESO_FINAL}; } /* estado final por defecto (no-JS, reduced-motion) */
    .fx-frase .fx-palabra {
      font-variation-settings: 'wght' var(--fx-wght, ${PESO_FINAL});
      display: inline-block;
    }
  `;
  document.head.appendChild(css);
}

export const fxTipografia = {
  nombre: 'fx-tipografia',

  init(root = document) {
    const frases = [...root.querySelectorAll('.fx-frase')];
    if (frases.length === 0) return;

    if (frases.length > PRESUPUESTO) {
      console.warn(`[fx-tipografia] ${frases.length} frases clave; el presupuesto es ${PRESUPUESTO}. Sobran ${frases.length - PRESUPUESTO} (ver CLAUDE.md).`);
    }

    inyectarEstilos();

    const g = window.gsap;
    const listo = g && window.SplitText && window.ScrollTrigger;
    if (!FX.motionOK || !listo) {
      if (!listo) console.warn('[fx-tipografia] GSAP/SplitText/ScrollTrigger no cargados; modo estático.');
      return; // el CSS ya deja las frases en peso final
    }

    g.registerPlugin(window.ScrollTrigger, window.SplitText);

    frases.slice(0, PRESUPUESTO).forEach((el) => {
      const split = new window.SplitText(el, { type: 'words', wordsClass: 'fx-palabra' });
      splits.push(split);

      g.set(split.words, { '--fx-wght': PESO_INICIAL });

      const tween = g.to(split.words, {
        '--fx-wght': PESO_FINAL,
        duration: 1.1,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          once: true, // el argumento toma cuerpo una vez; no es un truco repetible
        },
        onStart: () => FX.emit('frase:entra', { texto: el.textContent.slice(0, 60) }),
      });
      triggers.push(tween.scrollTrigger);
    });
  },

  destroy() {
    triggers.forEach((t) => t && t.kill());
    triggers = [];
    splits.forEach((s) => s.revert());
    splits = [];
  },
};
