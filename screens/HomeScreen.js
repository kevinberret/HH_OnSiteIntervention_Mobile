import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Icon, H2 } from 'native-base';
import { BackHandler } from 'react-native';

import { showFlashMessage } from '../actions/utils';

import InterventionsList from '../components/interventions/InterventionsList';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Home",
        headerLeft: <Icon name="menu" style={{marginLeft:30, color:'white'}} onPress={() => navigation.toggleDrawer()} />,
    })

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
2
    handleBackButton() {
        showFlashMessage('Info', 'Please logout instead of using back button.', 'info');
        return true;
    }

    render() {
        return (
            <Container>
                <Content padder>                    
                    <H2>Welcome, {this.props.auth.user.firstname}</H2> 
                    <InterventionsList/>                 
                </Content>                
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, null)(HomeScreen);