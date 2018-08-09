import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import { RNCamera }  from 'react-native-camera';
import RNFS  from 'react-native-fs';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { dirPicutures } from './utils/dirStorage';
import RNFetchBlob from 'rn-fetch-blob';

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = { image: false, tipo: RNCamera.Constants.Type.back, tipoFacil: 1, flash: RNCamera.Constants.FlashMode.off, flashFacil: false };
        
        this.renderCamera = this.renderCamera.bind(this);
        this.renderImg = this.renderImg.bind(this);
        this.trocarCamera = this.trocarCamera.bind(this);
        this.alternarFlash = this.alternarFlash.bind(this);
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, mirrorImage: ( this.state.tipoFacil != 1 ) ? false : false , exif: true };
            const data = await this.camera.takePictureAsync(options);            
            this.saveImage(data.uri);
        }
    };

    saveImage = async filePath => {
        let newFilepath = false;
        try {
            let now = new Date;
            // set new image name and filepath
            const newImageName = `IMG_${now.getFullYear()}${((now.getMonth() + 1 > 9)) ? now.getMonth() + 1 : '0'+(now.getMonth() + 1)}${'0'+now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.jpg`;
            newFilepath = `${dirPicutures}/${newImageName}`;

            // move and save image to new filepath
            const imageMoved = await moveAttachment(filePath, newFilepath);
        } catch (error) {
            alert(error);
        }        
    };

    trocarCamera() {
        if(this.state.tipoFacil == 1) {
            this.setState({ tipo: RNCamera.Constants.Type.back, tipoFacil: 2 });
            return;
        }
        this.setState({ tipo: RNCamera.Constants.Type.front, tipoFacil: 1 });
        return;
    }

    alternarFlash() {
        if(this.state.flashFacil) {
            this.setState({ flash: RNCamera.Constants.FlashMode.off, flashFacil: false });
            return;
        }
        this.setState({ flash: RNCamera.Constants.FlashMode.on, flashFacil: 1 });
        return;
    }

    renderImg() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#f5ad00"
                    barStyle="light-content"
                />
                <Image
                    source={{ uri: this.state.image }}
                    style={estilo.preview}
                />
                <View style={{backgroundColor: '#000', marginBottom: -20}}>
                    <Text style={{fontSize: 23, marginHorizontal: 20, marginTop: 10, marginBottom: 15, color: '#fff'}} onPress={() => this.setState({ image: false })}>
                        Voltar
                    </Text>
                </View>
            </View>
          );
    }

    renderCamera() {
        return (
            <View style={{flex: 2}}>
                <StatusBar hidden={true} />
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                      }}
                    style = {estilo.preview}
                    type={this.state.tipo}
                    flashMode={this.state.flash}
                    permissionDialogTitle={'Permissão para utilização da Câmera'}
                    permissionDialogMessage={'Nós precisamos de permissão para utilizar a câmera do telefone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#000', marginBottom:-10}}>
                    {/* BOTÃO FLASH */}
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => this.alternarFlash()}
                            style = {estilo.alterarCam}
                        >
                            <Text style={ (this.state.flashFacil) ? estilo.flashDesligado : estilo.flashLigado }>
                                <FontAwesome>{Icons.bolt}</FontAwesome>
                            </Text>
                        </TouchableOpacity>
                    </View>      
                    {/* BOTÃO CÂMERA */}
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={this.takePicture.bind(this)}
                            style = {estilo.capture}
                        >
                            <Text style={estilo.icones}>
                                <FontAwesome>{Icons.camera}</FontAwesome>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* BOTÃO ALTERNAR */}
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => this.trocarCamera()}
                            style = {estilo.alterarCam}
                        >
                            <Text style={estilo.iconeTrocaCam}>
                                <FontAwesome>{Icons.retweet}</FontAwesome>
                            </Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View>
        );
    }

    render () {
        return (
            <View style={estilo.container}>
                {this.state.image ? this.renderImg() : this.renderCamera()}
            </View>
        );       
    }
}

const moveAttachment = async (filePath, newFilepath) => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: "Permissão de armazenamento",
          message: "Permissão para armazenar a imagem capturada",
        },
    );

    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
        return new Promise((resolve, reject) => {
            RNFS.mkdir(dirPicutures)
              .then(() => {
                  RNFS.moveFile(filePath, newFilepath)
                        .then(() => {
                            RNFetchBlob.fs.scanFile([ { path : newFilepath, mime : 'image/jpeg' } ])
                            .then(() => {
                                console.log("scan file success")
                            })
                            .catch((err) => {
                                console.log("scan file error")
                            })
                            resolve(true);
                        })
                        .catch(error => {
                            console.log('moveFile error', error);
                            reject(error);
                        });
              }) 
              .catch(err => {
                  console.log('mkdir error', err);
                  reject(err);
              });
          });
    }

    return("Permissão não habilitada");
    
};

const estilo = {
    container: {
        flex: 2,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashDesligado: {
        margin: 5,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    },
    flashLigado: {
        margin: 5,
        fontSize: 25,
        textAlign: 'center',
        color: '#f5ad00',
    },
    capture: {
        backgroundColor: 'transparent'
    },
    icones: {
        margin: 10,
        fontSize: 35,
        textAlign: 'center',
        color: '#fff',
    },
    iconeTrocaCam: {
        margin: 5,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginTop: -10
    },
    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,
        marginTop: 15,
    },
    alterarCam: {
        width: 40,
        height: 40,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#FFF',
        marginBottom: 25,
        marginTop: 25,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    }
}