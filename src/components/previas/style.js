import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    containerPrevia: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    textPrevia: {
        color: '#FFF',
        backgroundColor: '#000',
        fontSize: 25,
        marginBottom: 20,
        marginTop: 10
    },
    imagePrevia: {
        borderRadius: 50,
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginLeft: 5,
        borderColor: '#FFF',
        borderWidth: 3
    },
    titlePrevia: {
        alignSelf: 'center',
        color: '#FFF',
        fontSize: 20,
        marginHorizontal: 20
    },
    desc: {
        alignSelf: 'center',
        backgroundColor: '#333333',
        width: '100%',
        height: 1600,
        marginLeft: 2,
        marginRight: 2
    },
    imgDesc: {
        width: '100%',
        height: '30%'
    },
    Teste: {
        width: '100%',
        height: '500%',
        backgroundColor: '#333333',
        marginTop: 20,
        marginLeft: 10,
    },
    titleRow: {
        flexDirection: 'row'
    },
    titlesSaiba: {
        fontSize: 20,
        marginLeft: 10,
        color: '#FFF',
        margin: 5
    },
    descSaiba: {
        fontSize: 20,
        color: '#FFF',
        margin: 10
    },
    details: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 20
    },
    buttonOpcoes: {
        margin: 25,
        alignItems: 'center'
    },
    buttonSaiba: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        color: "#FFF"
    },
    titlesOpcoes: {
        color: '#FFF',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 10
    },
    buttonOpcoesMeio: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        color: '#000',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        width: '40%',
        borderRadius: 10
    },
    titlesOpcoesMeio: {
        color: '#000',
        fontSize: 20,
        marginLeft: 10
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

export default styles