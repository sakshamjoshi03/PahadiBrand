import React, { useEffect } from "react";

/**
 * Reusable modal component for PahadiBrand UI.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {import('react').ReactNode} props.children
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 */
function Modal({ title, children, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="ui-modal-overlay" onClick={onClose}>
      <div className="ui-modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="ui-modal-header">
          <h2>{title}</h2>
          <button className="ui-modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <div className="ui-modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
