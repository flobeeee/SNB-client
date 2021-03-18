import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import SearchSong from './SearchSong';
import AddSong from './AddSong';

const Search = () => {
  const [result, setResult] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(2);

  const getSearchResult = (search, type, title) => {
    setResult(search);
    setSearchType(type);
    setTitle(title);
  };

  const changePage = async () => {
    if (page > 0) {
      setPage(page + 1);
      await axios.get(`https://songnumberbook.ga:5000/v1/search/${searchType}`,
        { page, numOfRow: 15, title }, { withCredentials: true });
    } else {
      setPage(1);
      await axios.get(`https://songnumberbook.ga:5000/v1/search/${searchType}`,
        { page, numOfRow: 15, title }, { withCredentials: true });
    }
  };

  return (
    <div className="search-box">
      <Header getSearchResult={getSearchResult} />
      {result.map((data, index) => (
        <SearchSong
          key={index}
          songNum={data.songNum}
          title={data.title}
          singer={data.singer}
          link={data.link}
        />
      ))}
      <div className="search-btnbox">
        <button className="search-previosbtn" onClick={() => changePage()}>이전</button>
        <button className="search-nextbtn" onClick={() => changePage()}>다음</button>
      </div>
      <AddSong />
    </div>
  );
};

export default Search;