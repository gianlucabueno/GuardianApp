import React from 'react';
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
        <AreaInput>
          <Input placeholder='Email'></Input>
        </AreaInput>

        <AreaInput>
          <Input placeholder='Senha'></Input>
        </AreaInput>

        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={handleSignUp}>
          <LinkText>Não possui conta? criar uma conta!</LinkText>
        </Link>

      </Container>
    </Background>
  )
}
export default SignIn;