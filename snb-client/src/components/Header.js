import React, { useState, useRef, useEffect } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import dotenv from 'dotenv';

import logo from '../res/snb_logo.png';
import './Header.css';

dotenv.config();

const Header = (props) => {

  const history = useHistory();
  const [searchType, setsearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');

  const filterTooltip = useRef();
  const HeaderWrapper = useRef();

  const handleInput = () => {
    document.getElementsByClassName('header-search-input')[0].value = null;
    setSearchValue('');
  };

  const handleSearch = () => {
    if (searchType === 'title') {
      axios.get(`${process.env.REACT_APP_SCRAP_SERVER_ADDRESS}/v1/search/title`,
        { params: { page: 1, numOfRow: 15, title: searchValue } },
        { withCredentials: true })
        .then(res => {
          props.searchHandler(res.data, searchType, searchValue);
          history.push('/search');
        });
    } else {
      axios.get(`${process.env.REACT_APP_SCRAP_SERVER_ADDRESS}/v1/search/singer`,
        { params: { page: 1, numOfRow: 15, singer: searchValue } },
        { withCredentials: true })
        .then(res => {
          props.searchHandler(res.data, searchType, searchValue);
          history.push('/search');
        });
    }
  };

  const handleFilterPopup = () => {
    const visibility = filterTooltip.current.style.visibility;

    if (visibility === 'hidden') {
      filterTooltip.current.style.visibility = 'visible';
    } else {
      filterTooltip.current.style.visibility = 'hidden';
    }
  };

  const logout = async () => {
    await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/logout`, null,
      { withCredentials: true })
      .then(res => {
        props.logoutHandler();
      });
  };

  const moveToBottomHeader = () => {
    const headerWrapper = document.querySelector('.header');
    headerWrapper.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], 2000);
  };

  useEffect(() => {
    moveToBottomHeader();
  }, []);

  return (
    <div className='header' ref={HeaderWrapper}>
      <Link to="/main" onClick={() => handleInput()}>
        <div className='header-logo-wrapper'>
          <img className='header-logo' alt="Logo" src={logo} />
        </div>
      </Link>
      <div className="header-search-bar">
        <input className="header-search-input" type="search" placeholder="Search" onChange={e => setSearchValue(e.target.value)} />
        <div className="header-search-bar-btns">
          <button className='submit-button' onClick={handleSearch}></button>
          <button className='filter-button' onClick={handleFilterPopup}>
            <div className="filter-tooltip" ref={filterTooltip}>
              <div className='radio-button'>
                <div className="singer">
                  <label className="tooltip-container">
                    <input name='radio' type="radio" value="singer" onChange={() => setsearchType('singer')} checked={searchType === 'title' ? false : true} />
                    <span className="checkmark"></span>
                    가수
                  </label>
                </div>
                <div className="title">
                  <label className="tooltip-container">
                    <input name='radio' type="radio" value="title" onChange={() => setsearchType('title')} checked={searchType === 'title' ? true : false} />
                    <span className="checkmark"></span>
                    제목
                  </label>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className='header-nav'>
        <NavLink className='nav-link' to="/mypage" activeStyle={{
          fontWeight: 'bold',
          borderTop: '5px solid var(--nav-point-color)',
        }} onClick={() => handleInput()}>
          <div className='nav-container'>
            <span>Mypage</span>
          </div>
        </NavLink>
        <button className="logout-button" onClick={logout}></button>
      </div>
    </div >
  );
};

Header.propTypes = {
  searchHandler: PropTypes.func,
  logoutHandler: PropTypes.func,
  history: PropTypes.object,
};

export default Header;