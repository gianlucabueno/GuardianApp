import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #FFFFFF;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  color: #002754;
  font-size: 30px;
  font-weight: bold;
`;
