import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';

import './Addsong.css';
import Modal from '../components/modal/CenterModal';

dotenv.config();

const AddSong = ({ userdata, songList }) => {

  const [listId, setListId] = useState(userdata.lists.length !== 0 ? userdata.lists[0].id : '');
  const [ListPopup, setListPopup] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);

  const result = songList.reduce((a, b) => {
    if (a.indexOf(b) < 0) { a.push(b); }
    return a;
  }, []);

  const isAdd = (e) => {
    if (e === true) {
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

  const openListPopup = () => {
    setListPopup(true);
  };
  const closeListPopup = () => {
    setListPopup(false);
  };

  const handleClick = async () => {

    if (userdata.lists.length === 0) {
      openListPopup();
    }
    else {
      await axios.post(`${process.env.REACT_APP_MAIN_SERVER_ADDRESS}/mylist/song/add`,
        { listid: listId, songs: result }, { withCredentials: true })
        .then(res => {
          if (result.length === 0) {
            isAdd(true);
          }
          else {
            isAdd(false);
          }
        });
    }
  };

  return (
    <div className='addsong'>
      <Modal visible={isOpenPopup} color={'#7660dccc'} isBlackBtn={false} onClose={closePopUp} backColor={true} isWarning={true}>
        {isAddBtn ? (<div style={{ color: 'white' }}>노래를 선택해 주세요</div>) : (<div style={{ color: 'white' }}>저장되었습니다</div>)}
      </Modal>
      <Modal visible={ListPopup} color={'#7660dccc'} isBlackBtn={false} onClose={closeListPopup} backColor={true} isWarning={true}>
        <div style={{ color: 'white' }}>첫 번째 리스트를 만들어 주세요</div>
      </Modal>
      <select
        className="search-dropdown"
        onChange={e => setListId(e.target.value)}
        value={listId}
      >
        <option value="" disabled hidden>Create Your List</option>
        {userdata.lists.map(list => {
          return <option className="addsong-selector-option" key={list.id} value={list.id}>{list.name}</option>;
        })}
      </select>
      <button className="search-addlistbtn" onClick={handleClick}>저장</button>
    </div >

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