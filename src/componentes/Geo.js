import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import MapView from 'react-native-maps';

export default class Geo extends Component {
    constructor(props) {
        super(props);
        this.state = { lat: false, lng: false };

        this.observarPosicao = this.observarPosicao.bind(this);
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
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000  }
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

    componentDidMount() {
        this.observarPosicao();
    }

    render() {
        if(!this.state.lng) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#f5ad00" />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor="#293239"
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
}

// const pedirPermissao = async () => {
//     const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
//           title: "Permissão de localização",
//           message: "Permissão para acessar a localização atual do dispositivo",
//         },
//     );

//     return (granted === PermissionsAndroid.RESULTS.GRANTED) ? true : false;
// }

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
