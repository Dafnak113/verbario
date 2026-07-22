// Adaptive engine: conjugation logic, explanation text, mistake analysis, item selection.
import { TENSES, REGULAR_ENDINGS, FUTURO_END, CONDICIONAL_END, PERSONS, family, stem, VERBS } from './verbData';

export function conjugate(verb, tense, personIdx) {
  if (tense === 'futuro') {
    return verb.futuroStem + FUTURO_END[personIdx];
  }
  if (tense === 'condicional') {
    return verb.futuroStem + CONDICIONAL_END[personIdx];
  }
  if (tense === 'imperfectoSubjuntivo') {
    const ellos = verb.preteritoIndefinido[5];
    const st = ellos.slice(0, -3); // strip "ron"
    const last = st.slice(-1);
    const accentMap = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
    const nosotrosStem = st.slice(0, -1) + (accentMap[last] || last);
    const endings = ['ra', 'ras', 'ra', null, 'rais', 'ran'];
    if (personIdx === 3) return nosotrosStem + 'ramos';
    return st + endings[personIdx];
  }
  return verb[tense][personIdx];
}

export function ruleSentence(tense, fam) {
  const table = REGULAR_ENDINGS[tense];
  if (table) {
    const e = table[fam];
    return `Regular -${fam} verbs in the ${TENSES[tense].label.toLowerCase()} take: yo -${e[0]}, tú -${e[1]}, él/ella -${e[2]}, nosotros -${e[3]}, vosotros -${e[4]}, ellos -${e[5]}.`;
  }
  if (tense === 'futuro') return `Futuro is formed by adding é, ás, á, emos, éis, án directly onto the full infinitive (or an irregular future stem).`;
  if (tense === 'condicional') return `Condicional is formed by adding ía, ías, ía, íamos, íais, ían directly onto the full infinitive (or an irregular future stem — condicional always reuses it).`;
  if (tense === 'imperfectoSubjuntivo') return `Imperfecto de subjuntivo is built from the "ellos" form of the pretérito indefinido: drop "-ron" and add ra, ras, ra, "ramos" (with an accent on the syllable before it), rais, ran.`;
  return '';
}

export function commonMistakeTip(tense) {
  const tips = {
    presente: "Learners often reach for the present when a habitual past action is meant — signal words like 'siempre' or 'de niño' call for the imperfecto instead.",
    preteritoIndefinido: "The classic trap: indefinido vs. imperfecto. Indefinido is for a completed, bounded action (ayer, una vez, de repente) — not an ongoing background state.",
    preteritoImperfecto: "Imperfecto describes background, repeated, or ongoing past actions (mientras, todos los días, cuando era niño) — not a single finished event.",
    futuro: "In everyday speech, Spanish often prefers 'ir a + infinitivo' for near-future plans; the simple futuro leans more formal or predictive.",
    condicional: "Condicional isn't just 'would' in isolation — it usually implies a hidden or stated condition ('si tuviera tiempo, iría...').",
    presenteSubjuntivo: "Subjunctive is triggered by the main clause (espero que, es importante que, ojalá), not by the verb itself — check for a trigger phrase before conjugating.",
    imperfectoSubjuntivo: "Imperfecto de subjuntivo pairs with a past-tense or conditional main clause ('quería que...', 'sería genial que...') — present-tense triggers call for presente de subjuntivo instead.",
  };
  return tips[tense] || '';
}

