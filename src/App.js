import React, { useState } from 'react';
import QuizMode from './components/Quiz/QuizMode';
import StudyMode from './components/Quiz/StudyMode';
import TopBar from './components/UI/TopBar';

function App() {
  // State to track the current mode
  const [mode, setMode] = useState('quiz'); // default mode is 'quiz'

  // Switch mode function
  const switchMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="App">
      <TopBar onSwitchMode={switchMode} currentMode={mode} />
      <div className="content">
        {mode === 'quiz' ? <QuizMode /> : <StudyMode />}
      </div>
    </div>
  );
}

export default App;
