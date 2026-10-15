import { useEffect } from "react";

export default function Modal({ open, onClose, children, lang }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`modal-box ${lang === "ar" ? "app-ar" : "app-en"}`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  );
}
