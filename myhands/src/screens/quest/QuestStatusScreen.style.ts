import styled from 'styled-components/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff8f8;
  padding: 7% 7%;
`;

const UserInfoContainer = styled.View`
  border: 1px solid red;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  align-self: stretch;
`;

const NameText = styled.Text`
  color: black;
`;

export {Container, UserInfoContainer, NameText};
