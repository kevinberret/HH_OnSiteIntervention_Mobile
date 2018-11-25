import React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';

import { logout } from '../actions/login';

import InterventionsList from '../components/interventions/InterventionsList'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);