import React from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Content, Icon, Fab } from 'native-base';

import Colors from '../../constants/Colors';

import CustomersList from '../../components/customers/CustomersList'

class CustomersListScreen extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <CustomersList />                    
                </Content>
                <Fab
                    containerStyle={{ }}
                    style={{ backgroundColor: Colors.headerBackground }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('New customer')}
                >
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}

export default withNavigation(CustomersListScreen);