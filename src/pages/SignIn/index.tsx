import React, { useContext, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'; // Importando o Axios
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../contexts/auth'

type RootStackParamList = {
  SignUp: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState(''); // Estado para o email
  const [password, setPassword] = useState(''); // Estado para a senha
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar a senha
  const { signIn, loadingAuth } = useContext(AuthContext);

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Função para fazer o login com Axios
  const handleLogin = async () => {
    signIn(email, password);

  };

  return (
    <Background>
      <Container>
        <AreaInput>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail} // Atualiza o estado de email
          />
        </AreaInput>

        <AreaInput style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword} // Atualiza o estado de senha
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={handleSignUp}>
          <LinkText>Não possui conta? criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
};

export default SignIn;
