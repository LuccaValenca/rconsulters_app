//import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const verificarGPS = () => {
    console.log("oi");
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
    .then(data => {
        console.log("oi2");
        return 1;
            // The user has accepted to enable the location services
            // data can be :
            //  - "already-enabled" if the location services has been already enabled
            //  - "enabled" if user has clicked on OK button in the popup
    }).catch(err => {
        console.log("oi3");
        switch(err.code){
            case 'ERR00': return 2;
            case 'ERR01': return 3;
            case 'ERR02': return 4;
        }
            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
            // codes : 
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
    });   
}
// const verificarGPS = () => {
//     LocationServicesDialogBox.checkLocationServicesIsEnabled({
//         message: "<h2 style='color: #0af13e'>Confimar uso da Localização</h2>Este aplicativo precisa que mude as configurações:<br/><br/>Ative a Localização para usar a Geolocalização do Aplicativo.",
//         ok: "SIM",
//         cancel: "NÃO",
//         enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
//         showDialog: true, // false => Opens the Location access page directly
//         openLocationServices: true, // false => Directly catch method is called if location services are turned off
//         preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
//         preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
//         providerListener: true // true ==> Trigger locationProviderStatusChange listener when the location state changes
//     }).then(function() {
//     }).catch(() => {
//     });    
// }

export default verificarGPS;
 