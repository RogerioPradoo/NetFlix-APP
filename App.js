import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/pages/rotas/rotas';
// import Principal from '../principal/index'
// import Login from '../login/index';
// import Inicio from '../inicio/index'
// import Criar from '../criarConta/index'
// import Filmes from '../filmes/index'
// import Series from '../series/index'
// import Lista from '../lista/index.js'
// import Contas from '../trocarConta/index'
// import Recuperar from '../recuperar/index'
//import { Provider as PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#089b55" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}

export default App;