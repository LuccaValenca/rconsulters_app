import { StackNavigator } from 'react-navigation';
import React, {Component} from 'react';
import Inicio from './src/componentes/Inicio';

const Root = StackNavigator(
    {
        Inicio: { 
            screen: Inicio,
            navigationOptions: ({ navigation }) => ({
                header: false,
            }),
        },
    },
    {
      initialRouteName: 'Inicio',
    }
  );

export default class Routes extends Component {
    render () {
        return <Root />;
    } 
}