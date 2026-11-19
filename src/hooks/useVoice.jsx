// Voice mode: on-device read-aloud using the browser's Web Speech API (speechSynthesis).
// No audio or text is sent to an SFPA server. On-device voices are preferred so that
// health content is not sent to a cloud text-to-speech service where a local voice exists.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kochia.voiceMode';
const VoiceContext = createContext(null);

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

function readStored() {
  try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
}
function writeStored(on) {
  try { localStorage.setItem(STORAGE_KEY, on ? '1' : '0'); } catch { /* storage unavailable */ }
}

// Pick the best installed voice for a language. Local (on-device) voices win over network voices.
function pickVoice(voices, lang) {
  const matches = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(lang));
  if (!matches.length) return null;
  const score = (v) => (v.localService ? 2 : 0) + (v.default ? 1 : 0);
  return [...matches].sort((a, b) => score(b) - score(a))[0];
}

// Chrome on Android and desktop stops long utterances after roughly 15 seconds,
// so text is split into sentence-sized chunks and queued.
function chunk(text, max = 180) {
  const parts = text
    .split(/\n+/)
    .flatMap((line) => line.replace(/\s+/g, ' ').trim().split(/(?<=[.!?؟؛])\s+/));
  const out = [];
  for (const p of parts) {
    if (p.length <= max) { out.push(p); continue; }
    let rest = p;
    while (rest.length > max) {
      let cut = Math.max(rest.lastIndexOf('،', max), rest.lastIndexOf(',', max), rest.lastIndexOf(' ', max));
      if (cut < max / 2) cut = max;
      out.push(rest.slice(0, cut + 1).trim());
      rest = rest.slice(cut + 1);
    }
    if (rest.trim()) out.push(rest.trim());
  }
  return out.filter(Boolean);
}

export function VoiceProvider({ lang, children }) {
  const [enabled, setEnabled] = useState(readStored);
  const [voices, setVoices] = useState(() => (synth ? synth.getVoices() : []));
  const [speakingId, setSpeakingId] = useState(null);
  const runRef = useRef(0);

  useEffect(() => {
    if (!synth) return undefined;
    const load = () => setVoices(synth.getVoices());
    load();
    synth.addEventListener?.('voiceschanged', load);
    return () => synth.removeEventListener?.('voiceschanged', load);
  }, []);

  const stop = useCallback(() => {
    runRef.current += 1;
    if (synth) synth.cancel();
    setSpeakingId(null);
  }, []);

  // Stop reading when the language changes or the app is hidden.
  useEffect(() => { stop(); }, [lang, stop]);
  useEffect(() => {
    const onHide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', onHide);
    return () => { document.removeEventListener('visibilitychange', onHide); stop(); };
  }, [stop]);

  const voice = pickVoice(voices, lang);

  const speak = useCallback((id, text) => {
    if (!synth || !text) return;
    stop();
    const run = runRef.current;
    const pieces = chunk(text);
    setSpeakingId(id);
    pieces.forEach((piece, i) => {
      const u = new SpeechSynthesisUtterance(piece);
      u.lang = voice?.lang || (lang === 'ar' ? 'ar-SA' : 'en-GB');
      if (voice) u.voice = voice;
      u.rate = lang === 'ar' ? 0.9 : 0.95;
      if (i === pieces.length - 1) {
        u.onend = () => { if (runRef.current === run) setSpeakingId(null); };
      }
      u.onerror = () => { if (runRef.current === run) setSpeakingId(null); };
      synth.speak(u);
    });
  }, [lang, voice, stop]);

  const toggle = useCallback(() => {
    setEnabled((on) => {
      const next = !on;
      writeStored(next);
      if (!next) stop();
      return next;
    });
  }, [stop]);

  const value = {
    supported: !!synth,
    enabled: enabled && !!synth,
    hasVoice: !!voice,
    speakingId,
    speak,
    stop,
    toggle,
  };

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
}

export function useVoice() {
  return useContext(VoiceContext);
}
