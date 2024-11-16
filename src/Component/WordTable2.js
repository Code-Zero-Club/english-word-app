import React from 'react';

function WordTable2({ words, toggleFavorite, favorites }) {
    return (
      <table className="word-table2">
        <thead>
          <tr>
            <th className="table-header2">번호</th>
            <th className="table-header2">단어</th>
            <th className="table-header2">뜻</th>
            <th className="table-header2">즐겨찾기</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index} className="table-row2">
              <td className="table-cell2">{word.no}</td>
              <td className="table-cell2">{word['단어']}</td>
              <td className="table-cell2">{word['뜻']}</td>
              <td className="table-cell2">
                <button onClick={() => toggleFavorite(word)} className="favorite-button2">
                  {favorites.some((fav) => fav['단어'] === word['단어']) ? '★' : '☆'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default WordTable2;