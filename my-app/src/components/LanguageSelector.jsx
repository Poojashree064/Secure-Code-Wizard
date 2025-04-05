import { useState } from "react";
import "./LanguageSelector.css";

const languages = [
  { name: "Python", className: "python", emoji: "🐍" },
  { name: "JavaScript", className: "javascript", emoji: "📜" },
  { name: "TypeScript", className: "typescript", emoji: "🟦" },
  { name: "Java", className: "java", emoji: "☕" },
  { name: "C++", className: "cpp", emoji: "➕➕" },
];

export default function LanguageSelector({ selectedLanguage, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (lang, index) => {
    onSelect(lang.name);
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(-1), 300);
  };

  return (
    <div className="language-selector">
      {languages.map((lang, index) => (
        <button
          key={lang.name}
          className={`language-button ${lang.className} ${
            selectedLanguage === lang.name ? "active" : ""
          }`}
          onClick={() => handleClick(lang, index)}
          data-active={activeIndex === index}
        >
          {lang.emoji} {lang.name}
        </button>
      ))}
    </div>
  );
}