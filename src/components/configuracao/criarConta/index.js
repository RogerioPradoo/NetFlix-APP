import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../../pages/criarConta/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CriarContas = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState("")
    const [password, setPassword] = useState("")

    const insertData = async () => {
        const troca = await AsyncStorage.getItem("usuarioLogado");
        const dados = await JSON.parse(troca)

        fetch('http://192.168.15.92:5000/adicionarContas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: dados.id, nome: nome, password: password })
        })
            .then(resp => resp.json())
            .then(() => {
                navigation.navigate("Contas")
                return Alert.alert('', "Conta criada com sucesso")
            })
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000', '#130000']}>
                <KeyboardAvoidingView behavior='padding' style={{ width: '100%', backgroundColor: '#130000' }}>
                    <Text style={styles.textTitle}>Nome</Text>
                    <TextInput style={styles.textInput}
                        value={nome}
                        onChangeText={text => setNome(text)}
                        placeholder='Nome'
                        placeholderTextColor="#FFF"
                    >
                    </TextInput>

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

export default CriarContas;