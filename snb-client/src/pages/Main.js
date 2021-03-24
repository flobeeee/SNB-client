import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Search from './Search';
import Mypage from './Mypage';
import Home from './Home';
import PropTypes from 'prop-types';

const Main = ({ logoutHandler, userdata, listHandler }) => {

  const [searchValue, setSearchValue] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [title, setTitle] = useState('');
  const [isNext, setIsnext] = useState(true);
  const [nowPages, setNowPages] = useState(1);

  const searchHandler = (data, searchType, searchValue) => {
    setSearchValue(data);
    setSearchType(searchType);
    setTitle(searchValue);
    setIsnext(data.page.isNext);
    setNowPages(data.page.nowPages);
  };

  return (
    <Router>
      {userdata ? (<Header logoutHandler={logoutHandler} searchHandler={searchHandler} />) : <div></div>}
      <Switch>
        <Route path="/mypage">
          <Mypage userdata={userdata} listHandler={listHandler} />
        </Route>
        <Route path="/search">
          <Search searchValue={searchValue} searchType={searchType} title={title} userdata={userdata} isNext={isNext} nowPages={nowPages} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch >
    </Router >
  );
};

Main.propTypes = {
  logoutHandler: PropTypes.func,
  listHandler: PropTypes.func,
  userdata: PropTypes.object
};

export default Main;