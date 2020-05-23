import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Dimensions, Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {initialWindowSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';

import {bindActionCreators} from 'redux';
import * as itemActions from '../redux/actions/itemActions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

const Height = Dimensions.get('window').height;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            image: {},
            form_data: {},
        };
    }

    selectFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                Alert.alert('Error', 'ImagePicker Error: ');
            } else {
                this.setState({
                    image: res,
                });
            }
        });
    };

    addImageItem = async () => {
        this.setState({
            loading: true
        });
        if (Object.keys(this.state.image) == 0) {
            Alert.alert('Warning', 'please select an image',
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: true}
            );
            return;
        }
        await this.props.actions.addItem(this.state.image,
            {name: this.state.name, specialization: this.state.specialization});

        this.setState({
            loading: false
        });
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        this.props.actions.fetchItems().catch(err => {
            alert('loading items failed ' + err)
        });
        this.setState({
            loading: false
        });
    }

    onChange1 = (specialization) => {
        this.setState({
            specialization: specialization
        });
    };
    onChange = (name) => {
        this.setState({
            name: name
        });
    };
    reactState=(item,data)=>{
        let object='{'+item+':'+data+'}';
        try {
            object=JSON.parse(object);
        }
        catch (e) {
            return null;
        }
        this.setState(object);
    };
    render() {
        return (
            <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
                <View style={styles.container}>
                <Loader preLoaderVisible={this.state.loading}/>
                    <View style={styles.avatar}>
                        <Image style={{flex: 1, width: undefined, height: undefined}}
                               source={{
                                   uri: 'data:image/jpeg;base64,' + this.state.image.data,
                               }}
                               resizeMode={'contain'}
                        />
                    </View>
                    {/*<Image*/}
                    {/*    source={{uri: this.state.resourcePath.uri}}*/}
                    {/*    style={{width: 200, height: 200}}*/}
                    {/*/>*/}
                    <View style={styles.form}>
                        <TextInput
                            placeholder="User Name"
                            style={styles.input}
                            value={this.state.form_data.name}
                            onChangeText={this.onChange}
                        />
                        <TextInput
                            placeholder="Specialization"
                            style={styles.input}
                            value={this.state.form_data.specialization}
                            onChangeText={this.onChange1}
                        />
                        <View style={styles.btn_group}>
                            <TouchableOpacity onPress={this.selectFile} style={styles.button}>
                                <Text style={styles.buttonText}>Select Avatar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.add_btn} onPress={() => this.addImageItem()}>
                                <Icon name="add" color="black" size={25}/>
                                <Text style={styles.addBtnText}>Add Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        style={styles.imageList}
                        data={this.props.items}
                        keyExtractor = { (item, index) => index.toString() }
                        renderItem={({item}) => (
                            <ListItem item={item}/>
                        )}
                    />
                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
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
    button: {
        flex: 1,
        borderRadius: 100 / 2,
        width: '40%',
        height: 40,
        padding: 7,
        margin: 2,
        backgroundColor: '#3740ff',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff',
    },
    form: {
        width: '100%',
        marginBottom: 35,
    },
    add_btn: {
        borderRadius: 100 / 2,
        width: '40%',
        height: 40,
        backgroundColor: '#18ff56',
        margin: 3,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
    },
    btn_group: {
        paddingTop: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addBtnText: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 2
    }
});

function mapStateToProps(state) {
    return {
        items: state.data.items,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
