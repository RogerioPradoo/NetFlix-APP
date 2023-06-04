import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles'

export default function Recuperar() {

    const navigation = useNavigation();
    const [hidepass, setHidePass] = useState(true);
    const [email, setEmail] = useState("")
    const [senha, setPassword] = useState("")
    const [confirmacaoSenha, setPasswordTwo] = useState("")

    const insertData = () => {
        fetch('http://192.168.15.92:5000/recuperar', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha, confirmacaoSenha: confirmacaoSenha })
        })
            .then(response => response.json())
            .then(() => {
                if (senha == confirmacaoSenha) {
                    return Alert.alert('', "Senha alterada com sucesso")
                }
            })
            .catch(error => error.json())
            .catch(() => {
                return Alert.alert('', 'Senha incorreta');
            })
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000', '#130000']}>
                <KeyboardAvoidingView behavior='padding' style={{ width: '100%', backgroundColor: '#130000' }}>
                    <Text style={styles.textTitle}>E-mail</Text>
                    <TextInput style={styles.textInput}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Email'
                        placeholderTextColor="#FFF"
                    >
                    </TextInput>
                    <Text style={styles.textTitle}>Senha</Text>
                    <TextInput style={styles.textInput}
                        secureTextEntry={hidepass}
                        placeholder='Senha'
                        placeholderTextColor="#FFF"
                        value={senha}
                        onChangeText={text => setPassword(text)}
                    >
                    </TextInput>
                    <Text style={styles.textTitle}>Confirmar senha</Text>
                    <View style={styles.stylesInput}>
                        <TextInput style={styles.textInput}
                            secureTextEntry={hidepass}
                            placeholder='Senha'
                            placeholderTextColor="#FFF"
                            value={confirmacaoSenha}
                            onChangeText={text => setPasswordTwo(text)}
                        >
                        </TextInput>
                        <TouchableOpacity onPress={() => setHidePass(!hidepass)}>
                            <Ionicons name='eye' size={25} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={styles.buttonRec} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.corLetras}>Inicio</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button}
                    onPress={() => insertData()}
                >
                    <Text style={styles.corLetras}>Registrar</Text>
                </TouchableOpacity>
            </LinearGradient >
        </View >
    );
}