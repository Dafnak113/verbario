// Builds real, meaningful sentences per verb (not generic fill-ins), their English
// translations, and a word-level glossary for tap-to-translate.
import { PRONOUN_WORD } from './verbData';

export const PRONOUN_EN = ['I', 'you', 'he/she', 'we', 'you all', 'they'];

// Per-verb English conjugation basics + a natural complement phrase (Spanish + English)
// that combines with any tense to form a real sentence, plus a small glossary of the
// content words used in that complement.
export const SENTENCE_INFO = {
  hablar: { baseEn: "speak", pres3sEn: "speaks", pastEn: "spoke",
    complementEs: "por videollamada con el equipo antes de la reunión", complementEn: "by video call with the team before the meeting",
    glossary: { videollamada: "video call", equipo: "team", reunión: "meeting" } },
  comer: { baseEn: "eat", pres3sEn: "eats", pastEn: "ate",
    complementEs: "una ensalada grande al mediodía", complementEn: "a big salad at noon",
    glossary: { ensalada: "salad", grande: "big / large", mediodía: "noon" } },
  vivir: { baseEn: "live", pres3sEn: "lives", pastEn: "lived",
    complementEs: "cerca del centro de la ciudad", complementEn: "near the city center",
    glossary: { centro: "center / downtown", ciudad: "city" } },
  estar: { baseEn: "be", pres3sEn: "is", pastEn: "was",
    complementEs: "en la oficina hasta muy tarde", complementEn: "at the office until very late",
    glossary: { oficina: "office" } },
  ser: { baseEn: "be", pres3sEn: "is", pastEn: "was",
    complementEs: "de gran ayuda para el equipo nuevo", complementEn: "of great help to the new team",
    glossary: { ayuda: "help", equipo: "team", nuevo: "new" } },
  tener: { baseEn: "have", pres3sEn: "has", pastEn: "had",
    complementEs: "mucho trabajo esta semana", complementEn: "a lot of work this week",
    glossary: { trabajo: "work", esta: "this" } },
  ir: { baseEn: "go", pres3sEn: "goes", pastEn: "went",
    complementEs: "al gimnasio antes de desayunar", complementEn: "to the gym before having breakfast",
    glossary: { gimnasio: "gym", desayunar: "to have breakfast" } },
  hacer: { baseEn: "do", pres3sEn: "does", pastEn: "did",
    complementEs: "la compra los sábados por la mañana", complementEn: "the grocery shopping on Saturday mornings",
    glossary: { compra: "shopping", sábados: "Saturdays" } },
  querer: { baseEn: "want", pres3sEn: "wants", pastEn: "wanted",
    complementEs: "cambiar de trabajo pronto", complementEn: "to change jobs soon",
    glossary: { cambiar: "to change", pronto: "soon" } },
  poder: { baseEn: "can", pres3sEn: "can", pastEn: "could",
    complementEs: "terminar el informe a tiempo", complementEn: "finish the report on time",
    glossary: { terminar: "to finish", informe: "report", tiempo: "time" } },
  decir: { baseEn: "say", pres3sEn: "says", pastEn: "said",
    complementEs: "la verdad, aunque sea difícil", complementEn: "the truth, even if it's difficult",
    glossary: { verdad: "truth", difícil: "difficult" } },
  poner: { baseEn: "put", pres3sEn: "puts", pastEn: "put",
    complementEs: "la mesa antes de que lleguen los invitados", complementEn: "the table before the guests arrive",
    glossary: { mesa: "table", invitados: "guests", lleguen: "arrive (subjunctive)" } },
  venir: { baseEn: "come", pres3sEn: "comes", pastEn: "came",
    complementEs: "a la fiesta este fin de semana", complementEn: "to the party this weekend",
    glossary: { fiesta: "party" } },
  pedir: { baseEn: "ask for", pres3sEn: "asks for", pastEn: "asked for",
    complementEs: "ayuda cuando hace falta", complementEn: "help when needed",
    glossary: { ayuda: "help", falta: "need / lack" } },
  volver: { baseEn: "return", pres3sEn: "returns", pastEn: "returned",
    complementEs: "a casa tarde los viernes", complementEn: "home late on Fridays",
    glossary: { casa: "home", viernes: "Fridays" } },
  pensar: { baseEn: "think", pres3sEn: "thinks", pastEn: "thought",
    complementEs: "en cambiar de ciudad algún día", complementEn: "about moving to another city someday",
    glossary: { cambiar: "to change" } },
  saber: { baseEn: "know", pres3sEn: "knows", pastEn: "knew",
    complementEs: "la respuesta correcta de memoria", complementEn: "the correct answer by heart",
    glossary: { respuesta: "answer", correcta: "correct", memoria: "memory" } },
  dar: { baseEn: "give", pres3sEn: "gives", pastEn: "gave",
    complementEs: "un buen consejo al nuevo compañero de trabajo", complementEn: "good advice to the new coworker",
    glossary: { consejo: "advice", compañero: "coworker", buen: "good", nuevo: "new", trabajo: "work" } },
  ver: { baseEn: "see", pres3sEn: "sees", pastEn: "saw",
    complementEs: "una película interesante anoche", complementEn: "an interesting movie last night",
    glossary: { película: "movie", interesante: "interesting", anoche: "last night" } },
  dormir: { baseEn: "sleep", pres3sEn: "sleeps", pastEn: "slept",
    complementEs: "solo cinco horas entre semana", complementEn: "only five hours on weekdays",
    glossary: { horas: "hours", entre: "between / on" } },
  sentir: { baseEn: "feel", pres3sEn: "feels", pastEn: "felt",
    complementEs: "mucha curiosidad por el resultado", complementEn: "a lot of curiosity about the outcome",
    glossary: { curiosidad: "curiosity", resultado: "outcome / result" } },
  seguir: { baseEn: "continue", pres3sEn: "continues", pastEn: "continued",
    complementEs: "estudiando español todos los días", complementEn: "studying Spanish every day",
    glossary: { estudiando: "studying" } },
  conocer: { baseEn: "know", pres3sEn: "knows", pastEn: "knew",
    complementEs: "a mucha gente interesante en el trabajo", complementEn: "a lot of interesting people at work",
    glossary: { gente: "people" } },
  traer: { baseEn: "bring", pres3sEn: "brings", pastEn: "brought",
    complementEs: "comida casera a la oficina", complementEn: "homemade food to the office",
    glossary: { comida: "food", casera: "homemade", oficina: "office" } },
  oír: { baseEn: "hear", pres3sEn: "hears", pastEn: "heard",
    complementEs: "un ruido extraño en la calle", complementEn: "a strange noise in the street",
    glossary: { ruido: "noise", extraño: "strange", calle: "street" } },
  jugar: { baseEn: "play", pres3sEn: "plays", pastEn: "played",
    complementEs: "al tenis los domingos por la mañana", complementEn: "tennis on Sunday mornings",
    glossary: { tenis: "tennis", domingos: "Sundays" } },
  construir: { baseEn: "build", pres3sEn: "builds", pastEn: "built",
    complementEs: "una casa pequeña en el campo", complementEn: "a small house in the countryside",
    glossary: { casa: "house", pequeña: "small", campo: "countryside" } },
  leer: { baseEn: "read", pres3sEn: "reads", pastEn: "read",
    complementEs: "el periódico tomando un café", complementEn: "the newspaper while having a coffee",
    glossary: { periódico: "newspaper", café: "coffee" } },
  haber: { baseEn: "have to", pres3sEn: "has to", pastEn: "had to",
    complementEs: "de terminar el informe antes del viernes", complementEn: "finish the report before Friday",
    glossary: { terminar: "to finish", informe: "report", viernes: "Friday" } },
};

