import React, { Component } from 'react';
import { ImageBackground, View, Text, StatusBar } from 'react-native';

export default class Menu extends Component {
    render () {
        return (
            <ImageBackground style={{flex: 1, width: 'auto'}} source={require('../imgs/bg.jpg')}>
                <StatusBar
                    backgroundColor="#f5ad00"
                    barStyle="light-content"
                />
                <View style={estilo.container}>
                    <Text style={estilo.boasVindas}> Menu </Text>
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