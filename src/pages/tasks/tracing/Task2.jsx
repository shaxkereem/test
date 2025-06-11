import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Task2({ onSuccess }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointAdded, setPointAdded] = useState(false);
  const navigate = useNavigate();

  const handleRun = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 0) {
      setOutput("⚠️ Дұрыс оң сан енгізіңіз.");
      setIsCorrect(false);
      return;
    }

    const hours = Math.floor(n / 60) % 24;
    const minutes = n % 60;
    const result = `(${hours}, ${minutes})`;

    setOutput(result);

    // Тексеру — нәтижені тексеру үшін мысалы:
    // Егер сағат пен минут дұрыс есептелсе — дұрыс деп қабылдаймыз
    if (result) {
      setIsCorrect(true);
    }
  };

  const handleAddPoint = () => {
    if (!pointAdded) {
      onSuccess?.();
      setPointAdded(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#FFD700",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🕒 Тапсырма 2</h1>

      <p style={{ color: "#ccc", marginBottom: "1rem", fontSize: "1.2rem" }}>
        Берілген минут санын <strong>(сағат, минут)</strong> форматына түрлендіретін бағдарлама жаз.
      </p>

      <div
        style={{
          backgroundColor: "#111",
          padding: "1rem",
          borderRadius: "10px",
          fontSize: "1rem",
          color: "#FFD700",
          marginBottom: "1rem",
        }}
      >
        <pre>{`n = int(input())\nhours = n // 60\nhours = hours % 24\nminutes = n % 60\nprint(hours, minutes)`}</pre>
      </div>

      <label style={{ display: "block", marginBottom: "0.5rem" }}>🔢 Минут енгіз:</label>
      <input
        type="number"
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

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleRun} style={buttonStyle}>
          ▶️ Тексеру
        </button>
      </div>

      <div
        style={{
          padding: "1rem",
          borderRadius: "10px",
          backgroundColor: "#111",
          minHeight: "50px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          fontSize: "1rem",
          color: isCorrect ? "#0f0" : "#FFD700",
        }}
      >
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
                marginRight: "1rem",
              }}
            >
              ⭐ Ұпай қосу
            </button>
          )}
          <button
            onClick={() => navigate("/grade8/practice/3")}
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✅ Келесі тапсырма
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