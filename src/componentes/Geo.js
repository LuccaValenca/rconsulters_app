import React, { Component } from 'react';
import { View, StatusBar, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class Geo extends Component {
    constructor(props) {
        super(props);
        this.state = { lat: 23.5431786, lng: 46.6291845 };

        this.observarPosicao = this.observarPosicao.bind(this);
        //this.pedirPermissao = this.pedirPermissao.bind(this);
    }

    observarPosicao() {

        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ 
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude
                });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: false }
        );

        // this.watchID = navigator.geolocation.watchPosition(
        //     position => {
        //         this.setState({ 
        //             lat: position.coords.latitude, 
        //             lng: position.coords.longitude
        //         });
        //     }, 
        //     error => alert('ERROR(' + error.code + '): ' + error.message), 
        //     { enableHighAccuracy: false },
        // );
         
    }

    componentWillUnmount(){
        //navigator.geolocation.clearWatch(this.watchID);
    }

    pedirPermissao = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
              title: "Permissão de localização",
              message: "Permissão para acessar a localização atual do dispositivo",
            },
        );

        return (granted === PermissionsAndroid.RESULTS.GRANTED) ? true : false;
    }

    componentDidMount() {
        const per = this.pedirPermissao();
        if(per) {
            this.observarPosicao();
        } else {
            alert('Permissão para acesso a localização recusado!');
        }
    }

    render() {
        console.log(this.state);
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#f5ad00"
                    barStyle="light-content"
                />
                <MapView style={estilo.mapa}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    minZoomLevel={18}
                    loadingEnabled={true}
                    loadingIndicatorColor={'#f5ad00'}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >                    
                </MapView>
            </View>
        );
    }
}

const estilo = {
    mapa: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}
