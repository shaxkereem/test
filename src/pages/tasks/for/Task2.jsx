import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useNavigate } from "react-router-dom";

export default function Task2({ onSuccess }) {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("3 7");
  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointAdded, setPointAdded] = useState(false);
  const navigate = useNavigate();

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("\u26a0\ufe0f Кодты жазы\u04a3ыз.");
      return;
    }

    try {
      const pyodide = await window.loadPyodide();
      pyodide.globals.set("input_text", input);
      pyodide.runPython(`
def input(prompt=None):
    return input_text
`);

      const stdout = [];
      pyodide.setStdout({
        batched: (data) => stdout.push(data + "\n"),
      });

      await pyodide.runPythonAsync(code);
      const resultOutput = stdout.join("").trim();
      setOutput(resultOutput);

      const normalized = code.replace(/\s/g, "").toLowerCase();
      const hasWhile = normalized.includes("while");
      const hasIfElse = normalized.includes("if") && normalized.includes("else");

      const ascValid = input === "3 7" && resultOutput.startsWith("3") && resultOutput.includes("7");
      const descValid = input === "7 3" && resultOutput.startsWith("7") && resultOutput.includes("3");

      if (hasWhile && hasIfElse && (ascValid || descValid)) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }

    } catch (err) {
      setOutput(`❌ Қате: ${err.message}`);
      setIsCorrect(false);
    }
  };

  const handleAddPoint = () => {
    if (!pointAdded) {
      onSuccess?.();
      setPointAdded(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#FFD700", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔁 Тапсырма 2</h1>

      <p style={{ color: "#ccc", fontSize: "1.2rem", marginBottom: "1rem" }}>
        🧮 Екі бүтін сан A және B берілсін. Егер A &lt; B болса, барлық сандарды A-дан B-ге дейін (қоса) өсу ретімен шығар.
        Ал керісінше жағдайда — кему ретімен шығар.
      </p>

      <div style={{
        backgroundColor: "#111",
        color: "#FFD700",
        padding: "1rem",
        borderRadius: "10px",
        fontFamily: "monospace",
        marginBottom: "1rem"
      }}>
        <pre>
{`Кіріс: 3 7
Шығыс: 3 4 5 6 7`}
        </pre>
      </div>

      <label>🔢 Кіріс мәні:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #FFD700",
          backgroundColor: "#111",
          color: "#FFD700"
        }}
      />

      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        onChange={(val) => setCode(val)}
        theme="dark"
        style={{ marginBottom: "1rem", fontSize: "1rem" }}
      />

      <button onClick={runCode} style={buttonStyle}>▶️ Кодты іске қосу</button>

      <div style={{
        marginTop: "1rem",
        padding: "1rem",
        borderRadius: "10px",
        backgroundColor: "#111",
        minHeight: "100px",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        fontSize: "1rem"
      }}>
        {output || "📥 Нәтиже осында шығады"}
      </div>

      {isCorrect && (
        <div style={{ marginTop: "2rem" }}>
          {!pointAdded && (
            <button
              onClick={handleAddPoint}
              style={{
                backgroundColor: "#0f0",
                color: "#000",
                padding: "0.75rem 1.5rem",
                fontWeight: "bold",
                borderRadius: "10px",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                marginRight: "1rem"
              }}
            >
              ⭐ Ұпай қосу
            </button>
          )}
          <button
            onClick={() => navigate("/grade8/while-practice/3")}
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer"
            }}
          >
            ✅ Submit
          </button>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#FFD700",
  color: "#000",
  padding: "0.6rem 1.5rem",
  fontWeight: "bold",
  fontSize: "1rem",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer"
};