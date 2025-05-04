import React, { useState, useEffect } from 'react';
import "./styles/styles.css";
import { Routes, Route } from 'react-router';
import Home from './components/pages/Home';
import QuizMode from './components/pages/QuizMode';
import StudyMode from './components/pages/StudyMode';
import TopBar from './components/UI/TopBar';
import Encyclopedia from './components/pages/Encyclopedia';
import EmailConfirmation from './components/pages/EmailConfirmation';
import API_BASE_URL from './config/config'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        setUser(null);
        return;
      }
    
      try {
        const response = await fetch(`${API_BASE_URL}/whoami/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <TopBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/StudyMode" element={<StudyMode user={user} />} />
        <Route path="/Encyclopedia" element={<Encyclopedia />} />
        <Route path="/activate-account/:uidb64/:token" element={<EmailConfirmation />} />
      </Routes>
    </>
  );
}

export default App