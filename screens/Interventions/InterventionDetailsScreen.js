import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import InterventionDetails from '../../components/interventions/InterventionDetails';

class InterventionDetailsScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <InterventionDetails />
                </Content>
            </Container>
        );
    }
}

export default InterventionDetailsScreen;