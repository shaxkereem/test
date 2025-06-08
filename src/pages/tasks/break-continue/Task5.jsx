import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useNavigate } from "react-router-dom";

export default function Task5({ onSuccess }) {
  const [code, setCode] = useState("");
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
      const stdout = [];
      pyodide.setStdout({
        batched: (data) => stdout.push(data + "\n"),
      });

      await pyodide.runPythonAsync(code);
      const resultOutput = stdout.join("\n").trim();
      setOutput(resultOutput);

      const normalized = resultOutput.replace(/\s+/g, "");
      const hasApattern = normalized.includes("***") && normalized.includes("*") && normalized.includes("*****");

      if (hasApattern) {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔠 Practice 7</h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "1rem" }}>
        ✍️ Write a Python program to print the alphabet pattern <strong>'A'</strong>.
      </p>
      <div style={{ backgroundColor: "#111", color: "#FFD700", padding: "1rem", borderRadius: "10px", fontFamily: "monospace", marginBottom: "1rem" }}>
        <pre>{`Output:
  ***
 *   *
*     *
*******
*     *
*     *
*     *`}</pre>
      </div>

      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        onChange={(val) => setCode(val)}
        theme="dark"
        style={{ marginBottom: "1rem", fontSize: "1rem" }}
      />

      <button onClick={runCode} style={buttonStyle}>▶️ Кодты іске қосу</button>

      <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "10px", backgroundColor: "#111", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
        {output || "📥 Нәтиже осында шығады"}
      </div>

      {isCorrect && (
        <div style={{ marginTop: "2rem" }}>
          {!pointAdded && (
            <button
              onClick={handleAddPoint}
              style={{ backgroundColor: "#0f0", color: "#000", padding: "0.75rem 1.5rem", fontWeight: "bold", borderRadius: "10px", fontSize: "1rem", border: "none", cursor: "pointer", marginRight: "1rem" }}
            >
              ⭐ Ұпай қосу
            </button>
          )}
          <button
            onClick={() => navigate("/grade8/break-continue/complete")}
            style={{ backgroundColor: "#FFD700", color: "#000", padding: "0.75rem 1.5rem", borderRadius: "10px", fontWeight: "bold", fontSize: "1rem", border: "none", cursor: "pointer" }}
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
  cursor: "pointer",
};
