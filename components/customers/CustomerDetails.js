import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Text, Icon, Card, CardItem } from 'native-base';

class CustomerDetails extends Component {

    render() {
        const address = this.props.current.address.street + ' ' + this.props.current.address.number + ' ' + this.props.current.address.zip + ' ' + this.props.current.address.city;

        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>{this.props.current.firstname} {this.props.current.lastname}</Text>
                        </CardItem>
                        <CardItem>
                            <Icon active name="home"/>
                            <Text>
                                {address}
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
        current: state.customers.current,
    };
}

CustomerDetails = (connect(mapStateToProps, null))(CustomerDetails);

export default CustomerDetails;