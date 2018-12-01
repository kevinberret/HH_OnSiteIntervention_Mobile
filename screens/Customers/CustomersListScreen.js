import React from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Icon, Fab } from 'native-base';

import Colors from '../../constants/Colors';

import CustomersList from '../../components/customers/CustomersList'

class CustomersListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Customers",
        headerLeft: <Icon name="menu" style={{marginLeft:30, color:'white'}} onPress={() => navigation.toggleDrawer()} />,
    })

    render() {
        return (
            <Container>
                <CustomersList /> 
                <Fab
                    containerStyle={{ }}
                    style={{ backgroundColor: Colors.headerBackground }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('CustomerAdd')}
                >
                    <Icon name="add" />
                </Fab>                
            </Container>
        );
    }
}

export default withNavigation(CustomersListScreen);