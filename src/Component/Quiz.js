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
    });
  
    return (
      <div className="quiz-container">
        <h1 className="page-title">단어 퀴즈</h1>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/vocabularyList" className="nav-link">Word</Link></li>
            <li className="nav-item"><Link to="/quizList" className="nav-link">Quiz</Link></li>
          </ul>
        </nav>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
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

export default Quiz;