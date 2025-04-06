import { useEffect, useState } from 'react';
import './Description.css';

export default function Description({ onGetStarted }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  return (
    <div className={`description-container ${loaded ? 'loaded' : ''}`}>
      <div className="description-content">
        <div className="image-section">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Secure Code Wizard"
              className="main-image"
            />
            <div className="image-overlay"></div>
            <div className="floating-code">
              {Array(10).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="code-line"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {i % 2 === 0 ? 'const secureCode = () => {' : '  return <SafeComponent/>;'}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-section">
          <h1 className="title">
            <span className="title-part">Secure</span>
            <span className="title-part">Code</span>
            <span className="title-part">Wizard</span>
          </h1>
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <div>
                <h3>Advanced Code Analysis</h3>
                <p>Detect vulnerabilities before they become problems</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <div>
                <h3>AI-Powered Suggestions</h3>
                <p>Get intelligent recommendations for secure coding</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <div>
                <h3>Multi-Language Support</h3>
                <p>Works with Python, JavaScript, Java and more</p>
              </div>
            </div>
          </div>
          
          <button 
            className="get-started-button"
            onClick={onGetStarted}
          >
            Get Started Now
            <span className="button-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}