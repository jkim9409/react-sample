import React from 'react';
import './CodeOutput.css';

function CodeOutput({ transformedCode }) {
  const codeToDisplay = getCodeSnippet(transformedCode);

  function getCodeSnippet(transformedCodeResponse) {
    const codeSnippetRegex = /```.*\n([\s\S]*?)\n```/;
    const match = transformedCodeResponse?.match(codeSnippetRegex);
    return match ? match[1] : '';
  }

  return (
    <div className="code-output-container">
      <h2>Transformed Code</h2>
      <pre className="code-output">{codeToDisplay}</pre>
    </div>
  );
}

export default CodeOutput;