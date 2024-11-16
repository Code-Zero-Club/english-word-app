import React from 'react';

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
                  {favorites.some((fav) => fav['단어'] === word['단어']) ? '★' : '☆'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default WordTable;