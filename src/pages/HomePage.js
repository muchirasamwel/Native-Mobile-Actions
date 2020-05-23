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
import {Styles} from "./Styles"

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
                <View style={Styles.container}>
                <Loader preLoaderVisible={this.state.loading}/>
                    <View style={Styles.avatar}>
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
                    <View style={Styles.form}>
                        <TextInput
                            placeholder="User Name"
                            style={Styles.input}
                            value={this.state.form_data.name}
                            onChangeText={this.onChange}
                        />
                        <TextInput
                            placeholder="Specialization"
                            style={Styles.input}
                            value={this.state.form_data.specialization}
                            onChangeText={this.onChange1}
                        />
                        <View style={Styles.btn_group}>
                            <TouchableOpacity onPress={this.selectFile} style={Styles.primaryBtn}>
                                <Text style={Styles.primaryBtnText}>Select Avatar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.successBtn} onPress={() => this.addImageItem()}>
                                <Icon name="add" color="black" size={25}/>
                                <Text style={Styles.successBtnText}>Add Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        style={Styles.imageList}
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
