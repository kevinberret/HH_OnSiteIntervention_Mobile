import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';

import { Icon } from 'native-base';

import DrawerMenu from '../components/DrawerMenu';

// drawer stack
const DrawerStack = createDrawerNavigator(
    {
        home: { screen: HomeScreen },
        links: { screen: LinksScreen },
        settings: { screen: SettingsScreen },
    }, 
    {
        gesturesEnabled: false,
        contentComponent: (props) => <DrawerMenu {...props} />
    }
)

const DrawerNavigation = createStackNavigator(
    {
        DrawerStack: { screen: DrawerStack }
    }, 
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => (
            {
                headerStyle: {
                    backgroundColor: Colors.headerBackground
                },
                title: 'OnSiteInterventions',
                headerTintColor: 'white',
                headerLeft: <Icon name="menu" style={{marginLeft:30, color:'white'}} onPress={() => navigation.toggleDrawer()} />,
                headerForceInset:{
                    top:'never' // remove unnecessary padding in header
                }
            }
        )
    }
)

// login stack
const LoginStack = createStackNavigator(
    {
        loginScreen: { 
            screen: LoginScreen 
        }
    }, 
    {
        headerMode: 'float',
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.headerBackground
            },
            title: 'Please first log in',
            headerTintColor: 'white',
            headerForceInset:{
                top:'never' // remove unnecessary padding in header
            }
        }
    }
)

// Manifest of possible screens
// Manifest of possible screens
const PrimaryNav = createStackNavigator(
    {
        loginStack: { 
            screen: LoginStack 
        },
        drawerStack: { 
            screen: DrawerNavigation 
        }
    },
    {
        // Default config for all screens
        headerMode: 'none',
        title: 'Main',
        initialRouteName: 'loginStack'
    }
);

export default PrimaryNav;