import React, { Component } from 'react';
import { ImageBackground, View, StatusBar, Image } from 'react-native';

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
                    backgroundColor="#293239"
                    barStyle="light-content"
                />
                <View style={estilo.container}>
                    <Image source={require('../imgs/r.png')} />
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