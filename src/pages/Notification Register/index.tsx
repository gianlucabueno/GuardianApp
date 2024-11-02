import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { Background, Card, CardHeader, Container } from '../../styles/styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Hamburguer from '../../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Estilos dos componentes
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
  margin: 10px; /* Adiciona margem para melhor espaçamento */
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

// Opções do dropdown
const options = ['Glicose', 'Oxigenação', 'Batimento'];

type NavigationProps = StackNavigationProp<any>;

const RegisterNotification: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>(''); // Tipo de exame
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Dropdown de opções
  const [isVisible, setIsVisible] = useState(false); // Controle de visibilidade do DateTimePicker
  const [selectedTime, setSelectedTime] = useState<string>('Selecione o horário'); // Hora selecionada
  const navigation = useNavigation<NavigationProps>();
  
  // Função para lidar com a confirmação da hora
  const handleConfirm = (date: Date) => {
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formata apenas a hora
    setSelectedTime(formattedTime);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  // Função para salvar a notificação
  const handleSave = async () => {
    if (!selectedType || selectedTime === 'Selecione o horário') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const notification = {
      examType: selectedType,
      examTime: selectedTime,
    };

    try {
      // Recupera as notificações existentes
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];

      // Adiciona a nova notificação
      notifications.push(notification);

      // Salva as notificações atualizadas
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Mostra o alerta e navega após o usuário pressionar OK
      Alert.alert(
        'Sucesso',
        'Notificação salva com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('NotificaçõesTable') // Navega após o OK
          }
        ]
      );

      // Limpa os campos após salvar
      setSelectedType('');
      setSelectedTime('Selecione o horário');

    } catch (error) {
      console.error('Erro ao salvar a notificação:', error);
      alert('Erro ao salvar a notificação. Tente novamente.');
    }
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
          <CardHeader>Adicionar Notificação</CardHeader>

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

          <InputContainer>
            <InputField
              value={selectedTime}
              placeholder="Selecione o horário"
              editable={false}
            />
            <IconButton onPress={showDatePicker}>
              <Ionicons name="calendar" size={24} color="black" />
            </IconButton>
            <DateTimePickerModal
              isVisible={isVisible}
              mode="time" // Modo para apenas hora
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </InputContainer>

          <ButtonContainer>
            <SubmitButton activeOpacity={0.8} onPress={handleSave}>
              <SubmitText>Salvar</SubmitText>
            </SubmitButton>
          </ButtonContainer>
        </Card>
      </Container>
    </Background>
  );
};

export default RegisterNotification;
