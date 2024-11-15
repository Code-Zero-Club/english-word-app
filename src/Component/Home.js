import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="home-container">
        <h1 className="page-title" >CZWA</h1>
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

export default Home;