import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Song from '../components/Song';
import './Userinfo.css';
import './SongList.css';

const SongList = ({ songs, listId, setSongs }) => {

  const [checkedSongList, setCheckedSongList] = useState([]); // 체크박스로 선택한 list안의 노래들

  const requestRemoveSong = async () => {
    return await axios.post('https://localhost:4000/mylist/song/remove',
      { 'listid': Number(listId), 'songs': checkedSongList },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then(() => {
        axios.post('https://localhost:4000/mylist/info',
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
    <div className="userinfo-rightbox">
      <div className="userinfo-songsbox">
        <div className="info">
          <div className="info-num">번호</div>
          <div className="info-title">제목</div>
          <div className="info-singer">가수</div>
          <div className="info-media">미디어 / 선택</div>
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
        <div className="userinfo-removebox">
          <div className="userinfo-seletsong">{checkedSongList?.length}/{songs?.length}</div>
          <button className="userinfo-removesong" onClick={requestRemoveSong}>삭제</button>
        </div>
      </div>
    </div>
  );
};

SongList.propTypes = {
  songs: PropTypes.array,
  listId: PropTypes.string,
  setSongs: PropTypes.func
};


export default SongList;