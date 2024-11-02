import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Importa os ícones do expo

type RootStackParamList = {
  SignIn: undefined;
}

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignIn'>

const SignUp: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  
  // Estado para gerenciar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    navigation.navigate('SignIn');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Background>
      <Container>
        <AreaInput>
          <Input placeholder='Nome' />
        </AreaInput>

        <AreaInput>
          <Input placeholder='Email' />
        </AreaInput>

        <AreaInput>
          <Input placeholder='CPF' />
        </AreaInput>

        <AreaInput>
          <Input placeholder='Altura(cm)' />
        </AreaInput>

        <AreaInput>
          <Input placeholder='Peso' />
        </AreaInput>

        <AreaInput style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input
            placeholder='Senha'
            secureTextEntry={!showPassword} // Usa o estado para determinar a visibilidade
            value={password}
            onChangeText={setPassword} // Atualiza o estado da senha
            style={{ flex: 1 }} // Faz o Input ocupar o espaço restante
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>
        </AreaInput>

        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>

        <Link onPress={handleSignUp}>
          <LinkText>Já tem conta? Acesse</LinkText>
        </Link>
      </Container>
    </Background>
  );
};

export default SignUp;
