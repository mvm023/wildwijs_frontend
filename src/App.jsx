import React, { useState } from 'react';
import TopBar from './components/UI/TopBar';
import "./styles/styles.css";
import {Routes, Route} from 'react-router';
import Home from './components/pages/Home';
import QuizMode from './components/pages/QuizMode';
import StudyMode from './components/pages/StudyMode';



function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/QuizMode" element={<QuizMode/>}/>
        <Route path="/StudyMode" element={<StudyMode/>}/>
      </Routes>
    </>
  )
  // // State to track the current mode
  // const [mode, setMode] = useState('quiz'); // default mode is 'quiz'

  // // Switch mode function
  // const switchMode = (newMode) => {
  //   setMode(newMode);
  // };

  // return (
  //   <div className="App">
  //     <TopBar onSwitchMode={switchMode} currentMode={mode} />
  //     <div className="content">
  //       {mode === 'quiz' ? <QuizMode /> : <StudyMode />}
  //     </div>
  //   </div>
  // );
}

export default App;
