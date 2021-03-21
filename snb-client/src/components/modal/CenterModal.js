import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, OuterContainer, InnerContainer, Icon } from './CenterModalStyle';

const CenterModal = ({ visible, color, isBlackBtn, onClose, className, children, backColor }) => {
  return (
    <>
      <Dimmer visible={visible} backColor={backColor}></Dimmer>
      <OuterContainer tabIndex="-1" visible={visible}>
        <InnerContainer tabIndex="0" color={color} className={className}>
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
  backColor: PropTypes.bool
};

export default CenterModal;