const STATIC_GLOSSARY = {
  normalmente: "normally", ayer: "yesterday", antes: "before", mañana: "tomorrow / morning",
  en: "in / on", esa: "that", situación: "situation", espero: "I hope", que: "that",
  si: "if", todo: "everything", sería: "would be", diferente: "different", con: "with",
  frecuencia: "frequency", yo: "I", tú: "you", él: "he", ella: "she", usted: "you (formal)",
  nosotros: "we", nosotras: "we", vosotros: "you all", vosotras: "you all", ellos: "they",
  ellas: "they", ustedes: "you all (formal)", al: "to the", del: "of the", a: "to / at",
  de: "of / from", los: "the", las: "the", el: "the", la: "the", su: "his / her / their",
  sus: "his / her / their", muy: "very", cerca: "near", después: "after", cuando: "when",
  aunque: "although", mientras: "while", entre: "between / among", algún: "some",
  día: "day", días: "days", fin: "end", semana: "week", por: "for / through",
  tarde: "late / afternoon", solo: "only", cada: "each", nuevo: "new", pequeña: "small",
  grande: "big",
};

function presentFormEn(verb, extra, personIdx) {
  if (verb.inf === 'ser' || verb.inf === 'estar') return ['am', 'are', 'is', 'are', 'are', 'are'][personIdx];
  if (verb.inf === 'poder') return 'can';
  return personIdx === 2 ? extra.pres3sEn : extra.baseEn;
}
function pastFormEn(verb, extra, personIdx) {
  if (verb.inf === 'ser' || verb.inf === 'estar') return personIdx === 0 || personIdx === 2 ? 'was' : 'were';
  return extra.pastEn;
}

