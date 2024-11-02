import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, TextInput, Modal, Dimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link, Card, CardHeader } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip } from 'victory-native';
import Hamburguer from '../../components/Header';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const data = [
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



interface GuardianFormProps {
  route: RouteProp<{ params: { id: number } }, 'params'>;
}

const GuardianGraphics: React.FC <GuardianFormProps> = ({ route }) => {
  const { id } = route.params;
  console.log(id)
  const [selectedType, setSelectedType] = useState<string>('Glicose')
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState(data);
  const [lastDatas, setLastDatas] = useState(filteredData.slice(0, 7)); // Estado para os últimos dados
  const [maxValue, setMaxValue] = useState(0); // Estado para o valor máximo


  const handleSelectOption = (option: string) => {
    setSelectedType(option);
    setShowDropdown(false); // Fecha o dropdown após selecionar
  };

  useEffect(() => {
    // Filtra os dados com base no tipo selecionado
    if (selectedType === 'Glicose') {
      setFilteredData(data.filter(item => item.unit === 'mg/L')); // Filtra Glicose apenas por unidade 'mg/L'
    }
    if (selectedType === 'Oxigenação') {
      setFilteredData(data.filter(item => item.unit === 'SPO2')) // Filtra Glicose apenas por unidade 'mg/L'
    }

    if (selectedType === 'Batimento') {
      setFilteredData(data.filter(item => item.unit === 'BPM')) // Filtra Glicose apenas por unidade 'mg/L'
    } // Filtra pelo tipo selecionado
  }, [selectedType]);


  useEffect(() => {
    // Ordena os dados filtrados e pega os últimos 7 valores e o valor máximo
    const sortedData = [...filteredData].sort((a, b) => {
      const [dayA, monthA] = a.date.split(' ')[0].split('/');
      const [dayB, monthB] = b.date.split(' ')[0].split('/');
      
      const [hourA, minuteA] = a.date.split(' ')[1].split(':');
      const [hourB, minuteB] = b.date.split(' ')[1].split(':');
    
      // Criando objetos Date considerando o ano atual (por exemplo, 2024)
      const dateA = new Date(2024, parseInt(monthA) - 1, parseInt(dayA), parseInt(hourA), parseInt(minuteA));
      const dateB = new Date(2024, parseInt(monthB) - 1, parseInt(dayB), parseInt(hourB), parseInt(minuteB));
    
      return dateB.getTime() - dateA.getTime(); // Ordena de mais recente para mais antigo
    });

    const latestDatas = sortedData.slice(0, 7);

    setLastDatas(latestDatas);
    setMaxValue(latestDatas.length > 0 ? Math.max(...latestDatas.map(item => item.value)) : 0);

    console.log(latestDatas)

  }, [filteredData]);



  const options = ['Glicose', 'Oxigenação', 'Batimento'];

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
        <Card>
        <CardHeader>Gráfico de Dados</CardHeader>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 200 }}>
            {lastDatas.length > 0 ? ( // Verifica se há dados disponíveis
              <VictoryChart
                theme={VictoryTheme.material}
                width={screenWidth - 40} // Define a largura do gráfico
                domainPadding={{ y: [0, 20] }} // Espaçamento do domínio do gráfico
                style={{
                  parent: {
                    border: "1px solid #ccc",
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 30,
                  },
                }}
              >
                
                <VictoryAxis
                  style={{
                    axis: { stroke: "#000000" },
                    axisLabel: { fontSize: 20, padding: 30 },
                    ticks: { stroke: "#000000", size: 5 },
                    tickLabels: { fontSize: 10, padding: 5 },
                    grid: { stroke: "none" },
                  }}
                  tickFormat={(t) => {
                    if (typeof t === 'string') {
                      const [date, time] = t.split(' ');
                      return `${date}\n${time}`;
                    }
                    return t; // Se não for uma string, retorna o valor original
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  domain={[0, maxValue]} // Define o limite máximo do eixo Y
                  style={{
                    axis: { stroke: "#000000" },
                    axisLabel: { fontSize: 20, padding: 40 },
                    ticks: { stroke: "#000000", size: 5 },
                    tickLabels: { fontSize: 15, padding: 5 },
                    grid: { stroke: "none" },
                  }}
                />
                <VictoryLine
                  data={lastDatas.map(item => ({ x: item.date, y: item.value }))} // Mapeia os dados para o gráfico
                  style={{
                    data: { stroke: "#87ceeb", strokeWidth: 3 }, // Define a cor e a largura da linha
                    parent: { border: "1px solid #ccc" }, // Borda do gráfico
                  }}
                />
                <VictoryScatter
                  data={lastDatas.map(item => ({ x: item.date, y: item.value }))} // Mapeia os dados para os pontos
                  size={5}
                  style={{ data: { fill: "#87ceeb" } }} // Cor dos pontos
                  labels={({ datum }) => `${datum.y}`} // Rótulo dos pontos
                  labelComponent={
                    <VictoryLabel
                      dy={-10}
                      dx={10} // Move o rótulo mais para a direita
                      style={{ fill: 'black' }} // Cor do rótulo
                    />
                  }
                />
              </VictoryChart>
            ) : (
              <Text style={{ color: '#000000', fontSize: 16 }}>Nenhum dado disponível para exibir.</Text>
            )}
          </View>
        </Card>
      </Container >
    </Background>
  );
};



export default GuardianGraphics;

export const IconButton = styled(TouchableOpacity)`
  margin-left: 10px;
`;

export const TypeInput = styled(TextInput)`
  flex: 1;
  color: #333;
`;

const TypeBar = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 5px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  position: relative; 

`;


const DropdownList = styled(View)`
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

const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center; /* Centraliza o conteúdo na vertical */
  align-items: center; /* Centraliza o conteúdo na horizontal */
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro para destacar o modal */
`;