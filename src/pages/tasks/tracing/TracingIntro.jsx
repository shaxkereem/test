// src/pages/tasks/practice/TracingIntro.jsx

import { useNavigate } from "react-router-dom";

export default function TracingIntro() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/grade8/tracing-intro/1"); // Түсіндім басқанда Task1-ге апарады
  };

  return (
    <div style={{
      backgroundColor: "#000",
      color: "#FFD700",
      minHeight: "100vh",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍 Алгоритмді бақылау (Tracing)</h1>

      {/* Бірінші сурет */}
      <img
        src="https://d1uvxqwmcz8fl1.cloudfront.net/tes/resources/12309878/4ac715b7-5707-478c-9c37-9ad92a1abe35/image?width=500&height=500&version=1589645575908"
        alt="Tracing Example 1"
        style={{ maxWidth: "500px", width: "100%", marginBottom: "1rem", borderRadius: "12px" }}
      />

      <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "1rem", maxWidth: "800px" }}>
        👩‍💻 Кейде бағдарлама жазғанда оның қалай жұмыс істейтінін кезең-кезеңімен бақылау қажет.
        Бұны алгоритмді *tracing* деп атаймыз. Әр қадамда айнымалылардың мәнін жазып, бағдарлама ағынын түсінеміз.
      </p>

      {/* Екінші сурет */}
      <img
        src="https://ibcomputerscience.xyz/wp-content/uploads/2018/09/Capture-10.png"
        alt="Tracing Example 2"
        style={{ maxWidth: "500px", width: "100%", marginBottom: "1rem", borderRadius: "12px" }}
      />

      <p style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: "1rem", maxWidth: "800px" }}>
        📝 Кесте құру арқылы бағдарлама жұмысының нәтижесін оңай түсінуге болады. 
        Мысалы, цикл ішіндегі айнымалылардың қалай өзгеретінін бақылап көріңіз.
      </p>

      <p style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: "2rem", maxWidth: "800px" }}>
        Енді өзіңіз бағдарламаларды бақылап көріңіз! Әр тапсырмада нәтиженің дұрыстығын бақылау үшін tracing әдісін қолданыңыз.
      </p>

      <button
        onClick={handleStart}
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