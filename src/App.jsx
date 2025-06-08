import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Name from "./pages/Name";
import MindMaze from "./minigames/MindMaze";
import Grade8Topics from "./pages/Grade8Topics";
import WhileIntro from "./pages/tasks/while/WhileIntro";
import WhilePracticeIntro from "./pages/tasks/while-practice/WhilePracticeIntro";
import WhileTaskRouter from "./pages/tasks/while/TaskRouter";
import WhilePracticeTaskRouter from "./pages/tasks/while-practice/TaskRouter";
import ForIntro from "./pages/tasks/for/ForIntro";
import ForTaskRouter from "./pages/tasks/for/TaskRouter";
import ForRouter from "./pages/tasks/for-practice/TaskRouter";
import BreakIntro from "./pages/tasks/break-continue/breakIntro";
import BreakPracticeRouter from "./pages/tasks/break-continue/TaskRouter";
import TaskRouter from "./pages/tasks/else-clause/TaskRouter";
import ElseIntro from "./pages/tasks/else-clause/while-else-intro";
import PracticeRouter from "./pages/tasks/practice/TaskRouter";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/name" element={<Name />} />
      <Route path="/minigame" element={<MindMaze />} />
      <Route path="/grade8/topics" element={<Grade8Topics />} />
      
      {/* While тақырыптары */}
      <Route path="/grade8/while-intro" element={<WhileIntro />} />
      <Route path="/grade8/while-practice-intro" element={<WhilePracticeIntro />} />
      <Route path="/grade8/while/:step" element={<WhileTaskRouter />} />
      <Route path="/grade8/while-practice/:step" element={<WhilePracticeTaskRouter />} />

      {/* For тақырыптары */}
      <Route path="/grade8/for-intro" element={<ForIntro />} />
      <Route path="/grade8/for/:step" element={<ForTaskRouter />} />
      <Route path="/grade8/for-practice/:step" element={<ForRouter />} />

      <Route path="/grade8/break-continue" element={<BreakIntro />} />
      <Route path="/grade8/break-continue/:step" element={<BreakPracticeRouter />} />

      <Route path="/grade8/else-clause/intro" element={<ElseIntro />} />
      <Route path="/grade8/else-clause/:step" element={<TaskRouter />} />

      <Route path="/grade8/practice/:step" element={<PracticeRouter />} />
    </Routes>
  );
}