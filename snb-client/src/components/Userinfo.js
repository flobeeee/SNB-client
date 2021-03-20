import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Modal from '../components/modal/CenterModal';
import AddList from '../components/AddList';
import RemoveList from '../components/RemoveList';
import Song from '../components/Song';

const Userinfo = ({ userdata, listHandler }) => {
  const [list, setList] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);
  const [songs, setSongs] = useState([]);

  const isAdd = (e) => {
    if (e.target.value === 'true') {
      setIsAddBtn(true);
      openPopUp();
    } else {
      setIsAddBtn(false);
      openPopUp();
    }

  };

  const openPopUp = () => {
    setIsOpenPopup(true);
  };

  const closePopUp = () => {
    setIsOpenPopup(false);
  };

  const requestAddList = async (name) => {
    return await axios.post('https://localhost:4000/mylist/add',
      { 'email': userdata.email, 'listname': name },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        userdata.lists.push({ id: res.data.id, name });
        return res.status === 201 ? true : false;
      });
  };

  const requestRemoveList = async () => {
    return await axios.post('https://localhost:4000/mylist/remove',
      { 'listid': Number(list) },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        userdata.lists = userdata.lists.filter((data) => data.id !== Number(list));
        return res.status === 200 ? true : false;
      });
  };

  const getDate = () => {
    const date = userdata.createdAt.split('T');
    const yymmdd = date[0].split('-');
    return `${yymmdd[0]}년 ${yymmdd[1]}월 ${yymmdd[2]}일 가입`;
  };

  useEffect(async () => {
    console.log('useEffect');
    const getSongs = await axios.post('https://localhost:4000/mylist/info',
      { 'listid': Number(list) },
      { 'Content-Type': 'application/json', withCredentials: true });
    setSongs(getSongs);
  }, [list]);

  return (
    <div className="userinfo-box">
      <Modal visible={isOpenPopup} color={'#fff'} isBlackBtn={true} onClose={closePopUp}>
        {isAddBtn
          ? (<AddList
            addListCallback={requestAddList}
            closeCallback={closePopUp}
            listHandler={listHandler}
          />)
          : (<RemoveList
            removeListCallback={requestRemoveList}
            closeCallback={closePopUp}
            listHandler={listHandler}
          />)}
      </Modal>
      <div className="userinfo-username">{userdata.username}</div>
      <div className="userinfo-email">{userdata.email}</div>
      <div className="userinfo-createdAt">{getDate()}</div>
      <div className="userinfo-listbox">
        <select
          className="userinfo-dropdown"
          value={list}
          onChange={e => setList(e.target.value)}
        >
          {userdata.lists.map(data => {
            return <option className="userinfo-option" key={data.id} value={data.id}>{data.name}</option>;
          })}
        </select>
        <button className="userinfo-addlist" onClick={isAdd} value="true">add List</button>
        <button className="userinfo-removelist" onClick={isAdd} value="false">remove List</button>
        <div className="userinfo-songs">
          {songs.data.Song.map((data) => {
            <Song
              key={data.songNum}
              songNum={data.songNum} />;
          })}
        </div>
      </div>
    </div>
  );
};

Userinfo.propTypes = {
  userdata: PropTypes.object,
  listHandler: PropTypes.func,
  requestRemoveList: PropTypes.func,
  openPopUp: PropTypes.func
};

export default Userinfo;