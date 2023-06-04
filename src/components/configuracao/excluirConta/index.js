import React, { useState } from 'react'
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Alert, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import styles from '../../../pages/recuperar/styles'


const AlterarSenha = () => {
    const [alert, setAlert] = useState(false);
    const navigation = useNavigation();

    const insertData = async () => {
        const troca = await AsyncStorage.getItem("TrocaConta");
        const dados = await JSON.parse(troca)

        try {
            const res = await fetch(`http://192.168.15.92:5000/excluirConta/${dados.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    return Alert.alert('', "Conta excluída com sucesso")
                })
                .catch(error => error.json())
                .catch(() => {
                    return Alert.alert('', 'Erro ao excluir a conta');
                })
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: "#000", height: 820 }}>
                <LinearGradient
                    colors={['#000', '#130000']}>
                    <KeyboardAvoidingView behavior='padding' style={{ width: '100%', backgroundColor: '#130000' }}>
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: "#FFF" }}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textTitle}>Excluir Conta</Text>
                        <Text style={{ fontSize: 20, color: "#828282", marginLeft: 10, marginTop: 30, fontStyle: "italic" }}>Deseja excluir esse perfil de sua conta permanentemente?</Text>
                    </KeyboardAvoidingView>
                    <View style={{ margin: 20 }}></View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => setAlert(true)}
                    >
                        <Text style={styles.corLetras}>Excluir</Text>
                    </TouchableOpacity>

                </LinearGradient >
            </View>
            <Modal
                visible={alert}
                transparent={true}
                onRequestClose={() => setAlert(false)}>
                <View style={{ marginTop: 132 }}>
                    <Text style={{ color: "#FFF", marginLeft: 100, marginTop: 120 }}>Você tem certeza?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                        <TouchableOpacity
                            onPress={() => insertData()}
                        >
                            <Text style={{ color: "#FFF", marginTop: 20 }}>SIM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAlert(false)}>
                            <Text style={{ color: "#FFF", marginTop: 20 }}>CANCELAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>

    );
}

export default AlterarSenha