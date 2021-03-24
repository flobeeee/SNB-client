import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import Song from '../components/Song';
import './SongList.css';

const SongList = ({ songs, listId, setSongs }) => {
  const [checkedSongList, setCheckedSongList] = useState([]);

  const requestRemoveSong = async () => {
    return await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/mylist/song/remove`,
      { 'listid': Number(listId), 'songs': checkedSongList },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then(() => {
        axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/mylist/info`,
          { 'listid': Number(listId) },
          { 'Content-Type': 'application/json', withCredentials: true })
          .then((res) => setSongs(res.data.Song))
          .then(setCheckedSongList([]))
          .catch(() => setSongs([]));
      });
  };

  const getSongs = (songInfo) => {
    if (!songInfo.checked) {
      let song = checkedSongList.filter(el => Number(el.songNum) !== Number(songInfo.data.songNum));
      setCheckedSongList(song);
    } else {
      setCheckedSongList([...checkedSongList, songInfo.data]);
    }
  };

  return (
    <>
      <div className="songlist-songsbox">
        <div className="songlist-infobackground">
          <div className="info">
            <div className="info-num">번호</div>
            <div className="info-title">제목</div>
            <div className="info-singer">가수</div>
            <div className='info-mediabox'>
              <div className='info-media'>미디어</div>
              <div className='info-checkbox'>선택</div>
            </div>
          </div>
        </div>
        <div className="songs-box">
          {songs ? (songs.map((data) =>
            <Song
              key={data.songNum}
              songNum={String(data.songNum)}
              title={data.title}
              singer={data.singer}
              link={data.link}
              getSongs={getSongs}
            />))
            : <div></div>}
        </div>
        <div className="songlist-removebox">
          <div className="songlist-selectsong">{checkedSongList?.length}<span className="songlist-songs"> / {songs ? songs.length : 0}</span></div>
          <button className="songlist-removesongbtn" onClick={requestRemoveSong}>삭제</button>
        </div>
      </div>
    </>
  );
};

SongList.propTypes = {
  songs: PropTypes.array,
  listId: PropTypes.string,
  setSongs: PropTypes.func
};


export default SongList;