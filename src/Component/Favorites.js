import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WordTable from './WordTable';

function Favorites() {
    const [favorites, setFavorites] = useState(() => {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
  
    // 즐겨찾기 목록을 번호순으로 정렬
    const sortedFavorites = [...favorites].sort((a, b) => a.no - b.no);
  
    // 즐겨찾기 토글 기능
    const toggleFavorite = (word) => {
      const updatedFavorites = favorites.some((fav) => fav.no === word.no)
        ? favorites.filter((fav) => fav.no !== word.no)
        : [...favorites, word];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
  
    return (
      <div className="favorites-container">
        <h1 className="page-title">즐겨찾기 단어 목록</h1>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">홈</Link></li>
            <li className="nav-item"><Link to="/favorites" className="nav-link">즐겨찾기</Link></li>
            <li className="nav-item"><Link to="/vocabulary" className="nav-link">단어 페이지</Link></li>
            <li className="nav-item"><Link to="/quiz" className="nav-link">단어 퀴즈</Link></li>
          </ul>
        </nav>
        <WordTable words={sortedFavorites} toggleFavorite={toggleFavorite} favorites={favorites} />
      </div>
    );
  }

export default Favorites;