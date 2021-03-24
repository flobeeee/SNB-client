import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from './modal/CenterModal';
import AddList from './AddList';
import RemoveList from './RemoveList';
import plus from '../res/plus.png';
import minus from '../res/minus.png';
import './MyList.css';


const MyList = ({ lists, listHandler, setCurrentListId, requestAddList, requestRemoveList, currentListId }) => {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);

  const isAdd = (e) => {
    const plusbtn = document.querySelector('.mylist-plusbtn');
    if (e.target === plusbtn || e.target.alt === 'plus') {
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

  const hoverSelectOptionHandler = (e) => {
    console.log(e.target.style);
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} isBlackBtn={true} onClose={closePopUp} backColor={true}>
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
          <div className="mylist-curlist">나의 노래 목록</div>
        </div>
        <select
          className="userinfo-dropdown"
          onChange={e => setCurrentListId(e.target.value)}
          value={currentListId}
        >
          <option value="" disabled hidden>Create Your List</option>
          {lists.map(data => {
            return <option className="userinfo-option" key={data.id} value={data.id} onMouseOver={hoverSelectOptionHandler}>{data.name}</option>;
          })}
        </select>
        <div className="mylist-btnbox">
          <div className="mylist-plusbtn" value="true" onClick={isAdd}>
            <img src={plus} alt="plus" />
          </div>
          <div className="mylist-minusbtn" onClick={isAdd}>
            <img src={minus} alt="minus" />
          </div>
        </div>
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
  currentListId: PropTypes.string
};


export default MyList;