export function buildSentence(verb, tense, personIdx) {
  const extra = SENTENCE_INFO[verb.inf];
  const pronoun = PRONOUN_WORD[personIdx];
  const pronounEn = PRONOUN_EN[personIdx];
  const comp = extra.complementEs;
  const compEn = extra.complementEn;
  let es, en;
  switch (tense) {
    case 'presente':
      es = `Normalmente, ${pronoun} ___ ${comp}.`;
      en = `Normally, ${pronounEn} ${presentFormEn(verb, extra, personIdx)} ${compEn}.`;
      break;
    case 'preteritoIndefinido':
      es = `Ayer, ${pronoun} ___ ${comp}.`;
      en = `Yesterday, ${pronounEn} ${pastFormEn(verb, extra, personIdx)} ${compEn}.`;
      break;
    case 'preteritoImperfecto':
      es = `Antes, ${pronoun} ___ ${comp} con frecuencia.`;
      en = verb.inf === 'poder'
        ? `Before, ${pronounEn} could ${compEn} frequently.`
        : `Before, ${pronounEn} used to ${extra.baseEn} ${compEn} frequently.`;
      break;
    case 'futuro':
      es = `Mañana, ${pronoun} ___ ${comp}.`;
      en = verb.inf === 'poder'
        ? `Tomorrow, ${pronounEn} will be able to ${compEn}.`
        : `Tomorrow, ${pronounEn} will ${extra.baseEn} ${compEn}.`;
      break;
    case 'condicional':
      es = `En esa situación, ${pronoun} ___ ${comp}.`;
      en = verb.inf === 'poder'
        ? `In that situation, ${pronounEn} could ${compEn}.`
        : `In that situation, ${pronounEn} would ${extra.baseEn} ${compEn}.`;
      break;
    case 'presenteSubjuntivo':
      es = `Espero que ${pronoun} ___ ${comp}.`;
      en = `I hope ${pronounEn} ${presentFormEn(verb, extra, personIdx)} ${compEn}.`;
      break;
    case 'imperfectoSubjuntivo':
      es = `Si ${pronoun} ___ ${comp}, todo sería diferente.`;
      en = `If ${pronounEn} ${pastFormEn(verb, extra, personIdx)} ${compEn}, everything would be different.`;
      break;
    default:
      es = `${pronoun} ___ ${comp}.`;
      en = `${pronounEn} ${extra.baseEn} ${compEn}.`;
  }
  return { es, en };
}

export function translateWord(verb, rawWord) {
  const w = rawWord.toLowerCase().replace(/[.,;:!?¡¿"']/g, '');
  if (!w) return null;
  const extra = SENTENCE_INFO[verb.inf];
  if (extra && extra.glossary && extra.glossary[w]) return extra.glossary[w];
  if (STATIC_GLOSSARY[w]) return STATIC_GLOSSARY[w];
  if (w === verb.inf) return verb.meaning;
  return null;
}
