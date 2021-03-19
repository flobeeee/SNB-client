import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import './Header.css';
import PropTypes from 'prop-types';

const Header = (props) => {

  const history = useHistory();
  const [searchType, setsearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchType === 'title') {
      axios.get('https://songnumberbook.ga:5000/v1/search/title',
        { page: 1, numberOfRow: 15, title: searchValue },
        { withCredentials: true })
        .then(res => {
          props.searchHandler(res.data.results, searchType, searchValue);
          history.push('/search');
        });
    } else {
      axios.get('https://songnumberbook.ga:5000/v1/search/singer',
        { page: 1, numberOfRow: 15, title: searchValue },
        { withCredentials: true })
        .then(res => {
          props.searchHandler(res.data.results, searchType, searchValue);
          history.push('/search');
        });
    }
  };

  const logout = async () => {

    await axios.post('https://localhost:4000/logout', null,
      { withCredentials: true })
      .then(res => {
        //props.logoutHandler(() => history.push('/'));
        //window.location.href = '/';
      });
  };


  return (
    <div className='header'>
      <Link to="/search">
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
          onClick={handleSearch}>검색</button>
      </div>
      <div className='header-right'>
        <button className="mypage_button"
          onClick={() =>
            history.push('/mypage')}>Mypage</button>
        <button className="logout-button"
          onClick={logout}>Logout</button>
      </div>
    </div >
  );
};

Header.propTypes = {
  searchHandler: PropTypes.func,
  logoutHandler: PropTypes.func,
  history: PropTypes.object
};

export default Header;