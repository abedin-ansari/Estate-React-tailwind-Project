import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "/utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";

const MainApp = ({ user }) => (
  <>
    <Header user={user} />
    <About />
    <Projects />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public home page */}
        <Route path="/" element={<MainApp user={user} />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Password reset page */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
