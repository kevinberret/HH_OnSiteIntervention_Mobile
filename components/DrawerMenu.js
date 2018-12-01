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
    }
    
    _displayUserInfo = (navigation) => {
        if(this.props.auth.user){
            return (
                <Header
                    style={{backgroundColor:Colors.headerBackground, flex:1, flexDirection:'row', alignItems:'center'}}                    
                >
                    <Left style={{flex:1}}>
                        <Icon name="person" style={{color:'white'}}/>        
                    </Left>
                    <Content style={{flex:1}}>                        
                        <Text 
                            style={{color:'white', fontWeight: 'bold'}} 
                            onPress={() => navigation.navigate('Profile')}
                        >
                            {this.props.auth.user.firstname} {this.props.auth.user.lastname}
                        </Text>                        
                    </Content>
                </Header>
            );
        }

        return null;
    }

    _adminMenu = (navigation) => {
        if(this.props.auth.user.role==='ADMIN'){
            return (
                <Content>
                    <ListItem avatar>
                        <Left>
                            <Icon name="people" style={{color:'grey'}}/>  
                        </Left>
                        <Body>
                            <Text onPress={() => navigation.navigate('Employees')}>
                                Employees
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem avatar>
                        <Left>
                            <Icon name="person" style={{color:'grey'}}/>  
                        </Left>
                        <Body>
                            <Text onPress={() => navigation.navigate('CustomersList')}>
                                Customers
                            </Text>
                        </Body>
                    </ListItem>
                </Content>
            );
        }

        return null;
    }

    render() {
        const { navigation } = this.props;

        return (
            <Content>
                {this._displayUserInfo(navigation)}                
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Icon name="home" style={{color:'grey'}}/>   
                            </Left>
                            <Body>
                                <Text onPress={() => navigation.navigate('Home')}>
                                    Home
                                </Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="briefcase" style={{color:'grey'}}/>  
                            </Left>
                            <Body>
                                <Text onPress={() => navigation.navigate('InterventionsList')}>
                                    Interventions
                                </Text>
                            </Body>
                        </ListItem>
                        {this._adminMenu(navigation)}
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
        logout: () => { dispatch(logout()) },        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);