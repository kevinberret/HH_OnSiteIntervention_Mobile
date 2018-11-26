import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { Linking, View } from 'react-native';

import moment from 'moment';

import openMap from 'react-native-open-maps';

import { deleteIntervention } from '../../actions/interventions';

import {
    Container,
    Content,
    Text,
    H1,
    H2,
    H3,
    Button,
    Right,
    Left,
    Body,
    Icon,
    Card,
    CardItem
} from "native-base";


class InterventionDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            isVisible:false
        };
    }

    _pressCall = (phoneNumber) => {
        const url=`tel://${phoneNumber}`
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    render() {
        // compute start time and estimated endtime of intervention
        const startTime = moment(this.props.current.date + ' ' + this.props.current.time);
        const endTime = moment(startTime).add(moment.duration(this.props.current.duration));
        
        const address = this.props.current._embedded.customer.address.street + ' ' + this.props.current._embedded.customer.address.number + ' ' + this.props.current._embedded.customer.address.zip + ' ' + this.props.current._embedded.customer.address.city;
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>{this.props.current._embedded.customer.firstname} {this.props.current._embedded.customer.lastname}</Text>
                            <Right>
                                <Icon 
                                    name="done-all" 
                                    style={{color: (this.props.current.done) ? 'green': 'red'}}
                                />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="home"/>
                            <Text>
                                {address}
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="call"/>
                            <Text onPress={() => this._pressCall(this.props.current.phoneNumber.replace(/\s/g,''))}>
                                {(this.props.current.phoneNumber) ? this.props.current.phoneNumber : '-' }
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="information-circle"/>
                            <Text>
                                {(this.props.current.description) ? this.props.current.description : '-' }
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="briefcase"/>
                            <Text>
                                {(this.props.current.materialNeeded) ? this.props.current.materialNeeded : '-' }
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="time"/>
                            <Text>
                                {moment(startTime).format("DD.MM.YY")} ({moment(startTime).format("HH:mm")}-{moment(endTime).format("HH:mm")})
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="navigate"/>
                            <Text
                                onPress={() => openMap({travelType: 'drive', end:address})}
                            >
                                Go there
                            </Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem footer bordered>
                            <Icon active name="create"/>
                            <Text
                                onPress={() => this.props.navigation.navigate('Edit intervention')}
                            >
                                Edit intervention
                            </Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem footer bordered>
                            <Icon active name="trash"/>
                            <Text
                                onPress={() => this.props.navigation.navigate('Edit intervention')}
                            >
                                Delete intervention
                            </Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        current: state.interventions.current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInterventions: (employeeId) => dispatch(getAllInterventions(employeeId)),
        deleteIntervention: (link) => dispatch(deleteIntervention(link))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(InterventionDetails));