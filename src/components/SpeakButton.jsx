import { useVoice } from '../hooks/useVoice.jsx';
import { T } from '../data/translations.js';

// Listen / Stop control. Renders nothing unless voice mode is on.
export default function SpeakButton({ id, text, lang, className = '' }) {
  const v = useVoice();
  if (!v?.enabled) return null;
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
          if (playing) v.stop(); else v.speak(id, text);
        }}
      >
        <span aria-hidden="true">{playing ? '⏹' : '🔊'}</span>
        {playing ? t.stop : t.listen}
      </button>
      {!v.hasVoice && <span className="spk-warn">{t.noVoice}</span>}
    </span>
  );
}
