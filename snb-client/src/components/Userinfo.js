import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Userinfo = (props) => {
  const [list, setList] = useState(1);

  return (
    <div className="userinfo-box">
      <div className="userinfo-username">{props.userdata.username}</div>
      <div className="userinfo-email">{props.userdata.email}</div>
      <div className="userinfo-createdAt">{props.userdata.createdAt}</div>
      <div className="userinfo-listbox">
        <select
          className="userinfo-dropdown"
          value={list}
          onChange={e => setList(e.target.value)}
        >
          {props.userdata.lists.map(data => {
            <option className="userinfo-option" key={data.id} value={data.id}>{data.name}</option>;
          })}
        </select>
        <button className="userinfo-addlist" onClick={props.openPopUp}>add List</button>
        <button className="userinfo-removelist" onClick={() => props.requestRemoveList(list)}>remove List</button>
      </div>
    </div>
  );
};

Userinfo.propTypes = {
  userdata: PropTypes.object,
  requestRemoveList: PropTypes.func,
  openPopUp: PropTypes.func
};

export default Userinfo;