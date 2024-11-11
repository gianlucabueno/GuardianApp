import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Background, Container, Link, LinkText, SubmitButton, SubmitText } from './styles';
import { AuthContext } from '../../contexts/auth';

type NavigationProps = StackNavigationProp<any>;

const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  // Usando o useContext para acessar o AuthContext
  const { signOut } = useContext(AuthContext);  // Acessando signOut do AuthContext
  console.log(signOut); 
  const handleHome = () => {
    console.log("Home");
    navigation.navigate('Home');
  };
  const handleMedicoes = () => {
    console.log("Register");
    navigation.navigate('Medições');
  };

  const handleNotification = () => {
    console.log("Notification");
    navigation.navigate('Notificações');
  };

  const handlePerfil = () => {
    console.log("Perfil");
    navigation.navigate('Perfil');
  };

  const handleAquisicao = () => {
    console.log("Aquisicao");
    navigation.navigate('Seleção');
  };

  const handleLogout = () => {
    signOut();  // Chama a função de logout
   
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
        <Link onPress={handleAquisicao}>
          <LinkText>Aquisição</LinkText>
        </Link>
        <Link onPress={handleNotification}>
          <LinkText>Notificações</LinkText>
        </Link>
        <Link onPress={handlePerfil}>
          <LinkText>Perfil</LinkText>
        </Link>

        <SubmitButton activeOpacity={0.8} onPress={handleLogout}>
          <SubmitText>Sair</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default SignIn;
