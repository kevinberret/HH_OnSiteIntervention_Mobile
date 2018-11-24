import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Body, Text } from 'native-base';
import { connect } from 'react-redux';

import { logout } from '../actions/login';

import InterventionsList from '../components/interventions/InterventionsList'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
        <Container>
          <Header>
            <Body>
              <Title>OnSite Interventions</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <InterventionsList/>
          </Content>
          <Footer>
            <FooterTab>
              <Button 
                full
                onPress={() => 
                  {
                    this.props.logout();
                    console.log(this.props.auth);
                    this.props.navigation.navigate('Login');
                  }
                }
              >
                <Text>Log out</Text>
              </Button>
            </FooterTab>
          </Footer>
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
    logout: () => {dispatch(logout())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);