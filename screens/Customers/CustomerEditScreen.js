import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Icon } from 'native-base';

import CustomerEdit from '../../components/customers/CustomerEdit';
import { updateCustomer, deleteCustomer } from '../../actions/customers'

class CustomerEditScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Edit customer informations",
        headerRight: <Icon name="trash" style={{marginRight:30, color:'white'}} onPress={() => navigation.state.params.deleteCustomer()} />,
    })

    componentDidMount() {
        this.props.navigation.setParams({
            deleteCustomer: () => {
                this.props.deleteCustomer(this.props.current._links.self.href);
                this.props.navigation.navigate('CustomersList');
            }
        });
    }

    render() {
        return (
            <Container>
                <CustomerEdit
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
        updateCustomer : (link, customer) => dispatch(updateCustomer(link, customer)),
        deleteCustomer: (link) => dispatch(deleteCustomer(link))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditScreen);