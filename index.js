/** @format */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Routes from './Routes';
import {name as appName} from './app.json';

class App extends Component {
    render() {
        return <Routes />        
    }
}

AppRegistry.registerComponent(appName, () => App);

