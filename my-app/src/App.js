import { useState, useEffect } from "react";
import axios from "axios";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ResultDisplay from "./components/ResultDisplay";
import Description from "./components/Description";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

export default function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [result, setResult] = useState(null);
  const [secureCode, setSecureCode] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  if (showIntro) {
    return <Description onGetStarted={() => setShowIntro(false)} />;
  }

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post("http://localhost:5000/analyze", { code, language });
      setResult(response.data);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateSecureCode = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post("http://localhost:5000/generate", { code, language });
      setSecureCode(response.data.secureCode);
    } catch (error) {
      console.error("Error generating secure code", error);
      setSecureCode("Error generating secure code");
    } finally {
      setIsGenerating(false);
    }
  };

  const applyFixFromIssue = async (issueDescription) => {
    setIsGenerating(true);
    try {
      const response = await axios.post("http://localhost:5000/generate", { code, language, issueDescription });
      setSecureCode(response.data.secureCode);
    } catch (error) {
      console.error("Error applying fix", error);
      setSecureCode("Error applying fix");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!secureCode) return;
    navigator.clipboard.writeText(secureCode);
    const copyBtn = document.querySelector('.copy-button');
    copyBtn.textContent = '✓ Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = '📋 Copy';
    }, 2000);
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="header">
        <h1>🔐 Secure Code Wizard</h1>
        <p>Analyze and secure your code with advanced AI</p>
      </div>

      <LanguageSelector selectedLanguage={language} onSelect={setLanguage} />

      <div className="main-content">
        <div className="editor-section">
          <h2>💻 Code Editor</h2>
          <CodeEditor code={code} setCode={setCode} />
        </div>

        <div className="analysis-section">
          <div className="analysis-container">
            <h2>🛡️ Security Analysis</h2>
            <button onClick={analyzeCode} disabled={!code || isAnalyzing}>
              {isAnalyzing ? <LoadingSpinner /> : '🔍 Analyze Code'}
            </button>
            
            {showAnalysis && result && (
              <>
                <div className="quality-meter">
                  <div className="meter-bar" style={{ width: `${result.score}%` }}>
                    <span className="meter-text">{result.score}% Secure</span>
                  </div>
                </div>
                <ResultDisplay result={result} onApplyFix={applyFixFromIssue} />
              </>
            )}
          </div>

          <div className="secure-code-container">
            <h2>✨ Secure Code Generation</h2>
            <button onClick={generateSecureCode} disabled={!code || isGenerating}>
              {isGenerating ? <LoadingSpinner /> : '⭐ Generate Secure Code'}
            </button>
            {secureCode && (
              <div className="code-display-wrapper">
                <div className="code-header">
                  <button 
                    className="copy-button"
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="code-with-lines">
                  <div className="line-numbers">
                    {secureCode.split('\n').map((_, i) => (
                      <div key={i} className="line-number">{i + 1}</div>
                    ))}
                  </div>
                  <textarea
                    className="secure-code-textarea"
                    value={secureCode}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
