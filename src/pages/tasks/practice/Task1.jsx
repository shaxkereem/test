import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useNavigate } from "react-router-dom";

export default function Task1({ onSuccess }) {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("4");
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
      return input_text
  `);

      const stdout = [];
      pyodide.setStdout({ batched: (data) => stdout.push(data + "\n") });

      await pyodide.runPythonAsync(code);
      const resultOutput = stdout.join("\n").trim();
      setOutput(resultOutput);

      const normalizedCode = code.toLowerCase().replace(/\s/g, "");
      const includesWhile = normalizedCode.includes("while") || normalizedCode.includes("for");
      const includesPowLogic = normalizedCode.includes("**") || normalizedCode.includes("2**") || normalizedCode.includes("==") || normalizedCode.includes("%") || normalizedCode.includes("!=");

      const correctYes = input === "4" && resultOutput.toLowerCase().includes("yes");
      const correctNo = input === "7" && resultOutput.toLowerCase().includes("no");

      if (includesWhile && includesPowLogic && (correctYes || correctNo)) {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>📊 Practice 1</h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "1rem" }}>
        Пайдаланушы оң бүтін сан енгізеді. Егер ол 2 санының дәрежесі болса — "Yes", болмаса — "No" деп шығатын бағдарлама жаз.
      </p>

      <label>🔢 Кіріс мәні:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", maxWidth: "300px", padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #FFD700", backgroundColor: "#111", color: "#FFD700" }}
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

      <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "10px", backgroundColor: "#111", minHeight: "100px", whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "1rem" }}>
        {output || "📥 Нәтиже осында шығады"}
      </div>

      {isCorrect && (
        <div style={{ marginTop: "2rem" }}>
          {!pointAdded && (
            <button onClick={handleAddPoint} style={successBtn}>⭐ Ұпай қосу</button>
          )}
          <button
            onClick={() => navigate("/grade8/general-practice/2")}
            style={submitBtn}
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

const successBtn = {
  backgroundColor: "#0f0",
  color: "#000",
  padding: "0.75rem 1.5rem",
  fontWeight: "bold",
  borderRadius: "10px",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  marginRight: "1rem"
};

const submitBtn = {
  backgroundColor: "#FFD700",
  color: "#000",
  padding: "0.75rem 1.5rem",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer"
};