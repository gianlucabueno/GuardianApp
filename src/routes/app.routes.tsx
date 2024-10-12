import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import Perfil from '../pages/Perfil'
import Home from '../pages/Home';
import Register from '../pages/Register';
import Notification from '../pages/Notification'
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../pages/Menu';
import RegisterEdit from '../pages/RegisterEdit'

const OutStack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabRoutes : React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Medições') {
          iconName = 'book';  // Ícone para a página de medições
        } else if (route.name === 'Notificações') {
          iconName = 'notifications'; 
        } else if (route.name === 'Perfil') {
          iconName = 'person';
        }
        
        return <Ionicons name={iconName} size={35} color={color} />;
      },
      tabBarLabel: () => null,
      tabBarActiveTintColor: '#3EBCF1',
      tabBarInactiveTintColor: '#002754',
      tabBarStyle: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 60,
      },
    })}>
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Tab.Screen name="Medições" component={Register} options={{ headerShown: false }}/>
    <Tab.Screen name="Notificações" component={Notification} options={{ headerShown: false }}/>
    <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

const AppRoutes: React.FC = () => (
  <OutStack.Navigator>
    <OutStack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
    <OutStack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
    <OutStack.Screen name="MediçõesForm" component={RegisterEdit } options={{ headerShown: false }} />
  </OutStack.Navigator>
);

export default AppRoutes