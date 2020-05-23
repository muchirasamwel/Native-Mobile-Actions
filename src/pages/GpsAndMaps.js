import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';

import {bindActionCreators} from "redux";
import * as itemActions from "../redux/actions/itemActions";
import {connect} from "react-redux";
import GetLocation from 'react-native-get-location'
import {Styles} from "./Styles";

class GpsAndMaps extends React.Component {
    state = {
        location: {}
    };

    findCoordinates = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                this.setState({location:location});
                console.log(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.findCoordinates} style={Styles.primaryBtn}>
                    <Text style={Styles.primaryBtnText}>Find My Location?</Text>
                </TouchableOpacity>
                    <Text>Latitude: {this.state.location.latitude}</Text>
                    <Text>Longitude: {this.state.location.longitude}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

function mapStateToProps(state) {
    return {
        items: state.data.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GpsAndMaps);
