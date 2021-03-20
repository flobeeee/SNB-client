import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Userinfo from '../components/Userinfo';

const Mypage = ({ userdata, listHandler }) => {

  return (
    <div className="mypage-box">
      <Userinfo
        listHandler={listHandler}
        userdata={userdata}
      />
    </div>
  );
};

Mypage.propTypes = {
  userdata: PropTypes.object,
  listHandler: PropTypes.func
};

export default Mypage;
