import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';

import Userinfo from '../components/Userinfo';
import MyList from '../components/MyList';
import SongList from '../components/SongList';
import './Mypage.css';

dotenv.config();

const Mypage = ({ userdata, listHandler }) => {
  const [currentListId, setCurrentListId] = useState(userdata.lists.length !== 0 ? String(userdata.lists[0].id) : '');
  const [songs, setSongs] = useState(userdata.songs);

  useEffect(async () => {
    if (currentListId) {
      await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/mylist/info`,
        { 'listid': Number(currentListId) },
        { 'Content-Type': 'application/json', withCredentials: true })
        .then((res) => setSongs(res.data.Song))
        .catch(() => setSongs([]));
    } else {
      setSongs([]);
    }
  }, [currentListId]);


  const requestAddList = async (name) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/mylist/add`,
      { 'email': userdata.email, 'listname': name },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        const addedList = {
          id: res.data.id,
          name
        };
        const newList = [...userdata.lists, addedList];
        listHandler(newList);
        setCurrentListId(String(res.data.id));
        return res.status === 201 ? true : false;
      });
  };

  const requestRemoveList = async () => {
    return await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/mylist/remove`,
      { 'listid': Number(currentListId) },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        const newList = userdata.lists.filter((data) => data.id !== Number(currentListId));
        listHandler(newList);
        if (newList.length > 0) {
          setCurrentListId(String(newList[0].id));
        } else {
          setCurrentListId('');
        }
        return res.status === 200 ? true : false;
      });
  };


  return (
    <div className='mypage'>
      <div className='mypage-left'>
        <div className='mypage-userinfo'>
          <Userinfo
            listHandler={listHandler}
            userdata={userdata}
          />
        </div>
        <div className='mypage-mylist'>
          <MyList
            lists={userdata.lists}
            listHandler={listHandler}
            setCurrentListId={setCurrentListId}
            requestAddList={requestAddList}
            requestRemoveList={requestRemoveList}
            currentListId={currentListId}
          ></MyList>

        </div>
      </div>
      <div className='mypage-right'>
        <SongList songs={songs} listId={currentListId} setSongs={setSongs}></SongList>
      </div>
    </div>
  );
};

Mypage.propTypes = {
  userdata: PropTypes.object,
  listHandler: PropTypes.func
};

export default Mypage;
