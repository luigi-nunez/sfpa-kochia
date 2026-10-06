import { useState } from "react";
import { T } from "../data/translations.js";
import { TOOLS } from "../data/tools.js";
import Modal from "./Modal.jsx";
import GetSupportInline from "./GetSupportInline.jsx";

function ProgressDots({ total, current }) {
  return (
    <div className="progress-dots" role="progressbar"
      aria-valuenow={current + 1} aria-valuemax={total} aria-valuemin={1}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`dot${i < current ? " done" : i === current ? " active" : ""}`} />
      ))}
    </div>
  );
}

function ToolQ({ tool, t, lang, onClose, onFindClinic }) {
  const [step, setStep]     = useState(0);
  const [result, setResult] = useState(null);

  function pick(opt) {
    if (opt.next === "result") setResult(opt.result);
    else setStep(opt.next);
  }

  if (result) {
    return (
      <div>
        <div className={`result-box${result.type === "warning" ? " warn" : ""}`} role="status">
          <div className="result-label">{result.type === "warning" ? "⚠ " : "✓ "}{result.title}</div>
          <p style={{ whiteSpace: "pre-line" }}>{result.body}</p>
        </div>
        {result.showSupport && (
          <GetSupportInline t={t} lang={lang}
            onFindClinic={result.showClinic ? () => { onClose(); onFindClinic(); } : null}
            showWA={true} showCall={true} showClinic={!!result.showClinic} />
        )}
        <button className="cancel-btn" style={{ marginTop: 14 }}
          onClick={() => { setStep(0); setResult(null); }}>{t.startOver}</button>
        <button className="cancel-btn" onClick={onClose}>{t.cancel}</button>
        <p className="disclaimer">{t.disclaimer}</p>
      </div>
    );
  }

  return (
    <div>
      <ProgressDots total={tool.steps.length} current={step} />
      <div className="tool-q">
        <h3 id="tool-question">{tool.steps[step].q}</h3>
        <div className="tool-opts" role="group" aria-labelledby="tool-question">
          {tool.steps[step].opts.map((opt, i) => (
            <button key={i} className="tool-opt" onClick={() => pick(opt)}>{opt.label}</button>
          ))}
        </div>
      </div>
      <button className="cancel-btn" style={{ marginTop: 14 }} onClick={onClose}>{t.cancel}</button>
    </div>
  );
}

export default function Tools({ lang, setTab }) {
  const t = T[lang];
  const toolList = TOOLS[lang];
  const [open, setOpen] = useState(null);
  const active = toolList.find(tl => tl.id === open);

  return (
    <div>
      <div className="sec-hdr">
        <h2>{t.nav.tools}</h2>
        <p>{t.toolsIntro}</p>
      </div>
      <div className="tool-proto-note" role="note">{t.toolsProtoNote}</div>
      <div className="tools-grid">
        {toolList.map(tl => (
          <button key={tl.id} className="tool-card" onClick={() => setOpen(tl.id)}
            aria-label={`${tl.title}: ${tl.desc}`}>
            <div className="tool-icon" aria-hidden="true">{tl.icon}</div>
            <div className="tool-info">
              <h3>{tl.title}</h3>
              <p>{tl.desc}</p>
            </div>
            <span className="tool-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>
      <p className="disclaimer" style={{ margin: "8px 16px 16px" }}>{t.disclaimer}</p>
      {open && active && (
        <Modal title={active.title} onClose={() => setOpen(null)}>
          <ToolQ tool={active} t={t} lang={lang}
            onClose={() => setOpen(null)}
            onFindClinic={() => setTab("facilities")} />
        </Modal>
      )}
    </div>
  );
}
