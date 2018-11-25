import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation'

import { Content, List, ListItem, Body, Left, Right, Text, Header, Icon } from 'native-base';
import Colors from '../constants/Colors';

import { logout } from '../actions/login';

class DrawerMenu extends Component {
    performLogout = () => {
        // perform real logout
        this.props.logout();

        // This will reset back to loginStack
        // https://github.com/react-community/react-navigation/issues/1127
        const actionToDispatch = StackActions.reset({
          index: 0,
          key: null,  // black magic
          actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
        })
        // reset the stack
        this.props.navigation.dispatch(actionToDispatch);
        //this.props.navigation.navigate('loginStack')
    }
    
    _displayUserInfo = () => {
        if(this.props.auth.user){
            return (
                <Header
                    style={{backgroundColor:Colors.headerBackground}}
                >
                    <Left>
                        <Icon name="person" style={{color:'white'}}/>        
                    </Left>
                    <Content>
                        <Text style={{color:'white'}}>{this.props.auth.user.firstname} {this.props.auth.user.lastname}</Text>
                    </Content>
                </Header>
            );
        }

        return null;
    }

    render() {
        const { navigation } = this.props;

        return (
            <Content>
                {this._displayUserInfo()}                
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Icon name="home" style={{color:'grey'}}/>   
                            </Left>
                            <Body>
                                <Text onPress={() => navigation.navigate('home')}>
                                    Home
                                </Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="link" style={{color:'grey'}}/>  
                            </Left>
                            <Body>
                                <Text onPress={() => navigation.navigate('links')}>
                                    Links
                                </Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="settings" style={{color:'grey'}}/>  
                            </Left>
                            <Body>
                                <Text onPress={() => navigation.navigate('settings')}>
                                    Settings
                                </Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="log-out" style={{color:'grey'}}/>  
                            </Left>
                            <Body>
                                <Text onPress={this.performLogout}>
                                    Logout
                                </Text>
                            </Body>
                        </ListItem>
                    </List> 
                </Content>               
            </Content>
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
        logout: () => { dispatch(logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);