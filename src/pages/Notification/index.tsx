import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, AreaInput, Input, Container, SubmitButton, SubmitText, LinkText, Link, CardHeader,Card } from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Hamburguer from '../../components/Header';



type NavigationProps = StackNavigationProp<any>

const Notification: React.FC = () => {
  return(  
    <Background>
      <Container>
      <Hamburguer />
      <Text>Notificações</Text>
        <Card>
          <CardHeader>Notificações</CardHeader>
        </Card>
      </Container>
    </Background>
  )
}
export default Notification;