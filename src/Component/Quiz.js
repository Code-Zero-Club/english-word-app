import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

function Quiz() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  const [quizType, setQuizType] = useState(null); // 'english-to-korean' or 'korean-to-english'
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
    setQuizType(null); // 퀴즈 유형 초기화
  };

  const handleStartQuiz = (type) => {
    if (words.length > 0) {
      setQuizType(type);
      setQuizStarted(true);
      const randomIndex = Math.floor(Math.random() * words.length);
      const initialWord = words[randomIndex];
      setCurrentWord(initialWord);
      setUsedWords([initialWord.no]);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correctAnswer =
      quizType === 'english-to-korean'
        ? currentWord['뜻'].replace(/\s+/g, '') // 영어 → 한국어
        : currentWord['단어'].replace(/\s+/g, ''); // 한국어 → 영어
  
    if (inputValue.trim().replace(/\s+/g, '').toLowerCase() === correctAnswer.toLowerCase()) {
      setScore((prev) => prev + 1);
      handleNextQuestion();
    } else {
      setIncorrectAnswers((prev) => [...prev, currentWord]);
      setShowAnswer(true);
    }
    setInputValue('');
  };

  const handleNextQuestion = () => {
    if (usedWords.length >= words.length) {
      setCurrentWord(null);
      return;
    }

    let nextWord;
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * words.length);
      nextWord = words[randomIndex];
    } while (usedWords.includes(nextWord.no));

    setCurrentWord(nextWord);
    setUsedWords((prev) => [...prev, nextWord.no]);
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
  });

  return (
    <div className="quiz-container">
      <h1 className="page-title">퀴즈</h1>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/vocabularyList" className="nav-link">Word</Link></li>
          <li className="nav-item"><Link to="/quizList" className="nav-link">Quiz</Link></li>
        </ul>
      </nav>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      {!quizStarted ? (
        <div className="quiz-select">
          <h2 align="center">퀴즈 유형을 선택하세요</h2>
          <button
            onClick={() => handleStartQuiz('english-to-korean')}
            className="submit-button"
          >
            영어 → 한국어
          </button>
          <br></br>
          <button
            onClick={() => handleStartQuiz('korean-to-english')}
            className="submit-button"
          >
            한국어 → 영어
          </button>
        </div>
      ) : currentWord ? (
        <div className="quiz-content">
          <h2 className="word-prompt">
            {quizType === 'english-to-korean'
              ? `단어: ${currentWord['단어']}` // 영어 → 한국어 문제
              : `뜻: ${currentWord['뜻']}`} 
          </h2>
          {!showAnswer ? (
            <form onSubmit={handleSubmit} className="quiz-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  quizType === 'english-to-korean'
                    ? '뜻을 입력하세요' // 영어 → 한국어 입력 필드
                    : '단어를 입력하세요' // 한국어 → 영어 입력 필드
                }
                className="quiz-input"
                ref={inputRef}
              />
              <button type="submit" className="submit-button">제출</button>
            </form>
          ) : (
            <div className="incorrect-answer">
              <p>틀렸습니다! 정답은: <strong>
                {quizType === 'english-to-korean'
                  ? currentWord['뜻'] // 영어 → 한국어 정답
                  : currentWord['단어'] // 한국어 → 영어 정답
                }
              </strong></p>
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
                  <li key={index}>
                    {quizType === 'english-to-korean'
                      ? `${word['단어']} - ${word['뜻']}` // 영어 → 한국어 틀린 문제
                      : `${word['뜻']} - ${word['단어']}`} 
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={resetQuiz} className="submit-button">다시 시작</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
