import React from "react";

export default function EndPopup({ score, timeUsed, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        color: "#FFD700",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          padding: "2rem",
          borderRadius: "20px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
          border: "2px solid #FFD700",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏹ Уақыт аяқталды!</h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          ⏳ <strong>Қалған уақыт:</strong> {timeUsed}
        </p>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          ⭐ <strong>Жиналған ұпай:</strong> {score} / 10
        </p>

        <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "1.5rem" }}>
          Барлық тапсырмалармен танысып болдың. Қаласаң, басқа тақырыпты таңдай аласың.
        </p>

        <button
          onClick={onClose}
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
          🔙 Тақырыптар тізіміне өту
        </button>
      </div>
    </div>
  );
}