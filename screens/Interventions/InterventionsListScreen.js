import React from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Icon } from 'native-base';

import InterventionsList from '../../components/interventions/InterventionsList';

class InterventionsListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Interventions",
        headerLeft: <Icon name="menu" style={{marginLeft:30, color:'white'}} onPress={() => navigation.toggleDrawer()} />,
    })

    render() {
        return (
            <Container>
                <InterventionsList />
            </Container>
        );
    }
}

export default withNavigation(InterventionsListScreen);