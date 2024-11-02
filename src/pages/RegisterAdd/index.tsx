import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Container } from '../Menu/styles';
import { Background, Card, CardHeader } from '../../styles/styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Hamburguer from '../../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';





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



type NavigationProps = StackNavigationProp<any>


const options = ['Glicose', 'Oxigenação', 'Batimento'];

const RegisterAdd: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('Selecione data e hora');
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation<NavigationProps>();

  const handleInputChange = (text: string) => {
    // Permite números e o ponto (.) para números decimais
    const numericValue = text.replace(/[^0-9.]/g, '');

    // Para evitar múltiplos pontos
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      setSelectedValue(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setSelectedValue(numericValue);
    }
  };


  const handleSelectOption = (option: string) => {
    setSelectedType(option);
    setShowDropdown(false); // Fecha o dropdown após selecionar
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleString(); // Formato de data e hora
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  const handleSave = async () => {
    let option: string = ""; // Inicializa a variável option
  
    // Define a unidade com base no tipo selecionado
    if (selectedType === 'Glicose') {
      option = 'mg/L'; // Filtra Glicose apenas por unidade 'mg/L'
    } else if (selectedType === 'Oxigenação') {
      option = 'SPO2'; // Filtra Oxigenação apenas por unidade 'SPO2'
    } else if (selectedType === 'Batimento') {
      option = 'BPM'; // Filtra Batimento apenas por unidade 'BPM'
    }
  
    // Verifica se todos os campos estão preenchidos
    if (!selectedType || !selectedValue || !selectedDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const measurement = {
      examType: selectedType,
      examValue: selectedValue,
      examUnit: option, // Adiciona a unidade ao objeto
      examDate: selectedDate, // Adiciona a data ao objeto
    };
  
    try {
    
      // Mostra o alerta e navega após o usuário pressionar OK
      Alert.alert(
        'Sucesso',
        'Medição salva com sucesso!',
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

  return (
    <Background>
      <Container>
        <Hamburguer />
        <Card>
          <CardHeader>Adicionar Medição</CardHeader>

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
            <SubmitButton activeOpacity={0.8} onPress={handleSave}>
              <SubmitText>Salvar</SubmitText>
            </SubmitButton>
          </ButtonContainer>
        </Card>
      </Container>
    </Background >
  );
};

export default RegisterAdd;


