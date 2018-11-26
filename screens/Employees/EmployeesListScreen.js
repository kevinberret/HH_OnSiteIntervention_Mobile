import React from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Content, Icon, Fab } from 'native-base';

import Colors from '../../constants/Colors';

import EmployeesList from '../../components/employees/EmployeesList';

class EmployeesListScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <EmployeesList />
                </Content>
                {/*
                <Fab
                    containerStyle={{ }}
                    style={{ backgroundColor: Colors.headerBackground }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('New employee')}
                >
                    <Icon name="add" />
                </Fab>
                */}
            </Container>
        );
    }
}

export default withNavigation(EmployeesListScreen);