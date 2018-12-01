import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { FlatList } from "react-native";
import Swipeout from 'react-native-swipeout';

import { Text, Right, Body, ListItem, Icon } from "native-base";

import { getAllEmployees, setCurrentEmployee, deleteEmployee } from '../../actions/employees';

class EmployeesList extends Component {
    constructor(props) {
        super(props);
     
        this.state = ({
            activeRow: null
        });
    }

    componentDidMount() {
        this.props.getAllEmployees();
    }

    _keyExtractor = (item, index) => index.toString();

    _onSwipeOpen(id, rowId, direction) {
        this.setState({ activeRow: id }, console.log(this.state));
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
                { onPress: () => this.props.deleteEmployee(item._links.self.href), text: 'Delete', type: 'delete' }
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
                        this.props.setCurrentEmployee(item);
                        this.props.navigation.navigate('EmployeeDetails');
                    }}
                >
                    <Body>
                        <Text>{item.firstname} {item.lastname}</Text>
                        <Text note>Working at a rate of {item.workRate}%</Text>
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
                data={this.props.employees.list}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this.props.getAllEmployees}
                refreshing={this.props.employees.isLoading}
                extraData={this.props.employees.list.length}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEmployees: () => dispatch(getAllEmployees()),
        setCurrentEmployee: (employee) => dispatch(setCurrentEmployee(employee)),
        deleteEmployee: (link) => dispatch(deleteEmployee(link)),
    }
}

export default  withNavigation(connect(mapStateToProps, mapDispatchToProps)(EmployeesList));