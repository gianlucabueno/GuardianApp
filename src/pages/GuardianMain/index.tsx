import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Background,
  Container,
  Card,
  Greetings,
  CardContent,
  CardHeader,
  DateText,
  ValueText,
  VerticalLine,
  NextDateText,
  CardContentCenter,
  HorizontalLine,
} from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';
import styled from 'styled-components/native';

interface Person {
  id: number;
  name: string;
  height: number;
  weight: number;
}

type NavigationProps = StackNavigationProp<any>

const GuardianMain: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [guardian, setGuardians] = useState<Person[]>([]);
  const fetchGuardian = async () => {
    // Simulação de uma API que retorna as leituras
    const apiResponse = [
      { id: 2, name: "João Oliveira", height: 1.80, weight: 75 },
      { id: 3, name: "Ana Pereira", height: 1.70, weight: 65 },
      { id: 4, name: "Carlos Silva", height: 1.75, weight: 80 },
      { id: 5, name: "Mariana Souza", height: 1.65, weight: 60 },
      { id: 6, name: "Ricardo Almeida", height: 1.82, weight: 90 },
      { id: 7, name: "Fernanda Lima", height: 1.70, weight: 70 },
      { id: 8, name: "Lucas Pereira", height: 1.78, weight: 85 },
      { id: 9, name: "Gabriela Santos", height: 1.60, weight: 55 },
      { id: 10, name: "Felipe Costa", height: 1.85, weight: 95 }
    ];


    // Salvando os dados no estado
    setGuardians(apiResponse);
  };


  useEffect(() => {
    fetchGuardian();

  }, []);

  const handlePress = (person: Person) => {
    navigation.navigate('RegistorsGua', { id: person.id });
  };


  return (
    <Background>
      <Container>
        <Hamburguer />
        <ContainerPerson>
          {guardian.map(person => (
            <SubmitButton key={person.id} onPress={() => handlePress(person)}>
              <SubmitText>{person.name}</SubmitText>
            </SubmitButton>
          ))}
        </ContainerPerson>
      </Container>
    </Background>
  )
}
export default GuardianMain;


const SubmitButton = styled.TouchableOpacity`
  width: 70%;
  height: 45px;
  border-radius: 20px;
  background-color: #ffffff;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const SubmitText = styled.Text`
  font-size: 20px;
  color: #002754;
`;

const ContainerPerson = styled.View`
  width: 90%;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  alignItems: center;
`;

// Simulando o JSON de pessoas



// Função para tratar o pressionamento do botão

