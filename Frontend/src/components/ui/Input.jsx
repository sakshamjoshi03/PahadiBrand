import React from "react";

/**
 * Reusable input component for PahadiBrand UI.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.placeholder
 * @param {string} props.type
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {boolean} props.required
 * @param {boolean} props.disabled
 */
function Input({
  label,
  placeholder = "",
  type = "text",
  value = "",
  onChange,
  required = false,
  disabled = false,
}) {
  return (
    <label className="ui-field">
      {label && <span className="ui-field-label">{label}</span>}
      <input
        className="ui-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </label>
  );
}

export default Input;
