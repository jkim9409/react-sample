import React from 'react';
import './CodeInput.css';


function CodeInput({
  selectedInputLanguage,
  selectedOutputLanguage,
  codeInput, // Added codeInput prop
  onInputLanguageChange,
  onOutputLanguageChange,
  onCodeInputChange,
  onSubmit
}) {
  return (
    <div className="code-input-container">
      <div className="language-select">
        <label htmlFor="input-language">Input Language:</label>
        <select
          id="input-language"
          value={selectedInputLanguage}
          onChange={onInputLanguageChange}
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="rust">Rust</option>
        </select>
      </div>
      <div className="language-select">
        <label htmlFor="output-language">Output Language:</label>
        <select
          id="output-language"
          value={selectedOutputLanguage}
          onChange={onOutputLanguageChange}
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="rust">Rust</option>
        </select>
      </div>
      <textarea
        className="code-input"
        value={codeInput}
        onChange={onCodeInputChange}
        placeholder="Enter your code here..."
      ></textarea>
      <button className="submit-button" onClick={onSubmit}>
        Transform Code
      </button>
    </div>
  );
}

export default CodeInput;