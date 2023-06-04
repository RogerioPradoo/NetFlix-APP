import React, { useState, useEffect } from 'react'
import styles from './style'
import { Text, View, Image, TouchableOpacity, FlatList, Pressable } from 'react-native';

const ModalEpisodio = ({ data }) => {
    const [secoes, setSecoes] = useState([]);

    const getHome = async () => {
        const guardarID = data.id

        try {
            const res = await fetch(`http://192.168.15.92:5000/seriesETempo/${guardarID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resposta => resposta.json())
                .catch((error) => console.error(error))

            setSecoes(res);
            console.log(res)
            console.log("RESSS")

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getHome()
    }, [])


    return (
        <View style={styles.desc}>
            <Pressable>
                <FlatList
                    data={secoes}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index}
                        >
                            <View style={styles.boxSerie}>
                                <Image style={styles.imgSerie}
                                    source={{ uri: data.img }}
                                />
                                <Text style={styles.textSerie}>{item.descri}</Text>
                                <Text style={styles.textSerie}>{item.dura}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </Pressable>
        </View>
    )
}

export default ModalEpisodio;