import { useRef, useEffect } from "react";

export default function Modal({ title, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="sheet">
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-hdr">
          <h2 className="sheet-title">{title}</h2>
          <button className="close-btn" onClick={onClose} ref={closeRef} aria-label="Close">✕</button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}
