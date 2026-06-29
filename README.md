# Curso IA y Derecho — Programa DIAT · PUCV

Suite de materiales y **plataforma operativa** del optativo de Inteligencia Artificial y Derecho de la Escuela de Derecho de la Pontificia Universidad Católica de Valparaíso (programa DIAT).

`DER-IA · OPT-2026` · Estándar visual DIAT v1

---

## Qué hay aquí

| Archivo | Descripción |
|---|---|
| `index.html` | Hub que enlaza todo (entrada del sitio). |
| `app.html` | **Plataforma operativa** del curso (SPA): vistas, detector de nivel, panel del estudiante, bandeja de entrada, escenarios y herramientas, fondo interactivo. |
| `landing.html` | Página de presentación con arquitectura de conversión. |
| `optativo.html` | Programa del optativo en estándar visual DIAT. |
| `informe.html` | Informe-sustrato: objetivos, cambio de paradigma, benchmark y datos de mercado con gráficos. |
| `programa-pregrado.docx` | Programa de asignatura formal (Word). |
| `programa-egresados.docx` | Programa de educación continua, 3 niveles (Word). |

Documentación: **`CONTEXTO.md`** (contexto, decisiones y hechos verificados) y **`CLAUDE.md`** (cómo seguir desarrollando).

## Sin build

Todo es HTML/CSS/JS **autocontenido**. No hay framework, bundler ni backend. Para previsualizar, abre cualquier `.html` en el navegador (las fuentes cargan por CDN).

## Desarrollar con Claude Code

El repo incluye:
- **`CLAUDE.md`** — mapa del proyecto, estándar visual, dónde vive cada contenido y playbooks de edición. Claude Code lo lee automáticamente.
- **`.claude/skills/diat-curso/SKILL.md`** — skill para modificar contenidos, añadir módulos/escenarios/vistas y mantener el estándar.
- **`.claude/commands/`** — comandos: `/nuevo-modulo`, `/actualizar-normativa`, `/nueva-vista`.

Los contenidos del curso viven como arrays JS al final de `app.html` (`MODS`, `SCN`, `INBOX`, `QS`) y como HTML estático en las vistas. Ver `CLAUDE.md`.

> Nota: en HTML/CSS/SVG usa siempre caracteres UTF-8 reales o entidades (`—`, `→`, `°`), nunca escapes `\uXXXX` (se renderizan literales). En JS dentro de `<script>` sí funcionan.

## Desplegar (Vercel)

Sitio estático. `vercel.json` activa `cleanUrls` (rutas `/app`, `/landing`, `/optativo`, `/informe`).

```bash
# opción CLI
vercel            # preview
vercel --prod     # producción
```

O conecta este repositorio a Vercel para desplegar en cada push.

## Subir este repo a GitHub

Ya viene inicializado con un commit inicial. Para publicarlo:

```bash
git remote add origin https://github.com/<tu-usuario>/diat-curso-ia-derecho.git
git branch -M main
git push -u origin main
```

---

Borrador para revisión institucional. Las experiencias interactivas funcionan en memoria, sin base de datos. Estado regulatorio a reconfirmar a la fecha de uso.
