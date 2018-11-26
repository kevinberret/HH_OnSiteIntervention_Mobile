import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

// CUSTOMERS
import CustomersListScreen from '../screens/Customers/CustomersListScreen';
import CustomerAddScreen from '../screens/Customers/CustomerAddScreen';
import CustomerDetailsScreen from '../screens/Customers/CustomerDetailsScreen';

// EMPLOYEES
import EmployeesListScreen from '../screens/Employees/EmployeesListScreen';
import EmployeeDetailsScreen from '../screens/Employees/EmployeeDetailsScreen';
import EmployeeAddScreen from '../screens/Employees/EmployeeAddScreen';

// INTERVENTIONS
import InterventionsListScreen from '../screens/Interventions/InterventionsListScreen';
import InterventionDetailsScreen from '../screens/Interventions/InterventionDetailsScreen';
import InterventionEditScreen from '../screens/Interventions/InterventionEditScreen';

import Colors from '../constants/Colors';

import { Icon } from 'native-base';

import DrawerMenu from '../components/DrawerMenu';

// drawer stack
const DrawerStack = createDrawerNavigator(
    {
        'Home': { 
            screen: HomeScreen
        },
        'My interventions':{
            screen: InterventionsListScreen
        },
        'Intervention details':{
            screen: InterventionDetailsScreen
        },
        'Edit intervention':{
            screen: InterventionEditScreen
        },
        'Customers': { 
            screen: CustomersListScreen
        },
        'Customer details':{
            screen: CustomerDetailsScreen
        },
        'New customer':{
            screen: CustomerAddScreen
        },
        'Employees': { 
            screen: EmployeesListScreen
        },
        'Employee details':{
            screen: EmployeeDetailsScreen
        },
        'New employee':{
            screen: EmployeeAddScreen
        },
    }, 
    {
        gesturesEnabled: false,
        contentComponent: (props) => <DrawerMenu {...props} />
    }
)

DrawerStack.navigationOptions = ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];

    // You can do whatever you like here to pick the title based on the route name
    const headerTitle = routeName;

    return {
        headerTitle,
    };
}

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
                headerTitle: navigation.state.routeName,
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