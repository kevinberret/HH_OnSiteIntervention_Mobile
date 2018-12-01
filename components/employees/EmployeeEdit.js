import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Field,reduxForm } from 'redux-form';

import { Container, Content, Button, Text, Form, Item, Input, Label, Icon } from 'native-base';

const validate = values => {
    const error= {};
    error.firstname = '';
    error.lastname = '';
    error.workrate = '';

    if(values.firstname === undefined || values.firstname.length < 1 || values.firstname === ''){
      error.firstname= 'Please provide a firstname';
    }

    if(values.lastname === undefined || values.lastname.length < 1 || values.lastname === ''){
        error.lastname= 'Please provide a lastname';
    }

    if(!/^\d+$/.test(values.workRate) || values.workRate < 10 || values.workRate > 100){
        error.workRate= 'Please provide a work rate (number from 10-100)';
    }

    return error;
};

class EmployeeEdit extends Component {

    renderInput({ input, label, type, meta: { touched, error, warning }, ...custom }){
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
                    {...custom}
                />
                {hasError ? <Icon active name='close-circle' /> : <Icon />}            
            </Item>
        )
    }

    renderNumericInput({ input, label, type, meta: { touched, error, warning } }){
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
                keyboardType='numeric'
            />
            {hasError ? <Icon active name='close-circle' /> : <Icon />}
          </Item>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        
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
                            name="workRate"
                            label="Work rate (10-100)"
                            component={this.renderNumericInput}
                        />
                        <Field
                            name="passwordHash"
                            label="New password"
                            placeholder="Won't change if stay empty..."
                            component={this.renderInput}
                            secureTextEntry
                        />
                    </Form>
                    <Button
                        block 
                        primary
                        style={{ marginTop: 50 }}
                        onPress= { () => {
                            handleSubmit();
                        }}
                    >
                        <Text>Update</Text>                      
                    </Button>
                </Content>
            </Container>
        );
    }
}

EmployeeEdit = reduxForm({form: 'employeeEdit', validate})(EmployeeEdit);

export default withNavigation(EmployeeEdit);