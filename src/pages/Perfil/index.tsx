import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';


type NavigationProps = StackNavigationProp<any>

const Perfil: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return(  
    <Background>
      <Container>
      <Hamburguer />
        <Text>Perfil</Text>
      </Container>
    </Background>
  )
}
export default Perfil;