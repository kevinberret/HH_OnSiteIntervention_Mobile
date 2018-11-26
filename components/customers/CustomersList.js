import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { FlatList } from "react-native";

import {
    Container,
    Content,
    Text,
    Right,
    Body,
    ListItem,
    Icon,
} from "native-base";

import { getAllCustomers, setCurrentCustomer } from '../../actions/customers';

class CustomersList extends Component {
    componentDidMount() {
        this.props.getAllCustomers();
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item }) => {
        return (
            <ListItem 
                style={{ marginLeft: 0 }}
                onPress={() => {
                    this.props.setCurrentCustomer(item);
                    this.props.navigation.navigate('Customer details');
                }}
            >
                <Body>
                    <Text>{item.firstname} {item.lastname}</Text>
                    <Text note>{item.address.street} {item.address.number} {item.address.zip} {item.address.city}</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.props.customers.list}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        customers: state.customers,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCustomers: () => dispatch(getAllCustomers()),
        setCurrentCustomer: (customer) => dispatch(setCurrentCustomer(customer)),
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CustomersList));