import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import WordTable2 from './WordTable2';

function Vocabulary2() {
    const [words, setWords] = useState([]);
    const [query, setQuery] = useState(''); // 검색어 상태
    const [favorites, setFavorites] = useState(() => {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }); // 즐겨찾기 상태
  
    useEffect(() => {
      fetch('/vocabulary2.csv')
        .then((response) => response.text())
        .then((text) => {
          Papa.parse(text, {
            header: true,
            complete: function (results) {
              const updatedWords = results.data.map((word) => ({
                ...word,
                isFavorite: favorites.some((fav) => fav['단어'] === word['단어']),
              }));
              setWords(updatedWords);
            },
            skipEmptyLines: true,
          });
        });
    }, [favorites]);
  
    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
  
    // 검색 기능: 사용자가 입력한 검색어를 기준으로 단어 목록을 필터링 (단어와 뜻 모두 검색 가능)
    const filteredWords = words.filter((word) =>
      word['단어'].toLowerCase().includes(query.toLowerCase()) ||
      word['뜻'].toLowerCase().includes(query.toLowerCase())
    );
  
    // 즐겨찾기 토글 기능
    const toggleFavorite = (word) => {
      const updatedFavorites = favorites.some((fav) => fav['단어'] === word['단어'])
        ? favorites.filter((fav) => fav['단어'] !== word['단어'])
        : [...favorites, word];
      setFavorites(updatedFavorites);
    };
  
    return (
      <div className="vocabulary-container">
        <h1 className="page-title">단어 페이지</h1>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">홈</Link></li>
            <li className="nav-item"><Link to="/vocabularyList" className="nav-link">단어</Link></li>
            <li className="nav-item"><Link to="/quiz" className="nav-link">단어 퀴즈</Link></li>
          </ul>
        </nav>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <input
          type="text"
          placeholder="단어 또는 뜻 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <WordTable2
          words={filteredWords}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      </div>
    );
  }

export default Vocabulary2;