import React, { useState } from 'react';
import "./styles/styles.css";
import {Routes, Route} from 'react-router';
import Home from './components/pages/Home';
import QuizMode from './components/pages/QuizMode';
import StudyMode from './components/pages/StudyMode';
import TopBar from './components/UI/TopBar';
import Encyclopedia from './components/pages/Encyclopedia';
import EmailConfirmation from './components/pages/EmailConfirmation';


function App() {
  return (
    <>
      <TopBar/>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/StudyMode" element={<StudyMode/>}/>
        <Route path="/Encyclopedia" element={<Encyclopedia/>}/>
        <Route path="/activate-account/:uidb64/:token" element={<EmailConfirmation />} />
      </Routes>
    </>
  )
}

export default App;
