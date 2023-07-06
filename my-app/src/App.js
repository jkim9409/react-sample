import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import CodeOutput from './components/CodeOutput';
import './App.css';

function App() {
  const [selectedInputLanguage, setSelectedInputLanguage] = useState('java');
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState('java');
  const [codeInput, setCodeInput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputLanguageChange = (e) => {
    setSelectedInputLanguage(e.target.value);
  };

  const handleOutputLanguageChange = (e) => {
    setSelectedOutputLanguage(e.target.value);
  };

  const handleCodeInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
  
    try {
      console.log('Submitting code transformation request...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: "system",
              content: "You are the assistant that changes the programming language from the input you receive. Please follow this rule to give your answer in the following format:\n code must be inside ```<language>\n <code> ```"
            },
            {
              role: "user",
              content: `Convert code:\n${codeInput} written in ${selectedInputLanguage} to ${selectedOutputLanguage}.`
            }
          ]
        }),
      });
  
      if (response.ok) {
        console.log('Code transformation request successful.');
        const transformedCodeResponse = await response.json();
        const transformedCodeResult = transformedCodeResponse.choices[0]?.message?.content ?? '';
        setCodeOutput(transformedCodeResult);
      } else {
        console.error('Failed to transform code');
      }
    } catch (error) {
      console.error('Error transforming code:', error);
    } finally {
      setIsLoading(false);
      console.log('Code transformation request completed.');
    }
  };


  return (
    <div className="app-container">
      <h1>Code Transformation App</h1>
      <CodeInput
        selectedInputLanguage={selectedInputLanguage}
        selectedOutputLanguage={selectedOutputLanguage}
        onInputLanguageChange={handleInputLanguageChange}
        onOutputLanguageChange={handleOutputLanguageChange}
        onCodeInputChange={handleCodeInputChange}
        onSubmit={handleSubmit}
      />
      {isLoading ? (
        <div className="loading-icon">Loading...</div>
      ) : (
        <CodeOutput transformedCode={codeOutput} />
      )}
    </div>
  );
}

export default App;