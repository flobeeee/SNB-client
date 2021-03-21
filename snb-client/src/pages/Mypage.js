import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Userinfo from '../components/Userinfo';
import MyList from '../components/MyList';
import SongList from '../components/SongList';

const Mypage = ({ userdata, listHandler }) => {

  const [currentListId, setCurrentListId] = useState(String(userdata?.lists[0]?.id));
  const [songs, setSongs] = useState(userdata.songs); 

  useEffect(async () => {
    if (currentListId) {
      await axios.post('https://localhost:4000/mylist/info',
        { 'listid': Number(currentListId) },
        { 'Content-Type': 'application/json', withCredentials: true })
        .then((res) => setSongs(res.data.Song))
        .catch(() => setSongs([]));
    }
  }, [currentListId]);


  const requestAddList = async (name) => {
    return await axios.post('https://localhost:4000/mylist/add',
      { 'email': userdata.email, 'listname': name },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        const addedList = {
          id: res.data.id,
          name,
          songs: []
        };
        const newList = [...userdata.lists, addedList];
        //userdata.lists.push({ id: res.data.id, name });
        //setSongs([]);
        console.log(newList);
        listHandler(newList);
        setCurrentListId(String(res.data.id));
        return res.status === 201 ? true : false;
      });
  };

  const requestRemoveList = async () => {
    return await axios.post('https://localhost:4000/mylist/remove',
      { 'listid': Number(currentListId) },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        const newList = userdata.lists.filter((data) => data.id !== Number(currentListId));
        listHandler(newList);
        setCurrentListId(String(userdata?.lists[0]?.id));
        return res.status === 200 ? true : false;
      });
  };


  return (
    <>
      <Userinfo
        listHandler={listHandler}
        userdata={userdata}
      />
      <MyList 
        lists={userdata.lists} 
        listHandler={listHandler} 
        setCurrentListId={setCurrentListId} 
        requestAddList={requestAddList}
        requestRemoveList={requestRemoveList}
        currentId={currentListId}></MyList>
      <SongList songs={songs} listId={currentListId} setSongs={setSongs}></SongList>
    </>
  );
};

Mypage.propTypes = {
  userdata: PropTypes.object,
  listHandler: PropTypes.func
};

export default Mypage;
