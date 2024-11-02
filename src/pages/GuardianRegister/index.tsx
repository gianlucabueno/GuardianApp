import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, TextInput, Modal, } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link, CardHeader, Card, DateText, ValueText } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Entypo from '@expo/vector-icons/Entypo';

type NavigationProps = StackNavigationProp<any>


interface Reading {
  id: number
  date: string;
  value: number;
  unit: string;
}

interface GuardianFormProps {
  route: RouteProp<{ params: { id: number } }, 'params'>;
}

const GuardianRegister: React.FC<GuardianFormProps> = ({ route }) => {
  const { id } = route.params;
  console.log(id)
  const navigation = useNavigation<NavigationProps>();
  const [selectedType, setSelectedType] = useState<string>('Todas');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [readings, setReadings] = useState<Reading[]>([]);




  const options = ['Todas', 'Glicose', 'Oxigenação', 'Batimento'];


  const handleGraph = () => {
    navigation.navigate('GuaGraficos', { id });
  }


  const handleSelectOption = (option: string) => {
    setSelectedType(option);
    setShowDropdown(false); // Fecha o dropdown após selecionar
  };

  

  const fetchReadings = async () => {
    // Simulação de uma API que retorna as leituras
    const apiResponse = [
      { id: 1, date: '19/05 22:00', value: 120, unit: 'mg/L' },
      { id: 2, date: '19/05 22:15', value: 90, unit: 'SPO2' },
      { id: 3, date: '19/05 22:30', value: 110, unit: 'mg/L' },
      { id: 4, date: '19/05 22:45', value: 75, unit: 'SPO2' },
      { id: 5, date: '19/05 23:00', value: 130, unit: 'mg/L' },
      { id: 6, date: '19/05 23:15', value: 85, unit: 'SPO2' },
      { id: 7, date: '19/05 23:30', value: 115, unit: 'mg/L' },
      { id: 8, date: '19/05 23:45', value: 80, unit: 'SPO2' },
      { id: 9, date: '20/05 00:00', value: 125, unit: 'mg/L' },
      { id: 10, date: '20/05 00:15', value: 70, unit: 'SPO2' },
      { id: 11, date: '20/05 00:30', value: 135, unit: 'mg/L' },
      { id: 12, date: '20/05 00:45', value: 78, unit: 'SPO2' },
      { id: 13, date: '20/05 01:00', value: 122, unit: 'mg/L' },
      { id: 14, date: '20/05 01:15', value: 82, unit: 'SPO2' },
      { id: 15, date: '20/05 01:30', value: 119, unit: 'mg/L' },
      { id: 16, date: '20/05 01:45', value: 76, unit: 'SPO2' },
      { id: 17, date: '20/05 02:00', value: 121, unit: 'mg/L' },
      { id: 18, date: '20/05 02:15', value: 88, unit: 'SPO2' },
      { id: 19, date: '20/05 02:30', value: 128, unit: 'mg/L' },
      { id: 20, date: '20/05 02:45', value: 74, unit: 'SPO2' }
    ];

    setReadings(apiResponse);
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const filteredReadings = selectedType === 'Todas'
    ? readings // Se 'Todas' estiver selecionado, retorna todas as leituras
    : readings.filter((reading) => {
      // Filtra por tipo
      if (selectedType === 'Glicose') {
        return reading.unit === 'mg/L'; // Filtra Glicose apenas por unidade 'mg/L'
      }
      if (selectedType === 'Oxigenação') {
        return reading.unit === 'SPO2'; // Filtra Oxigenação apenas por unidade 'SPO2'
      }
      if (selectedType === 'Batimento') {
        return reading.unit === 'BPM'; // Filtra Batimento apenas por unidade 'BPM'
      }
      return false; // Retorna false se nenhum tipo coincidir
    });

  // Ordenando os dados filtrados
  const sortedReadings = [...filteredReadings].sort((a, b) => {
    const [dayA, monthA] = a.date.split(' ')[0].split('/');
    const [dayB, monthB] = b.date.split(' ')[0].split('/');

    const [hourA, minuteA] = a.date.split(' ')[1].split(':');
    const [hourB, minuteB] = b.date.split(' ')[1].split(':');

    // Criando objetos Date considerando o ano atual (por exemplo, 2024)
    const dateA = new Date(2024, parseInt(monthA) - 1, parseInt(dayA), parseInt(hourA), parseInt(minuteA));
    const dateB = new Date(2024, parseInt(monthB) - 1, parseInt(dayB), parseInt(hourB), parseInt(minuteB));

    return dateB.getTime() - dateA.getTime(); // Ordena de mais recente para mais antigo
  });


  return (
    <Background>
      <Container>
        <Hamburguer />



        <TypeBar>
          <TypeInput
            placeholder="Selecionar tipo..."
            placeholderTextColor="#999"
            value={selectedType}
            onFocus={() => setShowDropdown(true)} // Abre o dropdown ao focar no input
            editable={false} // Não permite digitar, apenas selecionar// Desativar a edição, se for abrir uma seleção

          />
          <IconButton onPress={() => setShowDropdown((prev) => !prev)}>
            <Ionicons name="chevron-down" size={24} color="black" />
          </IconButton>
        </TypeBar>

        <Modal
          transparent={true}
          visible={showDropdown}
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)} // Fecha ao pressionar o botão voltar
        >
          <ModalContainer>
            <DropdownList>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <DropdownItem onPress={() => handleSelectOption(item)}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>{item}</Text>
                  </DropdownItem>
                )}
              />
            </DropdownList>
          </ModalContainer>
        </Modal>


        {/* <IconContainer>
          <SearchBar>
            <SearchInput

              placeholder="Digite um valor"
              placeholderTextColor="#999">



            </SearchInput>
          </SearchBar>

          <Icon>
            <Ionicons name="calendar" size={35} color="#fff" />
          </Icon>
          <Icon>
            <Ionicons name="search" size={35} color="#fff" />
          </Icon>
        </IconContainer>*/}

          
        <Card>
          <CardHeader>Últimas Leituras</CardHeader>
          <ScrollView style={{ maxHeight: 300 }}>
            {sortedReadings.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, borderBottomWidth: 1, }}>
                <Text></Text>
                <DateText style={{ textAlign: 'left' }}>{item.date}</DateText>
                <ValueText style={{ width: 60, textAlign: 'center' }}>{item.value}</ValueText>
                <ValueText style={{ width: 60, textAlign: 'left' }}>{item.unit}</ValueText>
              </View>
            ))}
          </ScrollView>
        </Card>

        <ButtonContainer>
          <RoundButton onPress={() => handleGraph()}>
            <Entypo name="bar-graph" size={24} color="white" />
          </RoundButton>
        </ButtonContainer>
      </Container>
    </Background>
  );
};

