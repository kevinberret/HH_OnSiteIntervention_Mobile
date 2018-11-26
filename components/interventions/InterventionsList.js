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
    Icon
} from "native-base";

import moment from 'moment';

import { getAllInterventions, setCurrentIntervention } from '../../actions/interventions'

class InterventionsList extends Component {
    componentDidMount() {
        this.props.getAllInterventions(this.props.employeeId);
        console.log(this.props.navigation)
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item }) => {
        // compute start time and estimated endtime of intervention
        const startTime = moment(item.date + ' ' + item.time);
        const endTime = moment(startTime).add(moment.duration(item.duration));

        return (
            <ListItem
                style={{ marginLeft: 0 }}
                onPress={() => {
                    this.props.setCurrentIntervention(item);
                    this.props.navigation.navigate('Intervention details');
                }}
            >
                <Body>
                    <Text>{item._embedded.customer.firstname} {item._embedded.customer.lastname}</Text>
                    <Text note>{item._embedded.customer.address.street} {item._embedded.customer.address.number} {item._embedded.customer.address.zip} {item._embedded.customer.address.city}</Text>
                    <Text note>{moment(startTime).format("DD.MM.YY")} ({moment(startTime).format("HH:mm")}-{moment(endTime).format("HH:mm")})</Text>
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
                        data={this.props.interventions.list}
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
        interventions: state.interventions,
        employeeId: state.auth.user.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterventions: (employeeId) => dispatch(getAllInterventions(employeeId)),
        setCurrentIntervention: (intervention) => dispatch(setCurrentIntervention(intervention)),
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(InterventionsList));