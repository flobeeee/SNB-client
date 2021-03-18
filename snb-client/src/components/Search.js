import React, { useState } from 'react';
import PropTypes from 'prop-type';
import axios from 'axios';
import Header from './Header';
import Song from './Song';
import AddSong from './AddSong';
import Mypage from './Mypage';

const Search = (props) => {
  const [result, setResult] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(2);
  const [mypage, setMypage] = useState(false);

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

  const mypageHandler = (blooean) => {
    setMypage(blooean);
  };

  return (
    <div className="search-box">
      <Header
        getSearchResult={getSearchResult}
        mypageHandler={mypageHandler}
        login={props.login}
      />
      {mypage ? (<Mypage />) : (
        result.map((data, index) => (
          <Song
            key={index}
            songNum={data.songNum}
            title={data.title}
            singer={data.singer}
            link={data.link}
          />
        )))}
      <div className="search-btnbox">
        <button className="search-previosbtn" onClick={() => changePage()}>이전</button>
        <button className="search-nextbtn" onClick={() => changePage()}>다음</button>
      </div>
      <AddSong />
    </div>
  );
};

Search.propTypes = {
  login: PropTypes.func
};

export default Search;