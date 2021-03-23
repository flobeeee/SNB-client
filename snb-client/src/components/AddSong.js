import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Addsong.css';
import Modal from '../components/modal/CenterModal';
import Select from 'react-select';

const AddSong = ({ userdata, songList }) => {

  const [isSearchable] = useState(false);
  const [listId, setListId] = useState(userdata.lists.length !== 0 ? userdata.lists[0].id : []);
  const [ListPopup, setListPopup] = useState(false);
  const [emptyList, setEmptyLsit] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);

  const result = songList.reduce((a, b) => {
    if (a.indexOf(b) < 0) { a.push(b); }
    return a;
  }, []);

  const customStyles = {
    input: () => ({
      outline: 'none'
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #8D44AD',
      color: state.isSelected ? '#e8447d' : '#646464',
      background: 'none',
      padding: 10,
      overflow: 'hidden'
    }),
    singleValue: () => ({
      color: '#646464'
    })
  };

  let options;

  if (userdata.lists.length !== 0) {
    options = userdata.lists.map((list) => {
      return { value: list.id, label: list.name };
    });
  } else {
    options = [{ value: 0, label: '리스트 없음' }];
  }

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
      setEmptyLsit(true);
      openListPopup();
    }
    else {
      await axios.post('https://localhost:4000/mylist/song/add',
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

  const handleChange = (seletedList) => {
    console.log(seletedList);

    setListId(seletedList.value);

  };

  console.log('유저데이터', userdata.lists);
  return (
    <div className='addsong'>
      <Modal visible={isOpenPopup} color={'#fff'} isBlackBtn={true} onClose={closePopUp} backColor={false}>
        {isAddBtn ? (<div>항목을 선택해 주세요</div>) : (<div>저장되었습니다</div>)}
      </Modal>
      <Modal visible={ListPopup} color={'#fff'} isBlackBtn={true} onClose={closeListPopup} backColor={false}>
        <div>첫 번째 리스트를 만들어 주세요</div>
      </Modal>
      <Select
        className="dropdown"
        styles={customStyles}
        placeholder={userdata.lists.length !== 0 ? '리스트를 선택해주세요' : '리스트 없음'}
        value={options.label}
        onChange={handleChange}
        options={options}
        isSearchable={isSearchable}
        menuPlacement="top"
      />
      <button className="search-aaddlistbtn" onClick={handleClick}>내 리스트에 저장</button>
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