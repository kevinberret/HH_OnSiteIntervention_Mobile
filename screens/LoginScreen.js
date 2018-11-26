import React from 'react';
import { Container, Content , Button, Text, Form, Item, Input, Left, Right, Body, Label, Spinner } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';

import { login } from '../actions/login';

class LoginScreen extends React.Component {
    /*static navigationOptions = {
        header: null,
    };*/

    constructor(props){
        super(props);

        this.state = {
            username: 'user',
            password: 'user'
        }
    }

    componentDidUpdate() {
        // if login was successful => redirect user to homepage
        if(this.props.auth.token){
            this.props.navigation.navigate('drawerStack')
        }
    }

    render() {
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
                                    onChangeText={(username) => this.setState({username})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input 
                                    secureTextEntry      
                                    editable={!(this.props.loginAttempt)}                         
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                />
                            </Item>                        
                        </Form>
                        <Button 
                            block
                            style={{ margin: 15, marginTop: 50 }}
                            // only enabled if username and password are filled-in AND if no login attempt is being performed
                            disabled={this.props.auth.loginAttempt || !this.state.username || !this.state.password }
                            onPress={() => this.props.login(this.state.username, this.state.password)}>
                            <Text>Sign in</Text>
                        </Button>
                        {(this.props.auth.loginAttempt) ?
                        <Container>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                <View style={{flex:1}}>
                                    <Spinner color={Colors.headerBackground} />
                                </View>
                                <View style={{flex:1}}>
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