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
import NfcManager, { NfcTech, Ndef} from 'react-native-nfc-manager';



const RegistroNFC: React.FC = () => {
  
  const [userId, setUserId] = useState('12345'); // Defina o ID do usuário que você deseja enviar


  return (
    <Background>
      <Container>
        <Hamburguer />
        <Text style={{color:'white', alignItems:'center', fontSize:50}}>Aproxime o Celular do Sensor e só retire quando for solicitado</Text>
      </Container>
    </Background>
  )
}
export default RegistroNFC;

