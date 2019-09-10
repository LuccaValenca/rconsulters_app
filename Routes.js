import { StackNavigator, NavigationActions } from 'react-navigation';
import Inicio from './src/componentes/Inicio';
import Menu from './src/componentes/Menu';
import Demo from './src/componentes/Demo';
import Geo from './src/componentes/Geo';
import Camera from './src/componentes/Camera';
import Contato from './src/componentes/Contato';

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
                headerTintColor: '#f5ad00',
                headerTitleStyle: {
                    color: '#f5ad00',
                    fontWeight: '100',
                },
                headerStyle: {
                    backgroundColor: '#293239'
                },
            }),
        },
        TelaContato: {
            screen: Contato,
            navigationOptions: ({ navigation }) => ({
                title: 'Entre em Contato',
                headerTintColor: '#f5ad00',
                headerTitleStyle: {
                    color: '#f5ad00',
                    fontWeight: '100',
                },
                headerStyle: {
                    backgroundColor: '#293239'
                },
            }),
        },
        TelaGeolocalizacao: {
            screen: Geo,
            navigationOptions: ({ navigation }) => ({
                title: 'Geolocalização',
                headerTintColor: '#f5ad00',
                headerTitleStyle: {
                    color: '#f5ad00',
                    fontWeight: '100',
                },
                headerStyle: {
                    backgroundColor: '#293239'
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

const defaultGetStateForAction = Routes.router.getStateForAction;

Routes.router.getStateForAction = (action, state) => {
    if (
        state &&
        action.type === NavigationActions.BACK &&
        state.routes[state.index].routeName === "TelaMenu"
    ) {
        // Returning null from getStateForAction means that the action
        // has been handled/blocked, but there is not a new state
        return null;
    }
  
    return defaultGetStateForAction(action, state);
};

export default Routes;