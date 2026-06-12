import { useState } from "react";
import FAQS from "../data/faqs.js";

export default function FAQ({ lang, t }) {
  const faqs = FAQS[lang];
  const cats = t.cats;
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const usedCats = [...new Set(faqs.map(f => f.cat))];

  const filtered = faqs.filter(f =>
    (filter === "all" || f.cat === filter) &&
    (f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  );

  const groups = filter === "all" ? [...new Set(filtered.map(f => f.cat))] : [filter];

  return (
    <div>
      <div className="sec-header">
        <h2 className="sec-title">{t.sec.faq.title}</h2>
        <p className="sec-sub">{t.sec.faq.sub}</p>
      </div>

      <div className="search-wrap" style={{ marginBottom: 13 }}>
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="chips-row">
        <button className={`filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>{t.all}</button>
        {usedCats.map(k => (
          <button key={k} className={`filter-chip ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>{cats[k]}</button>
        ))}
      </div>

      {filtered.length === 0
        ? <div className="empty"><div className="empty-icon">💬</div><div className="empty-txt">{t.noResults}</div></div>
        : <div className="card" style={{ padding: "0 16px" }}>
            {groups.map(cat => (
              <div key={cat}>
                {/* Category label — NOT uppercase (fixes Arabic convention) */}
                {filter === "all" && (
                  <div className="faq-cat-title">{cats[cat]}</div>
                )}
                {filtered.filter(f => f.cat === cat).map(f => (
                  <div key={f.id} className="acc-item">
                    <button
                      className="acc-trigger"
                      onClick={() => setOpen(open === f.id ? null : f.id)}
                    >
                      <span>{f.q}</span>
                      <span style={{
                        color: "var(--teal)", flexShrink: 0, fontSize: 18,
                        transition: "transform .2s", display: "inline-block",
                        transform: open === f.id ? "rotate(45deg)" : "none",
                      }}>+</span>
                    </button>
                    <div
                      className="acc-content"
                      style={{ maxHeight: open === f.id ? 600 : 0, opacity: open === f.id ? 1 : 0 }}
                    >
                      <div className="acc-inner">{f.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
      }
    </div>
  );
}
