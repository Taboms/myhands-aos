import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
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
