import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ title, onClose, children }) {
  const target = document.getElementById("modal-root") || document.body;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const content = (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          width: "min(720px,92vw)",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "var(--shadow)",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <strong>{title}</strong>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </header>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, target);
}
