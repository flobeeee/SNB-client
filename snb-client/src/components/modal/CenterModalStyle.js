import styled, {css, keyframes } from 'styled-components';

const shakeAnimation = keyframes` 
  0%, 100% { transform: translate(0, -50%); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-10px, -50%); }
  20%, 40%, 60%, 80% { transform: translate(10px, -50%); }
`;

const reverseAnimation = keyframes`
  0% {transform: rotateX(180deg);}
  100% {tranform: rotateX(0deg);}
`;

const boxBlink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Dimmer = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: ${(props) => (props.backColor ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.3)')}; 
`;

export const OuterContainer = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.color};
  border-radius: 20px;
  max-width: 600px;
  min-width: 50px;
  min-height: 100px;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);
  outline:none;

  ${(props) => props.isWarning && css`
   animation: ${shakeAnimation} 0.3s alternate;
  `}
`;

export const Icon = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${props => props.bg});
`;