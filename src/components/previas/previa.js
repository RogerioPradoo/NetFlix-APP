import React, { useState } from 'react'
import styles from './style';
import { Text, View, Image, TouchableOpacity, FlatList, Pressable, Modal, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const Previas = ({ data }) => {
    const [index, setIndex] = useState(0);
    const [modalOne, setOne] = useState(false);
    const navigation = useNavigation();

    const [trocaConta, setTroca] = useState("");
    const [nomeFilme, setNomeFilme] = useState("");
    const [icon, setIcon] = useState(true);
    const [idEscolhido, setIdEscolhido] = useState(0);
    const [carregar, setCarregar] = useState(false);


    function tempoCarregar() {
        setCarregar(true)
    }
    setTimeout(tempoCarregar, 4000);

    const pesquisarPrimeiro = async () => {
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
        console.log("TA CHAMANDO O BUSCAR DO PREVIA")
        if (res != undefined) {
            let r = res.indexOf(data[index].id)
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
                body: JSON.stringify({ id: trocaConta.id, nome: nomeFilme })
            })
                .then(resposta => resposta.json())
                .catch((error) => console.log(error))
            console.log("TA CHAMANDO O ADD DO PREVIA")
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
            console.log("TA CHAMANDO O DELETAR DO PREVIA")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {carregar ? (
                <View>
                    <View style={styles.containerPrevia}>
                        <Text style={styles.textPrevia}>Prévias</Text>
                        <Pressable>
                            <FlatList
                                data={data}
                                horizontal
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity key={index}
                                        onPress={() => {
                                            setIndex(index)
                                            setNomeFilme(item.nome)
                                            setIdEscolhido(item.id)
                                            pesquisarPrimeiro()
                                        }
                                        }
                                        onLongPress={() => setOne(true)}
                                    >
                                        <View >
                                            <Image source={{ uri: item.img }}
                                                style={styles.imagePrevia}
                                            />

                                            <Text style={styles.titlePrevia}>{item.nome}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </Pressable>
                    </View>
                    <Modal
                        visible={modalOne}
                        transparent={true}
                        onRequestClose={() => setOne(false)}>
                        <ScrollView>
                            <View style={styles.desc}>
                                <TouchableOpacity onPress={() => setOne(false)} ><AntDesign name="arrowleft" size={30} color="#FFF" style={styles.descButton} /></TouchableOpacity>
                                <Image style={styles.imgDesc}
                                    source={{ uri: data[index].img }}
                                />
                                <View style={styles.Teste}>
                                    <Text style={styles.titlesSaiba}>{data[index].nome}</Text>
                                    <View style={styles.titleRow}>
                                        <Text style={styles.titlesSaiba}>{data[index].avaliacao}% relevante</Text>
                                        <Text style={styles.titlesSaiba}>{data[index].ano}</Text>
                                        <Text style={styles.titlesSaiba}>{data[index].duracao}</Text>
                                    </View>
                                    <Text style={styles.descSaiba}>{data[index].descricao}</Text>
                                    <Text style={styles.titlesSaiba}>Elenco: {data[index].autores}</Text>
                                    <View style={styles.details}>
                                        {icon ? (
                                            <TouchableOpacity style={styles.buttonOpcoes}
                                                onPress={() => {
                                                    setIcon(false);
                                                    setNomeFilme(data[index].nome)
                                                    aa();
                                                }}
                                            >
                                                <AntDesign name="pluscircleo" size={24} color="#FFF" />
                                                <Text style={styles.buttonSaiba}>Minha lista</Text>
                                            </TouchableOpacity >
                                        ) : (
                                            <TouchableOpacity style={styles.buttonOpcoes}
                                                onPress={() => {
                                                    setIdEscolhido(data[index].id)
                                                    deletar()
                                                    setIcon(true)
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
                </View>
            ) : (
                <View style={[styles.containerr, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#FFF" />
                </View>
            )}
        </>
    )
}

export default Previas