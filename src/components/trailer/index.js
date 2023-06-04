import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import YoutuberPlayer from 'react-native-youtube-iframe';
import { styles } from './style';
import * as ScreenOrientation from 'expo-screen-orientation';

const Trailer = ({ route }) => {
    const [ready, setReady] = useState(false);
    const [carregar, setCarregar] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const { detalhes } = route.params;


    function tempoCarregar() {
        setCarregar(true)
    }
    setTimeout(tempoCarregar, 3000);

    async function changeScreen() {
        if (fullWidth == true) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else if (fullWidth == false) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const toggle = () => {
        setFullWidth(!fullWidth)
        changeScreen();
    }
    return (
        <>
            {carregar ? (
                <View style={styles.container}>
                    <View style={styles.player}>
                        <YoutuberPlayer
                            videoId={detalhes.trailer}
                            height={ready ? '100%' : 0}
                            width={'100%'}
                            onReady={() => setReady(true)}
                            mute={true}
                            onFullScreenChange={toggle}
                        />
                    </View>
                    <Text style={{ color: '#FFF' }}>{JSON.stringify(detalhes)}</Text>
                    {!ready && <ActivityIndicator color="white" />}
                </View>
            ) : (
                <View style={[styles.containerr, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#FFF" />
                </View>
            )}
        </>
    )
}

export default Trailer;