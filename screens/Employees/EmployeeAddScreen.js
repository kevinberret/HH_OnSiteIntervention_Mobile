import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import EmployeeDetails from '../../components/employees/EmployeeDetails';
import { createEmployee } from '../../actions/employees';

class EmployeeAddScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <EmployeeDetails
                        onSubmit={(values) => {
                            this.props.createEmployee(values);
                            this.props.navigation.navigate('home');
                        }}
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            workRate: ''
                        }}
                        update={false}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        actionFailed: state.employees.actionFailed,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEmployee : (employee) => dispatch(createEmployee(employee))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAddScreen);