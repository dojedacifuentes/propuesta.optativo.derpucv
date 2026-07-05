# Issues Sprint 1 — Reestructura (P0)

Formato: cada bloque es un issue independiente. Copiar título y cuerpo directo a GitHub. Labels sugeridas: `sprint-1`, `P0`, más la específica de cada issue. Orden recomendado de ejecución: #1 → #2 → #3 → #4 → #5 → #6 (el #1 desbloquea a todos los demás).

---

## Issue 1

**Título:** [S1] Reordenar secciones según arquitectura canónica de 9 macro-secciones

**Labels:** `sprint-1`, `P0`, `arquitectura`

**Descripción:**

La página actual tiene ~25 secciones con el orden narrativo roto en el último tercio: después del paquete de decisión para la Dirección aparece de nuevo material conceptual ("Qué es un agente bajo el método", "Ciclo de vida") y la demo ContratoClaro queda enterrada al final. La lógica correcta es problema → tesis → prueba → operación → decisión, sin desvíos después de la prueba.

Reordenar el HTML al orden canónico definido en CLAUDE.md:

1. `#hero` — Hero + lectura 60 segundos
2. `#problema` — Problema + oportunidad (fusionados, ver Issue 2)
3. `#metodo` — Método Constitucional canónico (ver Issue 3)
4. `#prueba` — ContratoClaro + flujograma (SUBE desde el final)
5. `#curso` — Anatomía de sesión + arco del semestre + programa 16 semanas + stack
6. `#beneficios` — Escuela + estudiantes + perfil de egreso (fusionados)
7. `#direccion` — Requisitos, rúbrica, calendario, riesgos, piloto, FAQ
8. `#decision` — Decisión sugerida (ver Issue 4)
9. `#nota` — Nota metodológica + link a educación continua

**Criterios de aceptación:**

- [ ] Ningún contenido conceptual aparece después de `#direccion`.
- [ ] La demo ContratoClaro y el flujograma están en posición 4, antes de la sección operativa.
- [ ] Los `id` de ancla coinciden exactamente con los del listado.
- [ ] El scroll completo cuenta 9 macro-secciones (verificar con outline del documento).
- [ ] Nada de contenido se pierde: lo que no entra en la columna vertebral se fusiona (Issues 2, 3, 5) o migra a página propia (Issue 6).

---

## Issue 2

**Título:** [S1] Fusionar "El problema" y "La oportunidad" en una sola sección

**Labels:** `sprint-1`, `P0`, `copy`

**Descripción:**

Las secciones actuales de problema y oportunidad dicen cosas hermanas en bloques separados, alargando el arranque. Fusionarlas en una sección `#problema` con estructura: diagnóstico (2-3 líneas) → dato o hecho verificable → consecuencia para la Escuela → transición a la tesis del método.

**Criterios de aceptación:**

- [ ] Una sola sección `#problema` reemplaza a las dos actuales.
- [ ] Extensión máxima: la mitad de la suma de las dos secciones originales.
- [ ] Ninguna cifra sin fuente verificada (coordinar con Issue 5).
- [ ] El último párrafo enlaza narrativamente con `#metodo`.

---

## Issue 3

**Título:** [S1] Consolidar las 4 explicaciones del Método Constitucional en una sección canónica

**Labels:** `sprint-1`, `P0`, `copy`, `arquitectura`

**Descripción:**

El método se explica en profundidad cuatro veces (sello de la casa, Constitución del agente, anatomía de nueve capas, el agente como institución mínima), diluyendo su fuerza. Consolidar en una única sección `#metodo` con la anatomía interactiva de nueve capas como pieza central.

Estructura propuesta de la sección canónica:

1. Definición en una frase (esta es una de las DOS frases destacadas permitidas en toda la página).
2. Por qué "Constitución" y no "prompt": el agente como institución mínima (síntesis, 3-4 líneas, con expandible para la versión larga).
3. Anatomía interactiva de nueve capas (se conserva tal cual, es el mejor componente).
4. Ciclo de vida del agente, compactado a una línea de tiempo visual.

Toda otra mención del método en el resto de la página pasa a ser referencia breve con ancla a `#metodo`.

**Criterios de aceptación:**

- [ ] `grep` de "Método Constitucional" fuera de `#metodo` solo devuelve menciones de una línea con link ancla.
- [ ] La anatomía de nueve capas conserva su interactividad y accesibilidad por teclado.
- [ ] Quedan exactamente 2 "frases clave/visuales" en todo el documento (la segunda en `#decision`).
- [ ] La versión larga del argumento "institución mínima" queda accesible vía expandible, no eliminada.

