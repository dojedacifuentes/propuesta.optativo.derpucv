/**
 * fx/core.js — Núcleo del sistema de efectos
 * propuesta.optativo.derpucv
 *
 * Interfaz común: cada módulo exporta { nombre, init(root, opts), destroy() }.
 * El núcleo registra módulos, aplica el gate global de prefers-reduced-motion
 * y expone window.FX para depuración y para el registro de auditoría futuro.
 *
 * Regla de CLAUDE.md: con reduced-motion activo, la página queda en su
 * estado final estático (diagramas dibujados, tipografía en peso final).
 * Los módulos NUNCA deciden esto por su cuenta: consultan FX.motionOK.
 */

const registro = new Map();
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

export const FX = {
  /** true si el usuario acepta movimiento */
  get motionOK() {
    return !mq.matches;
  },

  /** Bus mínimo de eventos (lo usará fx-audio y el registro de auditoría) */
  emit(evento, detalle = {}) {
    document.dispatchEvent(new CustomEvent(`fx:${evento}`, { detail: detalle }));
  },

  on(evento, fn) {
    document.addEventListener(`fx:${evento}`, fn);
    return () => document.removeEventListener(`fx:${evento}`, fn);
  },

  /** Registra e inicializa un módulo. */
  registrar(modulo, root = document, opts = {}) {
    if (registro.has(modulo.nombre)) {
      console.warn(`[FX] Módulo duplicado ignorado: ${modulo.nombre}`);
      return;
    }
    try {
      modulo.init(root, opts);
      registro.set(modulo.nombre, modulo);
      this.emit('modulo:init', { nombre: modulo.nombre });
    } catch (err) {
      // Un efecto jamás rompe la página: falla en silencio hacia el usuario.
      console.error(`[FX] Falló init de ${modulo.nombre}:`, err);
    }
  },

  destruir(nombre) {
    const m = registro.get(nombre);
    if (m) {
      try { m.destroy(); } catch (err) { console.error(`[FX] Falló destroy de ${nombre}:`, err); }
      registro.delete(nombre);
    }
  },

  destruirTodo() {
    [...registro.keys()].forEach((n) => this.destruir(n));
  },

  listar() {
    return [...registro.keys()];
  },
};

// Si el usuario cambia la preferencia de movimiento en vivo,
// reiniciamos los módulos para que adopten el modo correcto.
mq.addEventListener('change', () => {
  const activos = FX.listar();
  FX.destruirTodo();
  FX.emit('motion:cambio', { motionOK: FX.motionOK, modulos: activos });
  // Cada página decide re-inicializar en su bootstrap escuchando fx:motion:cambio.
});

// Exposición para depuración y para el panel de auditoría del Laboratorio.
window.FX = FX;
