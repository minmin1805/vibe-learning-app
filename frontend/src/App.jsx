import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster} from "react-hot-toast"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import MyLessons from "./pages/MyLessons";
import Journal from "./pages/Journal";
import LessonViewer from "./pages/LessonViewer";
import JournalViewer from "./pages/JournalViewer";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/my-lessons" element={<MyLessons />} />
        <Route path="/my-lessons/:id" element={<LessonViewer />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<JournalViewer />} />
      </Routes>

    </Router>
    </>
  )
}

export default App
