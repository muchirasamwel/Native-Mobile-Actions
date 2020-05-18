import React from 'react';
import {Platform,FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {initialWindowSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';

import {bindActionCreators} from 'redux';
import * as itemActions from '../redux/actions/itemActions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ListItem from "../components/ListItem";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                alert('ImagePicker Error: ' + res.error);
            } else {
                this.setState({
                    image: res,
                });
            }
        });
    };

    addImageItem = async () => {
        if(Object.keys(this.state.image)==0){
            alert('please select an image');
            return;
        }
        await this.props.actions.addItem(this.state.image, this.state.form_data);
    };

    componentDidMount() {
        this.props.actions.fetchItems().catch(err => {
            alert('loading items failed ' + err)
        });
        console.log(this.props.items);
    }

    onChange = (name) => {
        this.setState({
            form_data: {
                name
            },
        });
    };

    render() {
        return (
            <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
                <View style={styles.container}>
                    <View style={{width: '100%', height: '40%'}}>
                    <Image style= {{flex:1 , width: undefined, height: undefined}}
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
                            placeholder="Item Name"
                            style={styles.input}
                            value={this.state.form_data.name}
                            onChangeText={this.onChange}
                        />
                        <View style={styles.btn_group}>
                            <TouchableOpacity onPress={this.selectFile} style={styles.button}>
                                <Text style={styles.buttonText}>Select Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.add_btn} onPress={() => this.addImageItem()}>
                                <Icon name="add" color="black" size={25}/>
                                <Text style={styles.addBtnText}>Upload Item</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*<FlatList*/}
                    {/*    style={styles.list}*/}
                    {/*    data={this.props.items}*/}
                    {/*    renderItem={({item}) => (*/}
                    {/*        <ListItem item={item}/>*/}
                    {/*    )}*/}
                    {/*/>*/}
                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        flex:1,
        borderRadius:100/2,
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
        width: '100%'
    },
    add_btn: {
        borderRadius:100/2,
        width: '40%',
        height: 40,
        backgroundColor: '#18ff56',
        margin: 3,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
    },
    btn_group:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addBtnText:{
        alignSelf:'center',
        fontWeight:'bold'
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
