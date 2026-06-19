import React from "react";

/**
 * Reusable loader component for PahadiBrand UI.
 *
 * @param {Object} props
 * @param {string} props.text
 */
function Loader({ text = "Loading..." }) {
  return (
    <div className="ui-loader-wrapper">
      <div className="ui-loader-spinner" />
      {text && <p className="ui-loader-text">{text}</p>}
    </div>
  );
}

export default Loader;
