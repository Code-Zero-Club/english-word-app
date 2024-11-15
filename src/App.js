import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Vocabulary from './Component/Vocabulary';
import Home from './Component/Home';
import Quiz from './Component/Quiz';
import Favorites from './Component/Favorites';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className="mode-toggle-button">
        <button onClick={toggleDarkMode} className="toggle-button">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}








export default App;
