/**
 * fx/fx-capas.js — Anatomía de 9 capas expandida
 * Concepto del método: la Constitución como estructura.
 *
 * Vista "explotada" de la cascada de compuertas existente (#cmfGates):
 * al enfocar (hover o teclado) una capa, las demás bajan a 20% de opacidad
 * y retroceden en el eje Z; la capa activa se adelanta. La selección por
 * clic/Enter (detalle a la derecha) ya existe y no se toca.
 *
 * Emite por el bus de core.js:
 *   fx:capas:activa   { indice }  — al enfocar una capa (fx-audio toca su nota)
 *   fx:capas:completa {}          — 1ª vez que la anatomía entra completa al
 *                                   viewport (fx-audio toca el acorde)
 *
 * Accesibilidad: las capas son <button> (focusables, Enter selecciona).
 * Con prefers-reduced-motion no hay transforms; los eventos siguen fluyendo
 * (el audio se silencia solo por su propia regla).
 */

import { FX } from './core.js';

let gates = [];
let lista = null;
let io = null;
let completaEmitida = false;
const handlers = [];

function aplicar(indiceActivo) {
  const g = window.gsap;
  gates.forEach((gate, i) => {
    const activo = i === indiceActivo;
    const props = indiceActivo === -1
      ? { opacity: 1, z: 0, scale: 1 }
      : activo
        ? { opacity: 1, z: 34, scale: 1.015 }
        : { opacity: 0.2, z: -26, scale: 0.995 };
    if (g && FX.motionOK) {
      g.to(gate, { ...props, duration: 0.32, ease: 'power2.out', overwrite: 'auto' });
    } else if (FX.motionOK) {
      gate.style.opacity = props.opacity;
      gate.style.transform = `translateZ(${props.z}px) scale(${props.scale})`;
    }
  });
}

export const fxCapas = {
  nombre: 'fx-capas',

  init(root = document) {
    lista = root.querySelector('#cmfGates');
    if (!lista) return;
    gates = [...lista.querySelectorAll('.cmf-gate')];
    if (gates.length === 0) return;

    /* Escenario 3D sobrio; los transforms viven en cada compuerta */
    lista.style.perspective = '900px';
    if (FX.motionOK) {
      gates.forEach((g) => {
        g.style.transformStyle = 'preserve-3d';
        g.style.willChange = 'transform, opacity';
      });
    }

    gates.forEach((gate, i) => {
      const entra = () => { aplicar(i); FX.emit('capas:activa', { indice: i }); };
      gate.addEventListener('mouseenter', entra);
      gate.addEventListener('focus', entra);
      handlers.push([gate, 'mouseenter', entra], [gate, 'focus', entra]);
    });
    const sale = () => aplicar(-1);
    lista.addEventListener('mouseleave', sale);
    lista.addEventListener('focusout', (e) => { if (!lista.contains(e.relatedTarget)) sale(); });
    handlers.push([lista, 'mouseleave', sale]);

    /* El acorde constitucional: 1ª entrada completa de la anatomía al viewport */
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.55 && !completaEmitida) {
            completaEmitida = true;
            FX.emit('capas:completa', {});
            io.disconnect();
          }
        });
      }, { threshold: [0.55] });
      io.observe(lista);
    }
  },

  destroy() {
    handlers.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn));
    handlers.length = 0;
    if (io) { io.disconnect(); io = null; }
    gates.forEach((g) => { g.style.opacity = ''; g.style.transform = ''; g.style.willChange = ''; });
    if (lista) lista.style.perspective = '';
    gates = []; lista = null; completaEmitida = false;
  },
};
