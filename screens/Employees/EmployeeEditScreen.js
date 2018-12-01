import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import EmployeeEdit from '../../components/employees/EmployeeEdit';

import { updateEmployee } from '../../actions/employees';
import { logout } from '../actions/login';

class EmployeeEditScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Edit your informations",
    })

    performLogout = () => {
        // perform real logout
        this.props.logout();

        // This will reset back to loginStack
        // https://github.com/react-community/react-navigation/issues/1127
        const actionToDispatch = StackActions.reset({
          index: 0,
          key: null,  // black magic
          actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
        })
        // reset the stack
        this.props.navigation.dispatch(actionToDispatch);
    }

    render() {
        return (
            <Container>
                <EmployeeEdit
                    onSubmit={(values) => {this.props.updateEmployee(this.props.current._links.self.href, values); this.props.navigation.navigate('home');}}
                    initialValues={{
                        firstname: this.props.current.firstname,
                        lastname: this.props.current.lastname,
                        workRate: this.props.current.workRate
                    }}
                    update={true}
                />
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
        updateEmployee : (link, employee) => dispatch(updateEmployee(link, employee)),
        logout: () => { dispatch(logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEditScreen);