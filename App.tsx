import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Bienvenida from './screens/Bienvenida';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import MovieDetail from './screens/MovieDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={LoadingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name='MovieDetail' component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;