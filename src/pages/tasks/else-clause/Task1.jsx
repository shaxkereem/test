import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useNavigate } from "react-router-dom";

export default function Task1({ onSuccess }) {
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
      pyodide.setStdout({
        batched: (data) => setOutput((prev) => prev + data + "\n"),
      });

      const simulatedInput = [2, 4, 6, 8, 10, 12];
      let inputIndex = 0;
      pyodide.globals.set("input", () => simulatedInput[inputIndex++].toString());

      await pyodide.runPythonAsync(code);
      const normalized = code.replace(/\s/g, "").toLowerCase();

      const hasWhile = normalized.includes("while");
      const hasElse = normalized.includes("else:");
      const hasBreak = normalized.includes("break");
      const result = output.toLowerCase().includes("success") || output.toLowerCase().includes("ended");

      if (hasWhile && hasElse && hasBreak && result) {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔁 Practice 1</h1>
      <p style={{ color: "#ccc", fontSize: "1.2rem", marginBottom: "1rem" }}>
        🧪 Write the program that receives 6 even numbers as input. <br/>
        If you enter only even numbers, loop runs successfully. <br/>
        If you enter an odd number, then the loop breaks. <br/>
        <strong>Hint:</strong> Use <code>while-else</code> statements.
      </p>

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
            onClick={() => navigate("/grade8/else-clause/2")}
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