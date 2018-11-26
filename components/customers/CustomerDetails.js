import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Field,reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { deleteCustomer } from '../../actions/customers'

import { Container, Content, Button, Text, Form, Item, Input, Label, Icon } from 'native-base';

const validate = values => {
    const error= {};
    error.firstname = '';
    error.lastname = '';
    error.address = {
        street: '',
        number: '',
        zip: '',
        city: '',
    };

    if(values.firstname === undefined || values.firstname.length < 1 || values.firstname === ''){
      error.firstname= 'Please provide a firstname';
    }

    if(values.lastname === undefined || values.lastname.length < 1 || values.lastname === ''){
        error.lastname= 'Please provide a lastname';
    }

    if(values.address.street === undefined || values.address.street.length < 1 || values.address.street === ''){
        error.address.street= 'Please provide a street';
    }

    if(values.address.number === undefined || values.address.number.length < 1 || values.address.number === ''){
        error.address.number= 'Please provide a number';
    }

    if(values.address.zip === undefined || values.address.zip.length < 1 || values.address.zip === ''){
        error.address.zip= 'Please provide a ZIP code';
    }

    if(values.address.city === undefined || values.address.city.length < 1 || values.address.city === ''){
        error.address.city= 'Please provide a city';
    }

    return error;
};

class CustomerDetails extends Component {

    renderInput({ input, label, type, meta: { touched, error, warning } }){
        var hasError= false;

        if(error !== undefined){
          hasError= true;
        }

        return( 
          <Item stackedLabel error= {hasError}>
            <Label>{label}</Label>
            <Input 
                {...input}
                placeholder={hasError ? error : ''}
            />
            {hasError ? <Icon active name='close-circle' /> : <Icon />}
          </Item>
        )
    }

    render() {
        const { handleSubmit, update } = this.props;
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Field 
                            name="firstname"
                            label="First name"
                            component={this.renderInput}
                        />
                        <Field
                            name="lastname"
                            label="Last name"
                            component={this.renderInput}
                        />
                        <Field
                            name="address.street"
                            label="Street"
                            component={this.renderInput}
                        />
                        <Field
                            name="address.number"
                            label="Number"
                            component={this.renderInput}
                        />
                        <Field
                            name="address.zip"
                            label="ZIP Code"
                            component={this.renderInput}
                        />
                        <Field
                            name="address.city"
                            label="City"
                            component={this.renderInput}
                        />
                    </Form>
                    <Button
                        block 
                        primary
                        style={{ marginTop: 50 }}
                        onPress= { () => {
                            handleSubmit();
                            this.props.navigation.navigate('Home');
                        }}
                    >
                        {(update) ? <Text>Update</Text> : <Text>Add</Text>}                        
                    </Button>
                    {(update) ? 
                    <Button
                        block
                        danger
                        style={{ marginTop: 15 }}                       
                        onPress= {() => {
                            this.props.deleteCustomer(this.props.current._links.self.href);
                            this.props.navigation.navigate('Home');
                        }}
                    >
                        <Text>Delete</Text>
                    </Button>
                    :
                    null
                    }
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

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCustomer: (link) => dispatch(deleteCustomer(link))
    }
}

CustomerDetails = (connect(mapStateToProps, mapDispatchToProps))(CustomerDetails);
CustomerDetails = reduxForm({form: 'customerDetails', validate})(CustomerDetails);

export default withNavigation(CustomerDetails);