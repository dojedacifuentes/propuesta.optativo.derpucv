# CONTEXTO — Curso IA y Derecho · Programa DIAT · PUCV

Documento de contexto portátil. Resume quién, qué, por qué y las decisiones tomadas, para que cualquier persona —o Claude Code— pueda retomar el desarrollo sin perder el hilo.

---

## 1. Quién y dónde

- **Institución:** Pontificia Universidad Católica de Valparaíso (PUCV), Escuela de Derecho.
- **Programa:** DIAT (Derecho, IA y Tecnología).
- **Encargo:** dos cursos de IA y Derecho.
  - **Optativo de pregrado** (`DER-IA · OPT-2026`): semestral, 16 semanas, ~5 SCT, sin requisito técnico.
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

## 5. Estándar visual DIAT v1

Dark técnico-institucional, minimalista con registro cyberpunk contenido, formal y académico (registro MIT/Harvard/Oxford). Ver tokens exactos en `CLAUDE.md`.

## 6. Entregables del proyecto (en este repo)

| Archivo | Qué es |
|---|---|
| `index.html` | Hub que enlaza todo (entrada del sitio). |
| `app.html` | **Plataforma operativa** del curso (SPA): vistas, detector de nivel, panel, bandeja, escenarios, herramientas, fondo interactivo. |
| `landing.html` | Landing de presentación con arquitectura de conversión. |
| `optativo.html` | Programa del optativo en estándar visual DIAT. |
| `informe.html` | Informe-sustrato (objetivos, paradigma, benchmark, mercado, gráficos). |
| `programa-pregrado.docx` | Programa de asignatura formal (Word, tramitación académica). |
| `programa-egresados.docx` | Programa de educación continua, 3 niveles (Word). |

## 7. Historia de decisiones (resumen)

- Se partió del contraste entre un brainstorm y la investigación de mercado encargada.
- Se definió la tesis, los 5 diferenciadores y el cambio de paradigma.
- Se produjeron: documento estratégico → programas Word → informe-sustrato → rediseño en estándar DIAT → landing → plataforma operativa.
- Secuencia de implementación recomendada: **piloto del N1 primero** (barato, valida demanda, certifica cumplimiento 21.719), luego N2 y N3. No lanzar el diplomado completo antes de validar demanda.
