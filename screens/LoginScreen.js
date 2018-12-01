import React from 'react';
import { LocalAuthentication, SecureStore } from 'expo';
import { Container, Content, Button, Text, Form, Item, Input, Icon, Label, Spinner } from 'native-base';

import { StackActions, NavigationActions } from 'react-navigation'
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';

import { showFlashMessage } from '../actions/utils';

import Colors from '../constants/Colors';

import { login } from '../actions/login';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            compatible: false,
            biometric: false,
            resetCredentials: false
        }
    }

    _navigateTo = (routeName) => {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ],
        });

        this.props.navigation.dispatch(resetAction);
    }

    checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        this.setState({ compatible }, () => console.log(this.state));
        if (!compatible) {
            this.showIncompatibleAlert();
        }
    };

    showIncompatibleAlert = () => {
        showFlashMessage('Error', 'Device incompatible with biometric authentication.', 'danger');
    };

    checkForBiometrics = async () => {
        let biometricRecords = await LocalAuthentication.isEnrolledAsync();
        if (!biometricRecords) {
            showFlashMessage('Error', 'No biometrics data found.', 'danger');
        } else {
            this.handleLoginPress();
        }
    };

    handleLoginPress = () => {
        if (Platform.OS === 'android') {
            this.showAndroidAlert();
        } else {
            this.scanBiometrics();
        }
    };

    showAndroidAlert = () => {
        showFlashMessage('Processing login', 'Please place your finger over the fingerprint sensor.', 'info');
        this.scanBiometrics();
    };

    scanBiometrics = async () => {
        const result = await LocalAuthentication.authenticateAsync('Biometric Scan.');
        if (result.success) {
            showFlashMessage('Nice', 'Valid biometric data.', 'success');
            
            if(this.state.username && this.state.password){
                this._loginAttempt(this.state.username, this.state.password);
            }else{
                showFlashMessage('Error', 'Impossible to get the stored credentials.', 'danger');
                this.setState({biometric: false});
            }            
        } else {
            showFlashMessage('Error', 'Biometric data not recognised.', 'danger');
        }
    };

    _resetCredentials = () => {
        // reset state
        this.setState({resetCredentials: true, username:'', password: '', biometric: false});

        // delete username and password from securestore
        SecureStore.deleteItemAsync('username')
            .then(() => {
                SecureStore.deleteItemAsync('password')
                    .then(() => {
                        this.setState({resetCredentials: false});
                    }).catch((error) => {
                        console.log(error);
                        this.setState({resetCredentials: false});
                    });
            }).catch((error) => {
                console.log(error);
                this.setState({resetCredentials: false});
            });
    }

    _loginAttempt = (username, password) => {
        this.props.login(username, password)
    }

    _processLogin = () => {
        // redirect user to homepage
        this._navigateTo('drawerStack');
    }

    componentDidMount(){
        // try to get credentials from securestore
        SecureStore.getItemAsync("username")
            .then((data) => {
                this.setState(
                    {
                        username: (data === null) ? '' : data
                    }, () => {
                        SecureStore.getItemAsync("password")
                            .then((data) => this.setState(
                                {
                                    password: (data === null) ? '' : data
                                }, () => {
                                    // modify the state with the useful informations
                                    this.setState({
                                        biometric: (this.state.username === '' || this.state.username === '') ? false : true,
                                    });
                                }
                            ))
                            .catch((error) => console.log(error));
                    }
                )
            })
            .catch((error) => console.log(error));

        // check if biometric authentication is available
        this.checkDeviceForHardware();
    }

    componentDidUpdate() {
        // if login was successful
        if (this.props.auth.token) {
            // if device compatible with biometric features, store the credentials in securestore
            if(this.state.compatible){
                SecureStore.setItemAsync("username", this.state.username)
                    .then(() => {
                        
                        SecureStore.setItemAsync("password", this.state.password)
                            .then(() => {
                                this._processLogin();
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            }else{
                this._processLogin();
            }            
        }
    }    

    render() {
        if(this.state.compatible 
            && this.state.biometric
            && this.state.username !== '' 
            && this.state.password !== ''){
            return (                
                <Container>
                    <Content padder>
                        <Button
                            transparent
                            large
                            block                            
                            style={{ margin: 15, marginTop: 50 }}
                            onPress={ this.checkForBiometrics }
                        >
                            <Icon 
                                style={{fontSize:100}} 
                                name="finger-print"
                            />                            
                        </Button>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'grey'}}>Press here to use biometric login.</Text>
                        </View>
                        <Button
                            block
                            style={{ margin: 15, marginTop: 50 }}
                            onPress={this._resetCredentials}
                            disabled={this.state.resetCredentials}
                        >
                            <Text>Reset credentials</Text>
                        </Button>
                        {(this.state.resetCredentials) ?
                            <Container>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Spinner color={Colors.headerBackground} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text>Please wait...</Text>
                                    </View>
                                </View>
                            </Container>
                            :
                            null
                        }
                    </Content>
                </Container>
            );
            
        }else{
            return (
                <Container>
                    <Content padder>
                        <Form>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input
                                    textContentType='username'
                                    autoCapitalize='none'
                                    editable={!(this.props.auth.loginAttempt)}
                                    autoCorrect={false}
                                    value={this.state.username}
                                    onChangeText={(username) => this.setState({ username })}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry
                                    editable={!(this.props.loginAttempt)}
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>
                        </Form>
                        <Button
                            block
                            style={{ margin: 15, marginTop: 50 }}
                            // only enabled if username and password are filled-in AND if no login attempt is being performed
                            disabled={this.props.auth.loginAttempt || !this.state.username || !this.state.password}
                            onPress={() => this._loginAttempt(this.state.username, this.state.password)}>
                            <Text>Sign in</Text>
                        </Button>
                        {(this.props.auth.loginAttempt) ?
                            <Container>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Spinner color={Colors.headerBackground} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text>Please wait...</Text>
                                    </View>
                                </View>
                            </Container>
                            :
                            null
                        }
                    </Content>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);