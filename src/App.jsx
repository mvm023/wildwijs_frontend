import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import "./styles/styles.css";
import { Routes, Route } from 'react-router';
import Home from './components/pages/Home';
import QuizMode from './components/pages/QuizMode';
import StudyMode from './components/pages/StudyMode';
import TopBar from './components/UI/TopBar';
import Encyclopedia from './components/pages/Encyclopedia';
import EmailConfirmation from './components/pages/EmailConfirmation';
import AxiosInstance from './config/axios'
import theme from './theme/theme';

function App() {
  const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Fetch Categories from the API
    const GetCategories = () => {
      setLoading(true);
      AxiosInstance.get("categories/")
        .then((res) => {
          setCategories(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setLoading(false);
        });
    };
  
    // Fetch Subcategories based on selected category
    const GetSubcategories = (categoryId) => {
      setLoading(true);
      AxiosInstance.get(`subcategories/${categoryId}/`)
        .then((res) => {
          setSubcategories(res.data);
          localStorage.setItem('subcategories', JSON.stringify(res.data));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
          setLoading(false);
        });
    };

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        setUser(null);
        return;
      }

    AxiosInstance.get(`whoami/`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setUser(null);
      });
    }

    GetCategories();

    fetchUser();
    }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home categories={categories} GetSubcategories={GetSubcategories} setSubcategories={setSubcategories}/>} />
          <Route path="/StudyMode" element={<StudyMode GetCategories={GetCategories} categories={categories} GetSubcategories={GetSubcategories} setSubcategories={setSubcategories} subcategories={subcategories} loading={loading} setLoading={setLoading}/>} />
          <Route path="/Encyclopedia" element={<Encyclopedia />} />
          <Route path="/activate-account/:uidb64/:token" element={<EmailConfirmation />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App