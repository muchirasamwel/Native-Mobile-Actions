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
        flexWrap: "wrap",
        borderRadius: 100 / 2,
        height: 40,
        padding: 7,
        margin: 3,
        backgroundColor: '#3740ff',
        flexDirection: 'row',
    },
    primaryBtnText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff',
        marginHorizontal:8
    },
    successBtn: {
        flexWrap: 'wrap',
        borderRadius: 100 / 2,
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
        fontWeight: 'bold',
        marginHorizontal:10

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
    },
    map:{
        height:Height/1.7,
        width:'100%',
        backgroundColor:'red'
    },
    floatingZoomIn:{
        position:'absolute',
        right:10,
        top:10,
        zIndex:999,
    },
    floatingZoomOut:{
        position:'absolute',
        right:10,
        top:50,
        zIndex:999,
    },
    place_container:{
        flex:1,
        margin:10
        // alignItems:'center'
    },
    place:{
        margin:5,
        fontSize:20,
        marginLeft:5,

    },
    street:{
        margin:5,
        fontSize:18,
        marginLeft:5,

    },
    city_country:{
        margin:5,
        fontSize:16,
        marginLeft:5,
    },
    row:{
        flex:1,
        flexDirection:'row',
    },
    search_container:{
        flex:1,
        marginHorizontal:8,
    },
    search_nav: {
        marginBottom:5,
        flex: 1,
        flexDirection: 'row',
    },
});
