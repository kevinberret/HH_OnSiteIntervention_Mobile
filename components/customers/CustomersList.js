import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { FlatList  } from "react-native";
import Swipeout from 'react-native-swipeout';

import { Text, Right, Body, ListItem, Icon } from "native-base";

import { getAllCustomers, setCurrentCustomer, deleteCustomer } from '../../actions/customers';

class CustomersList extends Component {
    constructor(props) {
        super(props);
     
        this.state = ({
            activeRow: null
        });
    }

    componentDidMount() {
        this.props.getAllCustomers();
    }

    _keyExtractor = (item, index) => index.toString();

    _onSwipeOpen(id, rowId, direction) {
        this.setState({ activeRow: id });
    }
     
    _onSwipeClose(id, rowId, direction) {
        if (id === this.state.activeRow && typeof direction !== 'undefined') {
            this.setState({ activeRow: null });
        }
    }

    _renderItem = ({ item }) => {
        // configuration example found here: https://shellmonger.com/2017/08/07/implementing-swipe-right-on-a-react-native-flatlist/
        const swipeSettings = {
            autoClose: true,
            close: (item._links.self.href !== this.state.activeRow),
            onClose: (secId, rowId, direction) => this._onSwipeClose(item._links.self.href, rowId, direction),
            onOpen: (secId, rowId, direction) => this._onSwipeOpen(item._links.self.href, rowId, direction),
            left: [
                { onPress: () => this.props.deleteCustomer(item._links.self.href), text: 'Delete', type: 'delete' }
            ],
            backgroundColor: '#ffffff'
        }

        return (
            <Swipeout
                {...swipeSettings}
            >
                <ListItem 
                    style={{ marginLeft: 0 }}
                    onPress={() => {
                        this.props.setCurrentCustomer(item);
                        this.props.navigation.navigate('CustomerDetails');
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
            </Swipeout>
        );
    }

    render() {
        return (
            <FlatList                    
                data={this.props.customers.list}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this.props.getAllCustomers}
                refreshing={this.props.customers.isLoading}
                extraData={this.props.customers.list.length}                
            />  
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
        deleteCustomer: (link) => dispatch(deleteCustomer(link))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CustomersList));