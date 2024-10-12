import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigationProp } from '@react-navigation/stack';
import Menu from '../../pages/Menu'
import { ButtonMenu } from './styles';


type NavigationProps = StackNavigationProp<any>

const Hamburguer: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  const handleMenu = () => {
    navigation.navigate('Menu');
  };
 
  return(  
      <ButtonMenu onPress={handleMenu}>
          <Ionicons name={'menu'} size={35} color={'white'} />
      </ButtonMenu>
       
  )
}
export default  Hamburguer;