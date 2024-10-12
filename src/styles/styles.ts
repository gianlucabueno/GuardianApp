import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #3EBCF1;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center
`;

export const AreaInput = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput`
  background-color: #FFF;
  width: 90%;
  font-size: 17px;
  padding: 10px;
  border-radius: 20px;
  color: #121212;
  margin-bottom: 15px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 70%;
  height: 45px;
  border-radius: 20px;
  background-color: #008ECA;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  color: #FFFFFF;
`;

export const Card = styled.View`
  width: 90%;
  padding: 20px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Greetings = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #FFF;
`;

export const CardHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const CardContent= styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardContentCenter = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const NextDateText = styled.Text`
  font-size: 30px;
  color: #000;
  text-align: center;
`;

export const ValueText = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const VerticalLine = styled.View`
  width: 1px;
  background-color: #000;
  height: 100%;
  margin-horizontal: 10px;
`;

export const HorizontalLine = styled.View`
  height: 1px; /* Altura da linha horizontal */
  background-color: #000; /* Cor da linha */
  width: 100%; /* Largura da linha, 100% para ocupar toda a largura do container */
  margin-vertical: 10px; /* Margem vertical para espaçamento acima e abaixo da linha */
  display: block; 
`;


