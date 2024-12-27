import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="home-container">
        <h1 className="page-title" >CZWA</h1>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/vocabularyList" className="nav-link">Word</Link></li>
            <li className="nav-item"><Link to="/quizList" className="nav-link">Quiz</Link></li>
          </ul>
        </nav>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <li className="nav-item"><Link to="/Quiz" className="nav-link-word">Home</Link></li>
        <li className="nav-item"><Link to="/Quiz2" className="nav-link-word">Word</Link>
          <ol>
            <li className="nav-item"><Link to="/Vocabulary" className="Home-nav-link-word">Word - 1세트</Link></li>
            <li className="nav-item"><Link to="/Vocabulary2" className="Home-nav-link-word">Word - 2세트</Link></li>
          </ol>
        </li>
        <li className="nav-item"><Link to="/Quiz2" className="nav-link-word">Quiz</Link>
          <ol>
              <li className="nav-item"><Link to="/Quiz" className="Home-nav-link-word">Quiz - 1세트</Link></li>
              <li className="nav-item"><Link to="/Quiz2" className="Home-nav-link-word">Quiz - 2세트</Link></li>
          </ol>
        </li>
      </div>
    );
  }

export default Home;