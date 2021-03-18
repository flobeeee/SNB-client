import React, { useState } from 'react';
import PropTypes from 'prop-types';


import { Wrapper, Header, Title, Content, InputName, AddButton, Comment } from './AddListStyle';

const AddList = ({addListCallback, closeCallback}) => {

  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleAddEvent = async () => {
    if(name.length < 1) {
      setErrorMessage('한 글자 이상 입력해야 합니다.');
      return;
    }

    const result = await addListCallback(name);
    result ? closeCallback() : setErrorMessage('요청이 실패하였습니다.');
  };

  return (
    <Wrapper>
      <Header>
        <Title className="Title">리스트 추가</Title>
        <Comment>{errorMessage}</Comment>
      </Header>
      <Content>
        <InputName placeholder="Type List name" onChange={({ target: { value } }) => setName(value)}></InputName>
        <AddButton onClick={handleAddEvent}>확인</AddButton>
      </Content>
    </Wrapper>
  );
};

AddList.propTypes = {
  addListCallback: PropTypes.func,
  closeCallback: PropTypes.func
};


export default AddList;