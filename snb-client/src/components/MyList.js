import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Modal from './modal/CenterModal';
import AddList from './AddList';
import RemoveList from './RemoveList';
import './Userinfo.css';


const MyList = ({lists, listHandler, setCurrentListId, requestAddList, requestRemoveList, currentId}) => {
  const [selectedList, setSelectedList] = useState(currentId); // 선택한 list의 id를 저장하는 상태
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);

  const isAdd = (e) => {
    if (e.target.value === 'true') {
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
      <div className="userinfo-listbox">
        <select
          className="userinfo-dropdown"
          onChange={e => setCurrentListId(e.target.value)}
          value={currentId}
        >
          {lists.map(data => {
            return <option className="userinfo-option" key={data.id} value={data.id}>{data.name}</option>;
          })}
        </select>
        <button className="userinfo-addlist" onClick={isAdd} value="true">add List</button>
        <button className="userinfo-removelist" onClick={isAdd} value="false">remove List</button>
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