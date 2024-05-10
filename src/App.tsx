import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Projects from "./pages/Projects";
import Resumedemo from "./pages/Resumedemo";
import useTokenVerification from "./hooks/auth/useTokenVerification";
import { useEffect, useState } from "react";

function App() {
  const { user, loading } = useTokenVerification();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setAuthLoading(loading);
  }, [loading]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/projects"/>}></Route>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/projects"/>}></Route>
        <Route path="/projects" element={user ? <Layout><Projects /></Layout>: <Navigate to="/login"/>}></Route>
        <Route path="/profile" element={user ? <Layout><ProfilePage /></Layout> : <Navigate to="/login"/>}></Route>
        <Route path="/resume" element={user ? <Layout><Resumedemo /></Layout> : <Navigate to="/login"/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
