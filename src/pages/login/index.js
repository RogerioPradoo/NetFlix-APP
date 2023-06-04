import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'


const Login = () => {

    const navigation = useNavigation();
    const [hidepass, setHidePass] = useState(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function Login() {

        await fetch('http://192.168.15.92:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(response => {
                AsyncStorage.setItem("Tooken", JSON.stringify(response));
                if (response.token == null || undefined) {
                    return Alert.alert('', 'Email/Senha incorreta');
                }
                AsyncStorage.setItem("usuarioLogado", JSON.stringify(response.usuario));
                navigation.navigate('Contas')
            })
            .catch(error => error.json())
            .catch(() => {
                return Alert.alert('', 'Email/Senha incorreta');
            })
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000', '#130000']}>
                <KeyboardAvoidingView behavior='padding' style={{ width: '100%', backgroundColor: '#130000' }}>
                    <Image style={styles.logoImg}
                        source={require('../assets/tela.png')}
                    />
                    <Text style={styles.textTitle}>Login</Text>
                    <TextInput style={styles.textInput}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder='Email ou um número de telefone'
                        placeholderTextColor="#FFF"
                    >
                    </TextInput>
                    <Text style={styles.textTitle}>Senha</Text>
                    <View style={styles.stylesInput}>
                        <TextInput style={styles.textInput}
                            secureTextEntry={hidepass}
                            placeholder='Password'
                            placeholderTextColor="#FFF"
                            value={password}
                            onChangeText={text => setPassword(text)}
                        >
                        </TextInput>
                        <TouchableOpacity onPress={() => setHidePass(!hidepass)}>
                            <Ionicons name='eye' size={25} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                        <TouchableOpacity style={styles.buttonRec} onPress={() => navigation.navigate('Recuperar')}>
                            <Text style={styles.corLetras}>Recuperar Senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRec} onPress={() => navigation.navigate('Criar')}>
                            <Text style={styles.corLetras}>Registra-se</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        Login();
                    }}
                >
                    <Text style={styles.corLetras}>Entrar</Text>
                </TouchableOpacity>
            </LinearGradient >
        </View>
    );
}

export default Login