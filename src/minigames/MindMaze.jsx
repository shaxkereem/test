import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const gridSize = 8;

const generateRandomGoal = () => {
  const x = Math.floor(Math.random() * gridSize);
  const y = Math.floor(Math.random() * gridSize);
  return { x, y };
};

export default function MindMaze() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState(generateRandomGoal);
  const [reachedGoal, setReachedGoal] = useState(false);
  const navigate = useNavigate();

  const move = (dx, dy) => {
    setPlayerPos((prev) => {
      const newX = Math.max(0, Math.min(gridSize - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(gridSize - 1, prev.y + dy));
      return { x: newX, y: newY };
    });
  };

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setGoalPosition(generateRandomGoal());
    setReachedGoal(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (reachedGoal) return;
      if (e.key === "ArrowUp") move(0, -1);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [reachedGoal]);

  useEffect(() => {
    if (
      playerPos.x === goalPosition.x &&
      playerPos.y === goalPosition.y &&
      !reachedGoal
    ) {
      setReachedGoal(true);
      setTimeout(() => {
        navigate("/grade8/topics");
      }, 2000);
    }
  }, [playerPos, goalPosition, reachedGoal, navigate]);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#FFD700",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🧠 Mind Maze</h1>
      <p style={{ color: "#ccc", marginBottom: "2rem" }}>
        Сары блокты бағыттауыш пернелермен немесе төмендегі батырмалармен ✴️ белгісіне жеткіз.
      </p>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 3rem)`,
          gap: "6px",
          marginBottom: "2rem",
        }}
      >
        {[...Array(gridSize * gridSize)].map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isPlayer = playerPos.x === x && playerPos.y === y;
          const isGoal = goalPosition.x === x && goalPosition.y === y;

          return (
            <div
              key={i}
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: isPlayer ? "#FFD700" : "#222",
                color: isPlayer ? "#000" : "#FFD700",
                border: isGoal ? "2px solid #FFD700" : "2px solid #444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
              }}
            >
              {isGoal && "✴️"}
            </div>
          );
        })}
      </div>

      {/* 4 бағыт батырмалары */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <button onClick={() => move(0, -1)} style={buttonStyle}>⬆️ Жоғары</button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => move(-1, 0)} style={buttonStyle}>⬅️ Солға</button>
          <button onClick={() => move(1, 0)} style={buttonStyle}>➡️ Оңға</button>
        </div>
        <button onClick={() => move(0, 1)} style={buttonStyle}>⬇️ Төмен</button>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        style={{
          ...buttonStyle,
          marginTop: "2rem",
          backgroundColor: "#444",
          color: "#FFD700",
          fontSize: "1rem",
          padding: "0.6rem 2rem",
        }}
      >
        ♻️ Жаңа ойын бастау
      </button>

      {/* Goal message */}
      {reachedGoal && (
        <p style={{ color: "lime", fontWeight: "bold", marginTop: "2rem" }}>
          🎉 Мақсатқа жеттің! Бір сәттен соң тақырыптарға өтесің...
        </p>
      )}
    </div>
  );
}

// Button style
const buttonStyle = {
  backgroundColor: "#FFD700",
  color: "#000",
  padding: "0.75rem 2rem",
  fontWeight: "bold",
  fontSize: "1.2rem",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
};