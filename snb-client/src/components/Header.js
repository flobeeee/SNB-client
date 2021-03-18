import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import './Header.css';

const Header = (props) => {

  const history = useHistory();

  const [searchType, setsearchType] = useState('');
  const [page, setPage] = useState(1);
  const [numberOfRow, setNumberOfRow] = useState(15);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchType === 'title') {
      axios.get('https://songnumberbook.ga:5000/v1/search/title',
        { page: page, numberOfRow: numberOfRow, title: searchValue },
        { withCredentials: true })
        .then(res => {
          // props.getSearchResult(res.data, searchType, searchValue);
        });
    } else {
      axios.get('https://songnumberbook.ga:5000/v1/search/singer',
        { page: page, numberOfRow: numberOfRow, title: searchValue },
        { withCredentials: true })
        .then(res => {
          // props.getSearchResult(res.data, searchType, searchValue);
        });
    }
  };


  return (
    <div className='header'>
      <Link to="/">
        <img className='header-logo' src={logo} alt="Logo" />
      </Link>
      <div className='radio-button'>
        <div className="singer">
          <label>
            <input name='radio' type="radio" value="singer" checked={true} onChange={(e) => setsearchType(e.target.value)} />
            가수
          </label>
        </div>
        <div className="title">
          <label>
            <input name='radio' type="radio" value="title" checked={true} onChange={(e) => setsearchType(e.target.value)} />
            제목
          </label>
        </div>
      </div>
      <div className="header-center">
        <input type="search" onChange={e => setSearchValue(e.target.value)} />
        <button className='submit-button'
          onClick={() => handleSearch()}>검색</button>
      </div>
      <div className='header-right'>
        <button className="mypage_button"
          onClick={() =>
            history.push('/mypage')}>Mypage</button>
        <button className="logout-button"
          onClick={() => history.push('/login')}>Logout</button>
      </div>
    </div >
  );
};

export default Header;