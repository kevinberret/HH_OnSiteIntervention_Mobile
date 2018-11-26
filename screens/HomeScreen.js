import React from 'react';
import { Container, Content } from 'native-base';
import { BackHandler } from 'react-native';

import { showFlashMessage } from '../actions/utils';

import InterventionsCalendar from '../components/interventions/InterventionsCalendar';

class HomeScreen extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        showFlashMessage('Info', 'Please logout instead of using back button.', 'info');
        return true;
    }

    render() {
        return (
            <Container>
                <Content>
                    
                </Content>
            </Container>
        );
    }
}

export default HomeScreen;