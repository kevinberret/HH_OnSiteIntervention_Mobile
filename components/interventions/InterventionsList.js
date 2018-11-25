import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlatList } from "react-native";

import {
    Container,
    Content,
    Text,
    Right,
    Body,
    ListItem
} from "native-base";

import moment from 'moment';

import { getAllInterventions } from '../../actions/interventions'

class InterventionsList extends Component {
    componentDidMount() {
        this.props.getAllInterventions();
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item }) => {
        // compute start time and estimated endtime of intervention
        const startTime = moment(item.date + ' ' + item.time);
        const endTime = moment(startTime).add(moment.duration(item.duration));

        return (
            <ListItem style={{ marginLeft: 0 }}>
                <Body>
                    <Text>{item._embedded.customer.firstname} {item._embedded.customer.lastname}</Text>
                    <Text note>{item._embedded.customer.address.street} {item._embedded.customer.address.number} {item._embedded.customer.address.zip} {item._embedded.customer.address.city}</Text>
                </Body>
                <Right>
                    <Text note>{moment(startTime).format("DD.MM.YY")}</Text>
                    <Text note>{moment(startTime).format("HH:mm")}-{moment(endTime).format("HH:mm")}</Text>
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterventions: () => dispatch(getAllInterventions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterventionsList);