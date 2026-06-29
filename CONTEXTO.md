# CONTEXTO — Curso IA y Derecho · Diego Ojeda Cifuentes · Escuela de Derecho PUCV

Documento de contexto portátil. Resume quién, qué, por qué y las decisiones tomadas, para que cualquier persona —o Claude Code— pueda retomar el desarrollo sin perder el hilo.

---

## 1. Quién y dónde

- **Autor:** Diego Hernán Ojeda Cifuentes, Licenciado en Ciencias Jurídicas.
- **Institución destinataria:** Pontificia Universidad Católica de Valparaíso (PUCV), Escuela de Derecho. Propuesta a presentar a la dirección (prof. Aldunate).
- **Naturaleza:** proyecto **independiente, fuera del programa DIAT** (el autor pertenece a DIAT, pero estos cursos están fuera de esa esfera). **No** usar marca/nomenclatura DIAT en el contenido visible.
- **Dos cursos:**
  - **Optativo de pregrado** (`DER-IA · OPT 2026`): semestral PUCV (16 semanas), **1 sesión/semana de 90 min**, sin requisito técnico. Eje: prototipos primero (ABP), cierre con prototipo funcional sobre Supabase.
  - **Trayecto de educación continua** para egresados y abogados: tres niveles modulares — *Abogado Aumentado* (N1, 24–32 h) → *Abogado Constructor* (N2, 48–60 h) → *Arquitecto Jurídico-Algorítmico* (N3, 90–120 h).

## 2. Tesis y posicionamiento (no cambiar sin discutirlo)

> **La fortaleza teórica de la Escuela —que parecía ajena a la tecnología— es la habilidad más escasa del futuro.**

Cuando todos sepan *usar* la IA, lo escaso será saber *construir reglas* y *gobernar sistemas*. Eso es justo lo que la tradición teórica de la Escuela ya enseña. Redactar la **"constitución"** de un agente (reglas duras vs. preferencias + su porqué) es teoría de la normatividad aplicada.

**Cinco diferenciadores** (el "terreno libre"):
1. **Construir, no solo usar.** Casi nadie en el benchmark enseña a construir herramientas.
2. **El método de la Constitución.** Sello irrepetible, anclado en la teoría de la casa.
3. **Anclaje chileno y regulatorio.** Ley 21.719 y proyecto de ley de IA; el marco europeo solo como contraste.
4. **Verificación como competencia troncal.** Transversal, no un módulo.
5. **Ciberseguridad y anonimización integradas.** El otro gran vacío del benchmark, y obligación legal en Chile.

**Eje pedagógico (cambio de paradigma):** del *prompt* → al *flujo* → a la *herramienta* → al *agente*. La unidad de aprendizaje deja de ser el prompt. Incluye meta-prompting (usar la IA para construir la instrucción), herramientas de base vs. contingentes, gestión de contexto.

**Escalera de competencia:** 1 Alfabetización → 2 Usuario crítico → 3 Constructor → 4 Arquitecto/Gobernador. El optativo cubre 1→3; el trayecto de egresados llega a 4.

## 3. Hechos verificados (reconfirmar a la fecha de uso)

**Mercado (corpus de investigación de mercado, 2025–26):**
- Adopción de IA en el sector legal chileno: **24%** — único país de la región bajo el 30%. Promedio LatAm 28%; sector financiero 37%; sector tecnológico 40%.
- CAGR del software de IA legal ≈ **29,4%** vs. LegalTech general ≈ 10%.
- Ecosistema: ALTECH (Asociación de Legaltech de Chile, fund. 2024); el estudio más grande invirtió en una plataforma de IA entrenada en derecho local.

**Regulación chilena:**
- **Ley N.° 21.719** (protección y tratamiento de datos personales; crea la Agencia de Protección de Datos). Vigencia plena programada para **diciembre de 2026**; gracia para PYMEs hasta dic. 2027; multas de hasta 20.000 UTM.
- **Proyecto de ley de IA** (Boletines 15.869-19 + 16.821-19, refundidos). Aprobado **en particular por la Cámara el 13-oct-2025**; en **segundo trámite en el Senado** (Comisión Desafíos del Futuro), urgencia simple. Modelo **basado en riesgos**.

**Benchmark de escuelas de derecho (fuentes oficiales y prensa especializada, 2025–26):**
- Harvard (AI and the Law; CS50 for Lawyers) · USC Gould (Law and AI Certificate, 12 unidades, sin requisito de título) · U. de Chicago (módulos de alfabetización 1L obligatorios desde 2026) · Berkeley (GenAI Power User 2026: "del prompting a la conversación iterativa", human-in-the-loop; + cert. AI Law & Regulation) · Penn Carey · Cornell (eCornell AI Law & Policy) · Drake (AI Law Certificate, incluye ciberseguridad) · WashU (IA en investigación jurídica 1L) · Suffolk (bots de negociación).
- Regionales: UBA/IALAB (Argentina, "abogados desarrolladores"), U. de La Sabana (Colombia), PUC Chile (Derecho e IA).
- **Hallazgo clave:** el mundo enseña a *entender* y *regular* la IA; casi nadie —excepción parcial de UBA— enseña a *construir*; prácticamente ninguno integra ciberseguridad/anonimización como competencia troncal.

## 4. Guardarraíles de honestidad (CRÍTICO — audiencia académica)

La credibilidad persuade más que la urgencia barata. **Nunca**:
- testimonios, cifras de matrícula, valoraciones o avales **inventados**;
- urgencia falsa (cuentas regresivas mentirosas);
- cifras de proveedor presentadas como dato establecido (márcalas como tendencia de industria).

**Siempre**:
- estado regulatorio "a reconfirmar a la fecha";
- rasgos de producto de IA "a verificar";
- bibliografía doctrinal específica "a curar por la cátedra" (no inventar autores/años);
- la única escasez afirmable es la real y estructural (cupo acotado por laboratorio, 20–30).

## 5. Estándar visual

Dark técnico-institucional con registro cyber-jurídico legible ("war room": fondo neural reactivo al mouse, scanlines, HUD), formal y académico. Tipografías Cinzel / JetBrains Mono / Inter. Ver tokens exactos en `CLAUDE.md`.

## 6. Entregables del proyecto (en este repo)

| Archivo | Qué es |
|---|---|
| `index.html` | **La plataforma** (única). SPA autocontenida: resumen ejecutivo para dirección, experiencia del curso, ruta de 16 semanas (prototipos primero → Supabase), stack con tutoriales, sello/competencias y trayecto de egresados. Fondo neural reactivo al mouse, sonido opt-in. |

> Histórico: hubo versiones separadas (`app.html`, `landing.html`, `optativo.html`, `informe.html`) y dos `.docx`, todas con marca DIAT. Se **unificaron y eliminaron** el 2026-06-29 al consolidar todo en `index.html` y quitar la marca DIAT. Los `.docx` formales para tramitación académica se regenerarán cuando se necesiten.

## 7. Historia de decisiones (resumen)

- Se partió del contraste entre un brainstorm y la investigación de mercado encargada.
- Se definió la tesis, los 5 diferenciadores y el cambio de paradigma.
- Se produjeron: documento estratégico → programas Word → informe-sustrato → rediseño en estándar DIAT → landing → plataforma operativa.
- Secuencia de implementación recomendada: **piloto del N1 primero** (barato, valida demanda, certifica cumplimiento 21.719), luego N2 y N3. No lanzar el diplomado completo antes de validar demanda.
