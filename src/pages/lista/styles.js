import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        height: 80
    },
    descButton: {
        color: '#FFF',
        margin: 10,
        marginBottom: 20,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 80,
        marginTop: 10,
        position: 'absolute',
        paddingTop: 10
    },
    titleHeader: {
        color: '#FFF'
    },
    logoN: {
        width: 50,
        height: 50,
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