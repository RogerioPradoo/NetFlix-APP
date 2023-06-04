import React, { useState } from 'react'
import styles from './style'
import { Text, View, Image, TouchableOpacity, Modal, FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalEpisodio from '../episodios';

const Secao = ({ data }) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [modalOne, setOne] = useState(false);

    const [trocaConta, setTroca] = useState("");
    const [nomeFilme, setNomeFilme] = useState("");
    const [icon, setIcon] = useState(true);
    const [idEscolhido, setIdEscolhido] = useState(0);
    const [carregar, setCarregar] = useState(false);

    function tempoCarregar() {
        setCarregar(true)
    }

    setTimeout(tempoCarregar, 5000);

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

        if (res != undefined) {
            let r = res.indexOf(idEscolhido)
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
            console.log("TA CHAMANDO O ADD DO SECAAO")
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
            console.log("TA CHAMANDO O DELETAR DO SECAAO")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {carregar ? (
                <View>
                    <View style={styles.containerTwo}>
                        <Text style={styles.textPrevia}>Secao</Text>
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
                                        onLongPress={() => {
                                            setOne(true)
                                        }}
                                    >
                                        <View style={styles.test}>
                                            <Image source={{ uri: item.img }}
                                                style={styles.imagePag}
                                            />
                                            <Text style={styles.titleIMG}>{item.nome}</Text>
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
                                                    aa();
                                                }}
                                            >
                                                <AntDesign name="pluscircleo" size={24} color="#FFF" />
                                                <Text style={styles.buttonSaiba}>Minha lista</Text>
                                            </TouchableOpacity >
                                        ) : (
                                            <TouchableOpacity style={styles.buttonOpcoes}
                                                onPress={() => {
                                                    deletar()
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
                                    {data[index].tipo ? (
                                        <ModalEpisodio data={data[index]} />
                                    ) : (
                                        <View></View>
                                    )
                                    }
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

export default Secao;