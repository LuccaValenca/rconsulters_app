import { StackNavigator } from 'react-navigation';
import Inicio from './src/componentes/Inicio';
import Menu from './src/componentes/Menu';
import Demo from './src/componentes/Demo';
import Geo from './src/componentes/Geo';
import Camera from './src/componentes/Camera';

const Routes = StackNavigator (
    {
        TelaInicio: { 
            screen: Inicio,
            navigationOptions: ({ navigation }) => ({
                header: false,
            }),
        },
        TelaMenu: { 
            screen: Menu,
            navigationOptions: ({ navigation }) => ({
                header: false,
            }),
        },
        TelaCamera: { 
            screen: Camera,
            navigationOptions: ({ navigation }) => ({
                header: false,
            }),
        },
        TelaDemo: {
            screen: Demo,
            navigationOptions: ({ navigation }) => ({
                title: 'Demonstração',
                headerTitleStyle: {
                    color: '#fff',
                    fontWeight: '100',
                },
                headerStyle: {
                    backgroundColor: '#f5ad00'
                },
            }),
        },
        TelaGeolocalizacao: {
            screen: Geo,
            navigationOptions: ({ navigation }) => ({
                title: 'Geolocalização',
                headerTitleStyle: {
                    color: '#fff',
                    fontWeight: '100',
                },
                headerStyle: {
                    backgroundColor: '#f5ad00'
                },
            }),
        }
    },
    {
        headerMode: 'float',
    },
    {
      initialRouteName: 'TelaInicio',
    }
);

export default Routes;