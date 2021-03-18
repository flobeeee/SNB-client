import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  width: 480px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 8px;
`;

export const Title = styled.div`
  font-size: 2rem;
`;

export const Comment = styled.p`
  margin-left: 2px;
  font-size: 0.8rem;
  color: #f00;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputName = styled.input`
  height: 2rem;
  flex: 4 0 0;
  margin-right: 1.8%;
  border: none;
  border-bottom: 1px solid;
  &:focus {
    outline: none;
  }
`;

export const AddButton = styled.button`
  flex: 1 0 0;
  margin-left: 1.8%;
  border: none;
  border-radius: 8px;
  background-color: #4F5F7D;
  color: #ffffff;
  outline: none;
  &:hover {
    background-color: #ffffff;
    color: #4F5F7D;
  }
`;
