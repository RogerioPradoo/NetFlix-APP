import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/pages/rotas/rotas';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#089b55" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}

export default App;
