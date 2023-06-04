import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    titu: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
        marginLeft: 2,
        marginRight: 2,
        position: 'relative',
        fontSize: 20
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 80,
        marginTop: 10,
        position: 'absolute',
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    logoN: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        color: '#FFF'
    },
    containerConfig: {
        marginLeft: 30
    },
    subConfig: {
        color: "#A3A3A3",
        marginLeft: 10,
        marginTop: 10
    },
    subContainerConfig: {
        borderWidth: 1,
        borderColor: "#6B0000",
        marginTop: 20,
        marginEnd: 20,
        borderRadius: 10
    },
    headerConfig: {
        color: "#FFF",
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