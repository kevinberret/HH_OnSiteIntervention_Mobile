import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content } from 'native-base';

import CustomerDetails from '../../components/customers/CustomerDetails';

import { updateCustomer } from '../../actions/customers'

class CustomerDetailsScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <CustomerDetails
                        onSubmit={(values) => this.props.updateCustomer(this.props.current._links.self.href, values)}
                        initialValues={{
                            firstname: this.props.current.firstname,
                            lastname: this.props.current.lastname,
                            address:{
                                city: this.props.current.address.city,
                                latitude: this.props.current.address.latitude,
                                longitude: this.props.current.address.longitude,
                                number: this.props.current.address.number,
                                street: this.props.current.address.street,
                                zip: this.props.current.address.zip
                            }
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
        current: state.customers.current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer : (link, customer) => dispatch(updateCustomer(link, customer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsScreen);