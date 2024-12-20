import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Container } from '../Menu/styles';
import { Background, Card, CardHeader } from '../../styles/styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Hamburguer from '../../components/Header';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';





const IconButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const DropdownList = styled.View`
  position: absolute;
  background-color: white;
  width: 100%;
  max-height: 150px;
  overflow: hidden;
  z-index: 1;
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 10px;
`;

const InputField = styled(TextInput)`
  height: 40px;
  border-color: #000000;
  border-width: 0px;
  padding-left: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  color: #000000;
  font-weight: bold;
`;

const InputContainer = styled.View`
position: relative;
width: 100%;
margin: 10px; /* Adicionei uma margem para melhor espaçamento */
`;

const SubmitButton = styled.TouchableOpacity`
  width: 80px;
  height: 35px;
  border-radius: 20px;
  background-color: #008ECA;
  margin-top: 10px;
  align-items: center;
  justify-content: center; 
`;

const SubmitText = styled.Text`
  font-size: 15px;
  color: #FFF;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row; 
  justify-content: flex-end; 
  margin-top: 20px; 
`;

interface MedicoesFormProps {
  route: RouteProp<{ params: { id: number } }, 'params'>;
}

interface Reading {
  id: number
  date: string;
  value: number;
  unit: string;
}

type NavigationProps = StackNavigationProp<any>

const options = ['Glicose', 'Oxigenação', 'Batimento'];

