import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Addsong.css';

const AddSong = ({ userdata, songList }) => {

  const [value, setValue] = useState(userdata.lists[0].id);
  const result = songList.reduce((a, b) => {
    if (a.indexOf(b) < 0) { a.push(b); }
    return a;
  }, []);


  const handleClick = async () => {
    await axios.post('https://localhost:4000/mylist/song/add',
      { listid: value, songs: result }, { withCredentials: true })
      .then(res => {
        if (result.length === 0) {
          alert('선택된 항목이 없습니다');
        }
        else {
          alert('내 리스트에 저장 되었습니다');
        }
      });
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