import { useState, useEffect, useRef } from "react";
import "./CodeEditor.css";

export default function CodeEditor({ code, setCode }) {
  const [lines, setLines] = useState(1);
  const editorRef = useRef(null);

  const getHighlightedCode = (code) => {
    return code
      //.replace(/(#.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(".*?"|'.*?')/g, '<span class="string">$1</span>')
      .replace(/\b(function|if|else|for|while|return)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(console|log|alert)\b/g, '<span class="function">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
  };

  useEffect(() => {
    const newLines = code.split('\n').length;
    setLines(newLines < 1 ? 1 : newLines);
  }, [code]);

  const handleInput = (e) => {
    const newText = e.currentTarget.textContent;
    setCode(newText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '  ');
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="line-numbers">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="line-number">{i + 1}</div>
        ))}
      </div>
      <div
        ref={editorRef}
        className="code-input"
        contentEditable
        dangerouslySetInnerHTML={{ __html: getHighlightedCode(code) }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        spellCheck="false"
      />
    </div>
  );
}