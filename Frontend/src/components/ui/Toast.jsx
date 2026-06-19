import React from "react";

/**
 * Reusable toast notification component for PahadiBrand UI.
 *
 * @param {Object} props
 * @param {string} props.message
 * @param {string} props.type
 */
function Toast({ message, type = "info" }) {
  return (
    <div className={`ui-toast ui-toast-${type}`} role="status" aria-live="polite">
      <span className="ui-toast-icon">{type === "success" ? "✓" : type === "error" ? "⚠" : "ℹ"}</span>
      <div>
        <p className="ui-toast-title">{type === "success" ? "Success" : type === "error" ? "Error" : "Info"}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Toast;
