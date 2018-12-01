import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// CUSTOMERS
import CustomersListScreen from '../screens/Customers/CustomersListScreen';
import CustomerAddScreen from '../screens/Customers/CustomerAddScreen';
import CustomerDetailsScreen from '../screens/Customers/CustomerDetailsScreen';
import CustomerEditScreen from '../screens/Customers/CustomerEditScreen';

// EMPLOYEES
import EmployeesListScreen from '../screens/Employees/EmployeesListScreen';
import EmployeeDetailsScreen from '../screens/Employees/EmployeeDetailsScreen';

// INTERVENTIONS
import InterventionsListScreen from '../screens/Interventions/InterventionsListScreen';
import InterventionDetailsScreen from '../screens/Interventions/InterventionDetailsScreen';
import InterventionEditScreen from '../screens/Interventions/InterventionEditScreen';

import Colors from '../constants/Colors';

import DrawerMenu from '../components/DrawerMenu';

// adding different stack navigators for customers, employees and interventions
const HomeStack = createStackNavigator(
    {
        Home: { 
            screen: HomeScreen
        }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: ({navigation}) => (            
            {
                headerStyle: {
                    backgroundColor: Colors.headerBackground
                },
                headerTintColor: 'white',               
                headerForceInset:{
                    top:'never' // remove unnecessary padding in header
                }
            }
        )
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile: { 
            screen: ProfileScreen
        }
    },
    {
        initialRouteName: 'Profile',
        navigationOptions: ({navigation}) => (            
            {
                headerStyle: {
                    backgroundColor: Colors.headerBackground
                },
                headerTintColor: 'white',               
                headerForceInset:{
                    top:'never' // remove unnecessary padding in header
                }
            }
        )
    }
);

// adding different stack navigators for customers, employees and interventions
const CustomerStack = createStackNavigator(
    {
        CustomersList: { 
            screen: CustomersListScreen
        },
        CustomerDetails:{
            screen: CustomerDetailsScreen
        },
        CustomerAdd:{
            screen: CustomerAddScreen
        },
        CustomerEdit:{
            screen: CustomerEditScreen
        }
    },
    {
        initialRouteName: 'CustomersList',
        navigationOptions: ({navigation}) => (            
            {
                headerStyle: {
                    backgroundColor: Colors.headerBackground
                },
                headerTintColor: 'white',               
                headerForceInset:{
                    top:'never' // remove unnecessary padding in header
                }
            }
        )
    }
);

const EmployeesStack = createStackNavigator(
    {
        EmployeesList: { 
            screen: EmployeesListScreen
        },
        EmployeeDetails:{
            screen: EmployeeDetailsScreen
        }
    },
    {
        initialRouteName: 'EmployeesList',
        navigationOptions: ({navigation}) => (            
            {
                headerStyle: {
                    backgroundColor: Colors.headerBackground
                },
                headerTintColor: 'white',               
                headerForceInset:{
                    top:'never' // remove unnecessary padding in header
                }
            }
        )
    }
);

const InterventionsStack = createStackNavigator(
    {
        InterventionsList: { 
            screen: InterventionsListScreen
        },
        InterventionDetails:{
            screen: InterventionDetailsScreen
        },
        InterventionEdit:{
            screen: InterventionEditScreen
        }
    },
    {
        initialRouteName: 'InterventionsList',
        navigationOptions: ({navigation}) => (            
            {
                headerStyle: {
                    backgroundColor: Colors.headerBackground
                },
                headerTintColor: 'white',               
                headerForceInset:{
                    top:'never' // remove unnecessary padding in header
                }
            }
        )
    }
);

// drawer stack
const DrawerStack = createDrawerNavigator(
    {
        Home: { 
            screen: HomeStack
        },
        Profile:{
            screen: ProfileStack
        },
        Customers:{
            screen: CustomerStack
        },
        Employees:{
            screen: EmployeesStack
        },
        Interventions: {
            screen: InterventionsStack
        },
    }, 
    {
        gesturesEnabled: false,
        initialRouteName: 'Home',
        contentComponent: (props) => <DrawerMenu {...props} />,
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
            screen: DrawerStack 
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

//export default DrawerStack;