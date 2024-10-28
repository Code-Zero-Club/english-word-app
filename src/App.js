import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Papa from 'papaparse';
import './App.css';

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

function Home() {
  return (
    <div className="home-container">
      <h1 className="page-title">홈 페이지</h1>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">홈</Link></li>
          <li className="nav-item"><Link to="/favorites" className="nav-link">즐겨찾기</Link></li>
          <li className="nav-item"><Link to="/vocabulary" className="nav-link">단어 페이지</Link></li>
          <li className="nav-item"><Link to="/quiz" className="nav-link">단어 퀴즈</Link></li>
        </ul>
      </nav>
      <p className="welcome-message">단어 학습 웹에 오신 것을 환영합니다! 상단의 링크를 통해 다양한 기능을 이용해보세요.</p>
    </div>
  );
}

function Vocabulary() {
  const [words, setWords] = useState([]);
  const [query, setQuery] = useState(''); // 검색어 상태
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }); // 즐겨찾기 상태

  useEffect(() => {
    fetch('/vocabulary.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: function (results) {
            const updatedWords = results.data.map((word) => ({
              ...word,
              isFavorite: favorites.some((fav) => fav.no === word.no),
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
    const updatedFavorites = favorites.some((fav) => fav.no === word.no)
      ? favorites.filter((fav) => fav.no !== word.no)
      : [...favorites, word];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="vocabulary-container">
      <h1 className="page-title">단어 페이지</h1>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">홈</Link></li>
          <li className="nav-item"><Link to="/favorites" className="nav-link">즐겨찾기</Link></li>
          <li className="nav-item"><Link to="/vocabulary" className="nav-link">단어 페이지</Link></li>
          <li className="nav-item"><Link to="/quiz" className="nav-link">단어 퀴즈</Link></li>
        </ul>
      </nav>
      <input
        type="text"
        placeholder="단어 또는 뜻 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <WordTable
        words={filteredWords}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </div>
  );
}

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

function Quiz() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/vocabulary.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: function (results) {
            setWords(results.data);
          },
          skipEmptyLines: true,
        });
      });
  }, []);

  const resetQuiz = () => {
    setScore(0);
    setIncorrectAnswers([]);
    setQuizStarted(false);
    setCurrentWord(null);
    setUsedWords([]);
    setShowAnswer(false);
    setInputValue('');
  };

  const handleStartQuiz = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setCurrentWord(words[randomIndex]);
      setQuizStarted(true);
      setShowAnswer(false);
      setUsedWords([words[randomIndex].no]);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.toLowerCase() === currentWord['단어'].toLowerCase()) {
      setScore(score + 1);
      handleNextQuestion();
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentWord]);
      setShowAnswer(true);
    }
    setInputValue('');
  };

  const handleNextQuestion = () => {
    if (usedWords.length >= words.length) {
      setCurrentWord(null);
      return;
    }

    let randomIndex;
    let nextWord;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
      nextWord = words[randomIndex];
    } while (usedWords.includes(nextWord.no));

    setCurrentWord(nextWord);
    setUsedWords([...usedWords, nextWord.no]);
    setShowAnswer(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleKeyPress = (event) => {
    if (showAnswer && event.key === 'Enter') {
      handleNextQuestion();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showAnswer]);

  return (
    <div className="quiz-container">
      <h1 className="page-title">단어 퀴즈</h1>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">홈</Link></li>
          <li className="nav-item"><Link to="/favorites" className="nav-link">즐겨찾기</Link></li>
          <li className="nav-item"><Link to="/vocabulary" className="nav-link">단어 페이지</Link></li>
          <li className="nav-item"><Link to="/quiz" className="nav-link">단어 퀴즈</Link></li>
        </ul>
      </nav>
      {!quizStarted ? (
        <div className="quiz-start">
          <button onClick={handleStartQuiz} className="submit-button">퀴즈 시작</button>
        </div>
      ) : (
        currentWord ? (
          <div className="quiz-content">
            <h2 className="word-meaning">뜻: {currentWord['뜻']}</h2>
            {!showAnswer ? (
              <form onSubmit={handleSubmit} className="quiz-form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="단어를 입력하세요"
                  className="quiz-input"
                  ref={inputRef}
                />
                <button type="submit" className="submit-button">제출</button>
              </form>
            ) : (
              <div className="incorrect-answer">
                <p>틀렸습니다! 정답은: <strong>{currentWord['단어']}</strong></p>
                <button onClick={handleNextQuestion} className="submit-button">다음</button>
                <p className="hint">(Enter 키를 눌러서 다음 문제로 이동)</p>
              </div>
            )}
            <p className="score">맞은 개수: {score}</p>
          </div>
        ) : (
          <div className="quiz-results">
            <h2>퀴즈 종료!</h2>
            <p>맞은 개수: {score}</p>
            {incorrectAnswers.length > 0 && (
              <div className="incorrect-list">
                <h3>틀린 문제들:</h3>
                <ul>
                  {incorrectAnswers.map((word, index) => (
                    <li key={index}>{word['단어']} - {word['뜻']}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={resetQuiz} className="submit-button">다시 시작</button>
          </div>
        )
      )}
    </div>
  );
}

function WordTable({ words, toggleFavorite, favorites }) {
  return (
    <table className="word-table">
      <thead>
        <tr>
          <th className="table-header">번호</th>
          <th className="table-header">단어</th>
          <th className="table-header">뜻</th>
          <th className="table-header">즐겨찾기</th>
        </tr>
      </thead>
      <tbody>
        {words.map((word, index) => (
          <tr key={index} className="table-row">
            <td className="table-cell">{word.no}</td>
            <td className="table-cell">{word['단어']}</td>
            <td className="table-cell">{word['뜻']}</td>
            <td className="table-cell">
              <button onClick={() => toggleFavorite(word)} className="favorite-button">
                {favorites.some((fav) => fav.no === word.no) ? '★' : '☆'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
