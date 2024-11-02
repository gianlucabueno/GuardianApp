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
import RegisterAdd from '../pages/RegisterAdd';
import Graphics from '../pages/Graphics/index'
import Selection from '../pages/Selection';
import GuardianGraphics from '../pages/GuardianGraphics';
import GuardianRegister from '../pages/GuardianRegister';
import GuardianMain from '../pages/GuardianMain';
import RegistroNFC from '../pages/RegistroNFC';
import RegisterNotification from '../pages/Notification Register';

const OutStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MedicoesStack = createStackNavigator();
const NotificacoesStack = createStackNavigator();
const SelectionsStack = createStackNavigator();

const MedicoesRoutes: React.FC = () => (
  <MedicoesStack.Navigator>
    <MedicoesStack.Screen name="MediçõesTable" component={Register} options={{ headerShown: false }} />
    <MedicoesStack.Screen name="MediçõesForm" component={RegisterEdit} options={{ headerShown: false }} />
    <MedicoesStack.Screen name="Graficos" component={Graphics} options={{ headerShown: false }} />
  </MedicoesStack.Navigator>
);

const SelectionsRoutes: React.FC = () => (
  <SelectionsStack.Navigator>
    <SelectionsStack.Screen name="SeleçãoMain" component={Selection} options={{ headerShown: false }} />
    <SelectionsStack.Screen name="Adicionar" component={RegisterAdd} options={{ headerShown: false }} />
    <SelectionsStack.Screen name="Guardiao" component={GuardianMain} options={{ headerShown: false }} />
    <SelectionsStack.Screen name="GuaGraficos" component={GuardianGraphics} options={{ headerShown: false }} />
    <SelectionsStack.Screen name="RegistorsGua" component={GuardianRegister} options={{ headerShown: false }} />
    <SelectionsStack.Screen name="ReNFC" component={RegistroNFC} options={{ headerShown: false }} />
  </SelectionsStack.Navigator>
);

const NotificacoesRoutes: React.FC = () => (
  <NotificacoesStack.Navigator>
    <NotificacoesStack.Screen name="NotificaçõesTable" component={Notification} options={{ headerShown: false }} />
    <NotificacoesStack.Screen name="RegiNote" component={RegisterNotification} options={{ headerShown: false }} />
  </NotificacoesStack.Navigator>
);




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
        else if (route.name === 'Seleção') {
          iconName = 'duplicate';
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
    <Tab.Screen name="Medições" component={MedicoesRoutes} options={{ headerShown: false }}/>
    <Tab.Screen name="Seleção" component={SelectionsRoutes} options={{ headerShown: false }}/>
    <Tab.Screen name="Notificações" component={NotificacoesRoutes} options={{ headerShown: false }}/>
    <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

const AppRoutes: React.FC = () => (
  <OutStack.Navigator>
    <OutStack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
    <OutStack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
  </OutStack.Navigator>
);

export default AppRoutes