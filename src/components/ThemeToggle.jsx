const LABELS = {
  en: { toDark: "Switch to dark mode", toLight: "Switch to light mode" },
  ar: { toDark: "التبديل إلى الوضع الداكن", toLight: "التبديل إلى الوضع الفاتح" },
};

export default function ThemeToggle({ theme, onToggle, lang }) {
  const isDark = theme === "dark";
  const l = LABELS[lang] ?? LABELS.en;
  const label = isDark ? l.toLight : l.toDark;

  return (
    <button
      type="button"
      className="theme-btn"
      onClick={onToggle}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
    >
      {isDark ? (
        // Sun
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