const RegisterEdit: React.FC<MedicoesFormProps> = ({ route }) => {
  const { id } = route.params;
  console.log(id)
  const [selectedType, setSelectedType] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation<NavigationProps>();

  const fetchReadings = async () => {
    // Simulação de uma API que retorna as leituras
    const apiResponse = [
      { id: 1, date: '19/05/2024 22:00', value: 120, unit: 'mg/L' },
      { id: 2, date: '19/05/2024  22:15', value: 90, unit: 'SPO2' },
      { id: 3, date: '19/05/2024  22:30', value: 110, unit: 'mg/L' },
      { id: 4, date: '19/05/2024  22:45', value: 75, unit: 'SPO2' },
      { id: 5, date: '19/05/2024  23:00', value: 130, unit: 'mg/L' },
      { id: 6, date: '19/05/2024  23:15', value: 85, unit: 'SPO2' },
      { id: 7, date: '19/05/2024  23:30', value: 115, unit: 'mg/L' },
      { id: 8, date: '19/05/2024  23:45', value: 80, unit: 'SPO2' },
      { id: 9, date: '20/05/2024  00:00', value: 125, unit: 'mg/L' },
      { id: 10, date: '20/05/2024  00:15', value: 70, unit: 'SPO2' },
      { id: 11, date: '20/05/2024  00:30', value: 135, unit: 'mg/L' },
      { id: 12, date: '20/05/2024  00:45', value: 78, unit: 'SPO2' },
      { id: 13, date: '20/05/2024  01:00', value: 122, unit: 'mg/L' },
      { id: 14, date: '20/05/2024  01:15', value: 82, unit: 'SPO2' },
      { id: 15, date: '20/05/2024  01:30', value: 119, unit: 'mg/L' },
      { id: 16, date: '20/05/2024  01:45', value: 76, unit: 'SPO2' },
      { id: 17, date: '20/05/2024  02:00', value: 121, unit: 'mg/L' },
      { id: 18, date: '20/05/2024  02:15', value: 88, unit: 'SPO2' },
      { id: 19, date: '20/05/2024  02:30', value: 128, unit: 'mg/L' },
      { id: 20, date: '20/05/2024  02:45', value: 74, unit: 'SPO2' }
    ];

    const readings = apiResponse.filter(reading => reading.id === id);
    console.log(readings)

    setReadings(readings);
  };


  useEffect(() => {
    fetchReadings();
  }, []);






  const handleSave = () => {
    let option: string;
    option = " "
    if (selectedType === 'Glicose') {
      option = 'mg/L'; // Filtra Glicose apenas por unidade 'mg/L'
    }
    if (selectedType === 'Oxigenação') {
      option = 'SPO2'; // Filtra Oxigenação apenas por unidade 'SPO2'
    }
    if (selectedType === 'Batimento') {
      option = 'BPM'; // Filtra Batimento apenas por unidade 'BPM'
    }

    console.log("Valor atualizado:", selectedValue);
    console.log("Data atualizada:", selectedDate);
    console.log("Tipo atualizado:", option);
    try {
      // Mostra o alerta e navega após o usuário pressionar OK
      Alert.alert(
        'Sucesso',
        'Medição editada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MediçõesTable') // Navega após o OK
          }
        ]
      );

      // Limpa os campos após salvar
      setSelectedValue(" ");
      setSelectedDate(" ");
      setSelectedType(" ");

    } catch (error) {
      console.error('Erro ao salvar a medição:', error);
      alert('Erro ao salvar a medição. Tente novamente.');
    }
  };


  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };


  useEffect(() => {
    // Verifica se filteredReading não está vazio e acessa o valor da primeira leitura
    if (readings && readings.length > 0) {
      setSelectedValue(readings[0].value.toString());
      setSelectedDate(readings[0].date.toLocaleString());// Acessa o valor da primeira leitura
      if (readings[0].unit.toString() === 'mg/L') {
        setSelectedType('Glicose'); // Filtra Glicose apenas por unidade 'mg/L'
      }
      if (readings[0].unit.toString() === 'SPO2') {

        setSelectedType('Oxigenação') // Filtra Oxigenação apenas por unidade 'SPO2'
      }
      if (readings[0].unit.toString() === 'BPM') {
        setSelectedType('Batimento')  // Filtra Batimento apenas por unidade 'BPM'
      }
    }
  }, [readings]);

  const handleInputChange = (text: string) => {
    setSelectedValue(text); // Atualiza o estado conforme o usuário altera o campo
  };
  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleString(); // Formato de data e hora
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleSelectOption = (option: string) => {
    setSelectedType(option);
    setShowDropdown(false); // Fecha o dropdown após selecionar
  };


  return (
    <Background>
      <Container>
        <Hamburguer />
        <Card>
          <CardHeader>Editar Medição</CardHeader>

          <InputContainer>
            <InputField
              value={selectedValue}
              onChangeText={handleInputChange}
              placeholder="Digite um número..."
            />
          </InputContainer>

          <InputContainer>
            <InputField
              value={selectedDate}
              placeholder="Selecione data e hora"
              editable={false}
            />
            <IconButton onPress={showDatePicker}>
              <Ionicons name="calendar" size={24} color="black" />
            </IconButton>
            <DateTimePickerModal
              isVisible={isVisible}
              mode="datetime" // Modo para data e hora
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </InputContainer>

          <InputContainer>
            <InputField
              value={selectedType}
              onFocus={() => setShowDropdown(true)} // Abre o dropdown ao focar no input
              placeholder="Selecione uma opção"
              editable={false} // Não permite digitar, apenas selecionar
            />
            <IconButton onPress={() => setShowDropdown((prev) => !prev)}>
              <Ionicons name="chevron-down" size={24} color="black" />
            </IconButton>
            {showDropdown && (
              <DropdownList>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <DropdownItem onPress={() => handleSelectOption(item)}>
                      <Text style={{ color: '#00000', fontWeight: 'bold' }}>{item}</Text>
                    </DropdownItem>
                  )}
                />
              </DropdownList>
            )}
          </InputContainer>

          <ButtonContainer>
            <SubmitButton onPress={handleSave}>
              <SubmitText>Salvar</SubmitText>
            </SubmitButton>
          </ButtonContainer>
        </Card>
      </Container>
    </Background >
  );
};

export default RegisterEdit;



