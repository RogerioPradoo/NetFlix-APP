import React, { useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function App() {
    const navigation = useNavigation();

    useEffect(() => {
        let timer = setTimeout(() => {
            navigation.navigate("Login")
        }, 5000);
        return () => {
            clearTimeout(timer);

        };
    });

    return (
        <View style={styles.container}>
            <Image style={styles.logoImg}
                source={require('../assets/netflix.gif')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    logoImg: {
        alignSelf: 'center',
        width: '100%',
        height: '50%',
        margin: '20%'
    }
});
