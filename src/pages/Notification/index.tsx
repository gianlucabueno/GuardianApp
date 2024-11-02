import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Background, Container, Card, CardHeader } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import Hamburguer from '../../components/Header';

// Define a interface para uma notificação
interface NotificationItem {
  examType: string;
  examTime: string; // Exemplo: "14:30"
}

type NavigationProps = StackNavigationProp<any>;

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const navigation = useNavigation<NavigationProps>();

  // Solicitar permissão para enviar notificações
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Você precisa permitir notificações para receber lembretes.');
        }
      }
    };

    requestNotificationPermission();
  }, []);

  // Carregar notificações
  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Erro ao carregar notificações', error);
    }
  };

  // Usando o useFocusEffect para recarregar as notificações
  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [])
  );

  // Deletar uma notificação
  const handleDelete = async (index: number) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Navegar para a tela de gráfico
  const handleGraph = () => {
    navigation.navigate('RegiNote');
  };

  // Função para agendar uma notificação
  const scheduleNotification = async (examType: string, examTime: string) => {
    const [hours, minutes] = examTime.split(':').map(Number); // Divide o horário
    const now = new Date();
    const triggerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Se o horário já passou hoje, agende para amanhã
    if (triggerDate < now) {
      triggerDate.setDate(triggerDate.getDate() + 1);
    }

    console.log(`Agendando notificação para ${examType} em ${triggerDate.toString()}`);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${examType}:`,
        body: `Seu exame foi agendado ${examTime}`,
      },
      trigger: {
        seconds: Math.floor((triggerDate.getTime() - now.getTime()) / 1000),
        repeats: false,
      },
    });
  };

  // Agendar notificações ao carregar
  useEffect(() => {
    notifications.forEach((item) => {
      scheduleNotification(item.examType, item.examTime);
    });
  }, [notifications]);

  return (
    <Background>
      <Container>
      <Hamburguer />
        <Card>
          <CardHeader>Notificações de Exames</CardHeader>
          <ScrollView style={{ maxHeight: 300 }}>
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                  }}>
                  <Text style={{ flex: 1, textAlign: 'left' }}>{item.examType}</Text>
                  <Text style={{ width: 100, textAlign: 'center' }}>{item.examTime}</Text>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Ionicons name="trash" color="#002754" size={25} />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', paddingVertical: 10 }}>
                Nenhuma notificação disponível.
              </Text>
            )}
          </ScrollView>
        </Card>

        {/* Adiciona o botão redondo */}
        <ButtonContainer>
          <RoundButton onPress={handleGraph}>
            <Entypo name="plus" size={24} color="white" />
          </RoundButton>
        </ButtonContainer>
      </Container>
    </Background>
  );
};

export default Notification;

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
  bottom: 100px; /* Distância do fundo */
  right: 10px; /* Distância da direita */
`;
