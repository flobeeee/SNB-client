import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Modal from '../components/modal/CenterModal';
import AddList from '../components/AddList';
import Userinfo from '../components/Userinfo';

const Mypage = (props) => {
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
      { 'email': email, 'listname': name },
      { 'Content-Type': 'application/json', withCredentials: true })
      .then((res) => {
        return res.status === 201 ? true : false;
      });
  };

  const requestRemoveList = async (listid) => {
    await axios.post('https://localhost:4000/mylist/remove',
      { 'listid': listid },
      { 'Content-Type': 'application/json', withCredentials: true });
    await axios.get('https://localhost:4000/mylist/name',);
  };

  return (
    <div className="mypage-box">
      <Modal visible={isOpenPopup} color={'#fff'} isBlackBtn={true} onClose={closePopUp}>
        <AddList addListCallback={requestAddList} closeCallback={closePopUp} />
      </Modal>
      <Userinfo userdata={props.userdata} requestRemoveList={requestRemoveList} openPopUp={openPopUp} />
    </div>
  );
};

Mypage.propTypes = {
  userdata: PropTypes.object
};

export default Mypage;
