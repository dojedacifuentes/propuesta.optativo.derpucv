/**
 * fx/fx-campo.js — Fondo generativo "campo normativo"
 * Concepto del método: la norma como campo de fuerza.
 *
 * Shader WebGL propio sobre OGL (~20kb, MIT, importado como módulo ES desde CDN):
 * un campo de interferencia monocromo, lentísimo, casi subliminal, con NUEVE
 * bandas horizontales apenas perceptibles — las nueve capas de la Constitución.
 * Reacciona al cursor con un desplazamiento sutil de fase, nunca con estela.
 *
 * Criterio de aceptación (docs/sprint-visual-lab.md): a un metro de la pantalla
 * el fondo parece estático; a 30cm se percibe el movimiento. Si se nota
 * demasiado, está mal.
 *
 * Variantes de intensidad para elegir (Diego): ?campo=1 (más tenue),
 * ?campo=2 (media, default), ?campo=3 (visible).
 *
 * Garantías: sin WebGL u OGL inaccesible → no pasa nada (el fondo #020306 y la
 * viñeta existente sostienen la página). Con prefers-reduced-motion se renderiza
 * UN frame estático. Se pausa con la pestaña oculta.
 */

import { FX } from './core.js';

const OGL_CDN = 'https://cdn.jsdelivr.net/npm/ogl@1.0.11/src/index.js';

const VARIANTES = { 1: 0.045, 2: 0.07, 3: 0.105 };

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;   /* 0..1, lerp suave */
  uniform float uAmp;
  varying vec2  vUv;

  void main(){
    vec2 uv = vUv;
    float aspecto = uRes.x / max(uRes.y, 1.0);

    /* Desplazamiento de fase por cercanía al cursor — sutil, sin estela */
    float dist = distance(vec2(uv.x * aspecto, uv.y), vec2(uMouse.x * aspecto, uMouse.y));
    float fase = uTime + dist * 1.6;

    /* Campo de interferencia: dos ondas lentas cruzadas */
    float f1 = sin(uv.x * 9.42  + fase * 0.70 + sin(uv.y * 4.0 + fase * 0.31) * 0.8);
    float f2 = sin(uv.y * 12.57 - fase * 0.52 + sin(uv.x * 3.0 - fase * 0.23) * 0.9);
    float campo = (f1 + f2) * 0.25 + 0.5;

    /* Nueve bandas horizontales apenas perceptibles: las nueve capas */
    float banda = fract(uv.y * 9.0);
    float interior = smoothstep(0.0, 0.05, banda) * smoothstep(1.0, 0.95, banda);
    float bandas = mix(0.78, 1.0, interior);

    vec3 cian = vec3(0.294, 0.906, 1.0); /* #4be7ff */
    float v = campo * uAmp * bandas;
    gl_FragColor = vec4(cian * v, v);
  }
`;

let canvas = null;
let renderer = null;
let raf = 0;
let onMove = null;
let onResize = null;
let onVis = null;

export const fxCampo = {
  nombre: 'fx-campo',

  async init() {
    if (canvas) return;
    if (!window.WebGLRenderingContext) return;

    let OGL;
    try {
      OGL = await import(OGL_CDN);
    } catch (err) {
      console.warn('[fx-campo] OGL no disponible; fondo estático.', err && err.message);
      return;
    }
    const { Renderer, Program, Mesh, Triangle } = OGL;

    const variante = Number(new URLSearchParams(location.search).get('campo')) || 2;
    const amp = VARIANTES[variante] || VARIANTES[2];

    canvas = document.createElement('canvas');
    canvas.id = 'fx-campo';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;display:block;width:100%;height:100%;';
    document.body.prepend(canvas);

    renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true, premultipliedAlpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime:  { value: 0 },
        uRes:   { value: [window.innerWidth, window.innerHeight] },
        uMouse: { value: [0.5, 0.4] },
        uAmp:   { value: amp },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });

    const mouse = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uRes.value = [window.innerWidth, window.innerHeight];
    }
    onResize = resize;
    window.addEventListener('resize', onResize);
    resize();

    function frame(t) {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      program.uniforms.uMouse.value = [mouse.x, 1.0 - mouse.y];
      program.uniforms.uTime.value = t * 0.00028; /* lentísimo */
      renderer.render({ scene: mesh });
    }

    if (!FX.motionOK) {
      frame(0); /* un frame estático: el campo existe, no se mueve */
      FX.emit('campo:listo', { variante, estatico: true });
      return;
    }

    onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const loop = (t) => { frame(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) { raf = requestAnimationFrame(loop); }
    };
    document.addEventListener('visibilitychange', onVis);

    FX.emit('campo:listo', { variante, estatico: false });
  },

  destroy() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    if (onMove) { window.removeEventListener('pointermove', onMove); onMove = null; }
    if (onResize) { window.removeEventListener('resize', onResize); onResize = null; }
    if (onVis) { document.removeEventListener('visibilitychange', onVis); onVis = null; }
    if (canvas) { canvas.remove(); canvas = null; }
    renderer = null;
  },
};