---

## Issue 4

**Título:** [S1] Refactorizar el cierre: un CTA primario, uno secundario, eliminar duplicados

**Labels:** `sprint-1`, `P0`, `conversion`

**Descripción:**

El cierre actual ofrece cinco acciones casi equivalentes (resumen ejecutivo, rúbrica y calendario, estructura del piloto, dossier completo, dossier PDF — estos dos últimos duplicados). Una decisión sugerida necesita una acción primaria clara.

- CTA primario: "Agendar conversación sobre el piloto" (mailto o link de calendario, definir con Diego).
- CTA secundario: "Descargar dossier PDF" (un solo dossier; eliminar el duplicado).
- "Ver rúbrica", "ver calendario" y "ver piloto" dejan de ser CTAs del cierre: son links internos dentro de `#direccion`.

**Criterios de aceptación:**

- [ ] El cierre contiene exactamente 2 botones, con jerarquía visual clara (primario lleno, secundario outline).
- [ ] No existen dos links que descarguen el mismo dossier.
- [ ] La segunda frase destacada del documento vive aquí, inmediatamente antes de los CTAs.

---

## Issue 5

**Título:** [S1] Saneamiento de datos: eliminar o verificar el KPI 24% y consolidar disclaimers en nota metodológica única

**Labels:** `sprint-1`, `P0`, `honestidad`

**Descripción:**

Mostrar "24% adopción legal en Chile" como cifra destacada con asterisco "a reconfirmar" es lo peor de ambos mundos: formato de KPI con contenido no verificado. Además, los ~6-7 disclaimers dispersos por la página transmiten acumulativamente "esto no está listo", cuando individualmente son una virtud.

- Verificar el dato del 24% con fuente citable. Si se verifica: mantener con fuente visible. Si no: eliminar del bloque de cifras (no degradar a nota al pie un KPI — simplemente sale).
- Auditar todas las cifras del bloque de números con el mismo criterio.
- Crear sección `#nota` ("Nota metodológica") al final del documento y migrar ahí TODOS los "a reconfirmar" y aclaraciones dispersas.
- La maqueta ContratoClaro conserva su rótulo de simulación, pero como parte del componente, no como asterisco suelto.

**Criterios de aceptación:**

- [ ] Cero asteriscos "a reconfirmar" fuera de `#nota`.
- [ ] Todo número en formato KPI tiene fuente verificada o fue eliminado.
- [ ] `#nota` existe, es sobria, y cierra con el link a educación continua (ver Issue 6).

---

## Issue 6

**Título:** [S1] Mover Educación Continua a página propia (/educacion-continua.html)

**Labels:** `sprint-1`, `P0`, `arquitectura`

**Descripción:**

La sección de educación continua (tres propuestas) interrumpe la narrativa del optativo de pregrado justo antes del paquete operativo, mezclando dos audiencias y dos decisiones distintas. Es, por declaración propia, independiente del optativo: debe vivir en página propia.

- Crear `/educacion-continua.html` reutilizando el layout y CSS global del sitio (misma identidad, mismo nav reducido con link de vuelta).
- Migrar el contenido completo de las tres propuestas.
- En la página principal, el único rastro es un link discreto al final de `#nota`: "Esta lógica también escala a egresados →".
- Revisar naming: proponer alternativas sobrias a "Arquitecto Jurídico-Algorítmico" (no bloquear el issue por esto; dejar propuesta en comentario para decisión de Diego).

**Criterios de aceptación:**

- [ ] La página principal no contiene ninguna sección de educación continua.
- [ ] `/educacion-continua.html` renderiza con la identidad visual del sitio y funciona en el deploy de Vercel.
- [ ] El link de retorno a la propuesta principal es visible en la página nueva.
- [ ] Existe al menos una propuesta de renaming documentada en comentario del issue.

---

## Checklist de cierre del Sprint 1

- [ ] Los 6 issues cerrados y deployados en Vercel.
- [ ] QA de regresión: anatomía interactiva, modo presentación y descargas funcionan tras el reorden.
- [ ] Lectura completa en móvil y desktop verificando que el outline coincide con las 9 macro-secciones.
- [ ] Commit final: `[S1] Cierra reestructura — arquitectura canónica de 9 secciones`.
