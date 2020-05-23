import React, {Component} from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import HomeScreen from './src/pages/HomePage';
import ImageScreen from './src/pages/GpsAndMaps';

class MyMenu extends Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View >
                <Icon name="image" color="white" size={40} style={styles.icon} onPress={this.toggleDrawer.bind(this)}/>
            </View>
        );
    }
}
const config={
    bg:'#18ff2d',
    tint:'#0f110d',
}
const Navigation1 = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            title: 'React Actions',
            headerRight: () => <MyMenu page='ImageWorks' navigationProps={navigation}/>,
            headerStyle: {
                backgroundColor: config.bg,
            },
            headerTintColor:config.tint,
        }),
    }
});
const Navigation2 = createStackNavigator({
    ImageWorks: {
        screen: ImageScreen,
        navigationOptions: ({navigation}) => ({
            title: 'React Actions',
             headerRight: <MyMenu page={'Home'} navigationProps={navigation}/>,
            headerStyle: {
                backgroundColor: config.bg,
            },
            headerTintColor:config.tint,
        }),
    },
});
const styles = StyleSheet.create({
    icon: {
        margin: 10,
    },
});

const DrawerNavigatorExample = createDrawerNavigator({
    Screen1: {
        screen: Navigation1,
        navigationOptions: {
            drawerLabel: 'Image Works',
        },
    },
    Screen2: {
        screen: Navigation2,
        navigationOptions: {
            drawerLabel: 'GPS and Maps',
        },
    },
});

export default createAppContainer(DrawerNavigatorExample);
// const App = createAppContainer(Navigation);
// export default App;
