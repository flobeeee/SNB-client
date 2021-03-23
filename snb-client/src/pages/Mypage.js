import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Userinfo from '../components/Userinfo';
import MyList from '../components/MyList';
import SongList from '../components/SongList';
import './Mypage.css';

const Mypage = ({ userdata, listHandler }) => {

  const [currentListId, setCurrentListId] = useState('');
  console.log('currentListId', currentListId);
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
        // setCurrentListId(String(userdata?.lists[0]?.id));
        setSongs([]);
        return res.status === 200 ? true : false;
      });
  };


  return (
    <div className='mypage'>
      <div className='mypage-left'>
        <Userinfo
          listHandler={listHandler}
          userdata={userdata}
        />
        <div className='mypage-mylist'>
          <MyList
            lists={userdata.lists}
            listHandler={listHandler}
            setCurrentListId={setCurrentListId}
            requestAddList={requestAddList}
            requestRemoveList={requestRemoveList}
            setSongs={setSongs}
          ></MyList>

        </div>
      </div>
      <div className='mypage-right'>
        <SongList songs={songs} listId={currentListId} setSongs={setSongs}></SongList>
      </div>
    </div >
  );
};

Mypage.propTypes = {
  userdata: PropTypes.object,
  listHandler: PropTypes.func
};

export default Mypage;
