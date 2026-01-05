import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz"
import Test from "./pages/Test";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/learn" element={<Learn />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/quiz/:section" element={<Quiz />}></Route>
      <Route path="/test" element={<Test />}></Route>
    </Routes>

  );
}
