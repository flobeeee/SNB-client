import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';
import Song from './Song';
import Mypage from './Mypage';

require('dotenv').config;

const Search = (props) => {
  const [result, setResult] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(2);
  const [mypage, setMypage] = useState(false);
  // const [song, setSong] = useState([]);

  const getSearchResult = (search, type, title) => {
    setResult(search);
    setSearchType(type);
    setTitle(title);
  };

  const changePage = async () => {
    if (page > 0) {
      setPage(page + 1);
      await axios.get(`${process.env.SCRAP_SERVER_ADDRESS}/v1/search/${searchType}`,
        { page, numOfRow: 15, title }, { withCredentials: true });
    } else {
      setPage(1);
      await axios.get(`${process.env.SCRAP_SERVER_ADDRESS}/v1/search/${searchType}`,
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
      <div className="search-listbox">
        <select name="list" id="listDropdown">
          {/* {props.list.map((data) => {
            <option value={data.name}>{data.name}</option>;
          })} */}
        </select>
        <button className="search-aaddlistbtn">내 리스트에 저장</button>
      </div>
    </div>
  );
};

Search.propTypes = {
  login: PropTypes.func
};

export default Search;