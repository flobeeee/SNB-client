import React, { useState } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../res/snb_logo.png';
import './Header.css';
import PropTypes from 'prop-types';

const Header = (props) => {

  const history = useHistory();
  const [searchType, setsearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  //const [path, setPath] = useState(history.location.pathname);

  //console.log(history.location.pathname);

  const handleSearch = () => {
    console.log('SearchType', searchType);
    if (searchType === 'title') {
      axios.get('https://localhost:5000/v1/search/title',
        { params: { page: 1, numOfRow: 15, title: searchValue } },
        { withCredentials: true })
        .then(res => {
          console.log('서버응답', res);
          props.searchHandler(res.data, searchType, searchValue);
          history.push('/search');
        });
    } else {
      axios.get('https://localhost:5000/v1/search/singer',
        { params: { page: 1, numOfRow: 15, singer: searchValue } },
        { withCredentials: true })
        .then(res => {
          console.log('서버응답', res);
          props.searchHandler(res.data, searchType, searchValue);
          history.push('/search');
        });
    }
  };

  const handleFilterPopup = () => {
    console.log('필터팝업');
  };

  const logout = async () => {

    await axios.post('https://localhost:4000/logout', null,
      { withCredentials: true })
      .then(res => {
        props.logoutHandler();
      });
  };

  const handleNavClick = (e) => {
    const parentClassList = e.target.parentNode.classList;
    const parentStyle = e.target.parentNode.style;
    //console.log(e.target.parentNode.style);
    //parentClassList.add('current');
    parentStyle.borderTop = '5px solid var(--nav-point-color)';
    history.push(e.target.value);
  };


  return (
    <div className='header'>
      <Link to="/search">
        <img className='header-logo' alt="Logo" src={logo} />
      </Link>
      <div className="header-search-bar">
        <input type="search" placeholder="Search" onChange={e => setSearchValue(e.target.value)} />
        <div className="header-search-bar-btns">
          <button className='submit-button' onClick={handleSearch}></button>
          <button className='filter-button' onClick={handleFilterPopup}>
            <div className="filter-tooltip">
              <div className='radio-button'>
                <div className="singer">
                  <label className="tooltip-container">
                    <input name='radio' type="radio" value="singer" onChange={() => setsearchType('singer')} />
                    <span className="checkmark"></span>
                    가수
                  </label>
                </div>
                <div className="title">
                  <label className="tooltip-container">
                    <input name='radio' type="radio" value="title" onChange={() => setsearchType('title')} checked />
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
          borderTop: '5px solid var(--nav-point-color)'
        }}>
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