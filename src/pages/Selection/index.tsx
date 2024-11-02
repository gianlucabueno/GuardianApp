import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Background,
} from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';
import styled from 'styled-components/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



type NavigationProps = StackNavigationProp<any>

const Selection: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();
    
    const handleAdd = () => {
        navigation.navigate('Adicionar');
    }
    const handleNFC= () => {
        navigation.navigate('ReNFC');
    }
    const handleGuardian= () => {
        navigation.navigate('Guardiao');
    }
    
    

  // Função para renderizar cada leitura



  return (
    <Background>
      <Container>
        <Hamburguer />
        <ButtonContainer>
        <RoundButton onPress={() => handleNFC()}>
        <AntDesign name="creditcard" size={35} color="#002754" />
        </RoundButton>
        <ButtonText>Registro NFC</ButtonText>
      </ButtonContainer>

      <ButtonContainer>
        <RoundButton onPress={() => handleAdd()}>
            <Feather name="edit" size={35} color="#002754" />
        </RoundButton>
        <ButtonText>Registro Manual</ButtonText>
      </ButtonContainer>

      <ButtonContainer>
        <RoundButton onPress={() => handleGuardian()}>
        <MaterialCommunityIcons name="account-group-outline" size={35} color="#002754" />
        </RoundButton>
        <ButtonText>Guardian</ButtonText>
      </ButtonContainer>
      </Container>
    </Background>
  )
}
export default Selection;




export const RoundButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 50px;
  margin-bottom: 20px;
`;


const ButtonContainer = styled.View`
  flex-direction: row; 
  align-items: center; 
`;

const ButtonText = styled.Text`
  font-size: 30px;
  color: #ffffff;
  margin-left: 10px;
  margin-top: -20px;  
`;

const Container = styled.View`
  flex: 1;
  background-color: #00aaff;
  padding: 20px;
  position: relative;
  align-items: left;
  justify-content: center;
`;

