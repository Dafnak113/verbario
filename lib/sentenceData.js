// Builds real, meaningful sentences per verb (not generic fill-ins), their English
// translations, and a word-level glossary for tap-to-translate.
//
// Each verb has a dedicated complement PER TENSE (not one phrase reused everywhere),
// because a phrase natural for "yesterday, I ___" is often nonsensical for "if I ___,
// everything would be different." Complements are kept as noun/prepositional/infinitive
// phrases only (no embedded conjugated verbs, no subject-agreeing adjectives, no
// third-person-locked possessives) so the same complement reads correctly no matter
// which of the six subject pronouns fills the blank.
import { PRONOUN_WORD } from './verbData';

export const PRONOUN_EN = ['I', 'you', 'he/she', 'we', 'you all', 'they'];

export const SENTENCE_INFO = {
  hablar: { baseEn: "speak", pres3sEn: "speaks", pastEn: "spoke",
    complements: {
      presente: { es: "con el equipo cada mañana antes de empezar", en: "with the team every morning before starting" },
      preteritoIndefinido: { es: "con el director sobre el nuevo horario", en: "with the director about the new schedule" },
      preteritoImperfecto: { es: "por teléfono con la familia todos los domingos", en: "on the phone with family every Sunday" },
      futuro: { es: "en la conferencia de la próxima semana", en: "at next week's conference" },
      condicional: { es: "con más calma", en: "more calmly" },
      presenteSubjuntivo: { es: "más despacio para que todos entiendan", en: "more slowly so everyone understands" },
      imperfectoSubjuntivo: { es: "con más sinceridad desde el principio", en: "more honestly from the start" },
    },
    glossary: { equipo: "team", director: "director / manager", horario: "schedule", familia: "family", domingos: "Sundays", conferencia: "conference", próxima: "next", calma: "calm", despacio: "slowly", entiendan: "understand (subjunctive)", sinceridad: "honesty", principio: "beginning" } },

  comer: { baseEn: "eat", pres3sEn: "eats", pastEn: "ate",
    complements: {
      presente: { es: "fruta fresca todas las mañanas", en: "fresh fruit every morning" },
      preteritoIndefinido: { es: "en una boda el sábado pasado", en: "at a wedding last Saturday" },
      preteritoImperfecto: { es: "en el mismo restaurante todos los viernes", en: "at the same restaurant every Friday" },
      futuro: { es: "algo ligero antes del partido", en: "something light before the game" },
      condicional: { es: "menos dulces por motivos de salud", en: "fewer sweets for health reasons" },
      presenteSubjuntivo: { es: "algo pequeño antes de la reunión", en: "something small before the meeting" },
      imperfectoSubjuntivo: { es: "mejor con más tiempo libre", en: "better with more free time" },
    },
    glossary: { fruta: "fruit", fresca: "fresh", boda: "wedding", pasado: "last / past", restaurante: "restaurant", viernes: "Friday", ligero: "light", partido: "game / match", dulces: "sweets", motivos: "reasons", salud: "health", reunión: "meeting", libre: "free" } },

  vivir: { baseEn: "live", pres3sEn: "lives", pastEn: "lived",
    complements: {
      presente: { es: "cerca del centro de la ciudad", en: "near the city center" },
      preteritoIndefinido: { es: "en el extranjero durante un año", en: "abroad for a year" },
      preteritoImperfecto: { es: "en un pueblo pequeño de la costa", en: "in a small coastal town" },
      futuro: { es: "en una ciudad nueva a partir de enero", en: "in a new city starting in January" },
      condicional: { es: "con más tranquilidad en otro país", en: "more peacefully in another country" },
      presenteSubjuntivo: { es: "cerca de la universidad el próximo curso", en: "near the university next school year" },
      imperfectoSubjuntivo: { es: "con más comodidades en esa casa", en: "with more comforts in that house" },
    },
    glossary: { centro: "center / downtown", ciudad: "city", extranjero: "abroad", durante: "during / for", pueblo: "town", costa: "coast", nueva: "new", enero: "January", tranquilidad: "peace / calm", país: "country", universidad: "university", curso: "school year", comodidades: "comforts", casa: "house" } },

  estar: { baseEn: "be", pres3sEn: "is", pastEn: "was",
    complements: {
      presente: { es: "en la oficina hasta muy tarde", en: "at the office until very late" },
      preteritoIndefinido: { es: "de vacaciones en la costa", en: "on vacation on the coast" },
      preteritoImperfecto: { es: "siempre en medio de algún proyecto nuevo", en: "always in the middle of some new project" },
      futuro: { es: "de viaje por el sur de España la próxima semana", en: "traveling through southern Spain next week" },
      condicional: { es: "con más calma", en: "calmer" },
      presenteSubjuntivo: { es: "a tiempo antes de las ocho", en: "on time before eight o'clock" },
      imperfectoSubjuntivo: { es: "de vacaciones en ese momento", en: "on vacation at that moment" },
    },
    glossary: { oficina: "office", vacaciones: "vacation", costa: "coast", medio: "middle", proyecto: "project", sur: "south", España: "Spain", calma: "calm", situación: "situation", tiempo: "time", ocho: "eight", momento: "moment" } },

  ser: { baseEn: "be", pres3sEn: "is", pastEn: "was",
    complements: {
      presente: { es: "de gran ayuda para el equipo nuevo", en: "of great help to the new team" },
      preteritoIndefinido: { es: "parte del comité organizador del evento", en: "part of the event's organizing committee" },
      preteritoImperfecto: { es: "de gran apoyo durante esa época difícil", en: "of great support during that difficult time" },
      futuro: { es: "de gran ayuda en la mudanza del sábado", en: "of great help with Saturday's move" },
      condicional: { es: "de mucha más ayuda con más experiencia", en: "of much more help with more experience" },
      presenteSubjuntivo: { es: "de fiar en esta situación", en: "trustworthy in this situation" },
      imperfectoSubjuntivo: { es: "de más ayuda en aquel momento", en: "of more help at that moment" },
    },
    glossary: { ayuda: "help", equipo: "team", nuevo: "new", comité: "committee", organizador: "organizing", evento: "event", apoyo: "support", época: "time / era", difícil: "difficult", mudanza: "move (relocation)", sábado: "Saturday", experiencia: "experience", fiar: "trustworthy (ser de fiar)", situación: "situation", momento: "moment" } },

  tener: { baseEn: "have", pres3sEn: "has", pastEn: "had",
    complements: {
      presente: { es: "mucho trabajo pendiente cada lunes", en: "a lot of pending work every Monday" },
      preteritoIndefinido: { es: "un problema con el coche de camino al trabajo", en: "a problem with the car on the way to work" },
      preteritoImperfecto: { es: "menos responsabilidades en el trabajo anterior", en: "fewer responsibilities at the previous job" },
      futuro: { es: "más tiempo libre después de este proyecto", en: "more free time after this project" },
      condicional: { es: "más paciencia", en: "more patience" },
      presenteSubjuntivo: { es: "todo listo antes de la entrega", en: "everything ready before the deadline" },
      imperfectoSubjuntivo: { es: "más suerte en aquel momento", en: "more luck at that moment" },
    },
    glossary: { trabajo: "work", pendiente: "pending", lunes: "Monday", coche: "car", camino: "way / route", responsabilidades: "responsibilities", anterior: "previous", libre: "free", proyecto: "project", paciencia: "patience", listo: "ready", entrega: "deadline / delivery", suerte: "luck", momento: "moment" } },

  ir: { baseEn: "go", pres3sEn: "goes", pastEn: "went",
    complements: {
      presente: { es: "al gimnasio antes de desayunar", en: "to the gym before having breakfast" },
      preteritoIndefinido: { es: "al médico por un dolor de espalda", en: "to the doctor for a backache" },
      preteritoImperfecto: { es: "a esa playa todos los veranos", en: "to that beach every summer" },
      futuro: { es: "a la boda de un amigo el mes que viene", en: "to a friend's wedding next month" },
      condicional: { es: "con más ganas con un transporte mejor", en: "more willingly with better transport" },
      presenteSubjuntivo: { es: "directamente a casa después del trabajo", en: "straight home after work" },
      imperfectoSubjuntivo: { es: "a tiempo a la reunión de ayer", en: "on time to yesterday's meeting" },
    },
    glossary: { gimnasio: "gym", desayunar: "to have breakfast", médico: "doctor", dolor: "pain", espalda: "back", playa: "beach", veranos: "summers", boda: "wedding", amigo: "friend", mes: "month", ganas: "willingness", transporte: "transport", directo: "direct", directamente: "straight / directly", trabajo: "work", tiempo: "time", reunión: "meeting", ayer: "yesterday" } },

  hacer: { baseEn: "make", pres3sEn: "makes", pastEn: "made",
    complements: {
      presente: { es: "una lista de tareas cada domingo", en: "a to-do list every Sunday" },
      preteritoIndefinido: { es: "un pastel de chocolate para la fiesta", en: "a chocolate cake for the party" },
      preteritoImperfecto: { es: "reservas para el mismo restaurante", en: "reservations at the same restaurant" },
      futuro: { es: "una reserva para la cena del viernes", en: "a reservation for Friday's dinner" },
      condicional: { es: "lo mismo", en: "the same thing" },
      presenteSubjuntivo: { es: "una copia del documento antes de enviarlo", en: "a copy of the document before sending it" },
      imperfectoSubjuntivo: { es: "más esfuerzo en aquella época", en: "more effort back then" },
    },
    glossary: { lista: "list", tareas: "tasks", domingo: "Sunday", pastel: "cake", chocolate: "chocolate", fiesta: "party", reservas: "reservations", reserva: "reservation", cena: "dinner", viernes: "Friday", copia: "copy", documento: "document", enviarlo: "to send it", esfuerzo: "effort", época: "time / era" } },

  querer: { baseEn: "want", pres3sEn: "wants", pastEn: "wanted",
    complements: {
      presente: { es: "cambiar de trabajo pronto", en: "to change jobs soon" },
      preteritoIndefinido: { es: "ir a la fiesta del sábado", en: "to go to Saturday's party" },
      preteritoImperfecto: { es: "aprender a tocar la guitarra en esa época", en: "to learn guitar back then" },
      futuro: { es: "visitar ese país el año que viene", en: "to visit that country next year" },
      condicional: { es: "cambiar de trabajo con mejores condiciones", en: "to change jobs with better conditions" },
      presenteSubjuntivo: { es: "terminar el proyecto antes de las vacaciones", en: "to finish the project before the holidays" },
      imperfectoSubjuntivo: { es: "quedarse más tiempo en aquel lugar", en: "to stay longer in that place" },
    },
    glossary: { fiesta: "party", sábado: "Saturday", guitarra: "guitar", época: "time / era", país: "country", año: "year", condiciones: "conditions", proyecto: "project", vacaciones: "vacation", quedarse: "to stay", lugar: "place" } },

  poder: { baseEn: "can", pres3sEn: "can", pastEn: "could",
    complements: {
      presente: { es: "terminar el informe a tiempo", en: "finish the report on time" },
      preteritoIndefinido: { es: "llegar a tiempo a pesar del tráfico", en: "arrive on time despite the traffic" },
      preteritoImperfecto: { es: "salir los fines de semana sin problema", en: "go out on weekends without any trouble" },
      futuro: { es: "empezar el proyecto la próxima semana", en: "start the project next week" },
      condicional: { es: "ayudar con mucho gusto", en: "help gladly" },
      presenteSubjuntivo: { es: "asistir a la reunión de mañana", en: "attend tomorrow's meeting" },
      imperfectoSubjuntivo: { es: "resolver el problema con más tiempo", en: "solve the problem with more time" },
    },
    glossary: { informe: "report", tiempo: "time", tráfico: "traffic", fines: "weekends", proyecto: "project", gusto: "pleasure", reunión: "meeting", resolver: "to solve", problema: "problem" } },

  decir: { baseEn: "say", pres3sEn: "says", pastEn: "said",
    complements: {
      presente: { es: "la verdad, aunque sea difícil", en: "the truth, even if it's difficult" },
      preteritoIndefinido: { es: "adiós antes de coger el tren", en: "goodbye before catching the train" },
      preteritoImperfecto: { es: "las mismas historias cada Navidad", en: "the same stories every Christmas" },
      futuro: { es: "toda la verdad en la reunión", en: "the whole truth at the meeting" },
      condicional: { es: "algo distinto", en: "something different" },
      presenteSubjuntivo: { es: "la hora exacta de la cita", en: "the exact time of the appointment" },
      imperfectoSubjuntivo: { es: "la verdad desde el principio", en: "the truth from the start" },
    },
    glossary: { verdad: "truth", difícil: "difficult", coger: "to catch", tren: "train", historias: "stories", Navidad: "Christmas", reunión: "meeting", hora: "time", exacta: "exact", cita: "appointment", principio: "beginning" } },

  poner: { baseEn: "put", pres3sEn: "puts", pastEn: "put",
    complements: {
      presente: { es: "la mesa antes de que lleguen los invitados", en: "the table before the guests arrive" },
      preteritoIndefinido: { es: "la llave debajo de la alfombra", en: "the key under the rug" },
      preteritoImperfecto: { es: "siempre la misma música por las tardes", en: "the same music every afternoon" },
      futuro: { es: "el nombre en la lista mañana mismo", en: "the name on the list tomorrow" },
      condicional: { es: "las cosas en su lugar", en: "things in their place" },
      presenteSubjuntivo: { es: "las cosas en orden antes de irse", en: "things in order before leaving" },
      imperfectoSubjuntivo: { es: "más cuidado con los documentos", en: "more care with the documents" },
    },
    glossary: { mesa: "table", invitados: "guests", llave: "key", alfombra: "rug", música: "music", tardes: "afternoons", nombre: "name", lista: "list", cosas: "things", orden: "order", lugar: "place", irse: "to leave", cuidado: "care", documentos: "documents" } },

  venir: { baseEn: "come", pres3sEn: "comes", pastEn: "came",
    complements: {
      presente: { es: "a la fiesta este fin de semana", en: "to the party this weekend" },
      preteritoIndefinido: { es: "directamente desde el aeropuerto", en: "straight from the airport" },
      preteritoImperfecto: { es: "a visitar cada Navidad", en: "to visit every Christmas" },
      futuro: { es: "a la boda del mes que viene", en: "to next month's wedding" },
      condicional: { es: "antes con menos tráfico", en: "sooner with less traffic" },
      presenteSubjuntivo: { es: "a tiempo a la entrevista", en: "on time to the interview" },
      imperfectoSubjuntivo: { es: "antes de que fuera demasiado tarde", en: "before it got too late" },
    },
    glossary: { fiesta: "party", aeropuerto: "airport", Navidad: "Christmas", boda: "wedding", mes: "month", tráfico: "traffic", entrevista: "interview", demasiado: "too", tarde: "late" } },

  pedir: { baseEn: "ask for", pres3sEn: "asks for", pastEn: "asked for",
    complements: {
      presente: { es: "ayuda cuando hace falta", en: "help when needed" },
      preteritoIndefinido: { es: "disculpas por el malentendido", en: "an apology for the misunderstanding" },
      preteritoImperfecto: { es: "consejo a los mismos amigos", en: "advice from the same friends" },
      futuro: { es: "más información antes de decidir", en: "more information before deciding" },
      condicional: { es: "perdón por el malentendido", en: "forgiveness for the misunderstanding" },
      presenteSubjuntivo: { es: "permiso para salir antes", en: "permission to leave early" },
      imperfectoSubjuntivo: { es: "ayuda con más frecuencia", en: "help more often" },
    },
    glossary: { ayuda: "help", falta: "need", disculpas: "apology", malentendido: "misunderstanding", consejo: "advice", amigos: "friends", información: "information", decidir: "to decide", perdón: "forgiveness", permiso: "permission", salir: "to leave", frecuencia: "frequency" } },

  volver: { baseEn: "return", pres3sEn: "returns", pastEn: "returned",
    complements: {
      presente: { es: "a casa tarde los viernes", en: "home late on Fridays" },
      preteritoIndefinido: { es: "antes de lo previsto", en: "earlier than planned" },
      preteritoImperfecto: { es: "al mismo pueblo cada verano", en: "to the same village every summer" },
      futuro: { es: "al trabajo después de las vacaciones", en: "to work after the holidays" },
      condicional: { es: "a ese restaurante sin dudarlo", en: "to that restaurant without hesitation" },
      presenteSubjuntivo: { es: "a tiempo para la cena", en: "in time for dinner" },
      imperfectoSubjuntivo: { es: "antes si fuera posible", en: "sooner if it were possible" },
    },
    glossary: { casa: "home", viernes: "Friday", previsto: "planned", pueblo: "village", verano: "summer", trabajo: "work", vacaciones: "vacation", restaurante: "restaurant", dudarlo: "to hesitate", cena: "dinner", posible: "possible" } },

  pensar: { baseEn: "think", pres3sEn: "thinks", pastEn: "thought",
    complements: {
      presente: { es: "en cambiar de ciudad algún día", en: "about moving to another city someday" },
      preteritoIndefinido: { es: "mucho antes de responder", en: "hard before answering" },
      preteritoImperfecto: { es: "en eso todo el tiempo", en: "about that all the time" },
      futuro: { es: "en una solución mejor", en: "of a better solution" },
      condicional: { es: "dos veces antes de aceptar", en: "twice before accepting" },
      presenteSubjuntivo: { es: "con calma antes de decidir", en: "calmly before deciding" },
      imperfectoSubjuntivo: { es: "distinto con más información", en: "differently with more information" },
    },
    glossary: { ciudad: "city", responder: "to answer", tiempo: "time", solución: "solution", veces: "times", aceptar: "to accept", calma: "calm", decidir: "to decide", información: "information" } },

  saber: { baseEn: "know", pres3sEn: "knows", pastEn: "knew",
    complements: {
      presente: { es: "la respuesta correcta de memoria", en: "the correct answer by heart" },
      preteritoIndefinido: { es: "la noticia por un amigo", en: "the news from a friend" },
      preteritoImperfecto: { es: "poco sobre ese tema", en: "little about that subject" },
      futuro: { es: "el resultado antes del viernes", en: "the result before Friday" },
      condicional: { es: "qué decir", en: "what to say" },
      presenteSubjuntivo: { es: "la verdad antes de firmar", en: "the truth before signing" },
      imperfectoSubjuntivo: { es: "más sobre el tema en aquel momento", en: "more about the subject at that time" },
    },
    glossary: { respuesta: "answer", memoria: "memory", noticia: "news", amigo: "friend", tema: "subject", resultado: "result", viernes: "Friday", verdad: "truth", firmar: "to sign", momento: "moment" } },

  dar: { baseEn: "give", pres3sEn: "gives", pastEn: "gave",
    complements: {
      presente: { es: "un buen consejo al nuevo compañero de trabajo", en: "good advice to the new coworker" },
      preteritoIndefinido: { es: "las gracias por el regalo", en: "thanks for the gift" },
      preteritoImperfecto: { es: "clases de español los martes", en: "Spanish classes on Tuesdays" },
      futuro: { es: "una charla sobre el proyecto", en: "a talk about the project" },
      condicional: { es: "una segunda oportunidad", en: "a second chance" },
      presenteSubjuntivo: { es: "una explicación antes de decidir", en: "an explanation before deciding" },
      imperfectoSubjuntivo: { es: "más detalles sobre el plan", en: "more details about the plan" },
    },
    glossary: { consejo: "advice", compañero: "coworker", trabajo: "work", gracias: "thanks", regalo: "gift", clases: "classes", martes: "Tuesdays", charla: "talk", proyecto: "project", oportunidad: "chance / opportunity", explicación: "explanation", decidir: "to decide", detalles: "details", plan: "plan" } },

  ver: { baseEn: "see", pres3sEn: "sees", pastEn: "saw",
    complements: {
      presente: { es: "las noticias todas las noches", en: "the news every night" },
      preteritoIndefinido: { es: "una película interesante anoche", en: "an interesting movie last night" },
      preteritoImperfecto: { es: "esa serie todos los fines de semana", en: "that show every weekend" },
      futuro: { es: "los resultados a final de mes", en: "the results at the end of the month" },
      condicional: { es: "las cosas de otra manera", en: "things differently" },
      presenteSubjuntivo: { es: "el documento antes de firmarlo", en: "the document before signing it" },
      imperfectoSubjuntivo: { es: "la diferencia con más claridad", en: "the difference more clearly" },
    },
    glossary: { noticias: "news", noches: "nights", película: "movie", anoche: "last night", serie: "show / series", fines: "weekends", resultados: "results", final: "end", mes: "month", cosas: "things", documento: "document", firmarlo: "to sign it", diferencia: "difference", claridad: "clarity" } },

  dormir: { baseEn: "sleep", pres3sEn: "sleeps", pastEn: "slept",
    complements: {
      presente: { es: "solo cinco horas entre semana", en: "only five hours on weekdays" },
      preteritoIndefinido: { es: "muy poco por los nervios", en: "very little from nerves" },
      preteritoImperfecto: { es: "hasta tarde los fines de semana", en: "in late on weekends" },
      futuro: { es: "mejor después de este viaje", en: "better after this trip" },
      condicional: { es: "más horas sin tanto estrés", en: "more hours without so much stress" },
      presenteSubjuntivo: { es: "lo suficiente antes del examen", en: "enough before the exam" },
      imperfectoSubjuntivo: { es: "mejor con menos ruido", en: "better with less noise" },
    },
    glossary: { horas: "hours", nervios: "nerves", fines: "weekends", viaje: "trip", estrés: "stress", suficiente: "enough", examen: "exam", ruido: "noise" } },

  sentir: { baseEn: "feel", pres3sEn: "feels", pastEn: "felt",
    complements: {
      presente: { es: "mucha curiosidad por el resultado", en: "a lot of curiosity about the outcome" },
      preteritoIndefinido: { es: "un gran alivio al terminar", en: "great relief at finishing" },
      preteritoImperfecto: { es: "mucha nostalgia por esos años", en: "a lot of nostalgia for those years" },
      futuro: { es: "más confianza con la práctica", en: "more confidence with practice" },
      condicional: { es: "mucho mejor con más apoyo", en: "much better with more support" },
      presenteSubjuntivo: { es: "más seguridad antes de hablar", en: "more confidence before speaking" },
      imperfectoSubjuntivo: { es: "menos presión en aquel momento", en: "less pressure at that moment" },
    },
    glossary: { curiosidad: "curiosity", resultado: "outcome / result", alivio: "relief", terminar: "finishing", nostalgia: "nostalgia", años: "years", confianza: "confidence", práctica: "practice", apoyo: "support", seguridad: "confidence / security", presión: "pressure", momento: "moment" } },

  seguir: { baseEn: "continue", pres3sEn: "continues", pastEn: "continued",
    complements: {
      presente: { es: "estudiando español todos los días", en: "studying Spanish every day" },
      preteritoIndefinido: { es: "con la misma rutina de siempre", en: "with the same routine as always" },
      preteritoImperfecto: { es: "con el mismo trabajo durante años", en: "with the same job for years" },
      futuro: { es: "con el plan a pesar de todo", en: "with the plan despite everything" },
      condicional: { es: "adelante con el proyecto", en: "ahead with the project" },
      presenteSubjuntivo: { es: "con las clases este semestre", en: "with classes this semester" },
      imperfectoSubjuntivo: { es: "con más cuidado esta vez", en: "more carefully this time" },
    },
    glossary: { estudiando: "studying", rutina: "routine", siempre: "always", trabajo: "job / work", años: "years", plan: "plan", proyecto: "project", clases: "classes", semestre: "semester", cuidado: "care" } },

  conocer: { baseEn: "know", pres3sEn: "knows", pastEn: "knew",
    complements: {
      presente: { es: "a mucha gente interesante en el trabajo", en: "a lot of interesting people at work" },
      preteritoIndefinido: { es: "a alguien especial en esa fiesta", en: "someone special at that party" },
      preteritoImperfecto: { es: "bien esa parte de la ciudad", en: "that part of the city well" },
      futuro: { es: "a gente nueva en el nuevo trabajo", en: "new people at the new job" },
      condicional: { es: "a mucha más gente", en: "many more people" },
      presenteSubjuntivo: { es: "el camino antes de salir", en: "the way before leaving" },
      imperfectoSubjuntivo: { es: "mejor la zona en aquel momento", en: "the area better at that time" },
    },
    glossary: { gente: "people", trabajo: "work", especial: "special", fiesta: "party", parte: "part", ciudad: "city", nuevo: "new", camino: "way", salir: "to leave", zona: "area", momento: "moment" } },

  traer: { baseEn: "bring", pres3sEn: "brings", pastEn: "brought",
    complements: {
      presente: { es: "comida casera a la oficina", en: "homemade food to the office" },
      preteritoIndefinido: { es: "buenas noticias del viaje", en: "good news from the trip" },
      preteritoImperfecto: { es: "siempre un regalo pequeño", en: "a small gift every time" },
      futuro: { es: "los documentos a la reunión", en: "the documents to the meeting" },
      condicional: { es: "más problemas que soluciones", en: "more problems than solutions" },
      presenteSubjuntivo: { es: "el contrato firmado mañana", en: "the signed contract tomorrow" },
      imperfectoSubjuntivo: { es: "más suerte en aquel viaje", en: "more luck on that trip" },
    },
    glossary: { comida: "food", casera: "homemade", oficina: "office", noticias: "news", viaje: "trip", regalo: "gift", documentos: "documents", reunión: "meeting", problemas: "problems", soluciones: "solutions", contrato: "contract", firmado: "signed", suerte: "luck" } },

  oír: { baseEn: "hear", pres3sEn: "hears", pastEn: "heard",
    complements: {
      presente: { es: "un ruido extraño en la calle", en: "a strange noise in the street" },
      preteritoIndefinido: { es: "la noticia por casualidad", en: "the news by chance" },
      preteritoImperfecto: { es: "esa canción en la radio siempre", en: "that song on the radio all the time" },
      futuro: { es: "la respuesta muy pronto", en: "the answer very soon" },
      condicional: { es: "mejor con menos ruido alrededor", en: "better with less noise around" },
      presenteSubjuntivo: { es: "bien la explicación esta vez", en: "the explanation well this time" },
      imperfectoSubjuntivo: { es: "algo distinto en aquel momento", en: "something different at that moment" },
    },
    glossary: { ruido: "noise", extraño: "strange", calle: "street", noticia: "news", casualidad: "chance", canción: "song", radio: "radio", respuesta: "answer", pronto: "soon", alrededor: "around", explicación: "explanation", momento: "moment" } },

  jugar: { baseEn: "play", pres3sEn: "plays", pastEn: "played",
    complements: {
      presente: { es: "al tenis los domingos por la mañana", en: "tennis on Sunday mornings" },
      preteritoIndefinido: { es: "un partido muy reñido", en: "a very close match" },
      preteritoImperfecto: { es: "al fútbol en el parque todos los días", en: "soccer in the park every day" },
      futuro: { es: "en el torneo del mes que viene", en: "in next month's tournament" },
      condicional: { es: "mejor con más práctica", en: "better with more practice" },
      presenteSubjuntivo: { es: "bien esta vez en el torneo", en: "well this time in the tournament" },
      imperfectoSubjuntivo: { es: "mejor con más tiempo de entrenamiento", en: "better with more training time" },
    },
    glossary: { tenis: "tennis", domingos: "Sundays", partido: "match", reñido: "close (competitive)", fútbol: "soccer", parque: "park", torneo: "tournament", mes: "month", práctica: "practice", entrenamiento: "training" } },

  construir: { baseEn: "build", pres3sEn: "builds", pastEn: "built",
    complements: {
      presente: { es: "una casa pequeña en el campo", en: "a small house in the countryside" },
      preteritoIndefinido: { es: "un puente nuevo el año pasado", en: "a new bridge last year" },
      preteritoImperfecto: { es: "modelos a escala en el tiempo libre", en: "scale models in free time" },
      futuro: { es: "una piscina el próximo verano", en: "a pool next summer" },
      condicional: { es: "algo más simple con más tiempo", en: "something simpler with more time" },
      presenteSubjuntivo: { es: "la estructura antes del invierno", en: "the structure before winter" },
      imperfectoSubjuntivo: { es: "algo más sólido desde el principio", en: "something sturdier from the start" },
    },
    glossary: { casa: "house", campo: "countryside", puente: "bridge", año: "year", pasado: "last / past", modelos: "models", escala: "scale", tiempo: "time", libre: "free", piscina: "pool", verano: "summer", estructura: "structure", invierno: "winter", sólido: "sturdy / solid", principio: "beginning" } },

  leer: { baseEn: "read", pres3sEn: "reads", pastEn: "read",
    complements: {
      presente: { es: "el periódico tomando un café", en: "the newspaper while having a coffee" },
      preteritoIndefinido: { es: "esa noticia dos veces", en: "that news item twice" },
      preteritoImperfecto: { es: "un capítulo cada noche", en: "a chapter every night" },
      futuro: { es: "el contrato con mucho cuidado", en: "the contract very carefully" },
      condicional: { es: "con más atención y calma", en: "more carefully and calmly" },
      presenteSubjuntivo: { es: "las instrucciones antes de empezar", en: "the instructions before starting" },
      imperfectoSubjuntivo: { es: "más rápido en aquella época", en: "faster back then" },
    },
    glossary: { periódico: "newspaper", café: "coffee", noticia: "news item", veces: "times", capítulo: "chapter", noche: "night", contrato: "contract", cuidado: "care", atención: "attention", instrucciones: "instructions", empezar: "to start", rápido: "fast", época: "time / era" } },

  haber: { baseEn: "have to", pres3sEn: "has to", pastEn: "had to",
    complements: {
      presente: { es: "de terminar el informe antes del viernes", en: "finish the report before Friday" },
      preteritoIndefinido: { es: "de cambiar de planes a última hora", en: "change plans at the last minute" },
      preteritoImperfecto: { es: "de madrugar todos los días", en: "get up early every day" },
      futuro: { es: "de tomar una decisión pronto", en: "make a decision soon" },
      condicional: { es: "de avisar con más tiempo", en: "give notice with more time" },
      presenteSubjuntivo: { es: "de confirmar la reserva hoy mismo", en: "confirm the reservation today" },
      imperfectoSubjuntivo: { es: "de avisar con más antelación", en: "give notice further in advance" },
    },
    glossary: { terminar: "to finish", informe: "report", viernes: "Friday", cambiar: "to change", planes: "plans", hora: "hour / time", madrugar: "to get up early", tomar: "to take", decisión: "decision", pronto: "soon", avisar: "to notify", tiempo: "time", confirmar: "to confirm", reserva: "reservation", antelación: "advance notice" } },
};

