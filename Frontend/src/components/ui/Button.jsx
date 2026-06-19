import React from "react";

/**
 * Reusable button component for PahadiBrand UI.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {function} props.onClick
 * @param {boolean} props.disabled
 * @param {string} props.type
 * @param {string} props.variant
 */
function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ui-button ui-button-${variant} ${disabled ? "ui-button-disabled" : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
