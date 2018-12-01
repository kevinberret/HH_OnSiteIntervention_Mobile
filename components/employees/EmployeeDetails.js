import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Text, Icon, Card, CardItem } from 'native-base';

class EmployeeDetails extends Component {

    render() {        
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>{this.props.current.firstname} {this.props.current.lastname}</Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="briefcase"/>
                            <Text>
                                {this.props.current.workRate}%
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        current: state.employees.current,
    };
}

EmployeeDetails = (connect(mapStateToProps, null))(EmployeeDetails);

export default EmployeeDetails;