const STATIC_GLOSSARY = {
  normalmente: "normally", ayer: "yesterday", antes: "before", mañana: "tomorrow / morning",
  en: "in / on", esa: "that", situación: "situation", espero: "I hope", que: "that",
  si: "if", todo: "everything", sería: "would be", diferente: "different", con: "with",
  yo: "I", tú: "you", él: "he", ella: "she", usted: "you (formal)",
  nosotros: "we", nosotras: "we", vosotros: "you all", vosotras: "you all", ellos: "they",
  ellas: "they", ustedes: "you all (formal)", al: "to the", del: "of the", a: "to / at",
  de: "of / from", los: "the", las: "the", el: "the", la: "the",
  muy: "very", cerca: "near", después: "after", cuando: "when",
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
function pastFormEn(verb, extra, personIdx, tense) {
  if (verb.inf === 'ser' || verb.inf === 'estar') return personIdx === 0 || personIdx === 2 ? 'was' : 'were';
  // conocer/saber shift meaning specifically in the pretérito indefinido: a single
  // moment of meeting/discovery, not an ongoing state — imperfecto keeps "knew".
  if (tense === 'preteritoIndefinido') {
    if (verb.inf === 'conocer') return 'met';
    if (verb.inf === 'saber') return 'found out';
  }
  return extra.pastEn;
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function buildSentence(verb, tense, personIdx) {
  const extra = SENTENCE_INFO[verb.inf];
  const comp = extra.complements[tense];
  const pronoun = PRONOUN_WORD[personIdx];
  const pronounEn = PRONOUN_EN[personIdx];
  let es, en;
  switch (tense) {
    case 'presente':
      es = `Normalmente, ${pronoun} ___ ${comp.es}.`;
      en = `Normally, ${pronounEn} ${presentFormEn(verb, extra, personIdx)} ${comp.en}.`;
      break;
    case 'preteritoIndefinido':
      es = `Ayer, ${pronoun} ___ ${comp.es}.`;
      en = `Yesterday, ${pronounEn} ${pastFormEn(verb, extra, personIdx, tense)} ${comp.en}.`;
      break;
    case 'preteritoImperfecto':
      es = `Antes, ${pronoun} ___ ${comp.es}.`;
      en = verb.inf === 'poder'
        ? `Before, ${pronounEn} could ${comp.en}.`
        : `Before, ${pronounEn} used to ${extra.baseEn} ${comp.en}.`;
      break;
    case 'futuro':
      es = `${capitalize(pronoun)} ___ ${comp.es}.`;
      en = verb.inf === 'poder'
        ? `${capitalize(pronounEn)} will be able to ${comp.en}.`
        : `${capitalize(pronounEn)} will ${extra.baseEn} ${comp.en}.`;
      break;
    case 'condicional':
      es = `En esa situación, ${pronoun} ___ ${comp.es}.`;
      en = verb.inf === 'poder'
        ? `In that situation, ${pronounEn} could ${comp.en}.`
        : `In that situation, ${pronounEn} would ${extra.baseEn} ${comp.en}.`;
      break;
    case 'presenteSubjuntivo':
      es = `Espero que ${pronoun} ___ ${comp.es}.`;
      en = `I hope ${pronounEn} ${presentFormEn(verb, extra, personIdx)} ${comp.en}.`;
      break;
    case 'imperfectoSubjuntivo':
      es = `Si ${pronoun} ___ ${comp.es}, todo sería diferente.`;
      en = `If ${pronounEn} ${pastFormEn(verb, extra, personIdx, tense)} ${comp.en}, everything would be different.`;
      break;
    default:
      es = `${pronoun} ___ ${comp.es}.`;
      en = `${pronounEn} ${extra.baseEn} ${comp.en}.`;
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
