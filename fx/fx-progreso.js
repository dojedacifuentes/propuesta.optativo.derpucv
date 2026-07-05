/**
 * fx/fx-progreso.js — Progreso como articulado
 * Concepto del método: gobernar = codificar.
 *
 * En vez de una barra de progreso genérica, el nav muestra el avance
 * como articulado legal: "Art. 3° de 9 — El Método Constitucional".
 * Una línea fina bajo el nav marca el progreso continuo del scroll.
 *
 * Uso HTML:
 *   <nav id="nav">
 *     ...
 *     <span id="fx-articulo" aria-live="polite"></span>
 *     <span id="fx-linea" aria-hidden="true"></span>
 *   </nav>
 *   Cada macro-sección: <section data-fx-articulo="El Método Constitucional">
 *
 * Sin dependencias. La línea usa CSS Scroll-Driven Animations si existen;
 * si no, fallback con scroll listener pasivo. El texto usa IntersectionObserver.
 * Funciona igual con reduced-motion: es información, no decoración.
 */

import { FX } from './core.js';

const ORDINAL = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°', '10°', '11°', '12°'];

let observer = null;
let onScroll = null;

function inyectarEstilos() {
  if (document.getElementById('fx-progreso-css')) return;
  const css = document.createElement('style');
  css.id = 'fx-progreso-css';
  css.textContent = `
    #fx-articulo {
      font-variant-numeric: tabular-nums;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.75;
      white-space: nowrap;
    }
    #fx-linea {
      position: absolute;
      left: 0; bottom: 0;
      height: 1px;
      width: 100%;
      background: currentColor;
      opacity: 0.5;
      transform-origin: 0 50%;
      transform: scaleX(var(--fx-scroll, 0));
      pointer-events: none;
    }
    /* Vía nativa si el navegador la soporta: cero JS para la línea */
    @supports (animation-timeline: scroll()) {
      #fx-linea {
        animation: fx-linea-avance linear both;
        animation-timeline: scroll(root);
      }
      @keyframes fx-linea-avance {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
    }
  `;
  document.head.appendChild(css);
}

export const fxProgreso = {
  nombre: 'fx-progreso',

  init(root = document) {
    const salida = root.querySelector('#fx-articulo');
    const secciones = [...root.querySelectorAll('[data-fx-articulo]')];
    if (!salida || secciones.length === 0) return;

    inyectarEstilos();
    const total = secciones.length;

    // Texto del articulado: sección activa = la última cuyo tope pasó el 40% del viewport.
    observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            const i = secciones.indexOf(e.target);
            const nombre = e.target.getAttribute('data-fx-articulo');
            salida.textContent = `Art. ${ORDINAL[i] || i + 1 + '°'} de ${total} — ${nombre}`;
            FX.emit('progreso:seccion', { indice: i, nombre, total });
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    secciones.forEach((s) => observer.observe(s));

    // Línea de avance: fallback JS solo si no hay soporte nativo.
    if (!CSS.supports('animation-timeline: scroll()')) {
      const docEl = document.documentElement;
      onScroll = () => {
        const max = docEl.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        docEl.style.setProperty('--fx-scroll', p.toFixed(4));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  },

  destroy() {
    if (observer) { observer.disconnect(); observer = null; }
    if (onScroll) { window.removeEventListener('scroll', onScroll); onScroll = null; }
  },
};
