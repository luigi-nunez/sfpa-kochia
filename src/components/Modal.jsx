import { useEffect } from "react";

export default function Modal({ title, onClose, children }) {
  // Lock scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on backdrop click
  function handleOverlay(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlay} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-sheet">
        <div className="modal-handle" aria-hidden="true" />
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
