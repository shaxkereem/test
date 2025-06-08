import { useNavigate } from "react-router-dom";

export default function WhileElseIntro() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#000", color: "#FFD700", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔄 while...else құрылымы</h1>
      <p style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: "1rem" }}>
        Айдос циклдер тақырыбын зерттеп жүріп, <strong>while...else</strong> құрылымын кездестірді. Бұл құрылым қарапайым while циклінен өзгеше жұмыс істейді.
      </p>

      <h2 style={{ color: "#FFD700" }}>📌 Түсіндірме</h2>
      <p style={{ color: "#ccc" }}>
        while...else құрылымы <strong>if...else</strong> сияқты жұмыс істейді, бірақ тек циклмен бірге қолданылады.
        Егер цикл шарттары false болып аяқталса, <code>else</code> бөлігі міндетті түрде орындалады. Алайда, егер цикл <code>break</code> арқылы тоқтатылса, онда <code>else</code> бөлігі орындалмайды.
      </p>

      <h2 style={{ color: "#FFD700", marginTop: "2rem" }}>🧠 Синтаксис</h2>
      <pre style={{
        backgroundColor: "#111", padding: "1rem", borderRadius: "10px", fontSize: "1rem",
        whiteSpace: "pre-wrap", fontFamily: "monospace"
      }}>
{`variable = initial_value
while condition:
    statements
    if <condition>:
        break
    variable += 1
else:
    statements`}
      </pre>

      <h2 style={{ color: "#FFD700", marginTop: "2rem" }}>🧪 Мысал</h2>
      <pre style={{
        backgroundColor: "#111", padding: "1rem", borderRadius: "10px", fontSize: "1rem",
        whiteSpace: "pre-wrap", fontFamily: "monospace"
      }}>
{`count = 0
while count < 5:
    num = int(input("Enter number between 0-10: "))
    if num < 0 or num > 10:
        print("You've entered an invalid number.")
        break
    count += 1
else:
    print("While loop ended successfully.")`}
      </pre>

      <h3 style={{ color: "#FFD700", marginTop: "1rem" }}>🟢 Жұмыс істеу принципі:</h3>
      <ul style={{ color: "#ccc", lineHeight: "1.7" }}>
        <li>Цикл 5 рет орындалады, егер әр енгізілген сан 0 мен 10 аралығында болса.</li>
        <li>Егер барлық сандар дұрыс болса, <strong>else</strong> бөлігі орындалады.</li>
        <li>Егер 0–10 аралығынан тыс сан енгізілсе, <strong>break</strong> арқылы цикл үзіледі және <code>else</code> орындалмайды.</li>
      </ul>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={() => navigate("/grade8/else-clause/1")}
          style={{
            backgroundColor: "#FFD700", color: "#000", padding: "0.75rem 1.5rem",
            borderRadius: "10px", fontWeight: "bold", fontSize: "1rem",
            border: "none", cursor: "pointer"
          }}
        >
          🚀 Келесі тапсырмаға өту
        </button>
      </div>
    </div>
  );
}