import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SignIn: undefined;
}

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignIn'>

const SignUp: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleSignUp = () => {
    navigation.navigate('SignIn');
  };

  return (

    <Background>
      <Container>
        <AreaInput>
          <Input placeholder='Nome'></Input>
        </AreaInput>

        <AreaInput>
          <Input placeholder='Email'></Input>
        </AreaInput>

        <AreaInput>
          <Input placeholder='CPF'></Input>
        </AreaInput>

        <AreaInput>
          <Input placeholder='Senha'></Input>
        </AreaInput>

        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={ handleSignUp }>
          <LinkText>Ja tem conta? Acesse</LinkText>
        </Link>

      </Container>
    </Background>
  )
}
export default SignUp;