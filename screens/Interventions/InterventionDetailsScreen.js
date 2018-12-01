import React, { Component } from 'react';
import { Container, Icon } from 'native-base';

import InterventionDetails from '../../components/interventions/InterventionDetails';

class InterventionDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Intervention details",
        headerRight: <Icon name="create" style={{marginRight:30, color:'white'}} onPress={() => navigation.navigate('InterventionEdit')} />,
    })

    render() {
        return (
            <Container>
                <InterventionDetails />
            </Container>
        );
    }
}

export default InterventionDetailsScreen;