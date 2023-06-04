import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMenu from '../../components/modalMenu';

const Configuracao = () => {
    const navigation = useNavigation();
    const [visibleModalTwo, setVisibleModalTwo] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const [trocaConta, setTroca] = useState("");


    function tempoCarregar() {
        setCarregar(true)
    }

    setTimeout(tempoCarregar, 3000);

    const getHome = async () => {
        const troca = await AsyncStorage.getItem("TrocaConta");
        const dados = await JSON.parse(troca)
        setTroca(dados)
    }

    useEffect(() => {
        getHome();
    }, [])

    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            {carregar ? (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.titu}>
                            <View style={styles.headerView}>
                                <TouchableOpacity
                                    onPress={() => setVisibleModalTwo(true)}>
                                    <Ionicons name="ios-list" size={28} color="#FFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Principal')
                                    setVisibleModalTwo(false)

                                }}>
                                    <Image source={require('../../pages/assets/logo.png')}
                                        style={styles.logoN}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Series')
                                    setVisibleModalTwo(false)
                                }}>
                                    <Text style={styles.titleHeader}>Series</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Filmes')
                                    setVisibleModalTwo(false)
                                }}>
                                    <Text style={styles.titleHeader}>Filmes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Lista')
                                    setVisibleModalTwo(false)
                                }}>
                                    <Text style={styles.titleHeader}>Minha Lista</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerConfig}>
                        <Text style={{ color: "#FFF", marginTop: 20, fontStyle: 'italic', fontSize: 20, fontWeight: 'bold' }}>Configurações do perfil</Text>
                        <View style={styles.subContainerConfig}>
                            <TouchableOpacity onPress={() => navigation.navigate("Nome")}>
                                <Text style={styles.headerConfig}>Mudar nome</Text>
                            </TouchableOpacity>
                            <Text style={styles.subConfig}>Clique aqui se deseja mudar o nome desse perfil.</Text>
                        </View>
                        <View style={styles.subContainerConfig}>
                            <Text style={styles.headerConfig}>Mudar img</Text>
                            <Text style={styles.subConfig}>Clique aqui para mudar a imagem da sua foto.</Text>
                        </View>
                        <View style={styles.subContainerConfig}>
                            <TouchableOpacity onPress={() => navigation.navigate("ExcluirConta")}>
                                <Text style={styles.headerConfig}>Excluir Conta</Text>
                            </TouchableOpacity>
                            <Text style={styles.subConfig}>Clique aqui se deseja excluir esse perfil de sua conta.</Text>
                        </View>
                    </View>
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

export default Configuracao