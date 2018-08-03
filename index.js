/** @format */
import React, { Component } from 'react';
import {AppRegistry, View, StatusBar} from 'react-native';
import Routes from './Routes';
import Inicio from './src/componentes/Inicio';
import {name as appName} from './app.json';

class App extends Component {
    render() {
        return <Routes />        
    }
}

AppRegistry.registerComponent(appName, () => App);

