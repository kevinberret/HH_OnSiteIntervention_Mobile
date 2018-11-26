import React from 'react';
import { Container, Content } from 'native-base';

import InterventionsList from '../../components/interventions/InterventionsList';

class InterventionsListScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <InterventionsList />
                </Content>
            </Container>
        );
    }
}

export default InterventionsListScreen;