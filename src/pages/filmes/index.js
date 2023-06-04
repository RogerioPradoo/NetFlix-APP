import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import styles from '../principal/styles'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMenu from '../../components/modalMenu';
import Secao from '../../components/secao';

const Filmes = () => {
    const navigation = useNavigation();
    const [carregar, setCarregar] = useState(false);
    const [visibleModalTwo, setVisibleModalTwo] = useState(false);
    const [trocaConta, setTroca] = useState("");
    const [secoes, setSecoes] = useState([]);

    function tempoCarregar() {
        setCarregar(true)
    }

    setTimeout(tempoCarregar, 3000);

    const getHome = async () => {
        const troca = await AsyncStorage.getItem("TrocaConta");
        const dados = await JSON.parse(troca)
        setTroca(dados)

        try {
            const res = await fetch('http://192.168.15.92:5000/buscarfilme', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resposta) => resposta.json())
                .catch((error) => console.error(error))

            setSecoes(res)

        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        getHome();
    }, [])

    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            {carregar ? (
                <ScrollView stickyHeaderIndices={[0]}>
                    <View style={styles.container}>
                        <View style={styles.titu}>
                            <View style={styles.headerView}>
                                <TouchableOpacity
                                    onPress={() => setVisibleModalTwo(true)}>
                                    <Ionicons name="ios-list" size={28} color="#FFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
                                    <Image source={require('../../pages/assets/logo.png')}
                                        style={styles.logoN}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Series')}>
                                    <Text style={styles.titleHeader}>Series</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Filmes')}>
                                    <Text style={styles.titleHeader}>Filmes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.titleHeader} onPress={() => navigation.navigate('Lista')}>Minha Lista</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {secoes.map((secao, index) => (
                        <Secao data={secao} key={index} />
                    ))}
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

export default Filmes