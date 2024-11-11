import React, { useEffect, useState } from 'react';
import { Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, Container } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';
import { NewText } from './styles';

// Supondo que você tenha a imagem padrão na pasta assets
const defaultProfilePic = require('../../../assets/defaultProfilePic.jpg');

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  birthAt: Date | string; // Pode ser Date ou string
  createdAt: Date | string;
  updatedAt: Date | string;
  role: number;
  height?: number; // Pode ser opcional
  weight?: number; // Pode ser opcional
}

type NavigationProps = StackNavigationProp<any>;

const Perfil: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [user, setUser] = useState<User[]>([]);

  const fetchUser = async () => {
    const usersResponse = [
      {
        id: 1,
        name: 'Paulo Antunes',
        email: 'pAntunes.uel@example.com',
        password: 'senha123',
        birthAt: '1995-06-15',
        createdAt: '2024-10-15T10:00:00Z',
        updatedAt: '2024-10-15T10:00:00Z',
        role: 1,
        height: 185,
        weight: 85.2,
      },
    ];

    setUser(usersResponse);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (user.length === 0) {
    return <Text>Carregando...</Text>;
  }

  // Função para calcular a idade
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Se o mês atual for menor que o mês de nascimento, ou se for o mesmo mês mas o dia atual for menor que o dia de nascimento, subtrai 1 da idade
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const calculateHeight = (height: string) => {
    const centimeters = parseFloat(height); // Converte a string para número
    const meters = centimeters / 100; // Divide por 100 para converter em metros
    return meters; // Retorna o valor em metros
  };


  return (
    <Background>
      <Container>
        <Hamburguer />
        {/* Adicionando a imagem padrão como foto de perfil */}
        <Image
          source={defaultProfilePic} // Imagem padrão
          style={{ width: 150, height: 150, borderRadius: 80, marginBottom: 10 }} // Estilo da imagem
        />
        <NewText>Nome: {user[0].name}</NewText>
        <NewText>Email: {user[0].email}</NewText>
        <NewText>Idade: {calculateAge(user[0].birthAt as string)} anos</NewText>
        <NewText>Altura: {user[0].height ? `${calculateHeight(user[0].height.toString()).toFixed(2)} m` : 'Não informado'}</NewText>
        <NewText>Peso: {user[0].weight ? `${user[0].weight} kg` : 'Não informado'}</NewText>
      </Container>
    </Background>
  );
};

export default Perfil;