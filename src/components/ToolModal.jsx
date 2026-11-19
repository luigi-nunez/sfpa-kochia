import { useEffect, useState } from 'react';
import { useVoice } from '../hooks/useVoice.jsx';
import SpeakButton from './SpeakButton.jsx';
import { T } from '../data/translations.js';
import Modal from './Modal.jsx';
import { WA_NUMBER } from '../config.js';

export default function ToolModal({ tool, lang, onClose }) {
  const [stepId, setStepId] = useState(tool.steps[0].id);
  const [result, setResult] = useState(null);
  // Becomes true when the user taps Listen inside this tool. Following questions and the
  // result are then read automatically until they tap Stop or close the tool. Nothing is
  // ever read aloud without a tap, so the phone never speaks health content unprompted.
  const [autoRead, setAutoRead] = useState(false);

  const steps = tool.steps;
  const stepIndex = steps.findIndex((s) => s.id === stepId);
  const step = steps[stepIndex];
  const progress = result ? 100 : Math.round(((stepIndex) / steps.length) * 100);

  function choose(opt) {
    if (opt.result) {
      setResult(tool.results[opt.result]);
    } else if (opt.next) {
      setStepId(opt.next);
    }
  }

  function reset() {
    setStepId(tool.steps[0].id);
    setResult(null);
  }

  const title = lang === 'ar' ? tool.title_ar : tool.title_en;
  const voice = useVoice();
  const optWord = T[lang].voice.option;

  // Text read aloud for the current question: the question, then each numbered option.
  const stepText = step
    ? [
        lang === 'ar' ? step.q_ar : step.q_en,
        ...step.opts.map((o, i) => `${optWord} ${i + 1}: ${lang === 'ar' ? o.label_ar : o.label_en}.`),
      ].join('\n')
    : '';
  const resultText = result
    ? [lang === 'ar' ? result.title_ar : result.title_en, lang === 'ar' ? result.body_ar : result.body_en].join('\n')
    : '';

  // After the user has started listening, read each new question or result automatically.
  // The tap that chose an option counts as the user gesture browsers require.
  useEffect(() => {
    if (!autoRead) return;
    if (result) voice.speak(`tool-${tool.id}-result`, resultText);
    else voice.speak(`tool-${tool.id}-${stepId}`, stepText);
  }, [stepId, result, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  function close() {
    voice?.stop();
    onClose();
  }

  return (
    <Modal onClose={close}>
      <p className="mtitle">{title}</p>

      {!result ? (
        <>
          <p className="tprog">{lang === 'ar' ? `السؤال ${stepIndex + 1} من ${steps.length}` : `Question ${stepIndex + 1} of ${steps.length}`}</p>
          <div className="tbar">
            <div className="tfill" style={{ width: `${progress}%` }} />
          </div>
          <p className="tq">{lang === 'ar' ? step.q_ar : step.q_en}</p>
          <SpeakButton id={`tool-${tool.id}-${stepId}`} lang={lang} className="spk-block" text={stepText} onStart={() => setAutoRead(true)} onStop={() => setAutoRead(false)} />
          <div className="topts">
            {step.opts.map((opt, i) => (
              <button key={i} className="topt" onClick={() => choose(opt)}>
                {lang === 'ar' ? opt.label_ar : opt.label_en}
              </button>
            ))}
          </div>
          <div className="tfoot">
            <button className="tcan" onClick={close}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        </>
      ) : (
        <>
          <div className="tbar">
            <div className="tfill" style={{ width: '100%' }} />
          </div>
          <p className="rhead">{lang === 'ar' ? 'نتيجتك' : 'Your result'}</p>
          <p className="rtitle">{lang === 'ar' ? result.title_ar : result.title_en}</p>
          <SpeakButton id={`tool-${tool.id}-result`} lang={lang} className="spk-block" text={resultText} onStart={() => setAutoRead(true)} onStop={() => setAutoRead(false)} />
          <p className="rbody">{lang === 'ar' ? result.body_ar : result.body_en}</p>

          <div className="wac">
            {WA_NUMBER ? (
              <>
                <p className="wap">
                  {lang === 'ar' ? '💬 تحدث مع مستشار الجمعية' : '💬 Speak with an SFPA counsellor'}
                </p>
                <a
                  className="wabtn"
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lang === 'ar' ? result.wa_ar : result.wa_en)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>📲</span>
                  {lang === 'ar' ? 'فتح واتساب' : 'Open WhatsApp'}
                </a>
              </>
            ) : (
              <p className="wa-placeholder">
                {lang === 'ar'
                  ? 'سيتوفر رابط واتساب بعد الإعداد.'
                  : 'WhatsApp contact will be available after configuration.'}
              </p>
            )}
          </div>

          <p className="rdis">
            {lang === 'ar'
              ? 'هذه الأداة توفر إرشادات عامة فقط وليست بديلاً عن الاستشارة الطبية. استشر دائماً مختصاً صحياً مؤهلاً.'
              : 'This tool provides general guidance only and is not a substitute for professional medical advice. Always consult a qualified health professional.'}
          </p>
          <div className="racts">
            <button className="rrst" onClick={reset}>
              {lang === 'ar' ? 'ابدأ من جديد' : 'Start again'}
            </button>
            <button className="rcls" onClick={close}>
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
