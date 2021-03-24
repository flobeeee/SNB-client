import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  width: 480px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Title = styled.div`
  font-size: 2rem;
  text-align: center;
`;

export const Comment = styled.p`
  margin-left: 2px;
  font-size: 0.8rem;
  color: #f00;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const RemoveButton = styled.button`

  width: 15rem;
  height: 2rem;
  margin-left: 1.8%;
  border: none;
  border-radius: 8px;
  background-color: #e8447d;
  color: #ffffff;
  outline: none;
  &:hover {
    background-color: #fb1d46;
  }
`;
