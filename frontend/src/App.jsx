import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster} from "react-hot-toast"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </Router>
    </>
  )
}

export default App
