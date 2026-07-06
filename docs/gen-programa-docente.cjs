/* Genera /programa-docente.pdf (programa preliminar formal para la Dirección).
   Uso: npm i pdfmake@0.2 && node docs/gen-programa-docente.cjs (desde la raíz del repo).
   Fuentes: IBM Plex embebida del repo (pdf-fonts.js). No forma parte del sitio servido. */
const fs = require("fs");
const path = require("path");
const PdfPrinter = require("pdfmake");

const REPO = path.join(__dirname, "..");
const OUT_REPO = path.join(REPO, "programa-docente.pdf");

/* ---- extraer TTFs del VFS (regex sobre el literal, sin eval) ---- */
const src = fs.readFileSync(path.join(REPO, "pdf-fonts.js"), "utf8");
const ttf = {};
const re = /"(IBMPlex[\w-]+\.ttf)":"([A-Za-z0-9+/=]+)"/g;
let m; while ((m = re.exec(src))) ttf[m[1]] = Buffer.from(m[2], "base64");
const need = ["IBMPlexSans-Regular.ttf","IBMPlexSans-Bold.ttf","IBMPlexSans-Italic.ttf","IBMPlexSans-BoldItalic.ttf","IBMPlexSerif-Regular.ttf","IBMPlexSerif-Bold.ttf","IBMPlexMono-Regular.ttf","IBMPlexMono-Bold.ttf"];
for (const k of need) if (!ttf[k]) { console.error("FALTA FUENTE:", k); process.exit(1); }

const printer = new PdfPrinter({
  PlexSans:  { normal: ttf["IBMPlexSans-Regular.ttf"], bold: ttf["IBMPlexSans-Bold.ttf"], italics: ttf["IBMPlexSans-Italic.ttf"], bolditalics: ttf["IBMPlexSans-BoldItalic.ttf"] },
  PlexSerif: { normal: ttf["IBMPlexSerif-Regular.ttf"], bold: ttf["IBMPlexSerif-Bold.ttf"], italics: ttf["IBMPlexSerif-Regular.ttf"], bolditalics: ttf["IBMPlexSerif-Bold.ttf"] },
  PlexMono:  { normal: ttf["IBMPlexMono-Regular.ttf"], bold: ttf["IBMPlexMono-Bold.ttf"], italics: ttf["IBMPlexMono-Regular.ttf"], bolditalics: ttf["IBMPlexMono-Bold.ttf"] }
});

/* ---- paleta sobria imprimible ---- */
const INK = "#171c22", MUT = "#57616c", ACC = "#0e5a68", HAIR = "#d5dbe1", FILL = "#f3f6f8";

const hairline = {
  hLineWidth: (i, n) => (i === 0 || i === n.table.body.length) ? 0.8 : 0.5,
  vLineWidth: () => 0,
  hLineColor: (i, n) => (i === 0 || i === n.table.body.length) ? "#aab4bd" : HAIR,
  paddingTop: () => 2.75, paddingBottom: () => 2.75, paddingLeft: () => 6, paddingRight: () => 6
};

const sec = (num, t) => ({
  margin: [0, 8, 0, 4],
  stack: [
    { columns: [
      { width: "auto", text: num, font: "PlexMono", fontSize: 8.5, color: ACC, bold: true, margin: [0, 2.5, 8, 0] },
      { width: "*", text: t, font: "PlexSerif", fontSize: 12.5, bold: true, color: INK }
    ]},
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 0.8, lineColor: "#aab4bd" }], margin: [0, 3, 0, 0] }
  ],
  unbreakable: true
});
const th = t => ({ text: t, bold: true, fontSize: 8, color: MUT, font: "PlexMono" });
const P = (t, extra) => Object.assign({ text: t, fontSize: 9.05, lineHeight: 1.22, color: INK, alignment: "justify" }, extra || {});

