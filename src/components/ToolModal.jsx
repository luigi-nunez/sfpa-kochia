import { useState } from 'react';
import Modal from './Modal.jsx';
import { WA_NUMBER } from '../config.js';

export default function ToolModal({ tool, lang, onClose }) {
  const [stepId, setStepId] = useState(tool.steps[0].id);
  const [result, setResult] = useState(null);

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

  return (
    <Modal onClose={onClose}>
      <p className="mtitle">{title}</p>

      {!result ? (
        <>
          <p className="tprog">{lang === 'ar' ? `السؤال ${stepIndex + 1} من ${steps.length}` : `Question ${stepIndex + 1} of ${steps.length}`}</p>
          <div className="tbar">
            <div className="tfill" style={{ width: `${progress}%` }} />
          </div>
          <p className="tq">{lang === 'ar' ? step.q_ar : step.q_en}</p>
          <div className="topts">
            {step.opts.map((opt, i) => (
              <button key={i} className="topt" onClick={() => choose(opt)}>
                {lang === 'ar' ? opt.label_ar : opt.label_en}
              </button>
            ))}
          </div>
          <div className="tfoot">
            <button className="tcan" onClick={onClose}>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        </>
      ) : (
        <>
          <div className="tbar">
            <div className="tfill" style={{ width: '100%' }} />
          </div>
          <p className="rhead">{lang === 'ar' ? 'نتيجتك' : 'Your result'}</p>
          <p className="rtitle">{lang === 'ar' ? result.title_ar : result.title_en}</p>
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
            <button className="rcls" onClick={onClose}>
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
