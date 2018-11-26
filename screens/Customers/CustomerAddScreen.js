import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import CustomerDetails from '../../components/customers/CustomerDetails';
import { createCustomer } from '../../actions/customers'

class CustomerAddScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <CustomerDetails
                        onSubmit={(values) => {
                            this.props.createCustomer(values);
                        }}
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            address:{
                                city: '',
                                latitude: 0,
                                longitude: 0,
                                number: '',
                                street: '',
                                zip: ''
                            }
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
        actionFailed: state.customers.actionFailed,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCustomer : (customer) => dispatch(createCustomer(customer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddScreen);