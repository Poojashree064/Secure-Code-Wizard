import './ResultDisplay.css';

export default function ResultDisplay({ result }) {
  return (
    <div className="result-container">
      <h3>
        Security Score: <span className="score">{result.score}%</span>
      </h3>
      <ul className="issues-list">
        {result.issues.length > 0 ? (
          result.issues.map((issue, index) => (
            <li key={index} className="issue-card vulnerability-message">
              {issue.message}
            </li>
          ))
        ) : (
          <li className="no-issues">
            No vulnerabilities found 🎉
          </li>
        )}
      </ul>
    </div>
  );
}
