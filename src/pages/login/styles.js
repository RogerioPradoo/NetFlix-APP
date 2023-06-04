import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    stylesInput: {
        flexDirection: 'row',
        width: "90%",
        alignItems: "center"
    },
    corLetras: {
        color: '#FFF'
    },
    textTitle: {
        color: '#FFF',
        fontSize: 20,
        marginLeft: 15
    },
    buttonRec: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 10,
        backgroundColor: '#B51619',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: '5%',
        width: '50%',
        borderRadius: 25,
        margin: 5,
        color: '#FFF'
    },
    textInput: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#3C3C3C',
        color: '#FFF',
        fontSize: 17,
        width: '95%',
        borderRadius: 5
    },
    logoImg: {
        alignSelf: 'center',
        width: '100%',
        height: '55%'
    }
});

export default styles