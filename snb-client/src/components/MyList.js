import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Modal from './modal/CenterModal';
import AddList from './AddList';
import RemoveList from './RemoveList';
import plus from '../res/plus.png';
import minus from '../res/remove.png';
import './MyList.css';


const MyList = ({ lists, listHandler, setCurrentListId, requestAddList, requestRemoveList }) => {
  const [listname, setListname] = useState(lists[0].name);
  const [isSearchable] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);

  const isAdd = (e) => {
    if (e.target.alt === 'plus') {
      setIsAddBtn(true);
    } else {
      setIsAddBtn(false);
    }
    openPopUp();
  };

  const openPopUp = () => {
    setIsOpenPopup(true);
  };

  const closePopUp = () => {
    setIsOpenPopup(false);
  };

  const clickAddBtn = async (name) => {
    return await requestAddList(name);
  };

  const removeAddBtn = async () => {
    return await requestRemoveList();
  };

  let options;

  if (lists.length !== 0) {
    options = lists.map((list) => {
      return { value: list.id, label: list.name };
    });
  } else {
    options = ({ value: 0, label: '리스트 없음' });
  }

  const customStyles = {
    input: () => ({
      outline: 'none'
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #8D44AD',
      color: state.isSelected ? '#e8447d' : '#646464',
      background: 'none',
      padding: 10
    }),
    singleValue: () => ({
      color: '#646464'
    })
  };

  const handleChange = (seletedList) => {
    setCurrentListId(seletedList.value);
    setListname(seletedList.label);
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} isBlackBtn={true} onClose={closePopUp}>
        {isAddBtn
          ? (<AddList
            addListCallback={clickAddBtn}
            closeCallback={closePopUp}
            listHandler={listHandler}
          />)
          : (<RemoveList
            removeListCallback={removeAddBtn}
            closeCallback={closePopUp}
            listHandler={listHandler}
          />)}
      </Modal>
      <div className="mylist-listbox">
        <div className="mylist-curlistbox">
          <div className="mylist-curlist">선택된 리스트</div>
          <div className="mylist-listname">{listname}</div>
        </div>
        <Select
          className="dropdown"
          styles={customStyles}
          placeholder={lists.length !== 0 ? '리스트를 선택해주세요' : '리스트 없음'}
          value={options.label}
          onChange={handleChange}
          options={options}
          isSearchable={isSearchable}
        />
        <img src={plus} alt="plus" className="mylist-plusbtn" onClick={isAdd} />
        <img src={minus} alt="minus" className="mylist-minusbtn" onClick={isAdd} />
      </div>
    </>
  );
};

MyList.propTypes = {
  lists: PropTypes.array,
  listHandler: PropTypes.func,
  setCurrentListId: PropTypes.func,
  requestAddList: PropTypes.func,
  requestRemoveList: PropTypes.func,
  currentId: PropTypes.string
};


export default MyList;