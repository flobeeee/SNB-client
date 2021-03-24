import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, OuterContainer, InnerContainer, Icon } from './CenterModalStyle';

const CenterModal = ({ visible, color, isBlackBtn, onClose, className, children, backColor, isWarning }) => {

  const onClickDimmerHandler = () => {
    onClose();
  };

  const prevendEventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Dimmer visible={visible} backColor={backColor}></Dimmer>
      <OuterContainer tabIndex="-1" visible={visible} onClick={onClickDimmerHandler}>
        <InnerContainer tabIndex="0" color={color} className={className} isWarning={isWarning} onClick={prevendEventPropagation}>
          {children}
          <Icon bg={isBlackBtn ? './res/close_black.png' : './res/close_white.png'} onClick={onClose}></Icon>
        </InnerContainer>
      </OuterContainer>
    </>
  );
};

CenterModal.propTypes = {
  visible: PropTypes.bool,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.object,
  isClosed: PropTypes.bool,
  isBlackBtn: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  backColor: PropTypes.bool,
  isWarning: PropTypes.bool
};

export default CenterModal;