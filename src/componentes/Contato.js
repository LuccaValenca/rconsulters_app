import React, { Component } from 'react';
import { TextInput, View, StatusBar, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Contato extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            mensagem: '',
            tipo: 'app',
            retorno: '',
            retornoEstilo: {},

            telWhats: false,
            msgWhats: '',
        }

        this.enviarContato = this.enviarContato.bind(this);
    }

    componentWillMount() { 
        const url = 'https://r-consulters.com.br/themes/rconsulters/inc/getTel.php';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'GET_TEL' }),
        })
        .then(resp => resp.json())
        .then(resp => {
            
            this.setState({ telWhats: resp.tel });
            this.setState({ msgWhats: (this.state.mensagem != '') ? encodeURI(this.state.mensagem) : encodeURI('Olá, gostaria de conversar sobre um projeto.') });

        });        
    }

    enviarContato() {
        const url = 'https://r-consulters.com.br/themes/rconsulters/inc/enviaContato.php';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                sobrenome: this.state.sobrenome,
                email: this.state.email,
                telefone: this.state.telefone,
                mensagem: this.state.mensagem,
                tipo: this.state.tipo,
            }),
        })
        .then(resp => resp.json())
        .then(resp => {
            this.setState({ retorno: resp.msg });
            this.setState({ retornoEstilo: { color: '#FF0000' } });

            if(resp.info == 'success') {
                this.setState({ retornoEstilo: { color: '#00FF00' } });
            }

            setTimeout(() => { this.setState({ retorno: '' }); }, 3000);
            
        });

        this.setState({
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            mensagem: '',
        });
    }

    render() {
        const url = `https://api.whatsapp.com/send?phone=${this.state.telWhats}&text=${this.state.msgWhats}`;
        let atv = '';
        if(!this.state.telWhats) {
            atv = <ActivityIndicator size="large" color="#fff" />;
        } else {
            atv = (
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <Text style={estilo.icones}>
                        <FontAwesome>{Icons.whatsapp}</FontAwesome>
                    </Text>
                    <Text style={[estilo.txtBtn, {paddingTop: 15}]}>WHATSAPP</Text>
                </View>
                );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar
                    backgroundColor="#293239"
                    barStyle="light-content"
                />
                <View style={estilo.containerForm}>
                    <View style={estilo.containerLineForm}>
                        <TextInput
                            style={[estilo.inputText, estilo.inputTextMarginR]}
                            onChangeText={(nome) => this.setState({nome})}
                            value={this.state.nome}
                            placeholder="Nome"
                            placeholderTextColor="#b7b7b7"
                            underlineColorAndroid="#ff8300"
                        />
                        <TextInput
                            style={[estilo.inputText, estilo.inputTextMarginL]}
                            onChangeText={(sobrenome) => this.setState({sobrenome})}
                            value={this.state.sobrenome}
                            placeholder="Sobrenome"
                            placeholderTextColor="#b7b7b7"
                            underlineColorAndroid="#ff8300"
                        />
                    </View>
                    <View style={estilo.containerLineForm}>
                        <TextInput
                            style={[estilo.inputText, estilo.inputTextMarginR]}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            placeholder="E-mail"
                            placeholderTextColor="#b7b7b7"
                            keyboardType="email-address"
                            underlineColorAndroid="#ff8300"
                        />
                        <TextInput
                            style={[estilo.inputText, estilo.inputTextMarginL]}
                            onChangeText={(telefone) => this.setState({telefone})}
                            value={parseInt(this.state.telefone)}
                            placeholder="Telefone"
                            placeholderTextColor="#b7b7b7"
                            keyboardType="phone-pad"
                            underlineColorAndroid="#ff8300"
                        />
                    </View>
                    <View style={estilo.containerLineForm}>
                        <TextInput
                            style={[estilo.inputText, estilo.inputTextMarginL]}
                            onChangeText={ (mensagem) => { 
                                this.setState({mensagem});
                                this.setState({ msgWhats: (this.state.mensagem != '') ? encodeURI(this.state.mensagem) : encodeURI('Olá, gostaria de conversar sobre um projeto.') });
                            }}
                            value={this.state.mensagem}
                            placeholder="Mensagem"
                            placeholderTextColor="#b7b7b7"
                            multiline={true}
                            numberOfLines={4}
                            underlineColorAndroid="#ff8300"
                        />
                    </View>
                </View>
                <View style={estilo.containerLineForm}>
                    <TouchableOpacity style={[estilo.containerLineForm, estilo.button]} onPress={() => this.enviarContato()}>
                        <Text style={estilo.icones}>
                            <FontAwesome>{Icons.envelope}</FontAwesome>
                        </Text>
                        <Text style={estilo.txtBtn}>ENVIAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={ (!this.state.telWhats) ? true : false } style={[estilo.containerLineForm, estilo.button]} onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err))}>
                        {atv}
                    </TouchableOpacity>
                </View>
                <View style={estilo.conteinerResposta}>
                    <Text style={[estilo.txtRetorno, this.state.retornoEstilo]}>{this.state.retorno}</Text>
                </View>
            </View>
        );
  }
}

const estilo = {
    containerForm: {flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'},
    containerLineForm: {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 20},
    conteinerResposta: {flex: 1, paddingHorizontal: 15, paddingVertical: 20, justifyContent: 'center', alignItems: 'center'},
    inputText: { flex: 1, color: '#7c7c7c', textDecorationColor: '#f5ad00', fontSize: 18, height: 70 },
    txtRetorno: { fontSize: 20 },
    button: { backgroundColor: '#f5ad00', paddingHorizontal: 5, elevation: 3, marginHorizontal: 10, justifyContent: 'space-around', height: 60},
    inputTextMarginL: {marginLeft: 5},
    inputTextMarginR: {marginRight: 5},
    icones: { margin: 10, fontSize: 35, textAlign: 'center', color: '#ffffff' },
    txtBtn: { fontSize: 18, textAlign: 'center', color: '#ffffff',  }
}
