import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Principal from '../principal/index'
import Login from '../login/index'
import Inicio from '../inicio/index'
import Criar from '../criarConta/index'
import Filmes from '../filmes/index'
import Series from '../series/index'
import Lista from '../lista/index.js'
import Contas from '../trocarConta/index'
import Recuperar from '../recuperar/index'
import Trailer from '../../components/trailer/index';
import Configuracao from '../configuracao/index'
import Nome from '../../components/configuracao/nome/index'
import Senha from '../../components/configuracao/senha/index'
import ExcluirConta from '../../components/configuracao/excluirConta/index'
import criarContas from '../../components/configuracao/criarConta/index'

const Stack = createNativeStackNavigator();
export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Criar"
                component={Criar}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Recuperar"
                component={Recuperar}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Contas"
                component={Contas}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Principal"
                component={Principal}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Filmes"
                component={Filmes}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Series"
                component={Series}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Lista"
                component={Lista}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Trailer"
                component={Trailer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Configuracao"
                component={Configuracao}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Nome"
                component={Nome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Senha"
                component={Senha}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExcluirConta"
                component={ExcluirConta}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="criarContas"
                component={criarContas}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}