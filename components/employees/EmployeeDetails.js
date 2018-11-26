import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Field,reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { deleteEmployee } from '../../actions/employees';

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

    if(!Number.isInteger(Number.parseInt(values.workRate))){
        error.workRate= 'Please provide a work rate (number from 1-100)';
    }

    return error;
};

class EmployeeDetails extends Component {

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
        const { handleSubmit, update } = this.props;
        console.log(this.props.current)
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
                            label="Work rate"
                            component={this.renderInput}
                        />
                    </Form>
                    <Button
                        block 
                        primary
                        style={{ marginTop: 50 }}
                        onPress= { () => {handleSubmit();this.props.navigation.navigate('Home');}}
                    >
                        {(update) ? <Text>Update</Text> : <Text>Add</Text>}                        
                    </Button>
                    {(update) ? /*
                    <Button
                        block
                        danger
                        style={{ marginTop: 15 }}                       
                        onPress= {() => {
                            this.props.deleteEmployee(this.props.current._links.self.href);
                            this.props.navigation.navigate('home');
                        }}
                    >
                        <Text>Delete</Text>
                    </Button>*/ null
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
        current: state.employees.current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEmployee: (link) => dispatch(deleteEmployee(link))
    }
}

EmployeeDetails = (connect(mapStateToProps, mapDispatchToProps))(EmployeeDetails);
EmployeeDetails = reduxForm({form: 'employeeDetails', validate})(EmployeeDetails);

export default withNavigation(EmployeeDetails);