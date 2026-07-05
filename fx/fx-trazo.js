/**
 * fx/fx-trazo.js — Dibujo de diagramas
 * Concepto del método: verificar = proceso trazable.
 *
 * Los trazos de un SVG (flujograma) se dibujan a medida que el lector
 * hace scroll, en el ORDEN del proceso: el orden de dibujo es el argumento.
 *
 * Uso HTML:
 *   <svg class="fx-trazo"> ... </svg>
 *   Orden opcional por grupos: <g data-fx-orden="1">, <g data-fx-orden="2">...
 *   Sin data-fx-orden, se dibuja todo en orden de documento.
 *
 * Requiere globals: gsap, ScrollTrigger, DrawSVGPlugin (CDN con defer).
 * Con reduced-motion: los trazos quedan dibujados al 100%, estáticos.
 */

import { FX } from './core.js';

const TRAZABLES = 'path, line, polyline, polygon, rect, circle, ellipse';
let triggers = [];

export const fxTrazo = {
  nombre: 'fx-trazo',

  init(root = document) {
    const svgs = [...root.querySelectorAll('svg.fx-trazo')];
    if (svgs.length === 0) return;

    // Estado final directo si no hay movimiento o falta GSAP: nada a medio dibujar.
    const g = window.gsap;
    const listo = g && window.DrawSVGPlugin && window.ScrollTrigger;
    if (!FX.motionOK || !listo) {
      if (!listo) console.warn('[fx-trazo] GSAP/DrawSVG/ScrollTrigger no cargados; modo estático.');
      return;
    }

    g.registerPlugin(window.ScrollTrigger, window.DrawSVGPlugin);

    svgs.forEach((svg) => {
      const grupos = [...svg.querySelectorAll('[data-fx-orden]')]
        .sort((a, b) => Number(a.dataset.fxOrden) - Number(b.dataset.fxOrden));

      // Cada grupo (o el SVG entero) es una etapa del proceso.
      const etapas = grupos.length
        ? grupos.map((el) => [...el.querySelectorAll(TRAZABLES)])
        : [[...svg.querySelectorAll(TRAZABLES)]];

      const tl = g.timeline({
        scrollTrigger: {
          trigger: svg,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
        defaults: { ease: 'none' },
      });

      etapas.forEach((trazos, i) => {
        if (trazos.length === 0) return;
        g.set(trazos, { drawSVG: '0%' });
        tl.to(trazos, {
          drawSVG: '100%',
          stagger: 0.08,
          duration: 1,
          onStart: () => FX.emit('trazo:etapa', { svg: svg.id || null, etapa: i + 1 }),
        });
      });

      triggers.push(tl.scrollTrigger);
    });
  },

  destroy() {
    triggers.forEach((t) => t && t.kill());
    triggers = [];
    // Los trazos quedan en su estado actual; al reinit se resetean con gsap.set.
  },
};
