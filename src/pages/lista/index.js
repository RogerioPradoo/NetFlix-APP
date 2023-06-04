import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMenu from '../../components/modalMenu';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import PrimeiraSecao from '../../components/lista';

import styles from './styles'


const Lista = () => {
    const navigation = useNavigation();
    const [visibleModalTwo, setVisibleModalTwo] = useState(false);

    const [trocaConta, setTroca] = useState("");
    const [carregar, setCarregar] = useState(false);
    const [secoesOne, setSecoesOne] = useState([]);

    function tempoCarregar() {
        setCarregar(true)
    }

    setTimeout(tempoCarregar, 3000);

    const get = async () => {
        const troca = await AsyncStorage.getItem("TrocaConta");
        const dados = await JSON.parse(troca)
        setTroca(dados)

        try {
            const res = await fetch(`http://192.168.15.92:5000/buscaar/${dados.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resposta) => resposta.json())
                .catch((error) => console.error(error))

            setSecoesOne(res)

        } catch (err) {
            alert(err.message)
        }

    }

    useEffect(() => {
        get();
    }, [])

    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            {carregar ? (
                <ScrollView
                    stickyHeaderHiddenOnScroll={[0]}>
                    <View style={styles.container}>
                        <View style={styles.headerView}>
                            <TouchableOpacity
                                onPress={() => setVisibleModalTwo(true)}>
                                <Ionicons name="ios-list" size={28} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
                                <Image source={require('../assets/logo.png')}
                                    style={styles.logoN}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.titleHeader} onPress={() => navigation.navigate('Series')}>Series</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Filmes')}>
                                <Text style={styles.titleHeader}>Filmes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.titleHeader} onPress={() => navigation.navigate('Lista')}>Minha Lista</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PrimeiraSecao data={secoesOne} />
                    <Modal
                        visible={visibleModalTwo}
                        transparent={true}
                        onRequestClose={() => setVisibleModalTwo(false)}>
                        <View style={{ flexDirection: 'row', backgroundColor: "#000", width: "40%" }}>
                            <TouchableOpacity onPress={() => setVisibleModalTwo(false)}  ><AntDesign name="arrowleft" size={30} color="#FFF" style={styles.descButton} /></TouchableOpacity>
                            <Text style={{ fontSize: 20, marginTop: 15, color: "#AA0202", marginLeft: 20 }}>NETFLIX</Text>
                        </View>
                        <ModalMenu data={trocaConta.nome} />
                    </Modal>
                </ScrollView>
            ) : (
                <View style={[styles.containerr, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#FFF" />
                </View>
            )}
        </View>

    );
}

export default Lista