import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link, CardHeader, Card, DateText, ValueText } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

type NavigationProps = StackNavigationProp<any>

interface Reading {
  id: number
  date: string;
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
          console.log('Excluir:', item.id);
        },
      },
    ],
    { cancelable: false }
  );
};


const Medicoes: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();


  const handleEdit = (item: Reading) => {
    navigation.navigate('MediçõesForm', { item });
  };

  const [readings, setReadings] = useState<Reading[]>([]);

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

  return (
    <Background>
      <Container>
        <Hamburguer />
        <Card>
          <CardHeader>Últimas Leituras</CardHeader>
          <ScrollView style={{ maxHeight: 300 }}>
            {readings.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, borderBottomWidth: 1, }}>
                <Text></Text>
                <DateText style={{ textAlign: 'left' }}>{item.date}</DateText>
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
      </Container>
    </Background>
  );
};

export default Medicoes;