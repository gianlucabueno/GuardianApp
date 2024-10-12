import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Background,Container,Link,LinkText } from './styles';

type NavigationProps = StackNavigationProp<any>

const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleHome = () => {
    console.log("Home")
    navigation.navigate('Home');
  };
  const handleMedicoes = () => {
    console.log("Register")
    navigation.navigate('Medições');
  };

  const handleNotification = () => {
    console.log("Notification")
    navigation.navigate('Notificações');
  };

  const handlePerfil = () => {
    console.log("Perfil")
    navigation.navigate('Perfil');
  };
  
  
  return(  
    <Background>
      <Container>
        <Link onPress={handleHome}>
          <LinkText>Home</LinkText>
        </Link>
        <Link onPress={handleMedicoes}>
          <LinkText>Medições</LinkText>
        </Link>
        <Link onPress={handleNotification}>
          <LinkText>Notificações</LinkText>
        </Link>
        <Link onPress={handlePerfil}>
          <LinkText>Perfil</LinkText>
        </Link>
      </Container>
    </Background>
  )
}
export default SignIn;
