import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Addsong.css';
import Modal from '../components/modal/CenterModal';
const AddSong = ({ userdata, songList }) => {

  const [value, setValue] = useState(userdata.lists[0].id);
  const result = songList.reduce((a, b) => {
    if (a.indexOf(b) < 0) { a.push(b); }
    return a;
  }, []);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);



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


  const handleClick = async () => {
    await axios.post('https://localhost:4000/mylist/song/add',
      { listid: value, songs: result }, { withCredentials: true })
      .then(res => {
        if (result.length === 0) {
          isAdd(true);
        }
        else {
          isAdd(false);
        }
      });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='addsong'>
      <Modal visible={isOpenPopup} color={'#aea1ea'} isBlackBtn={true} onClose={closePopUp} backColor={true}>
        {isAddBtn ? (<div>항목을 선택해 주세요</div>) : (<div>저장되었습니다</div>)}
      </Modal>
      <select className='listDropdown' name="list" id="listDropdown" value={value} onChange={handleChange}>
        {userdata.lists.map(list => {
          return <option className='option' key={list.id} value={list.id}>{list.name}</option>;
        })}
      </select>
      <button className="search-aaddlistbtn" onClick={handleClick}>내 리스트에 저장</button>
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