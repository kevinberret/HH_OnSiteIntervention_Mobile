import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { FlatList } from "react-native";
import Swipeout from 'react-native-swipeout';

import { Text, Right, Body, ListItem, Icon } from "native-base";
import moment from 'moment';

import { getAllInterventions, setCurrentIntervention, resetCurrentIntervention, deleteIntervention, toggleInterventionStatus } from '../../actions/interventions'

class InterventionsList extends Component {
    constructor(props) {
        super(props);
     
        this.state = ({
            activeRow: null
        });
    }

    componentDidMount() {
        this.props.getAllInterventions(this.props.employeeId);
    }

    _keyExtractor = (item, index) => index.toString();

    _onSwipeOpen(item, rowId, direction) {
        this.props.setCurrentIntervention(item);
        this.setState({ activeRow: item });
    }
     
    _onSwipeClose(item, rowId, direction) {
        this.props.resetCurrentIntervention;
        if (item === this.state.activeRow && typeof direction !== 'undefined') {
            this.setState({ activeRow: null });
        }
    }

    _renderItem = ({ item }) => {        
        // compute start time and estimated endtime of intervention
        const startTime = moment(item.date + ' ' + item.time);
        const endTime = moment(startTime).add(moment.duration(item.duration));
        
        const toggleStatusButton = {};

        if(item.done){
            toggleStatusButton.text= 'Undone';
            toggleStatusButton.type = 'secondary';
        }else{
            toggleStatusButton.text= 'Done';
            toggleStatusButton.type = 'primary';
        }

        // configuration example found here: https://shellmonger.com/2017/08/07/implementing-swipe-right-on-a-react-native-flatlist/
        const swipeSettings = {
            autoClose: true,
            close: (item._links.self.href !== this.state.activeRow),
            onClose: (secId, rowId, direction) => this._onSwipeClose(item._links.self.href, rowId, direction),
            onOpen: (secId, rowId, direction) => this._onSwipeOpen(item._links.self.href, rowId, direction),
            left: [
                { onPress: () => this.props.toggleInterventionStatus(item._links.self.href, item), text: toggleStatusButton.text, type: toggleStatusButton.type },
                { onPress: () => this.props.deleteIntervention(item._links.self.href), text: 'Delete', type: 'delete' }
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
                        this.props.setCurrentIntervention(item);
                        this.props.navigation.navigate('InterventionDetails');
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
            </Swipeout>
        );
    }

    render() {
        if(this.props.interventions.list.length > 0){
            return (
                <FlatList
                    data={this.props.interventions.list}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onRefresh={() => this.props.getAllInterventions(this.props.employeeId)}
                    refreshing={this.props.interventions.isLoading}
                    extraData={this.props.interventions.list.length}
                />
            );
        }

        return (
            <Text>You don't have any interventions planned yet.</Text>
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
        resetCurrentIntervention: () => dispatch(resetCurrentIntervention()),
        deleteIntervention: (link) => dispatch(deleteIntervention(link)),
        toggleInterventionStatus: (link, intervention) => dispatch(toggleInterventionStatus(link, intervention)),
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(InterventionsList));