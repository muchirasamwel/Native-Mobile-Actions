import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import {bindActionCreators} from "redux";
import * as itemActions from "../redux/actions/itemActions";
import {connect} from "react-redux";
import GetLocation from 'react-native-get-location'
import {Styles} from "./Styles";
import MapView, {Marker} from "react-native-maps";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/dist/MaterialIcons";
import Geocoder from "react-native-geocoding";

class GpsAndMaps extends React.Component {
    state = {
        marker: {
            title:'',
            description:''
        },
        location: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        new_region: {},
        loading: false,
    };
    onRegionChange = (region) => {
        this.setState({new_region: region});
    }

    findCoordinates = async () => {
        this.setState({loading: true});
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                this.setState({location: location})
                this.setState({
                    region: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                });
                this._mapView.animateToRegion(
                    this.state.region
                    , 1000);
                this.setMarker(location);
            })
            .catch(error => {
                const {code, message} = error;
                // console.warn(code, message);
            });
        this.setState({loading: false});
    };

    componentDidMount(): void {
        Geocoder.init("AIzaSyDSbvpfxv_ZeLBCvfdtqP8FPunDe0Gg3MA");
        this.findCoordinates();

    };

    mapZoomIn = () => {
            let region={
                latitude: this.state.new_region.latitude,
                longitude: this.state.new_region.longitude,
                latitudeDelta: this.state.new_region.latitudeDelta / 2,
                longitudeDelta: this.state.new_region.longitudeDelta / 2,
            };
        this._mapView.animateToRegion(
            region
            , 100);
    }
    mapZoomOut = () => {
        let region= {
                latitude: this.state.new_region.latitude,
                longitude: this.state.new_region.longitude,
                latitudeDelta: this.state.new_region.latitudeDelta * 2,
                longitudeDelta: this.state.new_region.longitudeDelta * 2,
            };

        this._mapView.animateToRegion(
           region
            , 100);
    };

    getPlaceInfo=  (position)=>{
        let coordinate=position.nativeEvent.coordinate;
        this.setMarker(coordinate);
    }
    setMarker=async(coordinate)=>{
        this.setState({location:coordinate});
        await this.props.actions.fetchPlace(coordinate.latitude+","+coordinate.longitude).catch(err => {
            alert('loading items failed ' + err)
        });
        this.setState({
            marker:{
                title:this.props.place.data[0].name+','+this.props.place.data[0].region+'\n'+this.props.place.data[0].country,
                description:" Street: "+this.props.place.data[0].street,
            }
        });
        // console.log(this.props.place);
    };

    render() {
        return (
            <View style={styles.container}>
                <Loader preLoaderVisible={this.state.loading}/>
                <TouchableOpacity onPress={this.findCoordinates} style={Styles.primaryBtn}>
                    <Text style={Styles.primaryBtnText}>Find My Location?</Text>
                </TouchableOpacity>
                <Text>Latitude: {this.state.location.latitude}</Text>
                <Text>Longitude: {this.state.location.longitude}</Text>
                <View style={Styles.map}>
                    <TouchableOpacity style={Styles.floatingZoomIn} onPress={this.mapZoomIn}>
                        <Icon name="add-circle" color="black" size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.floatingZoomOut} onPress={this.mapZoomOut}>
                        <Icon name="remove-circle" color="black" size={35}/>
                    </TouchableOpacity>
                    <MapView
                        ref={(mapView) => {
                            this._mapView = mapView;
                        }}
                        style={{...StyleSheet.absoluteFillObject}}

                        // onMapReady={this.goToInitialRegion.bind(this)}
                        initialRegion={this.state.region}
                        onRegionChange={this.onRegionChange}

                    >
                        <Marker
                            coordinate={{
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude
                            }}
                            title={this.state.marker.title}
                            description={this.state.marker.description}
                            draggable={true}
                            onDragEnd={this.getPlaceInfo}
                        >
                        </Marker>
                    </MapView>
                </View>
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
        items: state.data.items,
        place: state.data.place
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GpsAndMaps);
