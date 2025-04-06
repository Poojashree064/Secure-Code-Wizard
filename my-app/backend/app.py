from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI
from scanner import analyze_code  # Make sure this exists

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Init OpenAI
client = OpenAI(api_key=api_key)

# Init Flask
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "🔥 Secure Code Wizard Backend is live!"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    code = data.get("code", "")
    language = data.get("language", "")
    if not code or not language:
        return jsonify({"error": "Missing code or language"}), 400
    result = analyze_code(code, language)
    return jsonify(result)

@app.route("/generate", methods=["POST"])
def generate_secure_code():
    data = request.get_json()
    code = data.get("code", "")
    language = data.get("language", "")
    if not code or not language:
        return jsonify({"error": "Missing code or language"}), 400

    prompt = (
        f"The following {language} code contains security vulnerabilities:\n\n"
        f"{code}\n\n"
        f"Return ONLY the fully corrected and secure version of this code. Do not include any explanations or markdown formatting.Accept the input in any language and produce the output in the same language in which the input was given"
        f"Output a complete code snippet with no placeholders or unsafe practices.Remove insecure file reading and validate it.Validate the user input.Make sure the hardcoded password are removed explain  or any other way .Make sure parameterized queries are used if needed."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert secure code generator."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )
        secure_code = response.choices[0].message.content.strip()
        return jsonify({"secureCode": secure_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
