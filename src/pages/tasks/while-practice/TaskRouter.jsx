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

  const { timeLeft, formatTime } = useTimer(1800);
  const timeElapsed = 1800 - timeLeft;

  useEffect(() => {
    if (timeLeft === 0) {
      setShowPopup(true);
    }
  }, [timeLeft]);

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

  const handleNext = () => {
    if (stepNum < 5) {
      navigate(`/grade8/while-practice/${stepNum + 1}`);
    } else {
      navigate("/grade8/topics");
    }
  };

  const handlePrevious = () => {
    if (stepNum > 1) {
      navigate(`/grade8/while-practice/${stepNum - 1}`);
    }
  };

  if (showPopup) {
    return (
      <EndPopup
        score={score}
        timeUsed={formatTime(timeElapsed)}
        onClose={() => navigate("/grade8/topics")}
      />
    );
  }

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", paddingBottom: "5rem" }}>
      <TimerDisplay />
      {renderTask()}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {stepNum > 1 && (
          <button
            onClick={handlePrevious}
            style={{
              backgroundColor: "transparent",
              color: "#FFD700",
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "2px solid #FFD700",
              cursor: "pointer",
            }}
          >
            ⬅️ Алдыңғы тапсырма
          </button>
        )}
        {completedSteps.includes(stepNum) && (
          <button
            onClick={handleNext}
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(255,215,0,0.5)",
            }}
          >
            ➡️ Келесі тапсырма
          </button>
        )}
      </div>
    </div>
  );
}