import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Header, Title, Content, Comment, RemoveButton } from './RemoveListStyle';

const RemoveList = ({ removeListCallback, closeCallback }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const handleAddEvent = async () => {

    const result = await removeListCallback();
    result ? closeCallback() : setErrorMessage('요청이 실패하였습니다.');
  };

  return (
    <Wrapper>
      <Header>
        <Title className="Title">리스트를 제거하시겠습니까?</Title>
        <Comment>{errorMessage}</Comment>
      </Header>
      <Content>
        <RemoveButton onClick={handleAddEvent}>확인</RemoveButton>
      </Content>
    </Wrapper>
  );
};

RemoveList.propTypes = {
  removeListCallback: PropTypes.func,
  closeCallback: PropTypes.func
};


export default RemoveList;