export function stripAccents(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const ACCENT_NOTES = {
  presente: "In the presente, regular verbs never carry a written accent — if one is needed, it's because the verb itself is irregular (estás, está, están; oyes, oye...).",
  preteritoIndefinido: "In the pretérito indefinido, the yo and él/ella/usted forms are stressed on the very last syllable (hablé, habló · comí, comió), so they always need a written accent. The tú, nosotros, vosotros and ellos forms are stressed one syllable earlier and never take one — that's why 'comiste' has no accent but 'comió' does.",
  preteritoImperfecto: "In the imperfecto, -er/-ir verbs always carry an accent on the í (comía, vivía) to keep it as its own syllable next to the ending. -ar verbs only need one in the nosotros form (hablábamos), for the same reason.",
  futuro: "In the futuro, every person except nosotros carries a written accent, because the stress falls on the very last syllable of the ending (hablaré, hablarás, hablará, hablaréis, hablarán) — nosotros (hablaremos) is stressed naturally without needing one.",
  condicional: "In the condicional, every person carries an accent on the í (hablaría, hablarías...) to keep it as its own syllable rather than blending into the ending.",
  presenteSubjuntivo: "In the presente de subjuntivo, regular verbs never carry a written accent — one usually signals an irregular verb instead (esté, dé).",
  imperfectoSubjuntivo: "In the imperfecto de subjuntivo, only the nosotros form carries an accent (habláramos), placed right before '-ramos' — every other person is unaccented.",
};

const TENSE_MEANING = {
  presente: "a habitual or current action",
  preteritoIndefinido: "a completed action at a specific moment in the past",
  preteritoImperfecto: "an ongoing or repeated past action with no clear endpoint",
  futuro: "something that hasn't happened yet",
  condicional: "a hypothetical action, often tied to a condition",
  presenteSubjuntivo: "a wish, doubt, or reaction to something happening now or soon",
  imperfectoSubjuntivo: "a wish, doubt, or hypothetical tied to the past or a condition",
};

export function analyzeMistake(userAns, correctAns, verb, tense, personIdx) {
  const u = userAns.trim().toLowerCase();
  const c = correctAns.toLowerCase();
  if (!u) return "No answer given — here's the correct form and why.";
  if (u === c) return null;
  if (stripAccents(u) === stripAccents(c)) {
    const note = ACCENT_NOTES[tense] || '';
    return `So close — the letters are right, but the accent placement is off. You wrote "${userAns}", the correct form is "${correctAns}". ${note}`;
  }
  for (let p = 0; p < 6; p++) {
    if (p === personIdx) continue;
    const other = conjugate(verb, tense, p);
    if (other && stripAccents(u) === stripAccents(other.toLowerCase())) {
      return `That's actually the ${PERSONS[p]} form. Double-check the subject — this sentence needs ${PERSONS[personIdx]}.`;
    }
  }
  for (const t of Object.keys(TENSES)) {
    if (t === tense) continue;
    const other = conjugate(verb, t, personIdx);
    if (other && stripAccents(u) === stripAccents(other.toLowerCase())) {
      return `You conjugated this in ${TENSES[t].label} (${TENSE_MEANING[t]}), but this sentence needs ${TENSES[tense].label} (${TENSE_MEANING[tense]}) — look at the time-signal words in the sentence.`;
    }
  }
  if (verb.pattern !== 'regular -ar' && verb.pattern !== 'regular -er' && verb.pattern !== 'regular -ir') {
    const fam = family(verb.inf);
    const table = REGULAR_ENDINGS[tense];
    if (table) {
      const regularGuess = stem(verb.inf) + table[fam][personIdx];
      if (u === regularGuess.toLowerCase()) {
        return `You applied the regular ending, but "${verb.inf}" is irregular here. ${verb.note}`;
      }
    }
  }
  return `Not quite — compare your answer to the correct form below and notice exactly where the ending or stem differs.`;
}

export function itemKey(vIdx, tense, personIdx) {
  return vIdx + '_' + tense + '_' + personIdx;
}

export function availableTenses(level) {
  return Object.keys(TENSES).filter((t) => TENSES[t].level <= level);
}
export function availableVerbs(level) {
  return VERBS.filter((v) => v.level <= level);
}

const FLAGGED_WEIGHT_MULTIPLIER = 3;

export function pickNextItem(progress) {
  const level = progress.level;
  const flagged = progress.flagged || {};
  const verbs = availableVerbs(level);
  const tenses = availableTenses(level);
  const pool = [];
  verbs.forEach((v) => {
    const vIdx = VERBS.indexOf(v);
    tenses.forEach((t) => {
      for (let p = 0; p < 6; p++) {
        const key = itemKey(vIdx, t, p);
        const stat = progress.items[key];
        let weight = 2;
        if (stat) {
          const errRate = 1 - stat.correct / stat.seen;
          weight = 0.6 + errRate * 3.5;
          const daysSince = (Date.now() - stat.lastSeen) / 86400000;
          weight += Math.min(daysSince, 3) * 0.3;
        }
        if (flagged[vIdx]) weight *= FLAGGED_WEIGHT_MULTIPLIER;
        pool.push({ vIdx, tense: t, personIdx: p, weight });
      }
    });
  });
  const total = pool.reduce((a, b) => a + b.weight, 0);
  let r = Math.random() * total;
  for (const item of pool) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return pool[pool.length - 1];
}

export function isFlagged(progress, vIdx) {
  return !!(progress.flagged && progress.flagged[vIdx]);
}

export function toggleFlagged(progress, vIdx) {
  if (!progress.flagged) progress.flagged = {};
  if (progress.flagged[vIdx]) delete progress.flagged[vIdx];
  else progress.flagged[vIdx] = true;
  return progress;
}

export const DEFAULT_PROGRESS = { items: {}, level: 1, history: [], totalAnswered: 0, totalCorrect: 0, sessionsCompleted: 0, flagged: {} };

export function recordAnswer(progress, vIdx, tense, personIdx, correct) {
  const key = itemKey(vIdx, tense, personIdx);
  if (!progress.items[key]) progress.items[key] = { seen: 0, correct: 0, lastSeen: 0 };
  const it = progress.items[key];
  it.seen++;
  if (correct) it.correct++;
  it.lastSeen = Date.now();
  progress.totalAnswered++;
  if (correct) progress.totalCorrect++;
  progress.history.push(correct ? 1 : 0);
  if (progress.history.length > 20) progress.history.shift();
  maybeAdjustLevel(progress);
  return progress;
}

export function maybeAdjustLevel(progress) {
  if (progress.history.length < 10) return;
  const avg = progress.history.reduce((a, b) => a + b, 0) / progress.history.length;
  if (avg >= 0.85 && progress.level < 6) {
    progress.level++;
    progress.history = [];
  } else if (avg < 0.4 && progress.level > 1) {
    progress.level--;
    progress.history = [];
  }
}

export function pct(n, d) {
  return d ? Math.round((100 * n) / d) : 0;
}

export const LEVEL_UP_THRESHOLD = 0.85;
export const LEVEL_DOWN_THRESHOLD = 0.4;
export const LEVEL_WINDOW = 10;

export function levelProgressInfo(progress) {
  const hist = progress.history || [];
  if (hist.length < LEVEL_WINDOW) {
    return { ready: false, needed: LEVEL_WINDOW - hist.length };
  }
  const avg = hist.reduce((a, b) => a + b, 0) / hist.length;
  return { ready: true, pct: Math.round(avg * 100), count: hist.length };
}

export function levelLabel(l) {
  return ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1–C2'][l - 1] || 'A1';
}
