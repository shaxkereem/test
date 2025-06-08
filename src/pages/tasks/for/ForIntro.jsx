import { useNavigate } from "react-router-dom";

export default function ForIntro() {
  const navigate = useNavigate();

  const codeStyle = {
    backgroundColor: "#111",
    color: "#FFD700",
    padding: "1rem",
    borderRadius: "8px",
    whiteSpace: "pre",
    fontFamily: "monospace",
    fontSize: "1rem",
    marginBottom: "1rem",
  };

  const resultStyle = {
    backgroundColor: "#222",
    color: "#0f0",
    padding: "0.8rem",
    borderRadius: "8px",
    fontFamily: "monospace",
    marginBottom: "2rem",
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#FFD700",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.3rem", marginBottom: "1rem" }}>🔂 Тақырып: For loop</h1>

      <p style={{ color: "#ccc", marginBottom: "1rem" }}>
        <strong>Күнделікті жағдай:</strong>
      </p>
      <div style={{ backgroundColor: "#111", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
        👧 Айсұлу мұғаліміне 5 оқушының атын қатесіз жазып беруі керек.<br />
        🖊️ Ол әр оқушыны бір-бірден тізімге қосып отыр.<br />
        🔁 Бұл әрекетті автоматтандыру үшін <strong>for</strong> циклін пайдалануға болады.
      </div>

      <img
        src="https://tse3.mm.bing.net/th?id=OIP.luI85fhTd57qK6IqIHRTXQHaJv&pid=Api"
        alt="For loop схемасы"
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "2rem auto",
          display: "block",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
        }}
      />

      <p style={{ color: "#ccc" }}>Python тілінде бұл былай жазылады:</p>

      <pre style={codeStyle}>
{`for i in range(5):
    print("Оқушы", i+1)`}
      </pre>

      <div style={resultStyle}>
{`Нәтиже:
Оқушы 1
Оқушы 2
Оқушы 3
Оқушы 4
Оқушы 5`}
      </div>

      <p style={{ color: "#ccc", marginBottom: "2rem" }}>
        Бұл цикл 0-ден бастап 4-ке дейінгі сандарды қамтиды (яғни 5 рет қайталанады). Әр қайталауда оқушының рет нөмірі экранға шығады.
      </p>

      <button
        onClick={() => navigate("/grade8/for/1")}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          fontWeight: "bold",
          padding: "1rem 2rem",
          fontSize: "1rem",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✅ Түсіндім
      </button>
    </div>
  );
}