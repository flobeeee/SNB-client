import React from 'react';
import PropTypes from 'prop-types';
import './Userinfo.css';

const Userinfo = ({ userdata }) => {

  const getDate = () => {
    const date = userdata.createdAt.split('T');
    const yymmdd = date[0].split('-');
    return `${yymmdd[0]}년 ${yymmdd[1]}월 ${yymmdd[2]}일 가입`;
  };

  return (
    <>
      <div className="userinfo-box">
        <div className="userinfo-username">{userdata.username}</div>
        <div className="userinfo-email">{userdata.email}</div>
        <div className="userinfo-createdAt">{getDate()}</div>
      </div>
    </>
  );
};

Userinfo.propTypes = {
  userdata: PropTypes.object,
};

export default Userinfo;