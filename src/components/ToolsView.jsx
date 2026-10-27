import { useState } from 'react';
import { T } from '../data/translations.js';
import { TOOLS } from '../data/tools.js';
import ToolModal from './ToolModal.jsx';

export default function ToolsView({ lang }) {
  const t = T[lang].tools;
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="pw ph">
      <h1>{t.heading}</h1>
      <p>{t.subtitle}</p>

      <div className="tgrid" style={{ marginTop: '24px' }}>
        {TOOLS.map((tool) => (
          <div key={tool.id} className="tcard">
            <span style={{ fontSize: '28px' }}>{tool.icon}</span>
            <p className="tcardtitle">{lang === 'ar' ? tool.title_ar : tool.title_en}</p>
            <p className="tcardsub">{lang === 'ar' ? tool.desc_ar : tool.desc_en}</p>
            <button className="tstart" onClick={() => setActiveTool(tool)}>{t.start}</button>
          </div>
        ))}
      </div>

      <p className="tdis">{t.disclaimer}</p>

      {activeTool && (
        <ToolModal
          tool={activeTool}
          lang={lang}
          onClose={() => setActiveTool(null)}
        />
      )}
    </div>
  );
}
