import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WordTable from './WordTable';

function Favorites() {
    const [favorites, setFavorites] = useState(() => {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
  
    // 즐겨찾기 목록을 번호순으로 정렬하고 번호를 새로 부여
    const sortedFavorites = [...favorites].sort((a, b) => a.no - b.no).map((word, index) => ({
      ...word,
      no: index + 1 // 번호를 1부터 다시 부여
    }));
  
    // 즐겨찾기 토글 기능
    const toggleFavorite = (word) => {
      const updatedFavorites = favorites.some((fav) => fav['단어'] === word['단어'])
        ? favorites.filter((fav) => fav['단어'] !== word['단어'])
        : [...favorites, word];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
  
    return (
      <div className="favorites-container">
        <h1 className="page-title">즐겨찾기 목록</h1>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/vocabularyList" className="nav-link">Word</Link></li>
            <li className="nav-item"><Link to="/quizList" className="nav-link">Quiz</Link></li>
          </ul>
        </nav>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <WordTable words={sortedFavorites} toggleFavorite={toggleFavorite} favorites={favorites} />
      </div>
    );
  }

export default Favorites;
