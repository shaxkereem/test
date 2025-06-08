import { useNavigate } from "react-router-dom";


export default function WhilePracticeIntro() {
  const navigate = useNavigate();

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
      <h1 style={{ fontSize: "2.3rem", marginBottom: "1rem" }}>
        ⚙️ Практикалық тапсырмалар
      </h1>

      <p style={{ color: "#ccc", marginBottom: "1rem" }}>
        Енді while циклі бойынша алған біліміңді нақты практикада тексереміз.
        Әр тапсырмада код жазып, нәтиже шығарасың. Уақыт шектеулі – 30 минут.
      </p>

      <p style={{ color: "#ccc", marginTop: "1.5rem", marginBottom: "2rem" }}>
        Барлығы 5 есеп. Дұрыс шешім үшін ұпай жинайсың. Ең жоғары балл – 10.
        Ең соңында нәтижеңді көресің. 
        <strong>Сәттілік!</strong>
      </p>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => navigate("/grade8/while-practice/1")}
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
          🚀 Бастау
        </button>
      </div>
    </div>
  );
}
