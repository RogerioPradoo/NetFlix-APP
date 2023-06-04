import React, { useState, useEffect } from 'react'
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Octicons } from '@expo/vector-icons';
import styles from './style'

const TelaPrincipal = ({ data }) => {
    const navigation = useNavigation();
    const [visibleModalOne, setVisibleModalOne] = useState(false);
    const [trocaConta, setTroca] = useState("");
    const [icon, setIcon] = useState(true);
    const [nomeFilme, setNomeFilme] = useState("");
    const [idEscolhido, setIdEscolhido] = useState(0);
    const [carregar, setCarregar] = useState(false);


    function tempoCarregar() {
        setCarregar(true)
    }
    setTimeout(tempoCarregar, 3000);

    const pesquisarPrimeiro = async () => {
        setNomeFilme(data.nome)
        const troca = await AsyncStorage.getItem("TrocaConta");
        const dados = await JSON.parse(troca)
        setTroca(dados)

        const res = await fetch(`http://192.168.15.92:5000/lista/${dados.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .catch((error) => console.log(error))

        if (res != undefined) {
            let r = res.indexOf(data.id)
            r != -1 ? setIcon(false) : setIcon(true);
        }

    }

    const aa = async () => {
        try {

            await fetch("http://192.168.15.92:5000/adicionarLista", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: nomeFilme, id: trocaConta.id })
            })
                .then(resposta => resposta.json())
                .catch((error) => console.log(error))
        } catch (error) {
            return Alert.alert("AFS", error)
        }
    }

    const deletar = async () => {
        try {
            await fetch(`http://192.168.15.92:5000/excluirFilmeLista/${idEscolhido}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resposta => resposta.json())
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        pesquisarPrimeiro()
    }, [])

    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            {carregar ? (
                <ScrollView>
                    <View style={styles.container}>
                        <ImageBackground style={styles.logoImg}
                            source={{ uri: data.img }}
                            resizeMode="cover">
                            <View style={styles.titulos}>
                                <Text style={styles.titleTwo}>{data.nome}</Text>
                                <View style={styles.opcoes}>
                                    <TouchableOpacity style={styles.buttonOpcoes}
                                        onPress={() => setVisibleModalOne(true)}
                                    >
                                        <AntDesign name="infocirlceo" size={24} color="#FFF" />
                                        <Text style={styles.titlesOpcoes}>Saiba Mais</Text>
                                    </TouchableOpacity >
                                    <TouchableOpacity style={styles.buttonOpcoesMeio}
                                        onPress={() => {
                                            navigation.navigate("Trailer", {
                                                detalhes: data
                                            })
                                        }}
                                    >
                                        <AntDesign name="playcircleo" size={24} color="#000" />
                                        <Text style={styles.titlesOpcoesMeio}>Trailer</Text>
                                    </TouchableOpacity >
                                    {icon ? (
                                        <TouchableOpacity style={styles.buttonOpcoes}
                                            onPress={() => {
                                                setIcon(false);
                                                pesquisarPrimeiro()
                                                aa();
                                            }}
                                        >
                                            <AntDesign name="pluscircleo" size={24} color="#FFF" />
                                            <Text style={styles.titlesOpcoes}>Minha lista</Text>
                                        </TouchableOpacity >
                                    ) : (
                                        <TouchableOpacity style={styles.buttonOpcoes}
                                            onPress={() => {
                                                setIdEscolhido(data.id)
                                                pesquisarPrimeiro()
                                                deletar()
                                                setIcon(true);
                                            }}
                                        >
                                            <Octicons name="verified" size={24} color="#FFF" />
                                            <Text style={styles.titlesOpcoes}>Adicionado</Text>
                                        </TouchableOpacity >
                                    )}
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <Modal
                        visible={visibleModalOne}
                        transparent={true}
                        onRequestClose={() => setVisibleModalOne(false)}>
                        <ScrollView>
                            <View style={styles.desc}>
                                <TouchableOpacity onPress={() => setVisibleModalOne(false)} ><AntDesign name="arrowleft" size={30} color="#FFF" style={styles.descButton} /></TouchableOpacity>
                                <Image style={styles.imgDesc}
                                    source={{ uri: data.img }}
                                />
                                <View style={styles.Teste}>
                                    <Text style={styles.titlesSaiba}>{data.nome}</Text>
                                    <View style={styles.titleRow}>
                                        <Text style={styles.titlesSaiba}>{data.avaliacao}% relevante</Text>
                                        <Text style={styles.titlesSaiba}>{data.ano}</Text>
                                        <Text style={styles.titlesSaiba}>{data.duracao}</Text>
                                    </View>

                                    <Text style={styles.descSaiba}>{data.descricao}</Text>
                                    <Text style={styles.titlesSaiba}>Elenco: {data.autores}</Text>
                                    <View style={styles.details}>
                                        {icon ? (
                                            <TouchableOpacity style={styles.buttonOpcoes}
                                                onPress={() => {
                                                    setIcon(false);
                                                    aa();
                                                }}
                                            >
                                                <AntDesign name="pluscircleo" size={24} color="#FFF" />
                                                <Text style={styles.buttonSaiba}>Minha lista</Text>
                                            </TouchableOpacity >
                                        ) : (
                                            <TouchableOpacity style={styles.titlesSaiba}
                                                onPress={() => {
                                                    setIcon(true);
                                                }}
                                            >
                                                <Octicons name="verified" size={24} color="#FFF" />
                                                <Text style={styles.titlesOpcoes}>Adicionado</Text>
                                            </TouchableOpacity >
                                        )}
                                        <TouchableOpacity style={styles.buttonOpcoesMeio}
                                            onPress={() => {
                                                navigation.navigate("Trailer", {
                                                    detalhes: data[index]
                                                })
                                            }}
                                        >
                                            <AntDesign name="playcircleo" size={24} color="#000" />
                                            <Text style={styles.titlesOpcoesMeio}>Trailer</Text>
                                        </TouchableOpacity >
                                        <TouchableOpacity
                                            style={styles.buttonSaiba}
                                        >
                                            <AntDesign name="like2" size={24} color="#FFF" />
                                            <Text style={styles.titlesSaiba}>Classificar</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                </ScrollView >
            ) : (
                <View style={[styles.containerr, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#FFF" />
                </View>
            )}
        </View>

    )
}
export default TelaPrincipal;