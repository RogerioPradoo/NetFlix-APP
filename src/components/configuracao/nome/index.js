import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'


const AlterarNome = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState("")


    const insertData = async () => {
        const troca = await AsyncStorage.getItem("TrocaConta");
        const dados = await JSON.parse(troca)

        fetch('http://192.168.15.92:5000/configuracao', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: dados.id, nome: nome })
        })
            .then(response => response.json())
            .then(() => {
                return Alert.alert('', "Nome alterado com sucesso")
            })
            .catch(error => error.json())
            .catch(() => {
                return Alert.alert('', 'Erro ao alterar o nome');
            })
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000', '#130000']}>
                <KeyboardAvoidingView behavior='padding' style={{ width: '100%', backgroundColor: '#130000' }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.textBack}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textTitle}>Insira um novo nome</Text>
                    <TextInput style={styles.textInput}
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        placeholder='Nome'
                        placeholderTextColor="#FFF"
                    ></TextInput>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button}
                    onPress={() => insertData()}
                >
                    <Text style={styles.corLetras}>Alterar</Text>
                </TouchableOpacity>
            </LinearGradient >
        </View >
    );
}

export default AlterarNome