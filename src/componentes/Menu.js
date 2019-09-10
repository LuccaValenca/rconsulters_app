import React, { Component } from 'react';
import { ImageBackground, View, Text, StatusBar, TouchableOpacity, PermissionsAndroid, DeviceEventEmitter } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import verificarGPS from './utils/verificarGPS';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleGeoButtonPress = this.handleGeoButtonPress.bind(this);
    }

    async handleGeoButtonPress () {
        verificarGPS();
        
        const per = await pedirPermissao();
        if(per) {
            this.props.navigation.navigate('TelaGeolocalizacao');
        } else {
            alert('Permissão para acesso a localização recusado ou Localização desativada!');
        }        
    
    }

    componentDidMount() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
            console.log(data);
            //return 1;
                // The user has accepted to enable the location services
                // data can be :
                //  - "already-enabled" if the location services has been already enabled
                //  - "enabled" if user has clicked on OK button in the popup
        }).catch(err => {
            console.log("oi3");
            switch(err.code){
                case 'ERR00': console.log(err);
                case 'ERR01': console.log(err);
                case 'ERR02': console.log(err);
            }
                // The user has not accepted to enable the location services or something went wrong during the process
                // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                // codes : 
                //  - ERR00 : The user has clicked on Cancel button in the popup
                //  - ERR01 : If the Settings change are unavailable
                //  - ERR02 : If the popup has failed to open
        });
        
        // DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
        //     if(!status.enabled) {
        //         let ver = verificarGPS();
        //         switch (ver) {
        //             case 2: alert('Permissão para ligar GPS cancelada!'); break;
        //             case 3: alert('Não foi possível abrir o pop-up para habilitar o GPS!'); break;
        //             case 4: alert('Opção de modificar configurações indisponível!'); break;
        //         }
        //     } 
        // });
    }

    componentWillUnmount() {
        // used only when "providerListener" is enabled
        //LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
    }

    render () {
        return (
            <ImageBackground style={{flex: 1, width: 'auto', justifyContent: 'center', alignItems: 'center',flexDirection: 'row',}} source={require('../imgs/bg.jpg')}>
                <StatusBar
                    backgroundColor="#293239"
                    barStyle="light-content"
                />
                <View style={estilo.container}>
                    <TouchableOpacity style={estilo.button} onPress={() => this.props.navigation.navigate('TelaCamera')}>
                        <Text style={estilo.icones}>
                            <FontAwesome>{Icons.camera}</FontAwesome>
                        </Text>
                        <Text style={estilo.txtBtn}>CÂMERA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.button} onPress={() => this.handleGeoButtonPress()}>
                        <Text style={estilo.icones}>
                            <FontAwesome>{Icons.globe}</FontAwesome>
                        </Text>
                        <Text style={estilo.txtBtn}>GEOLOCALIZAÇÃO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.button} onPress={() => this.props.navigation.navigate('TelaDemo')}>
                        <Text style={estilo.icones}>
                            <FontAwesome>{Icons.laptop}</FontAwesome>
                        </Text>
                        <Text style={estilo.txtBtn}>DEMONSTRAÇÃO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.button} onPress={() => this.props.navigation.navigate('TelaContato')}>
                        <Text style={estilo.icones}>
                            <FontAwesome>{Icons.envelope}</FontAwesome>
                        </Text>
                        <Text style={estilo.txtBtn}>CONTATO</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }
    
};


const pedirPermissao = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return (granted === PermissionsAndroid.RESULTS.GRANTED) ? true : false;
}

const estilo = {
    container: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    icones: {
        margin: 10,
        fontSize: 60,
        textAlign: 'center',
        color: '#f5ad00',
    },
    button: {
        padding: 15,
        width: 250,
        height: 150,
        backgroundColor: '#fff',
        margin: 5,
        elevation: 5,
    },
    txtBtn: {
        fontSize: 18,
        textAlign: 'center',
        color: '#f5ad00',
    }
}