import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, TextInput, Modal, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link, CardHeader, Card, DateText, ValueText } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

type NavigationProps = StackNavigationProp<any>

interface Reading {
  measurement_ID: number;
  measurementDate: string;
  value: number;
  unit: string;
}

const handleDelete = (item: Reading) => {
  Alert.alert(
    'Confirmar Exclusão',
    'Tem certeza de que deseja excluir esta leitura?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: () => {
          console.log('Excluir:', item.measurement_ID);
        },
      },
    ],
    { cancelable: false }
  );
};


const Medicoes: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedType, setSelectedType] = useState<string>('Todas');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [readings, setReadings] = useState<Reading[]>([]);


  const options = ['Todas', 'Glicose', 'Oxigenação', 'Batimento'];

  const handleEdit = (item: Reading) => {
    navigation.navigate('MediçõesForm', { id: item.measurement_ID });
  };

  const handleGraph = () => {
    navigation.navigate('Graficos');
  }


  const handleSelectOption = (option: string) => {
    setSelectedType(option);
    setShowDropdown(false); // Fecha o dropdown após selecionar
  };

  

  const fetchReadings = async () => {
    try {
      // Fazendo a requisição para a API para obter os dados
      const userID = await AsyncStorage.getItem('@userID');
      console.log
      const response = await api.get(`/measuringData/user/${userID}`);  // Ajuste a URL de acordo com a API
      // Verifique se a resposta foi bem-sucedida
      if (response.status === 200) {
        const formattedData = response.data.map((item:Reading) => {
          const { measurement_ID, measurementDate, value, unit } = item;
          return {
            measurement_ID,
            measurementDate,
            value,
            unit,
          };
        });
        console.log(formattedData)
        setReadings(formattedData.reverse());
      } else {
        console.error('Erro ao obter as leituras:', response.status);
      }
    } catch (err) {
      console.error('Erro ao buscar leituras:', err);
    }
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
            {filteredReadings.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, borderBottomWidth: 1, }}>
                <Text></Text>
                <DateText style={{ textAlign: 'left' }}>{item.measurementDate}</DateText>
                <ValueText style={{ width: 60, textAlign: 'center' }}>{item.value}</ValueText>
                <ValueText style={{ width: 60, textAlign: 'left' }}>{item.unit}</ValueText>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Ionicons name="pencil" color="#002754" size={25} />
                </TouchableOpacity>
                <ValueText>{" "}</ValueText>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Ionicons name="trash" color="#002754" size={25} />
                </TouchableOpacity>
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

export default Medicoes;

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
  padding-right: 20px; /* Adiciona um pouco de espaçamento à direita */
  position: absolute; /* Faz o contêiner se posicionar absoluto */
  bottom: 80px; /* Distância do fundo */
  right: 15px; /* Distância da direita */
`;
