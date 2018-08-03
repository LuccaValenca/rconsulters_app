import React, { Component } from 'react';
import { ImageBackground, View, Text, StatusBar } from 'react-native';

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = { tempo: false };
    }

    componentDidMount() { 
        setTimeout(() => { this.props.navigation.navigate('TelaMenu') }, 2000);
    }

    render () {
        return (
            <ImageBackground style={{flex: 1, width: 'auto'}} source={require('../imgs/bg.jpg')}>
                <StatusBar
                    backgroundColor="#f5ad00"
                    barStyle="light-content"
                />
                <View style={estilo.container}>
                    <Text style={estilo.boasVindas}> Bem Vindo </Text>
                </View>
            </ImageBackground>
        );
    }
};

const estilo = {
    container: {
        flex: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boasVindas: {
        fontSize: 22,
        color: '#fff',
    },
}