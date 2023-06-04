import { StyleSheet } from "react-native";

export const screenSpace = 24;
export const videoHeight = 220;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000"
    },
    player: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        marginEnd: 2,
        backgroundColor: "#000",
        alignSelf: 'center'
    },
    containerr: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#000"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: "#000"
    }
});