import { useState } from "react";
import TOOLS from "../data/tools.js";
import { WA_NUMBER } from "../data/facilities.js";
import Modal from "./Modal.jsx";

export default function Tools({ lang, t }) {
  const tools = TOOLS[lang];
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const open = tool => { setActive(tool); setStep(0); setAnswers({}); setDone(false); };
  const close = () => setActive(null);
  const pick = opt => setAnswers(p => ({ ...p, [step]: opt }));
  const next = () => step < active.steps.length - 1 ? setStep(s => s + 1) : setDone(true);
  const prev = () => setStep(s => s - 1);

  const getResult = () => {
    if (!active) return null;
    const vals = Object.values(answers);
    if (active.id === "fp" && vals.includes("Yes") && active.results.bf) return active.results.bf;
    const notAtAll = lang === "en" ? "Not at all" : "لا على الإطلاق";
    const no = lang === "en" ? "No" : "لا";
    if (active.id === "mental" && answers[0] === notAtAll && answers[2] === no && active.results.low) return active.results.low;
    return active.results.default;
  };

  return (
    <div>
      <div className="sec-header">
        <h2 className="sec-title">{t.sec.tools.title}</h2>
        <p className="sec-sub">{t.sec.tools.sub}</p>
      </div>

      <div className="tool-grid">
        {tools.map(tool => (
          <div key={tool.id} className="card tool-card" onClick={() => open(tool)}>
            <div className="tool-icon">{tool.icon}</div>
            <div>
              <div className="tool-name">{tool.name}</div>
              <div className="tool-desc">{tool.desc}</div>
              <div className="tool-cta">{t.startTool}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!active} onClose={close} lang={lang}>
        {active && !done && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                <span style={{ fontSize: 21 }}>{active.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{active.name}</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${((step + 1) / active.steps.length) * 100}%` }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--g500)", marginTop: 5 }}>
                {lang === "en"
                  ? `Question ${step + 1} of ${active.steps.length}`
                  : `السؤال ${step + 1} من ${active.steps.length}`}
              </div>
            </div>

            <div className="q-label">{active.steps[step].q}</div>
            <div className="q-opts">
              {active.steps[step].opts.map(opt => (
                <button
                  key={opt}
                  className={`q-opt ${answers[step] === opt ? "sel" : ""}`}
                  onClick={() => pick(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 7, marginTop: 14 }}>
              {/* Cancel always visible — fixes no-exit-mid-flow bug */}
              <button className="btn btn-ghost" onClick={close}>{t.cancel}</button>
              {step > 0 && (
                <button className="btn btn-ghost" onClick={prev}>
                  {lang === "en" ? "← Back" : "رجوع →"}
                </button>
              )}
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={next}
                disabled={!answers[step]}
              >
                {step === active.steps.length - 1 ? t.finish : t.next}
              </button>
            </div>
          </>
        )}

        {active && done && (() => {
          const r = getResult();
          return (
            <>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{active.icon}</div>
              <div className="result-box">
                <div className="result-title">✅ {r.title}</div>
                <div className="result-body">{r.body}</div>
              </div>

              {/* WhatsApp CTA embedded in result — fixes mental health screen gap */}
              {r.showWA && (
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: 14, width: "100%", justifyContent: "center", background: "#25D366" }}
                >
                  💬 {t.mentalHealthWaPrompt}
                </a>
              )}

              {/* Disclaimer at increased font size */}
              <div className="disclaimer">⚠️ {t.disclaimer}</div>

              <button
                className="btn btn-outline"
                style={{ marginTop: 14, width: "100%" }}
                onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
              >
                {t.restart}
              </button>
            </>
          );
        })()}
      </Modal>
    </div>
  );
}
