import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';

import {
    SafeAreaProvider,
    initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';

import {bindActionCreators} from "redux";
import * as itemActions from "../redux/actions/itemActions";
import {connect} from "react-redux";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.actions.fetchItems().catch(err => {
            alert('loading items failed ' + err)
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
                <View style={styles.container}>
                    {/*<Header title="Shopping List"></Header>*/}
                    <Text>GPRS </Text>
                </View>
            </SafeAreaProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
