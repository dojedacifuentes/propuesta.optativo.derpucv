# Derecho + IA — Propuesta preliminar de curso optativo · Escuela de Derecho PUCV

Plataforma que presenta una **propuesta preliminar** de curso optativo de Inteligencia Artificial y Derecho para la Escuela de Derecho de la Pontificia Universidad Católica de Valparaíso, como **base de trabajo** para la Dirección. No es una versión final.

**Autor:** Diego Hernán Ojeda Cifuentes · Licenciado en Ciencias Jurídicas. Proyecto personal. `DER-IA · OPT 2026`.

**Sitio en vivo:** https://propuesta-optativo-derpucv.vercel.app

Tesis: formar estudiantes capaces de **comprender, diseñar y evaluar** agentes de IA en el trabajo jurídico. La fortaleza teórica de la Escuela —teoría de la normatividad— es exactamente la competencia que exige gobernar estos sistemas. La metodología del curso es el **Método Constitucional**: cada agente opera bajo una constitución escrita (fuentes, reglas, límites, revisión humana) que el estudiante redacta y defiende.

---

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| `index.html` | **La propuesta.** 9 secciones canónicas (`#hero → #nota`): problema, método, prueba, curso de 16 semanas, beneficios, logística para la Dirección, decisión. Incluye modo presentación (5 min) y dossiers PDF descargables. |
| `laboratorio.html` | **El laboratorio.** Sala de Verificación (motor de reglas determinista, local, rotulado como simulación), Generador de Constitución (asistente de 9 pasos con descarga .md/PDF), registro de auditoría y bitácora de commits reales vía API de GitHub. |
| `educacion-continua.html` | Trayecto para egresados y abogados: **tres programas diferenciados**, separados del optativo de pregrado. |
| `resumen-ejecutivo.html` | Minuta clara de 2 páginas (versión imprimible del resumen). |
| `fx/` | Sistema de efectos por módulos (`FX.registrar`, bus de eventos, respeto de `prefers-reduced-motion`): progreso articulado, trazo SVG, tipografía variable, campo normativo WebGL, anatomía por capas, audio constitucional opt-in. |
| `docs/` | Issues del sprint, guion visual y `esquema-motor-reglas.json` (spec del motor del laboratorio). |
| `pdf-fonts.js` | IBM Plex embebida para los PDF vectoriales (pdfmake); se carga bajo demanda. |

**`CLAUDE.md` es el documento rector**: arquitectura de 9 secciones, guardarraíles de honestidad, filtro anti-genérico y hoja de ruta por sprints. Ante cualquier duda, manda `CLAUDE.md`. `CONTEXTO.md` conserva la tesis, los hechos verificados y la historia de decisiones.

## Sin build

Todo es HTML/CSS/JS estático. Sin framework, sin bundler, sin backend. Por CDN cargan solo fuentes, iconos, GSAP, OGL (opcional, con degradación) y pdfmake (bajo demanda). Para previsualizar basta un servidor estático:

```bash
npx serve .        # o cualquier equivalente
```

## Estructura del contenido

Los contenidos editables viven como **arrays JS** al final de cada página (`MODULES`, `PROGRAMS`, `PITCH`, `DEMO`, `CAPAS`, `GUIAS`, …). Se edita el array y la sección se re-renderiza. El mapa completo está en `CLAUDE.md`.

> En HTML/CSS/SVG usar siempre caracteres UTF-8 reales o entidades (`—`, `→`, `°`), nunca escapes `\uXXXX` (se renderizan literales). En JS dentro de `<script>` sí funcionan.

## Desplegar (Vercel)

Sitio estático con `cleanUrls` (`vercel.json`). Cada push a `main` se publica automáticamente.

---

Propuesta preliminar para revisión institucional. Las demostraciones son simulaciones locales con motor de reglas, sin IA en vivo y sin base de datos. Estado regulatorio citado al **1 de julio de 2026**; reconfirmar a la fecha de uso.
