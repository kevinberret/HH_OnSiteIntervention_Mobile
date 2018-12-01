import React, { Component } from 'react';
import { Container, Icon } from 'native-base';

import CustomerDetails from '../../components/customers/CustomerDetails';

class CustomerDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Customer details",
        headerRight: <Icon name="create" style={{marginRight:30, color:'white'}} onPress={() => navigation.navigate('CustomerEdit')} />,
    })

    render() {
        return (
            <Container>
                <CustomerDetails />
            </Container>
        );
    }
}

export default CustomerDetailsScreen;