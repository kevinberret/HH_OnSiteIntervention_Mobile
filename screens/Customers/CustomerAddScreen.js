import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import CustomerEdit from '../../components/customers/CustomerEdit';
import { createCustomer } from '../../actions/customers'

class CustomerAddScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Add a new customer"
    })

    render() {
        return (
            <Container>
                <CustomerEdit
                    onSubmit={(values) => {
                        this.props.createCustomer(values);
                    }}
                    update={false}
                />
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCustomer : (customer) => dispatch(createCustomer(customer))
    }
}

export default connect(null, mapDispatchToProps)(CustomerAddScreen);