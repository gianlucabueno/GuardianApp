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


interface Reading {
  date: string;
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
    // Simulação de uma API que retorna as leituras
    const apiResponse  = [
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

    
    // Salvando os dados no estado
    setReadings(apiResponse);
  };  

  const fetchNext = async () => {
    const apiprResponse = [
      { date: '22/08 15:30', unit: 'mg/dL' }, // Glicose
      { date: '22/08 16:00', unit: 'SPO' }    // Oximetria
    ];
  
    // Modificando as unidades
    const modifiedResponse = apiprResponse.map(item => ({
      date: item.date,
      unit: item.unit === 'mg/dL' ? 'Glicose' : item.unit === 'SPO' ? 'Oxigenação no Sangue' : item.unit  === 'BPM' ? 'Batimento Cardiaco' : item.unit
    }));
  
    setNextRead(modifiedResponse);
  };
  


  useEffect(() => {
    fetchReadings();
    fetchNext();
  }, []);

  // Função para renderizar cada leitura
  

  
  return(  
    <Background>
      <Container>
      <Hamburguer />
        <Greetings>Ola, Paulo</Greetings>
        <Card>
          <CardHeader>Últimas Leituras</CardHeader>
          {readings.slice(0, 5).map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center',paddingVertical: 5, borderBottomWidth: 1, }}>
              <Text></Text>
              <DateText style={{textAlign: 'left' }}>{item.date}</DateText>
              
              <ValueText style={{ width: 60, textAlign: 'center' }}>{item.value}</ValueText>
              <ValueText style={{ width: 60, textAlign: 'left' }}>{item.unit}</ValueText>
            </View>
          ))}
        </Card>

        <Card>
          <CardHeader>Proxima Leitura</CardHeader>
          {nextread.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center',paddingVertical: 5, borderBottomWidth: 1}}>
              <ValueText>{item.unit} :</ValueText>
              <ValueText>{" "}</ValueText>
              <DateText>{item.date}</DateText>
              
              
            </View>
          ))}
        </Card>
      </Container>
    </Background>
  )
}
export default Home;