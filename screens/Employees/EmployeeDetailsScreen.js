import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import EmployeeDetails from '../../components/employees/EmployeeDetails';
import { updateEmployee } from '../../actions/employees';

class EmployeeDetailsScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <EmployeeDetails
                        onSubmit={(values) => {this.props.updateEmployee(this.props.current._links.self.href, values); this.props.navigation.navigate('home');}}
                        initialValues={{
                            firstname: this.props.current.firstname,
                            lastname: this.props.current.lastname,
                            workRate: this.props.current.workRate
                        }}
                        update={true}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        current: state.employees.current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEmployee : (link, employee) => dispatch(updateEmployee(link, employee))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailsScreen);