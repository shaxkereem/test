import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Task1 from "./Task1";
import Task2 from "./Task2";
import Task3 from "./Task3";
import Task4 from "./Task4";
import Task5 from "./Task5";
import useTimer from "../../../hooks/useTimer";
import EndPopup from "./EndPopup";

const taskPoints = {
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 2,
};

export default function TaskRouter() {
  const { step } = useParams();
  const stepNum = parseInt(step);
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [manualFinish, setManualFinish] = useState(false); // 🆕 Аяқтау батырмасына арналған
  const [confirmFinish, setConfirmFinish] = useState(false); // 🆕 Растау шығару
  const [finalTimeUsed, setFinalTimeUsed] = useState(null);

  const { timeLeft, formatTime } = useTimer(manualFinish ? 0 : 1800); // Егер аяқтау басталса — уақыт тоқтатылады
  const timeElapsed = 1800 - timeLeft;

  useEffect(() => {
    if (timeLeft === 0 && !manualFinish) {
      setFinalTimeUsed(formatTime(timeElapsed));
      setShowPopup(true);
    }
  }, [timeLeft, manualFinish, timeElapsed]);

  const handleSuccess = () => {
    if (!completedSteps.includes(stepNum)) {
      setScore((prev) => prev + (taskPoints[stepNum] || 0));
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  const TimerDisplay = () => (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "#FFD700",
        color: "#000",
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        fontWeight: "bold",
        fontSize: "1rem",
        zIndex: 1000,
        textAlign: "right",
      }}
    >
      ⏳ {formatTime(timeLeft)}<br />
      ⭐ {score} / 10 ұпай
    </div>
  );

  const renderTask = () => {
    const taskProps = { onSuccess: handleSuccess };
    switch (stepNum) {
      case 1:
        return <Task1 {...taskProps} />;
      case 2:
        return <Task2 {...taskProps} />;
      case 3:
        return <Task3 {...taskProps} />;
      case 4:
        return <Task4 {...taskProps} />;
      case 5:
        return <Task5 onSuccess={handleSuccess} score={score} />;
      default:
        return <div style={{ color: "#FFD700", padding: "2rem" }}>Тапсырма табылмады.</div>;
    }
  };

  const handleGoToStep = (step) => {
    navigate(`/grade8/tracing-intro/${step}`);
  };

  const handleFinishClick = () => {
    setConfirmFinish(true); // Растау терезесін шығару
  };

  const handleConfirmFinish = () => {
    setManualFinish(true);
    setFinalTimeUsed(formatTime(timeElapsed));
    setShowPopup(true);
  };

  const handleCancelFinish = () => {
    setConfirmFinish(false);
  };

  if (showPopup) {
    return (
      <EndPopup
        score={score}
        timeUsed={finalTimeUsed}
        onClose={() => navigate("/grade8/topics")}
      />
    );
  }

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", paddingBottom: "5rem" }}>
      <TimerDisplay />
      {renderTask()}

      {/* Бетке көшу батырмалары */}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => handleGoToStep(s)}
            style={{
              backgroundColor: stepNum === s ? "#FFD700" : "transparent",
              color: stepNum === s ? "#000" : "#FFD700",
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "2px solid #FFD700",
              cursor: "pointer",
            }}
          >
            📄 {s}-Тапсырма
          </button>
        ))}
      </div>

      {/* Аяқтау батырмасы */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleFinishClick}
          style={{
            backgroundColor: "#FF4444",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255,0,0,0.5)",
          }}
        >
          🛑 Аяқтау
        </button>
      </div>

      {/* Растау терезесі */}
      {confirmFinish && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "#111",
              padding: "2rem",
              borderRadius: "12px",
              color: "#FFD700",
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>🔔 Аяқтауға дайынсың ба?</h2>
            <p style={{ marginBottom: "2rem" }}>
              Уақытың тоқтатылады, нәтижелер көрсетіледі.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={handleConfirmFinish}
                style={{
                  backgroundColor: "#0f0",
                  color: "#000",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✅ Иә, аяқтаймын
              </button>
              <button
                onClick={handleCancelFinish}
                style={{
                  backgroundColor: "#f33",
                  color: "#fff",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ❌ Жоқ, жалғастырамын
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}