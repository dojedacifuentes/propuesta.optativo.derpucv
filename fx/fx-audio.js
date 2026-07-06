/**
 * fx/fx-audio.js — Sistema de sonido del sitio
 * Concepto del método: recorrer la estructura ES escucharla.
 *
 * Paleta sintetizada, sin samples: osciladores sine/triangle con envolventes
 * cortas y filtro lowpass — instrumento de precisión, no videojuego.
 *
 * El acorde constitucional: cada una de las 9 capas de la anatomía tiene una
 * nota de una escala pentatónica extendida (2 octavas; graves = capas
 * fundacionales). Enfocar una capa toca su nota (vía fx:capas:activa); la
 * primera vista completa de la anatomía reproduce el acorde arpegiado ~600ms
 * (vía fx:capas:completa). Momento sonoro firma del sitio.
 *
 * Micro-feedback (DOS sonidos de UI en total, regla dura del plan):
 *   1. tick filtrado (<20ms) al cambiar de sección (vía fx:progreso:seccion)
 *   2. timbre grave seco al presionar el CTA primario de #decision
 *
 * Reglas duras: TODO silenciado por defecto; el AudioContext se crea recién
 * con el gesto del usuario (toggle #soundToggle, estado en localStorage);
 * prefers-reduced-motion implica silencio; master ≈ -18dB percibido.
 */

import { FX } from './core.js';

const CLAVE_LS = 'fx-audio-on';
/* A2 = 110Hz; pentatónica menor extendida: 9 notas, graves primero */
const SEMITONOS = [0, 3, 5, 7, 10, 12, 15, 17, 19];
const FRECUENCIAS = SEMITONOS.map((s) => 110 * Math.pow(2, s / 12));

const ICONO_ON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>';
const ICONO_OFF = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>';

let ctx = null;
let master = null;
let activo = false;
let toggle = null;
const desuscribir = [];
let onToggle = null;
let onCTA = null;
let ctaEl = null;

function asegurarContexto() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.125; /* ≈ -18dB: se intuye, no se impone */
  master.connect(ctx.destination);
}

function puedeSonar() {
  return activo && ctx && FX.motionOK;
}

/** Voz base: sine + triangle desafinado, lowpass, envolvente corta. */
function voz(freq, t0, dur, gainPico, lowpass) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gainPico, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = lowpass;
  f.Q.value = 0.8;
  const o1 = ctx.createOscillator();
  o1.type = 'sine';
  o1.frequency.value = freq;
  const o2 = ctx.createOscillator();
  o2.type = 'triangle';
  o2.frequency.value = freq;
  o2.detune.value = 5;
  const mezclaO2 = ctx.createGain();
  mezclaO2.gain.value = 0.35;
  o1.connect(f); o2.connect(mezclaO2); mezclaO2.connect(f);
  f.connect(g); g.connect(master);
  o1.start(t0); o2.start(t0);
  o1.stop(t0 + dur + 0.05); o2.stop(t0 + dur + 0.05);
}

function nota(indice) {
  if (!puedeSonar()) return;
  const freq = FRECUENCIAS[Math.max(0, Math.min(8, indice))];
  voz(freq, ctx.currentTime, 0.42, 0.5, 2200);
}

function acorde() {
  if (!puedeSonar()) return;
  const t0 = ctx.currentTime;
  FRECUENCIAS.forEach((f, i) => voz(f, t0 + i * 0.065, 0.5, 0.34, 2400)); /* arpegio ~600ms */
}

function tick() {
  if (!puedeSonar()) return;
  const t0 = ctx.currentTime;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.018); /* <20ms */
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = 6;
  const o = ctx.createOscillator();
  o.type = 'square'; o.frequency.value = 1900;
  o.connect(f); f.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + 0.03);
}

function timbre() {
  if (!puedeSonar()) return;
  voz(138.59, ctx.currentTime, 0.16, 0.6, 900); /* C#3 grave, seco */
}

/** Bloqueo constitucional: dos voces a un semitono — breve, disonante, sobrio. */
function disonancia() {
  if (!puedeSonar()) return;
  const t0 = ctx.currentTime;
  voz(146.83, t0, 0.3, 0.4, 1100); /* D3  */
  voz(155.56, t0, 0.3, 0.4, 1100); /* D#3 */
}

function pintarToggle() {
  if (!toggle) return;
  toggle.innerHTML = activo ? ICONO_ON : ICONO_OFF;
  toggle.classList.toggle('on', activo);
  toggle.title = activo ? 'Silenciar' : 'Activar sonido';
  toggle.setAttribute('aria-pressed', String(activo));
}

export const fxAudio = {
  nombre: 'fx-audio',

  init(root = document) {
    toggle = root.querySelector('#soundToggle');

    activo = localStorage.getItem(CLAVE_LS) === '1' && FX.motionOK;
    pintarToggle();
    /* Nota: aunque venga activo de una visita anterior, el contexto solo se
       crea con un gesto; el primer sonido real llega tras interacción. */

    if (toggle) {
      onToggle = () => {
        activo = !activo;
        localStorage.setItem(CLAVE_LS, activo ? '1' : '0');
        if (activo) { asegurarContexto(); nota(4); } /* confirmación: la nota central */
        pintarToggle();
      };
      toggle.addEventListener('click', onToggle);
    }

    /* Los dos sonidos de UI + el acorde, por el bus de eventos */
    desuscribir.push(FX.on('progreso:seccion', () => { asegurarSiActivo(); tick(); }));
    desuscribir.push(FX.on('capas:activa', (e) => { asegurarSiActivo(); nota(e.detail.indice); }));
    desuscribir.push(FX.on('capas:completa', () => { asegurarSiActivo(); acorde(); }));
    /* Sala de Verificación (Laboratorio): cada capa que aprueba suena su nota; un bloqueo, disonancia */
    desuscribir.push(FX.on('verificacion:capa', (e) => {
      asegurarSiActivo();
      if (e.detail.veredicto === 'bloquea') disonancia();
      else if (e.detail.veredicto !== 'omite') nota(e.detail.indice);
    }));

    ctaEl = root.querySelector('#decision .primary-command');
    if (ctaEl) {
      onCTA = () => { asegurarSiActivo(); timbre(); };
      ctaEl.addEventListener('click', onCTA);
    }

    function asegurarSiActivo() { if (activo && !ctx) asegurarContexto(); }
  },

  destroy() {
    desuscribir.forEach((off) => off());
    desuscribir.length = 0;
    if (toggle && onToggle) toggle.removeEventListener('click', onToggle);
    if (ctaEl && onCTA) ctaEl.removeEventListener('click', onCTA);
    toggle = null; onToggle = null; ctaEl = null; onCTA = null;
    /* El AudioContext se conserva: cerrar y reabrir cuesta más que dejarlo. */
  },
};
