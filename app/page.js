'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { loadProgress, saveProgress } from '../lib/progressStore';
import { VERBS, TENSES, PERSONS, family } from '../lib/verbData';
import {
  conjugate, ruleSentence, commonMistakeTip, analyzeMistake, pickNextItem,
  recordAnswer, pct, levelLabel, DEFAULT_PROGRESS, isFlagged, toggleFlagged, levelProgressInfo,
} from '../lib/engine';
import { buildSentence, translateWord } from '../lib/sentenceData';

const SESSION_MINUTES = 10;
const SESSION_MAX_Q = 14;

export default function Home() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [screen, setScreen] = useState('home'); // home | exercise | feedback | summary
  const [storageOk, setStorageOk] = useState(true);

  const [practice, setPractice] = useState(null); // {startTime, count, correctCount}
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSentence, setCurrentSentence] = useState(null); // {es, en}
  const [answer, setAnswer] = useState('');
  const [tappedWord, setTappedWord] = useState(null); // {word, translation}
  const [feedback, setFeedback] = useState(null); // {userAnswer, correctForm, isCorrect}
  const inputRef = useRef(null);
  const [tick, setTick] = useState(0);

  // auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user);
        setAuthChecked(true);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/login');
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  // load progress once authed
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const p = await loadProgress(user.id);
        setProgress(p);
      } catch (e) {
        setStorageOk(false);
        setProgress(JSON.parse(JSON.stringify(DEFAULT_PROGRESS)));
      }
    })();
  }, [user]);

  // timer re-render while in exercise/feedback screen
  useEffect(() => {
    if (screen !== 'exercise') return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [screen]);

  useEffect(() => {
    if (screen === 'exercise' && inputRef.current) inputRef.current.focus();
  }, [screen, currentItem]);

  async function persist(nextProgress) {
    setProgress({ ...nextProgress });
    if (user) {
      const ok = await saveProgress(user.id, nextProgress);
      if (!ok) setStorageOk(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  function toggleFlagVerb(vIdx) {
    const nextProgress = JSON.parse(JSON.stringify(progress));
    toggleFlagged(nextProgress, vIdx);
    persist(nextProgress);
  }

  function sessionTimeLeft(p) {
    const elapsed = (Date.now() - p.startTime) / 1000;
    return Math.max(0, SESSION_MINUTES * 60 - elapsed);
  }

  function startSession() {
    setPractice({ startTime: Date.now(), count: 0, correctCount: 0 });
    setScreen('exercise');
  }

  function loadNextExercise(p) {
    const item = pickNextItem(progress);
    const verb = VERBS[item.vIdx];
    const sentence = buildSentence(verb, item.tense, item.personIdx);
    setCurrentItem(item);
    setCurrentSentence(sentence);
    setAnswer('');
    setFeedback(null);
    setTappedWord(null);
    setScreen('exercise');
  }

  function nextExercise() {
    const p = practice;
    if (!p || p.count >= SESSION_MAX_Q || sessionTimeLeft(p) <= 0) {
      finishSession(p);
      return;
    }
    loadNextExercise(p);
  }

  // kick off first exercise when a fresh practice session begins
  useEffect(() => {
    if (practice && practice.count === 0 && !currentItem && screen === 'exercise' && !feedback) {
      loadNextExercise(practice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practice]);

  function checkAnswer() {
    if (!currentItem || feedback) return;
    const verb = VERBS[currentItem.vIdx];
    const correctForm = conjugate(verb, currentItem.tense, currentItem.personIdx);
    const isCorrect = answer.trim().toLowerCase() === correctForm.toLowerCase();
    const newPractice = {
      ...practice,
      count: practice.count + 1,
      correctCount: practice.correctCount + (isCorrect ? 1 : 0),
    };
    setPractice(newPractice);

    const nextProgress = JSON.parse(JSON.stringify(progress));
    recordAnswer(nextProgress, currentItem.vIdx, currentItem.tense, currentItem.personIdx, isCorrect);
    persist(nextProgress);

    setFeedback({ userAnswer: answer, correctForm, isCorrect });
  }

  function continueAfterFeedback() {
    const p = practice;
    if (!p || p.count >= SESSION_MAX_Q || sessionTimeLeft(p) <= 0) {
      finishSession(p);
      return;
    }
    loadNextExercise(p);
  }

  async function finishSession(p) {
    const nextProgress = JSON.parse(JSON.stringify(progress));
    nextProgress.sessionsCompleted = (nextProgress.sessionsCompleted || 0) + 1;
    await persist(nextProgress);
    setScreen('summary');
  }

  if (!authChecked || !progress) {
    return (
      <div className="appRoot">
        <div className="screen" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: 'var(--paper-dim)' }}>Cargando…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appRoot">
      {screen === 'home' && (
        <HomeScreen progress={progress} storageOk={storageOk} user={user} onStart={startSession} onSignOut={signOut} />
      )}
      {screen === 'exercise' && currentItem && !feedback && (
        <ExerciseScreen
          item={currentItem}
          sentence={currentSentence}
          practice={practice}
          timeLeft={sessionTimeLeft(practice)}
          answer={answer}
          setAnswer={setAnswer}
          inputRef={inputRef}
          onCheck={checkAnswer}
          onQuit={() => finishSession(practice)}
          tappedWord={tappedWord}
          setTappedWord={setTappedWord}
          isFlagged={isFlagged(progress, currentItem.vIdx)}
          onToggleFlag={() => toggleFlagVerb(currentItem.vIdx)}
        />
      )}
      {screen === 'exercise' && currentItem && feedback && (
        <FeedbackScreen item={currentItem} sentence={currentSentence} feedback={feedback} onContinue={continueAfterFeedback} />
      )}
      {screen === 'summary' && (
        <SummaryScreen practice={practice} progress={progress} onHome={() => setScreen('home')} />
      )}
    </div>
  );
}

function HomeScreen({ progress, storageOk, user, onStart, onSignOut }) {
  const acc = pct(progress.totalCorrect, progress.totalAnswered);
  const levels = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1–C2'];
  const levelInfo = levelProgressInfo(progress);
  const flaggedCount = Object.keys(progress.flagged || {}).length;
  return (
    <>
      <div className="topbar">
        <div className="pill"><span className="dot"></span> Nivel <b>{levelLabel(progress.level)}</b></div>
        <div className="pill">🔥 <b>{progress.sessionsCompleted}</b> sesiones</div>
        <button className="btn-ghost" style={{ width: 'auto', marginLeft: 'auto' }} onClick={onSignOut}>Salir</button>
      </div>
      <div className="tile-rule"></div>
      <div className="screen">
        <div className="brand">
          <h1>Verbario</h1>
          <span className="tag">ES · GRAMÁTICA</span>
        </div>
        <div className="home-hero">
          <p>Sesiones de diez minutos para dominar las terminaciones verbales — con explicación cada vez, aciertos o fallos, y el porqué detrás de cada forma.</p>
        </div>
        <div className="level-grid">
          {levels.map((l, i) => (
            <div key={l} className={`level-chip ${i + 1 === progress.level ? 'current' : ''}`}>{l}</div>
          ))}
        </div>
        <div className="stat-row">
          <div className="stat"><div className="num">{acc}%</div><div className="lbl">Precisión total</div></div>
          <div className="stat"><div className="num">{progress.totalAnswered}</div><div className="lbl">Respuestas</div></div>
        </div>
        <p style={{ color: 'var(--paper-dim)', fontSize: 12.5, margin: '0 0 16px' }}>
          {levelInfo.ready
            ? `Precisión reciente: ${levelInfo.pct}% (últimas ${levelInfo.count}) · subes de nivel con 85%+, bajas con menos de 40%`
            : `Responde ${levelInfo.needed} ejercicio${levelInfo.needed === 1 ? '' : 's'} más para desbloquear el progreso de nivel`}
          {flaggedCount > 0 && ` · ${flaggedCount} verbo${flaggedCount === 1 ? '' : 's'} marcado${flaggedCount === 1 ? '' : 's'} como difícil`}
        </p>
        <div className="card" style={{ marginTop: 6 }}>
          <h3 style={{ fontSize: 17, marginBottom: 8 }}>Sesión de hoy</h3>
          <p style={{ color: 'var(--paper-dim)', fontSize: 13.5, lineHeight: 1.5, margin: '0 0 16px' }}>
            ~10 minutos · hasta {SESSION_MAX_Q} ejercicios · dificultad adaptada a tus fallos
          </p>
          <button className="btn btn-primary" onClick={onStart}>Empezar sesión</button>
        </div>
        {!storageOk && (
          <p style={{ color: 'var(--paper-dim)', fontSize: 11.5, textAlign: 'center', marginTop: 14 }}>
            ⚠️ Tu progreso no se pudo guardar en este momento — sigue practicando, lo reintentaremos.
          </p>
        )}
        <footer className="credit">Conectado como {user?.email} · el progreso se guarda en tu cuenta</footer>
      </div>
    </>
  );
}

function ExerciseScreen({ item, sentence, practice, timeLeft, answer, setAnswer, inputRef, onCheck, onQuit, tappedWord, setTappedWord, isFlagged, onToggleFlag }) {
  const verb = VERBS[item.vIdx];
  const tiles = Array.from({ length: SESSION_MAX_Q }, (_, i) => {
    if (i < practice.count) return 'done';
    if (i === practice.count) return 'now';
    return '';
  });

  function insertChar(c) {
    setAnswer((a) => a + c);
    inputRef.current && inputRef.current.focus();
  }

  // Split the sentence around the blank, then split the surrounding text into
  // tappable words (skipping whitespace) so any word can be translated on tap.
  const [before, after] = sentence.es.split('___');
  function renderWords(text, keyPrefix) {
    return text.split(/(\s+)/).map((chunk, i) => {
      if (/^\s+$/.test(chunk) || chunk === '') return chunk;
      const translation = translateWord(verb, chunk);
      return (
        <span
          key={keyPrefix + i}
          className="tappable-word"
          onClick={() => translation && setTappedWord({ word: chunk.replace(/[.,;:!?¡¿]/g, ''), translation })}
        >
          {chunk}
        </span>
      );
    });
  }

  return (
    <>
      <div className="topbar">
        <div className="pill">⏱ <b>{Math.ceil(timeLeft / 60)}</b> min</div>
        <div className="pill">✓ <b>{practice.correctCount}</b>/{practice.count}</div>
        <button className="btn-ghost" style={{ width: 'auto', marginLeft: 'auto' }} onClick={onQuit}>Terminar</button>
      </div>
      <div className="progress-tiles">
        {tiles.map((t, i) => <div key={i} className={`t ${t}`}></div>)}
      </div>
      <div className="screen">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="tense-tag">{TENSES[item.tense].label}</span>
            <button
              type="button"
              className={`flag-btn ${isFlagged ? 'flagged' : ''}`}
              onClick={onToggleFlag}
              title={isFlagged ? 'Quitar de "necesita más práctica"' : 'Marcar: necesito más práctica con este verbo'}
            >
              {isFlagged ? '★ Difícil' : '☆ Marcar difícil'}
            </button>
          </div>
          <div className="infinitive">
            <span className="inf">{verb.inf}</span>
            <span className="meaning">{verb.meaning}</span>
          </div>
          <div className="pronoun-badge">Sujeto: {PERSONS[item.personIdx]}</div>
          <div className="sentence">
            {renderWords(before, 'b')}
            <span className="blank">&nbsp;</span>
            {renderWords(after || '', 'a')}
          </div>
          <p className="tap-hint">Toca cualquier palabra para ver su significado</p>
          {tappedWord && (
            <div className="translation-pill">
              <b>{tappedWord.word}</b> → {tappedWord.translation}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); onCheck(); }}>
            <input
              ref={inputRef}
              type="text"
              className="answer"
              placeholder="Escribe la forma correcta"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="accent-row">
              {['á', 'é', 'í', 'ó', 'ú', 'ñ'].map((c) => (
                <div key={c} className="accent-key" onClick={() => insertChar(c)}>{c}</div>
              ))}
            </div>
            <button className="btn btn-primary" type="submit">Comprobar</button>
          </form>
        </div>
      </div>
    </>
  );
}

function FeedbackScreen({ item, sentence, feedback, onContinue }) {
  const verb = VERBS[item.vIdx];
  const fam = family(verb.inf);
  const { userAnswer, correctForm, isCorrect } = feedback;
  const mistakeMsg = isCorrect ? null : analyzeMistake(userAnswer, correctForm, verb, item.tense, item.personIdx);
  const irregularApplies = verb.affects.includes(item.tense);
  const rule = ruleSentence(item.tense, fam);
  const tip = commonMistakeTip(item.tense);
  const fullSentenceEs = sentence.es.replace('___', correctForm);

  return (
    <div className="screen">
      <div className="card">
        <div className={`result-banner ${isCorrect ? 'good' : 'bad'}`}>
          <span className="icon">{isCorrect ? '✓' : '✕'}</span>
          <span>{isCorrect ? '¡Correcto!' : 'No es correcto'} — {verb.inf} · {TENSES[item.tense].label} · {PERSONS[item.personIdx]}</span>
        </div>

        {!isCorrect && (
          <p style={{ fontSize: 14, color: 'var(--paper-dim)', margin: '0 0 4px' }}>
            Escribiste: <b style={{ color: 'var(--paper)' }}>{userAnswer || '(vacío)'}</b>
          </p>
        )}
        <p style={{ fontSize: 15, margin: '0 0 12px' }}>
          Forma correcta: <b style={{ color: 'var(--ochre)', fontFamily: "'Fraunces',serif", fontSize: 18 }}>{correctForm}</b>
        </p>

        <div className="explain-block">
          <h4>Frase completa</h4>
          <p style={{ fontStyle: 'italic' }}>{fullSentenceEs}</p>
          <p style={{ color: 'var(--paper-dim)', marginTop: 4 }}>{sentence.en}</p>
        </div>

        {mistakeMsg && (
          <div className="explain-block">
            <h4>Sobre tu respuesta</h4>
            <div className="mistake-note"><p>{mistakeMsg}</p></div>
          </div>
        )}

        <div className="explain-block">
          <h4>Conjugación completa - {verb.inf} - {TENSES[item.tense].label}</h4>
          <table className="conj"><tbody>
            {PERSONS.map((p, i) => (
              <tr key={p} className={i === item.personIdx ? 'target' : ''}>
                <td className="person">{p}</td>
                <td className="form">{conjugate(verb, item.tense, i)}</td>
              </tr>
            ))}
          </tbody></table>
        </div>

        <div className="explain-block">
          <h4>Por qué</h4>
          <p>{rule}</p>
          {irregularApplies && <p style={{ marginTop: 8 }}>{verb.note}</p>}
        </div>

        <div className="explain-block">
          <div className="mnemonic-note">
            <p><b>💡 Truco para recordarlo:</b> {verb.mnemonic}</p>
          </div>
        </div>

        <div className="explain-block">
          <div className="mnemonic-note" style={{ borderLeftColor: 'var(--terracotta)', background: 'rgba(193,80,46,0.10)' }}>
            <p><b>⚠️ Error común en este tiempo:</b> {tip}</p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onContinue}>Continuar</button>
      </div>
    </div>
  );
}

function SummaryScreen({ practice, progress, onHome }) {
  const acc = pct(practice.correctCount, practice.count);
  return (
    <div className="screen">
      <div className="card" style={{ marginTop: 40 }}>
        <h2 style={{ textAlign: 'center', fontSize: 22 }}>Sesión completa</h2>
        <div className="summary-num">{acc}%</div>
        <div className="summary-lbl">{practice.correctCount} de {practice.count} correctas</div>
        <div className="stat-row">
          <div className="stat"><div className="num">{levelLabel(progress.level)}</div><div className="lbl">Nivel actual</div></div>
          <div className="stat"><div className="num">{progress.sessionsCompleted}</div><div className="lbl">Sesiones totales</div></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={onHome}>Volver al inicio</button>
      </div>
    </div>
  );
}
