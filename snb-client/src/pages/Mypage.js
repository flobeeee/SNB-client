import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Userinfo from '../components/Userinfo';

const Mypage = ({ userdata, listHandler }) => {

  return (
    <>
      <Userinfo
        listHandler={listHandler}
        userdata={userdata}
      />
    </>
  );
};

Mypage.propTypes = {
  userdata: PropTypes.object,
  listHandler: PropTypes.func
};

export default Mypage;
