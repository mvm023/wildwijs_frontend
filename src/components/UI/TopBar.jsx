import React from 'react';
import API_BASE_URL from '../../config/config';

function TopBar({ onSwitchMode, currentMode }) {
    return (
      <div id="topbar">
        <div className="container">
          <img src={`${API_BASE_URL}/media/images/logo.jpg`} alt="Logo" id="logo" />
          <div className="navMenu">
            <button onClick={() => onSwitchMode('quiz')} className={currentMode === 'quiz' ? 'active' : ''}>
              Quiz
            </button>
            <button onClick={() => onSwitchMode('study')} className={currentMode === 'study' ? 'active' : ''}>
              Leren
            </button>
          </div>
        </div>
      </div>
    );
  };
export default TopBar;
