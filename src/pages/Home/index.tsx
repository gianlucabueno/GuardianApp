import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
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
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Reading {
  measurement_ID: number;
  measurementDate: string;
  value: number;
  unit: string;
}

interface Next {
  date: string;
  unit: string;
}


type NavigationProps = StackNavigationProp<any>

const Home: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [nextread, setNextRead] = useState<Next[]>([]);

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

  // Função para renderizar cada leitura



  return (
    <Background>
      <Container>
        <Hamburguer />
        <Greetings>Ola, Paulo</Greetings>
        <Card>
          <CardHeader>Últimas Leituras</CardHeader>
          {readings.slice(0, 5).map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, borderBottomWidth: 1, }}>
              <Text></Text>
              <DateText style={{ textAlign: 'left' }}>{item.measurementDate}</DateText>

              <ValueText style={{ width: 60, textAlign: 'center' }}>{item.value}</ValueText>
              <ValueText style={{ width: 60, textAlign: 'left' }}>{item.unit}</ValueText>
            </View>
          ))}
        </Card>
      </Container>
    </Background>
  )
}
export default Home;