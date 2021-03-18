import React, { useState } from 'react';
import axios from 'axios';

import Modal from './modal/CenterModal';
import AddList from './AddList';
import Header from './Header';

const MyPage = () => {
  const email = 'user1@gmail.com';
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  
  const openPopUp = () => {
    setIsOpenPopup(true);
  };

  const closePopUp = () => {
    setIsOpenPopup(false);
  };

  const requestAddList = async (name) => {
    return await axios.post('https://localhost:4000/mylist/add', 
      { 'email': email, 'listname': name},
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        return res.status === 201 ? true : false;
      });
  };

  return (
    <div className="search-box">
      <Header
        getSearchResult={undefined}
        mypageHandler={undefined}
        login={true}
      />
      <Modal visible={isOpenPopup} color={'#fff'} isBlackBtn={true} onClose={closePopUp}>
        <AddList addListCallback={requestAddList} closeCallback={closePopUp}/>
      </Modal>
      <button onClick={openPopUp}>add List</button>
    </div>
  );
};

export default MyPage;