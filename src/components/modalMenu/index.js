import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-paper';
import styles from './style';

const ModalMenu = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.Barra}>
            <Avatar.Text size={20} label={data} style={{ width: '50%', height: '10%', borderRadius: 30 }} />
            <Text style={{ color: "#FFF", marginBottom: 50, fontSize: 20, marginTop: 15, fontWeight: 'bold' }}>{data}</Text>
            <TouchableOpacity>
                <Text style={styles.textBarra} onPress={() => navigation.navigate('Contas')}>Trocar conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Filmes')}>
                <Text style={styles.textBarra}>Filmes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Series')}>
                <Text style={styles.textBarra}>Series</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Lista')}>
                <Text style={styles.textBarra}>Minha lista</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Configuracao')}
            >
                <Text style={styles.textBarra}>Configuração</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ModalMenu;