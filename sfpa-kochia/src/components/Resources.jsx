import { useState } from "react";
import ARTICLES from "../data/articles.js";
import VIDEOS from "../data/videos.js";
import Modal from "./Modal.jsx";

function ArticleBody({ body }) {
  return (
    <div className="art-detail-body">
      {body.map((block, i) => {
        if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
        if (block.type === "ul") return <ul key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}

function InfoTab({ lang, t }) {
  const arts = ARTICLES[lang];
  const cats = t.cats;
  const usedCats = [...new Set(arts.map(a => a.cat))];
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);

  const filtered = arts.filter(a =>
    (filter === "all" || a.cat === filter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  if (sel) return (
    <div style={{ maxWidth: 680 }}>
      <button className="art-detail-back" onClick={() => setSel(null)}>{t.back}</button>
      <div style={{ fontSize: 44, marginBottom: 12 }}>{sel.emoji}</div>
      <span className="pill" style={{ marginBottom: 10, display: "inline-block" }}>{cats[sel.cat]}</span>
      <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 6, marginTop: 8 }}>{sel.title}</h2>
      <p style={{ fontSize: 12, color: "var(--g500)", marginBottom: 18 }}>⏱ {sel.minRead} {t.minRead}</p>
      <ArticleBody body={sel.body} />
      <div style={{ marginTop: 18, padding: "12px 14px", background: "var(--teal-light)", borderRadius: "var(--radius-md)" }}>
        <p style={{ fontSize: 12, color: "var(--teal-dark)" }}>
          {lang === "en"
            ? "📍 For personalised advice, visit an SFPA clinic or message us on WhatsApp."
            : "📍 للحصول على مشورة شخصية، زوري عيادة الجمعية أو راسلينا عبر واتساب."}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="search-wrap" style={{ marginBottom: 13 }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {/* Only show chips for categories that have articles */}
      <div className="chips-row">
        <button className={`filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>{t.all}</button>
        {usedCats.map(k => (
          <button key={k} className={`filter-chip ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>{cats[k]}</button>
        ))}
      </div>
      {filtered.length === 0
        ? <div className="empty"><div className="empty-icon">🔍</div><div className="empty-txt">{t.noResults}</div></div>
        : <div className="art-grid">
            {filtered.map(a => (
              <div key={a.id} className="card art-card" onClick={() => setSel(a)}>
                <div className="art-emoji">{a.emoji}</div>
                <div className="art-cat">{cats[a.cat]}</div>
                <div className="art-title">{a.title}</div>
                <div className="art-excerpt">{a.excerpt}</div>
                <div className="art-more">{t.readMore}</div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

function VideosTab({ lang, t }) {
  const vids = VIDEOS[lang];
  const cats = t.cats;
  const usedCats = [...new Set(vids.map(v => v.cat))];
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);

  const filtered = vids.filter(v =>
    (filter === "all" || v.cat === filter) &&
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="search-wrap" style={{ marginBottom: 13 }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="chips-row">
        <button className={`filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>{t.all}</button>
        {usedCats.map(k => (
          <button key={k} className={`filter-chip ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>{cats[k]}</button>
        ))}
      </div>
      {filtered.length === 0
        ? <div className="empty"><div className="empty-icon">🎬</div><div className="empty-txt">{t.noResults}</div></div>
        : <div className="vid-grid">
            {filtered.map(v => (
              <div key={v.id} className="card vid-card" onClick={() => setSel(v)}>
                <div className="vid-thumb" style={{ background: v.bg }}>
                  {v.emoji}
                  <span className="vid-badge">▶ {v.duration}</span>
                </div>
                <div className="vid-body">
                  <div className="vid-dur">{v.duration}</div>
                  <div className="vid-title">{v.title}</div>
                  <div className="vid-cat">{cats[v.cat]}</div>
                  {v.signLang && <div className="sl-badge">🤟 {t.signLang}</div>}
                </div>
              </div>
            ))}
          </div>
      }
      <Modal open={!!sel} onClose={() => setSel(null)} lang={lang}>
        {sel && (
          <>
            <div style={{ height: 160, background: sel.bg, borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70, marginBottom: 15 }}>
              {sel.emoji}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{sel.title}</div>
            <div style={{ fontSize: 13, color: "var(--g600)", lineHeight: 1.65, marginBottom: 10 }}>{sel.desc}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: "var(--g500)" }}>⏱ {sel.duration}</span>
              <span className="pill">{cats[sel.cat]}</span>
              {sel.signLang && <span className="sl-badge">🤟 {t.signLang}</span>}
            </div>
            <div style={{ background: "var(--g50)", borderRadius: "var(--radius-md)", padding: "12px 14px", fontSize: 12, color: "var(--g500)", marginBottom: 12 }}>
              {lang === "en"
                ? "📹 In the live platform, videos will stream or download directly here."
                : "📹 في المنصة الكاملة، ستُبث الفيديوهات أو تُنزَّل مباشرة هنا."}
            </div>
            {/* Disabled watch button with clear coming-soon label — fixes silent dead button */}
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 1, opacity: 0.55, cursor: "not-allowed" }} disabled>
                ▶ {t.videoComingSoon}
              </button>
              <button className="btn btn-outline" disabled style={{ opacity: 0.55, cursor: "not-allowed" }}>{t.download}</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default function Resources({ lang, t }) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div>
      <div className="sec-header">
        <h2 className="sec-title">
          {activeTab === "info" ? t.sec.info.title : t.sec.videos.title}
        </h2>
        <p className="sec-sub">
          {activeTab === "info" ? t.sec.info.sub : t.sec.videos.sub}
        </p>
      </div>

      {/* Internal resource tabs — replaces two separate nav items */}
      <div className="resource-tabs">
        <button
          className={`resource-tab ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          📚 {t.resourceTabs.info}
        </button>
        <button
          className={`resource-tab ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          🎬 {t.resourceTabs.videos}
        </button>
      </div>

      {activeTab === "info"   && <InfoTab   lang={lang} t={t} />}
      {activeTab === "videos" && <VideosTab lang={lang} t={t} />}
    </div>
  );
}
