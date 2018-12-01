import React from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Icon, Fab } from 'native-base';

import EmployeesList from '../../components/employees/EmployeesList';

class EmployeesListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Employees",
        headerLeft: <Icon name="menu" style={{marginLeft:30, color:'white'}} onPress={() => navigation.toggleDrawer()} />,
    })

    render() {
        return (
            <Container>
                <EmployeesList />
            </Container>
        );
    }
}

export default withNavigation(EmployeesListScreen);