const dd = {
  pageSize: "A4",
  pageMargins: [56, 48, 56, 52],
  defaultStyle: { font: "PlexSans", fontSize: 9.05, color: INK },
  info: { title: "Programa preliminar — Curso optativo Inteligencia Artificial y Derecho (PUCV)", subject: "Documento de trabajo para revisión de la Dirección" },
  footer: (cur, tot) => ({
    margin: [56, 18, 56, 0],
    stack: [
      { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 0.5, lineColor: HAIR }] },
      { columns: [
        { text: "Programa preliminar · IA y Derecho · Escuela de Derecho PUCV", font: "PlexMono", fontSize: 7, color: MUT, margin: [0, 5, 0, 0] },
        { text: `p. ${cur} de ${tot}`, alignment: "right", font: "PlexMono", fontSize: 7, color: MUT, margin: [0, 5, 0, 0] }
      ]}
    ]
  }),
  content: [
    /* ---------- portada compacta ---------- */
    { text: "PROPUESTA PRELIMINAR · DOCUMENTO DE TRABAJO", font: "PlexMono", fontSize: 8, color: ACC, characterSpacing: 1.2 },
    { text: "Inteligencia Artificial y Derecho", font: "PlexSerif", fontSize: 21.5, bold: true, color: INK, margin: [0, 7, 0, 2] },
    { text: "Programa preliminar de curso optativo de pregrado", fontSize: 11, color: MUT, margin: [0, 0, 0, 1] },
    { text: "Escuela de Derecho · Pontificia Universidad Católica de Valparaíso", fontSize: 11, color: MUT },
    { text: "DER-IA · OPT 2026   ·   Semestral, 16 semanas   ·   Julio de 2026", font: "PlexMono", fontSize: 8, color: MUT, margin: [0, 6, 0, 0] },
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1.4, lineColor: ACC }], margin: [0, 8, 0, 0] },

    /* ---------- I. identificación ---------- */
    sec("I.", "Identificación"),
    { table: { widths: [128, "*"], body: [
      [th("CARÁCTER"), P("Curso optativo de pregrado, modalidad taller (aprendizaje basado en proyectos).", { alignment: "left" })],
      [th("DURACIÓN Y DEDICACIÓN"), P("16 semanas, una sesión semanal de 90 minutos: 24 h directas (≈ 13 h de laboratorio en aula) más 30–40 h estimadas de trabajo autónomo de proyecto.", { alignment: "left" })],
      [th("CUPO"), P("20 a 30 estudiantes, determinado por la capacidad de acompañamiento docente en laboratorio.", { alignment: "left" })],
      [th("PRERREQUISITOS"), P("Ninguno de carácter técnico. Se requiere computador portátil y cuentas gratuitas de las herramientas del curso.", { alignment: "left" })],
      [th("EVALUACIÓN"), P("Por proyecto, con rúbrica pública, revisión intermedia y defensa final (sección IX), siempre sobre casos ficticios, anonimizados o de fuentes públicas.", { alignment: "left" })]
    ]}, layout: hairline },

    /* ---------- II. fundamentación ---------- */
    sec("II.", "Fundamentación"),
    P("Los estudiantes de Derecho ya utilizan sistemas de inteligencia artificial, con frecuencia sin criterios de verificación, trazabilidad ni responsabilidad. El marco normativo chileno vuelve exigible esa formación: la Ley N.° 21.719 sobre protección de datos personales (vigencia diferida al 1 de diciembre de 2026) y el proyecto de ley de inteligencia artificial (Boletín 16.821-19, refundido con 15.869-19, en segundo trámite constitucional) suponen profesionales capaces de fijar reglas a estos sistemas, verificar sus resultados y responder por ellos."),
    P("Esa competencia no es principalmente técnica: consiste en determinar fuentes autorizadas, jerarquías, reglas y límites de actuación — teoría de la normatividad aplicada — y pertenece, por tanto, al núcleo formativo de una escuela de Derecho.", { margin: [0, 4, 0, 0] }),
    { margin: [0, 6, 0, 0], table: { widths: ["*"], body: [[{
      stack: [
        { text: "DEFINICIÓN OPERATIVA", font: "PlexMono", fontSize: 7.5, color: ACC, characterSpacing: 0.8, margin: [0, 0, 0, 3] },
        P("Por agente jurídico de IA se entiende un sistema que ejecuta tareas jurídicas delimitadas dentro de un marco de instrucciones, fuentes y límites fijado de antemano; no un chat de uso libre. El curso forma para diseñar y evaluar ese marco.", { alignment: "left" })
      ], fillColor: FILL, margin: [4, 2, 4, 2]
    }]] }, layout: { hLineWidth: () => 0, vLineWidth: (i) => i === 0 ? 2 : 0, vLineColor: () => ACC, paddingLeft: () => 10, paddingTop: () => 5, paddingBottom: () => 5, paddingRight: () => 8 } },

    /* ---------- III. enfoque ---------- */
    sec("III.", "Enfoque metodológico: el Método Constitucional"),
    P("El curso se organiza en torno a una metodología propia: todo agente opera bajo una constitución escrita — fuentes autorizadas, reglas duras y preferencias con su fundamento, límites de actuación y revisión humana obligatoria — que cada estudiante redacta, versiona y defiende. La progresión técnica sigue la secuencia prompt → flujo → herramienta → agente, de modo que la unidad de aprendizaje deja de ser la instrucción aislada y pasa a ser el sistema gobernado. El criterio jurídico permanece siempre en la persona: el curso distingue expresamente entre asistencia, recomendación y decisión."),

    /* ---------- IV. fundamentos ---------- */
    sec("IV.", "Fundamentos científico-pedagógicos"),
    P("El diseño instruccional se apoya en resultados establecidos de la investigación sobre el aprendizaje (referencias en sección XI):", { margin: [0, 0, 0, 3] }),
    { ul: [
      P([{ text: "Alineamiento constructivo (Biggs). ", bold: true }, "Los resultados de aprendizaje están declarados y cada actividad y cada evidencia de evaluación se alinean con uno de ellos: no se evalúa nada que no se haya enseñado ni se enseña nada sin evidencia asociada."], { alignment: "left" }),
      P([{ text: "Aprendizaje basado en proyectos. ", bold: true }, "El prototipo funcional es el vehículo del aprendizaje: cada contenido se introduce cuando el proyecto lo exige, lo que favorece la transferencia al ejercicio profesional."], { alignment: "left" }),
      P([{ text: "Metacognición y autorregulación (Flavell; Zimmerman). ", bold: true }, "Núcleo del curso: supervisar un sistema de IA es una tarea metacognitiva, pues exige explicitar los criterios de corrección antes de delegar, monitorear la ejecución y calibrar la confianza en resultados propios y ajenos. Estas funciones se entrenan de manera deliberada (sección VII)."], { alignment: "left" }),
      P([{ text: "Gestión de la carga cognitiva (Sweller). ", bold: true }, "La secuencia graduada, las plantillas y los repositorios base permiten trabajar sin prerrequisito técnico sin diluir la exigencia jurídica."], { alignment: "left" }),
      P([{ text: "Evaluación auténtica (Wiggins). ", bold: true }, "Se evalúa el desempeño en una tarea profesional real, con rúbrica pública y evidencia trazable, no la reproducción de contenidos."], { alignment: "left" })
    ], markerColor: ACC, margin: [2, 0, 0, 0], lineHeight: 1.2 },

    /* ---------- V. objetivo general ---------- */
    sec("V.", "Objetivo general"),
    P("Formar estudiantes de Derecho capaces de comprender, diseñar y evaluar sistemas de IA aplicados al trabajo jurídico, con criterios de fuentes, límites, verificación, supervisión humana y responsabilidad profesional."),

    /* ---------- VI. resultados de aprendizaje ---------- */
    sec("VI.", "Resultados de aprendizaje y evidencias verificables"),
    { table: { headerRows: 1, dontBreakRows: true, widths: [22, "*", 168], body: [
      [th("RA"), th("AL FINALIZAR EL CURSO, EL ESTUDIANTE PODRÁ…"), th("EVIDENCIA VERIFICABLE (SEMANA)")],
      [mono("1"), cell("Explicar el funcionamiento, alcances y límites de los modelos de lenguaje en tareas jurídicas."), cell("Dossier de fuentes (s. 1–2).")],
      [mono("2"), cell("Aplicar la secuencia prompt → flujo → herramienta → agente para estructurar trabajo jurídico reproducible."), cell("Flujo documentado y artefacto v1 (s. 4).")],
      [mono("3"), cell("Redactar la constitución de un agente: fuentes autorizadas, reglas duras y preferencias fundamentadas, límites y derivación a revisión humana."), cell("Constitución v1, con revisión intermedia (s. 8).")],
      [mono("4"), cell("Construir un prototipo jurídico funcional delimitado, con datos ficticios o anonimizados."), cell("Prototipo desplegado (s. 6); datos conectados (s. 10).")],
      [mono("5"), cell("Verificar salidas de IA contra fuentes: detectar alucinación, sesgo y vicios, dejando trazabilidad."), cell("Bitácora de verificación y casos de prueba (s. 11–13).")],
      [mono("6"), cell("Evaluar el sistema frente a la regulación chilena, integrando ciberseguridad y anonimización."), cell("Evaluación de cumplimiento (s. 13).")],
      [mono("7"), cell("Defender el diseño completo con juicio sobre gobernanza y responsabilidad profesional."), cell("Defensa final con demostración (s. 16).")]
    ]}, layout: hairline },

    /* ---------- VII. metacognición ---------- */
    sec("VII.", "Competencias y funciones metacognitivas que el curso impulsa"),
    P("La gobernanza de sistemas de IA moviliza funciones metacognitivas específicas. La tabla explicita cuál entrena cada competencia y con qué evidencia se verifica:", { margin: [0, 0, 0, 3] }),
    { table: { headerRows: 1, dontBreakRows: true, widths: ["*", "*", 150], body: [
      [th("COMPETENCIA"), th("FUNCIÓN METACOGNITIVA"), th("EVIDENCIA")],
      [cell("Delimitar el encargo que se confía a un sistema."), cell("Planificación: explicitar criterios de corrección y límites antes de ejecutar."), cell("Constitución del agente, versionada.")],
      [cell("Verificar salidas de IA contra fuentes autorizadas."), cell("Monitoreo y calibración de la confianza; vigilancia epistémica."), cell("Protocolo de verificación y bitácora de pruebas.")],
      [cell("Decidir qué no se delega."), cell("Evaluación: juicio sobre los límites de la automatización."), cell("Umbrales de derivación a revisión humana, justificados.")],
      [cell("Fundamentar cada regla (dura o preferencia)."), cell("Conocimiento condicional: cuándo y por qué aplica una regla."), cell("Fundamento escrito de cada cláusula.")],
      [cell("Revisar el propio proceso de diseño."), cell("Autorregulación: detectar y corregir la estrategia propia."), cell("Matriz de riesgos y plan de mantenimiento.")]
    ]}, layout: hairline },

    /* ---------- VIII. metodología ---------- */
    sec("VIII.", "Metodología de enseñanza"),
    P("Cada sesión de 90 minutos mantiene una estructura fija: marco jurídico (≈ 20 min) → laboratorio guiado de construcción (≈ 50 min) → verificación y cierre reflexivo (≈ 20 min). El trabajo es individual o en duplas, sobre casos ficticios o anonimizados, y el semestre se organiza en cuatro unidades:", { margin: [0, 0, 0, 3] }),
    { table: { headerRows: 1, dontBreakRows: true, widths: [30, 56, "*", 170], body: [
      [th("UNIDAD"), th("SEMANAS"), th("FOCO"), th("HITOS")],
      [mono("U1"), mono("1–4"), cell("Uso crítico de modelos y flujos reproducibles."), cell("Dossier de fuentes; artefacto v1.")],
      [mono("U2"), mono("5–8"), cell("Construcción asistida y constitución del agente."), cell("Prototipo desplegado; constitución v1 (revisión intermedia).")],
      [mono("U3"), mono("9–13"), cell("Datos, verificación, regulación y cumplimiento."), cell("Datos conectados; evaluación de cumplimiento.")],
      [mono("U4"), mono("14–16"), cell("Gobernanza, consolidación y defensa."), cell("Versión final; defensa con demostración.")]
    ]}, layout: hairline },

    /* ---------- IX. evaluación ---------- */
    sec("IX.", "Evaluación"),
    P("Evaluación auténtica por desempeño, con rúbrica pública desde la primera sesión y revisión intermedia formativa en la semana 8. La calificación se compone así:", { margin: [0, 0, 0, 3] }),
    { table: { headerRows: 1, dontBreakRows: true, widths: [150, "*", 44], body: [
      [th("CRITERIO"), th("QUÉ SE VERIFICA"), th("PESO")],
      [cell("Prototipo funcional", true), cell("Que corra y haga lo que promete."), pct("25%")],
      [cell("Constitución del agente", true), cell("Reglas claras, justificadas y versionadas."), pct("20%")],
      [cell("Fuentes y trazabilidad", true), cell("Fuentes autorizadas y registro de cada respuesta."), pct("15%")],
      [cell("Verificación y casos de prueba", true), cell("Protocolo de verificación aplicado y documentado."), pct("15%")],
      [cell("Matriz de riesgos y límites", true), cell("Riesgos identificados, mitigados y delimitados."), pct("10%")],
      [cell("Plan de mantenimiento", true), cell("Cómo se corrige, versiona y actualiza el agente."), pct("10%")],
      [cell("Defensa final", true), cell("Demostración en vivo y defensa jurídico-técnica del diseño."), pct("5%")]
    ]}, layout: hairline },

    /* ---------- X. implementación ---------- */
    sec("X.", "Condiciones de implementación"),
    { ul: [
      P("Sala con conexión estable y proyector (idealmente laboratorio de computación); costo institucional bajo: las herramientas del curso cuentan con planes gratuitos suficientes, sin licencias de alto costo.", { alignment: "left" }),
      P("Se propone como piloto acotado, con resultados documentados al cierre para decidir su continuidad: riesgo institucional bajo y escalable a educación continua e investigación aplicada.", { alignment: "left" })
    ], markerColor: ACC, margin: [2, 0, 0, 0], lineHeight: 1.2 },

    /* ---------- XI. referencias ---------- */
    sec("XI.", "Referencias del diseño instruccional"),
    { fontSize: 7.9, color: MUT, lineHeight: 1.26, alignment: "justify", text: "Biggs, J. (1996), Enhancing teaching through constructive alignment, Higher Education · Flavell, J. H. (1979), Metacognition and cognitive monitoring, American Psychologist · Zimmerman, B. J. (2002), Becoming a self-regulated learner, Theory Into Practice · Sweller, J. (1988), Cognitive load during problem solving, Cognitive Science · Wiggins, G. (1990), The case for authentic assessment, Practical Assessment, Research & Evaluation." },
    P("La bibliografía doctrinal específica del programa (teoría del derecho, regulación, responsabilidad profesional) queda a curatoría de la cátedra.", { fontSize: 7.9, color: MUT, margin: [0, 4, 0, 0], alignment: "left" }),

    /* ---------- nota ---------- */
    { margin: [0, 8, 0, 0], canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 0.5, lineColor: HAIR }] },
    { text: "Documento de trabajo preliminar para revisión de la Dirección; denominación, calendario y ponderaciones ajustables en el diseño formal del programa. Estado regulatorio citado al 1 de julio de 2026; reconfirmar a la fecha de uso.", fontSize: 7.4, color: MUT, lineHeight: 1.3, margin: [0, 6, 0, 0] }
  ]
};

function cell(t, bold) { return { text: t, fontSize: 8.55, lineHeight: 1.15, color: INK, bold: !!bold }; }
function mono(t) { return { text: t, font: "PlexMono", fontSize: 8.5, color: ACC, bold: true }; }
function pct(t) { return { text: t, font: "PlexMono", fontSize: 8.8, color: INK, bold: true, alignment: "right" }; }

const doc = printer.createPdfKitDocument(dd);
const chunks = [];
doc.on("data", c => chunks.push(c));
doc.on("end", () => {
  const buf = Buffer.concat(chunks);
  fs.writeFileSync(OUT_REPO, buf);
  console.log("OK", (buf.length / 1024).toFixed(0) + " KB", "->", OUT_REPO);
});
doc.end();
