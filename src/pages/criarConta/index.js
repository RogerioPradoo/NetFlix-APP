import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles'

export default function CriarConta() {

    const navigation = useNavigation();
    const [hidepass, setHidePass] = useState(true);
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [telefone, setTelefone] = useState("")

    const insertData = () => {
        fetch('http://192.168.15.92:5000/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, email: email, password: password, telefone: telefone })
        })
            .then(resp => resp.json())
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
                    <Text style={styles.textTitle}>E-mail</Text>
                    <TextInput style={styles.textInput}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder='Email'
                        placeholderTextColor="#FFF"
                    >
                    </TextInput>
                    <Text style={styles.textTitle}>Número de telefone</Text>
                    <TextInput style={styles.textInput}
                        value={telefone}
                        onChangeText={text => setTelefone(text)}
                        placeholder='Número de telefone'
                        placeholderTextColor="#FFF"
                    >
                    </TextInput>
                    <Text style={styles.textTitle}>Senha</Text>
                    <View style={styles.stylesInput}>
                        <TextInput style={styles.textInput}
                            secureTextEntry={hidepass}
                            placeholder='Senha'
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
                        <TouchableOpacity style={styles.buttonRec} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.corLetras}>Ja tem uma conta?</Text>
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