export default GuardianRegister;

export const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  width: 60%;
  padding: 5px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;


// Botões para ícones
export const IconButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const TypeInput = styled(TextInput)`
  flex: 1;
  color: #333;
`;

const TypeBar = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 5px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative; 

`;


const DropdownList = styled.View`
  position: absolute;
  background-color: white;
  width: 100%;
  max-height: 150px;
  z-index: 100;
  top: 30px; 
  left: 5px;
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 10px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center; /* Centraliza o conteúdo na vertical */
  align-items: center; /* Centraliza o conteúdo na horizontal */
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro para destacar o modal */
`;

export const IconContainer = styled.View`
  flex-direction: row; /* Mantém os ícones lado a lado */
  align-items: center; /* Alinha os ícones verticalmente no centro */
`;


export const Icon = styled.TouchableOpacity`
  padding: 10px; /* Adiciona um pouco de padding ao redor do ícone */
  align-items: center;
  justify-content: center; /* Centraliza verticalmente o conteúdo */
  margin-bottom: 20px;
`;

const RoundButton = styled.TouchableOpacity`
  width: 60px; 
  height: 60px; 
  border-radius: 30px; 
  background-color: #002754; 
  justify-content: center; 
  align-items: center; 
  elevation: 5; 
  shadow-opacity: 0.3; 
  shadow-radius: 10px; 
  shadow-color: #000; 
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end; /* Alinha o botão à direita */
  margin-top: 20px;
  padding-right: 10px; /* Adiciona um pouco de espaçamento à direita */
  position: absolute; /* Faz o contêiner se posicionar absoluto */
  bottom: 80px; /* Distância do fundo */
  right: 15px; /* Distância da direita */
`;
