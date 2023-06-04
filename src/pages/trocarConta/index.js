import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const navigation = useNavigation();
    const [visibleOne, setVisibleOne] = useState(false);
    const [visibleTwo, setVisibleTwo] = useState(false);
    const [visibleTree, setVisibleTree] = useState(false);
    const [visibleFour, setVisibleFour] = useState(false);
    const [visibleFive, setVisibleFive] = useState(false);
    const [carregar, setCarregar] = useState(false);

    const [secoesOne, setSecoesOne] = useState([]);
    const [secoesTwo, setSecoesTwo] = useState([]);
    const [secoesTree, setSecoesTree] = useState([]);
    const [secoesFour, setSecoesFour] = useState([]);
    const [secoesFive, setSecoesFive] = useState([]);



    function tempoCarregar() {
        setCarregar(true)
    }

    setTimeout(tempoCarregar, 2000);

    async function Pesquisar() {
        const troca = await AsyncStorage.getItem("usuarioLogado");
        const dados = await JSON.parse(troca)


        await fetch(`http://192.168.15.92:5000/buscar/${dados.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((resposta) => resposta.json())
            .then(response => {
                if (response[0].id !== undefined || response[0].id !== "") {
                    setSecoesOne(response[0])
                    setVisibleOne(true);
                }
                if (response[1].id !== undefined || response[1].id !== "") {
                    setSecoesTwo(response[1])
                    setVisibleTwo(true);
                }
                if (response[2].id !== undefined || response[2].id !== "") {
                    setSecoesTree(response[2])
                    setVisibleTree(true);
                }
                if (response[3].id !== undefined || response[3].id !== "") {
                    setSecoesFour(response[3])
                    setVisibleFour(true);
                }
                if (response[4].id !== undefined || response[4].id !== " ") {
                    setSecoesFive(response[4])
                    setVisibleFive(true);
                }

            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        Pesquisar();
    }, [])

    async function dados(id, nome) {
        const user = {
            id: id,
            nome: nome
        }
        await AsyncStorage.setItem("TrocaConta", JSON.stringify(user));
        if (user == null || undefined) {
            return Alert.alert('', 'Erro ao conectar-ser');
        }
        navigation.navigate('Principal')
    }

    return (
        <View style={styles.container}>
            {carregar ? (
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#000', '#130000']}>
                        <View style={styles.background}>
                            {visibleOne ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        dados(secoesOne.id, secoesOne.nome)
                                    }}
                                >
                                    <View style={styles.fundoIcons}>
                                        <Avatar.Text size={50} label={secoesOne.nome} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                                    </View>
                                    <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 20 }}>{secoesOne.nome}</Text>
                                </TouchableOpacity>

                            ) : (
                                <View style={styles.fundoIcons}>
                                    <TouchableOpacity onPress={() => navigation.navigate("criarContas")}>
                                        <Text style={{ color: "#FFF" }}>Criar Conta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {visibleTwo ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        dados(secoesTwo.id, secoesTwo.nome)
                                    }}
                                >
                                    <View style={styles.fundoIcons}>
                                        <Avatar.Text size={50} label={secoesTwo.nome} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                                    </View>
                                    <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 20 }}>{secoesTwo.nome}</Text>
                                </TouchableOpacity>

                            ) : (
                                <View style={styles.fundoIcons}>
                                    <TouchableOpacity onPress={() => navigation.navigate("criarContas")}>
                                        <Text style={{ color: "#FFF" }}>Criar Conta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {visibleTree ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        dados(secoesTree.id, secoesTree.nome)
                                    }}
                                >
                                    <View style={styles.fundoIcons}>
                                        <Avatar.Text size={50} label={secoesTree.nome} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                                    </View>
                                    <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 20 }}>{secoesTree.nome}</Text>
                                </TouchableOpacity>

                            ) : (
                                <View style={styles.fundoIcons}>
                                    <TouchableOpacity onPress={() => navigation.navigate("criarContas")}>
                                        <Text style={{ color: "#FFF" }}>Criar Conta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {visibleFour ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        dados(secoesFour.id, secoesFour.nome)
                                    }}
                                >
                                    <View style={styles.fundoIcons}>
                                        <Avatar.Text size={50} label={secoesFour.nome} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                                    </View>
                                    <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 20 }}>{secoesFour.nome}</Text>
                                </TouchableOpacity>

                            ) : (
                                <View style={styles.fundoIcons}>
                                    <TouchableOpacity onPress={() => navigation.navigate("criarContas")}>
                                        <Text style={{ color: "#FFF" }}>Criar Conta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {visibleFive ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        dados(secoesFive.id, secoesFive.nome)
                                    }}
                                >
                                    <View style={styles.fundoIcons}>
                                        <Avatar.Text size={50} label={secoesFive.nome} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                                    </View>
                                    <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 20 }}>{secoesFive.nome}</Text>
                                </TouchableOpacity>

                            ) : (
                                <View style={styles.fundoIcons}>
                                    <TouchableOpacity onPress={() => navigation.navigate("criarContas")}>
                                        <Text style={{ color: "#FFF" }}>Criar Conta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </LinearGradient >
                </View>
            ) : (
                <View style={[styles.containerr, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#FFF" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    background: {
        width: '100%',
        flexDirection: 'row',
        height: '70%',
        marginTop: 90,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    fundoIcons: {
        alignSelf: 'center',
        backgroundColor: '#000',
        width: 100,
        height: 80,
        borderRadius: 20,
        margin: 20
    }
});
