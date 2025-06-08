import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useNavigate } from "react-router-dom";

export default function Task1({ onSuccess }) {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("6\n2\n4\n3\n8\n10\n12");
  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointAdded, setPointAdded] = useState(false);
  const navigate = useNavigate();

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("⚠️ Кодты жазыңыз.");
      return;
    }

    try {
      const pyodide = await window.loadPyodide();
      pyodide.globals.set("input_text", input);
      pyodide.runPython(`
def input(prompt=None):
    global input_text
    values = input_text.split("\\n")
    def inner(prompt=None):
        return values.pop(0)
    __builtins__.input = inner
`);

      const stdout = [];
      pyodide.setStdout({ batched: (data) => stdout.push(data + "\n") });
      await pyodide.runPythonAsync(code);
      const resultOutput = stdout.join("").trim();
      setOutput(resultOutput);

      const normalized = code.replace(/\s/g, "").toLowerCase();
      const usesBreak = normalized.includes("break");
      const conditionMet = resultOutput.includes("2") && resultOutput.includes("4") && !resultOutput.includes("8");

      if (usesBreak && conditionMet) {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔁 Тапсырма 1 — Break</h1>
      <p style={{ color: "#ccc", fontSize: "1.2rem", marginBottom: "1rem" }}>
        🧠 Пайдаланушыдан бірнеше сан енгізу сұралады. Егер енгізілген сан тақ (odd) болса, цикл тоқтайды. Әйтпесе сандарды экранға шығарып отырады.
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
{`Кіріс:
6
2
4
3
8
10
12

Шығыс:
2
4`}
        </pre>
      </div>
      <label>🔢 Кіріс мәні:</label>
      <textarea
        rows={4}
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
          color: "#FFD700",
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
            onClick={() => navigate("/grade8/break-continue/2")}
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