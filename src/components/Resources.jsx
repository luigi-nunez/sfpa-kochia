import { useState } from "react";
import { T } from "../data/translations.js";
import { ARTICLES } from "../data/articles.js";
import { VIDEOS } from "../data/videos.js";
import Modal from "./Modal.jsx";

function ArtBody({ body }) {
  return (
    <div className="art-body">
      {body.map((b, i) => {
        if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
        if (b.type === "p")  return <p key={i}>{b.text}</p>;
        if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
        return null;
      })}
    </div>
  );
}

const CATS = ["all", "fp", "sti", "maternal", "gbv", "mental"];

export default function Resources({ lang }) {
  const t = T[lang];
  const [sub, setSub] = useState("info");
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(null);
  const arts = ARTICLES[lang];
  const vids = VIDEOS[lang];
  const filtered = cat === "all" ? arts : arts.filter(a => a.cat === cat);
  const openArt = arts.find(a => a.id === open);

  return (
    <div>
      <div className="sec-hdr"><h2>{t.nav.resources}</h2></div>
      <div className="res-tabs" role="tablist">
        {["info", "videos"].map(k => (
          <button key={k} className={`res-tab${sub === k ? " active" : ""}`} onClick={() => setSub(k)}
            role="tab" aria-selected={sub === k}>{t.resTabs[k]}</button>
        ))}
      </div>

      {sub === "info" && (
        <>
          <div className="cat-chips" role="toolbar" aria-label="Filter by topic">
            {CATS.map(c => (
              <button key={c} className={`chip${cat === c ? " active" : ""}`} onClick={() => setCat(c)}
                aria-pressed={cat === c}>{t.cats[c]}</button>
            ))}
          </div>
          <div className="articles">
            {filtered.length === 0 && <p className="no-res">{t.noResults}</p>}
            {filtered.map(a => (
              <div key={a.id} className="article-card" onClick={() => setOpen(a.id)}
                role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setOpen(a.id)}
                aria-label={a.title}>
                <div className="art-tag">{a.tag}</div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {sub === "videos" && (
        <div className="videos">
          {vids.map(v => (
            <div key={v.id} className="video-card">
              <div className="vid-thumb" aria-hidden="true">▶️</div>
              <div className="vid-info">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <span className="vid-btn">{t.videoComingSoon}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && openArt && (
        <Modal title={openArt.title} onClose={() => setOpen(null)}>
          <div className="art-tag" style={{ marginBottom: 12 }}>{openArt.tag}</div>
          <ArtBody body={openArt.body} />
          <div className="art-proto">{t.protoLabel}</div>
        </Modal>
      )}
    </div>
  );
}
