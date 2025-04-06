import re

patterns = [
    (r"(SELECT\s+.+\s+FROM\s+.+['\"]\s*\+\s*\w+\s*\+\s*['\"])", "⚠ SQL Injection detected (string concatenation in query)"),
    (r"(\"|\')\s*\+\s*request\.", "⚠ SQL Injection pattern (unsafe user input in query)"),
    (r"(password|passwd|pwd)\s*=\s*['\"].+['\"]", "⚠ Hardcoded password found"),
    (r"(apikey|api_key|secret)\s*=\s*['\"].+['\"]", "⚠ Hardcoded API key or secret"),
    (r"open\s*\(\s*['\"].+['\"]\s*,\s*['\"]r['\"]\s*\)", "⚠ Insecure file read operation"),
    (r"open\s*\(.+['\"]w['\"]", "⚠ Writing to file without validation"),
    (r"os\.remove\s*\(.+\)", "⚠ Dangerous file deletion without checks"),
    (r"(eval|exec|compile)\s*\(.+\)", "⚠ Dangerous code execution function"),
    (r"(pickle\.load|yaml\.load)", "⚠ Deserialization without safe loader"),
    (r"(md5|sha1)\s*\(", "⚠ Weak hashing algorithm used"),
    (r"os\.system\s*\(.+\)", "⚠ Potential command injection"),
    (r"subprocess\.(Popen|call)\s*\(.+\)", "⚠ Subprocess call — verify sanitization"),
    (r"(http:\/\/)", "⚠ Insecure HTTP URL used — use HTTPS"),

    # JS/TS
    (r"fs\.readFile\(", "⚠ Insecure file read without validation"),
    (r"fs\.writeFile\(", "⚠ Insecure file write operation"),
    (r"child_process\.exec\(", "⚠ Command injection via exec()"),
    (r"eval\(", "⚠ Use of eval() is dangerous"),
    (r"document\.innerHTML\s*=", "⚠ Potential XSS vulnerability"),
    (r"req\.(query|body)\.", "⚠ Unvalidated user input"),
    (r"res\.send\(.+req\..+\)", "⚠ User input directly sent to client"),
    (r"jwt\.sign\(.+['\"][^,]+['\"]", "⚠ Hardcoded JWT secret"),
]

def analyze_code(code, language):
    issues = []
    lines = code.split('\n')

    for i, line in enumerate(lines, 1):
        for pattern, message in patterns:
            if re.search(pattern, line, re.IGNORECASE):
                issues.append({
                    "line": i,
                    "code": line.strip(),
                    "message": f"Line {i}: {message}"
                })

    score = max(0, 100 - len(issues) * 10)
    return {
        "score": score,
        "issues": issues
    }
