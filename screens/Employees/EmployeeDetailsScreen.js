import React, { Component } from 'react';
import { Container } from 'native-base';

import EmployeeDetails from '../../components/employees/EmployeeDetails';

class EmployeeDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Employee details",
    })

    render() {
        return (
            <Container>
                <EmployeeDetails />
            </Container>
        );
    }
}
export default EmployeeDetailsScreen;