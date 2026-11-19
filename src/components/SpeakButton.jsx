import { useVoice } from '../hooks/useVoice.jsx';
import { T } from '../data/translations.js';

// Listen / Stop control. Shown wherever the browser supports speech; hidden otherwise
// so users never see a button that does nothing.
export default function SpeakButton({ id, text, lang, className = '', onStart, onStop }) {
  const v = useVoice();
  if (!v?.supported) return null;
  const t = T[lang].voice;
  const playing = v.speakingId === id;

  return (
    <span className={`spk-wrap ${className}`}>
      <button
        type="button"
        className={`spk${playing ? ' on' : ''}`}
        aria-pressed={playing}
        onClick={(e) => {
          e.stopPropagation();
          if (playing) { v.stop(); onStop?.(); }
          else { v.speak(id, text); onStart?.(); }
        }}
      >
        <span aria-hidden="true">{playing ? '⏹' : '🔊'}</span>
        {playing ? t.stop : t.listen}
      </button>
      {!v.hasVoice && <span className="spk-warn">{t.noVoice}</span>}
    </span>
  );
}
