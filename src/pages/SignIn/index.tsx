import React, { useState } from 'react'; // Importando useState
import { TouchableOpacity } from 'react-native'; // Importando TouchableOpacity para o ícone
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importando o ícone

type RootStackParamList = {
  SignUp: undefined;
}

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignUp'>

const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar a senha

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev); // Alterna a visibilidade da senha
  };

  return(  
    <Background>
      <Container>
        <AreaInput>
          <Input 
            placeholder='Email'
          />
        </AreaInput>

        <AreaInput style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input
            placeholder='Senha'
            secureTextEntry={!showPassword}
            style={{ flex: 1 }} // Usa o estado para definir a visibilidade da senha
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={showPassword ? 'eye-off' : 'eye'} // Altera o ícone baseado na visibilidade
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>
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
