import React, { Component } from 'react';
import { ImageBackground, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleDemoButtonPress = this.handleDemoButtonPress.bind(this);
    }

    handleDemoButtonPress() {
        this.props.navigation.navigate('TelaDemo');
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

                    <TouchableOpacity style={estilo.button} onPress={() => this.props.navigation.navigate('TelaGeolocalizacao')}>
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