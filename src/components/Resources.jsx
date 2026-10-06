import { useState } from "react";
import Modal from "./Modal.jsx";
import { T } from "../data/translations.js";
import { articles } from "../data/articles.js";
import { videos } from "../data/videos.js";

const CATS_ORDER = ["all", "fp", "sti", "maternal", "gbv", "mental"];

function ArticleBody({ body }) {
  return (
    <div className="article-body">
      {body.map((block, i) => {
        if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
        if (block.type === "p")  return <p  key={i}>{block.text}</p>;
        if (block.type === "ul") return (
          <ul key={i}>
            {block.items.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
        );
        return null;
      })}
    </div>
  );
}

export default function Resources({ lang }) {
  const t = T[lang];
  const [subTab, setSubTab] = useState("info");
  const [cat, setCat]       = useState("all");
  const [open, setOpen]     = useState(null); // article id

  const arts = articles[lang];
  const vids = videos[lang];
  const filtered = cat === "all" ? arts : arts.filter(a => a.cat === cat);
  const openArticle = arts.find(a => a.id === open);

  return (
    <div>
      <div className="section-header">
        <h2>{t.nav.resources}</h2>
      </div>

      {/* Sub-tabs */}
      <div className="resource-tabs" role="tablist">
        {["info", "videos"].map(key => (
          <button
            key={key}
            className={`resource-tab${subTab === key ? " active" : ""}`}
            role="tab"
            aria-selected={subTab === key}
            onClick={() => setSubTab(key)}
          >
            {t.resourceTabs[key]}
          </button>
        ))}
      </div>

      {subTab === "info" && (
        <>
          {/* Category chips */}
          <div className="cat-chips" role="group" aria-label="Filter by category">
            {CATS_ORDER.map(c => (
              <button
                key={c}
                className={`cat-chip${cat === c ? " active" : ""}`}
                onClick={() => setCat(c)}
              >
                {t.cats[c]}
              </button>
            ))}
          </div>

          {/* Article list */}
          <div className="articles-list">
            {filtered.length === 0 && (
              <p className="no-results">{t.noResults}</p>
            )}
            {filtered.map(a => (
              <article
                key={a.id}
                className="article-card"
                onClick={() => setOpen(a.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setOpen(a.id)}
                aria-label={a.title}
              >
                <div className="article-tag">{a.tag}</div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </article>
            ))}
          </div>
        </>
      )}

      {subTab === "videos" && (
        <div className="video-list">
          {vids.map(v => (
            <div key={v.id} className="video-card">
              <div className="video-thumb" aria-hidden="true">▶️</div>
              <div className="video-info">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <button
                  className="video-btn"
                  disabled
                  style={{ opacity: 0.55, cursor: "not-allowed" }}
                  aria-disabled="true"
                >
                  {t.videoComingSoon} · {v.duration}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article modal */}
      {open && openArticle && (
        <Modal title={openArticle.title} onClose={() => setOpen(null)}>
          <div className="article-tag" style={{ marginBottom: 12 }}>{openArticle.tag}</div>
          <ArticleBody body={openArticle.body} />
        </Modal>
      )}
    </div>
  );
}
