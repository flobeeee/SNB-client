import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddSong = ({ userdata, songList }) => {

  const [value, setValue] = useState(userdata.lists[0].id);
  console.log('리스트 아이디', value);

  // const result = songList.filter(el => Number(el.songNum) !== Number(songInfo.songNum));
  var result = songList.reduce((a, b) => {
    if (a.indexOf(b) < 0) { a.push(b); }
    return a;
  }, []);

  console.log('추가하기 직전 아이디,노래목록', value, result);
  const handleClick = async () => {
    await axios.post('https://localhost:4000/mylist/song/add',
      { listid: value, songs: result }, { withCredentials: true })
      .then(alert('저장되었습니다'));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='addsong'>
      <div className="search-listbox">
        <select name="list" id="listDropdown" value={value} onChange={handleChange}>
          {userdata.lists.map(list => {
            return <option key={list.id} value={list.id}>{list.name}</option>;
          })}
        </select>
        <button className="search-aaddlistbtn" onClick={handleClick}>내 리스트에 저장</button>
      </div>
    </div>

  );

};
AddSong.propTypes = {
  list: PropTypes.array,
  searchValue: PropTypes.string,
  searchType: PropTypes.string,
  title: PropTypes.string,
  userdata: PropTypes.object,
  nextPageValue: PropTypes.func,
  songList: PropTypes.array
};

export default AddSong;