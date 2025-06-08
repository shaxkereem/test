import { useNavigate } from "react-router-dom";

export default function BreakIntro() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/grade8/break-continue/1");
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#FFD700", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🧠 Break және Continue</h1>

      <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "1rem" }}>
        🌀 Кейде циклді толық аяқтамай тоқтату, немесе белгілі бір шартты өткізіп жіберу қажет болуы мүмкін.
        <strong>break</strong>, <strong>continue</strong> және <strong>pass</strong> операторлары осы мақсатта қолданылады.
      </p>

      <h2 style={{ color: "#FFD700", fontSize: "1.4rem" }}>🔹 Break операторы</h2>
      <p style={{ color: "#ccc", marginBottom: "1rem" }}>
        Python тілінде <code>break</code> операторы циклден толық шығуға көмектеседі. Ол әдетте <code>if</code> шартынан кейін жазылады.
        <br />Ол <strong>while</strong> және <strong>for</strong> циклдерінде қолданылады.
      </p>

      <div style={{ backgroundColor: "#111", padding: "1rem", borderRadius: "10px", marginBottom: "1rem" }}>
        <pre style={{ fontFamily: "monospace", fontSize: "1rem", color: "#FFD700" }}>
{`number = 0
for number in range(10):
    if number == 4:
        break
    print("Number is", number)
print("Out of loop")`}
        </pre>
      </div>

      <p style={{ color: "#ccc", marginBottom: "1rem" }}>
        Бұл программада <code>number == 4</code> болғанда цикл тоқтайды. Сондықтан экранда 0–3 аралығындағы сандар ғана шығады.
      </p>

      <button
        onClick={handleStart}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          padding: "0.75rem 1.5rem",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          marginTop: "2rem"
        }}
      >
        🚀 Тапсырмаға көшу
      </button>
    </div>
  );
}