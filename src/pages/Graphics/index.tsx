import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SignUp: undefined;
}

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignUp'>

const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return(  
    <Background>
      <Container>
      </Container>
    </Background>
  )
}
export default SignIn;