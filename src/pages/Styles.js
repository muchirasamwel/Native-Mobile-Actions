import {Dimensions, StyleSheet} from "react-native";
const Height = Dimensions.get('window').height;

export const Styles = StyleSheet.create({

    avatar: {
        width: '100%',
        height: Height / 4,
    },
    imageList: {
        width:'100%',
        marginTop: 12,
        //alignSelf: 'stretch',
    },
    scroll: {
        width: '100%',
    },
    container: {
        width: '100%',
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: Height,
        // backgroundColor:'red',
    },
    primaryBtn: {
        borderRadius: 100 / 2,
        width: '40%',
        height: 40,
        padding: 7,
        margin: 3,
        backgroundColor: '#3740ff',
    },
    primaryBtnText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff',
    },
    successBtn: {
        borderRadius: 100 / 2,
        width: '40%',
        height: 40,
        backgroundColor: '#18ff56',
        margin: 3,
        padding: 7,
        flexDirection: 'row',
    },
    successBtnText: {
        textAlign: 'center',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    form: {
        width: '100%',
        marginBottom: 35,
    },
    btn_group: {
        paddingTop: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 2
    }
});
