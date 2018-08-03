import React, { Component } from 'react';
import { WebView, View, StatusBar } from 'react-native';

export default class Demo extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#f5ad00"
                    barStyle="light-content"
                />
                <WebView
                    source={{uri: 'http://www.r-consulters.com.br/demo'}}
                />
            </View>
        );
  }
}
