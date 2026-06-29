# Derecho + IA — Propuesta de curso optativo · Escuela de Derecho PUCV

Plataforma-propuesta de un **curso optativo de Inteligencia Artificial y Derecho** para la Escuela de Derecho de la Pontificia Universidad Católica de Valparaíso.

**Autor:** Diego Hernán Ojeda Cifuentes · Licenciado en Ciencias Jurídicas.
Proyecto independiente, **fuera del programa DIAT**. `DER-IA · OPT 2026`.

Tesis: el curso enseña a **construir, verificar y gobernar** sistemas de IA —no solo a usarlos—. La fortaleza teórica de la Escuela es la habilidad más escasa del momento: diseñar las reglas y gobernar los sistemas que integran a los modelos.

---

## Qué hay aquí

| Archivo | Descripción |
|---|---|
| `index.html` | **La plataforma**. SPA de un solo archivo, autocontenida: resumen ejecutivo (para dirección), experiencia del curso, ruta de 16 semanas, stack de herramientas con tutoriales, sello/competencias y trayecto para egresados. Fondo neural reactivo al mouse, sonido opt-in. |

Documentación: **`CONTEXTO.md`** (tesis, decisiones, hechos verificados, guardarraíles) y **`CLAUDE.md`** (cómo seguir desarrollando con Claude Code).

## Sin build

Todo es HTML/CSS/JS **autocontenido**. Sin framework, sin bundler, sin backend. Estado en memoria. Para previsualizar, abre `index.html` en el navegador (solo las fuentes e iconos cargan por CDN).

## Estructura del contenido

Los contenidos editables viven como **arrays JS** al final de `index.html`: `EXPERIENCE`, `MODULES`, `TOOLS_CORE`, `TOOLS_AGENTS`, `DIFFS`, `COMPS`, `EC`, `TICKER`. Edita el array y se re-renderiza. Ver `CLAUDE.md`.

> En HTML/CSS/SVG usa siempre caracteres UTF-8 reales o entidades (`—`, `→`, `°`), nunca escapes `\uXXXX` (se renderizan literales). En JS dentro de `<script>` sí funcionan.

## Desarrollar con Claude Code

- **`CLAUDE.md`** — mapa del proyecto, estándar visual, dónde editar cada contenido. Claude Code lo lee solo.
- **`.claude/skills/`** y **`.claude/commands/`** — skill y comandos de apoyo.

## Desplegar (Vercel)

Sitio estático. Conecta este repositorio a Vercel y cada push a `main` se publica solo.

```bash
vercel            # preview
vercel --prod     # producción
```

---

Borrador para revisión institucional. Experiencias interactivas en memoria, sin base de datos. Estado regulatorio y datos de mercado **a reconfirmar a la fecha de uso**.
