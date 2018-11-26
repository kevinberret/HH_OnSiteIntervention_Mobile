import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from "react-native";

import { withNavigation } from 'react-navigation';

import {
    Container,
    Content,
    Text,
    Right,
    Body,
    ListItem,
    Icon
} from "native-base";

import { getAllEmployees, setCurrentEmployee } from '../../actions/employees';

class EmployeesList extends Component {
    componentDidMount() {
        this.props.getAllEmployees();
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item }) => {
        return (
            <ListItem 
                style={{ marginLeft: 0 }}
                onPress={() => {
                    this.props.setCurrentEmployee(item);
                    this.props.navigation.navigate('Employee details');
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
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.props.employees.list}
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
        employees: state.employees,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEmployees: () => dispatch(getAllEmployees()),
        setCurrentEmployee: (employee) => dispatch(setCurrentEmployee(employee)),
    }
}

export default  withNavigation(connect(mapStateToProps, mapDispatchToProps)(EmployeesList));