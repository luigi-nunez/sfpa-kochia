import { useState } from "react";
import Modal from "./Modal.jsx";
import { T } from "../data/translations.js";
import { tools } from "../data/tools.js";
import { WA_NUMBER } from "../data/facilities.js";

function waUrl(toolTitle, lang) {
  const body = lang === "ar"
    ? `مرحبًا، أحتاج إلى معلومات حول: ${toolTitle}`
    : `Hello, I need information about: ${toolTitle}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
}

function ProgressDots({ total, current }) {
  return (
    <div className="tool-progress" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`progress-dot${i < current ? " done" : i === current ? " active" : ""}`}
        />
      ))}
    </div>
  );
}

function ToolQuestionnaire({ tool, lang, onClose }) {
  const t = T[lang];
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult]   = useState(null);

  const step = tool.steps[stepIdx];

  function pick(opt) {
    if (opt.next === "result") {
      setResult(opt.result);
    } else {
      setStepIdx(opt.next);
    }
  }

  function reset() {
    setStepIdx(0);
    setResult(null);
  }

  return (
    <>
      {!result ? (
        <div className="tool-q">
          <ProgressDots total={tool.steps.length} current={stepIdx} />
          <h3>{step.q}</h3>
          <div className="tool-options">
            {step.opts.map((opt, i) => (
              <button key={i} className="tool-opt" onClick={() => pick(opt)}>
                {opt.label}
              </button>
            ))}
          </div>
          <button className="tool-cancel" onClick={onClose}>{t.cancel}</button>
        </div>
      ) : (
        <div>
          <div className={`tool-result${result.type === "warning" ? " warning" : ""}`}>
            <div className="result-label">
              {result.type === "warning" ? "⚠️ " : "✅ "}
              {result.title}
            </div>
            <p>{result.body}</p>
            {result.showWA && (
              <div className="wa-cta">
                <a
                  className="wa-btn"
                  href={waUrl(tool.title, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true">💬</span> {t.whatsappCta}
                </a>
              </div>
            )}
          </div>
          <button className="tool-cancel" onClick={reset} style={{ marginTop: 12 }}>
            {t.startOver}
          </button>
          <button className="tool-cancel" onClick={onClose}>
            {t.cancel}
          </button>
          <p className="disclaimer">{t.disclaimer}</p>
        </div>
      )}
    </>
  );
}

export default function Tools({ lang }) {
  const t = T[lang];
  const toolList = tools[lang];
  const [openTool, setOpenTool] = useState(null);
  const activeTool = toolList.find(tl => tl.id === openTool);

  return (
    <div>
      <div className="section-header">
        <h2>{t.nav.tools}</h2>
        <p>{t.toolsIntro}</p>
      </div>

      <div className="tools-list">
        {toolList.map(tool => (
          <button
            key={tool.id}
            className="tool-card"
            onClick={() => setOpenTool(tool.id)}
            aria-label={tool.title}
          >
            <div className="tool-icon-wrap" aria-hidden="true">{tool.icon}</div>
            <div className="tool-info">
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>
            <span className="tool-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      <p className="disclaimer">{t.disclaimer}</p>

      {openTool && activeTool && (
        <Modal title={activeTool.title} onClose={() => setOpenTool(null)}>
          <ToolQuestionnaire
            tool={activeTool}
            lang={lang}
            onClose={() => setOpenTool(null)}
          />
        </Modal>
      )}
    </div>
  );
}
