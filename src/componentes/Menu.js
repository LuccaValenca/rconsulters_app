import React, { Component } from 'react';
import { ImageBackground, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleGeoButtonPress = this.handleGeoButtonPress.bind(this);
    }

    handleGeoButtonPress() {
        const per = pedirPermissao();
        if(per) {
            this.props.navigation.navigate('TelaGeolocalizacao');
        } else {
            alert('Permissão para acesso a localização recusado!');
        }        
    }

    render () {
        return (
            <ImageBackground style={{flex: 1, width: 'auto', justifyContent: 'center', alignItems: 'center',flexDirection: 'row',}} source={require('../imgs/bg.jpg')}>
                <StatusBar
                    backgroundColor="#f5ad00"
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
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: "Permissão de localização",
          message: "Permissão para acessar a localização atual do dispositivo",
        },
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