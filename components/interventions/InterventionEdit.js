import React, { Component } from 'react';
import { Switch } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Field,reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { deleteIntervention } from '../../actions/interventions';

import { Container, Content, Button, Text, Form, Item, Input, Textarea, Label, Icon, CheckBox } from 'native-base';

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

class InterventionEdit extends Component {

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

    renderTextArea({ input, label, type, meta: { touched, error, warning } }){
        var hasError= false;

        if(error !== undefined){
          hasError= true;
        }

        return( 
            <Item stackedLabel error= {hasError}>
                <Label>{label}</Label>
                <Input                 
                    {...input}
                    multiline={true}
                    numberOfLines={5}
                    placeholder={hasError ? error : ''}
                />
                {hasError ? <Icon active name='close-circle' /> : <Icon />}
            </Item>
        )
    }

    renderCheckBox({ input, label, type, meta: { touched, error, warning } }){
        console.log(input);
        return <CheckBox checked={(input.value.length>0)} />
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

    normalizeNumbers = (value) => {
        if (!value) {
          return value
        }
      
        const onlyNums = value.replace(/[^\d]/g, '')
        return onlyNums
        if (onlyNums.length <= 3) {
          return onlyNums
        }
        if (onlyNums.length <= 7) {
          return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
        }
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
      }

    render() {
        const { handleSubmit, update } = this.props;
        console.log(this.props.current)
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Field 
                            name="description"
                            label="Description"
                            component={this.renderTextArea}
                        />
                        <Field
                            name="materialNeeded"
                            label="Material needed"
                            component={this.renderTextArea}
                        />
                        <Field
                            name="feedback"
                            label="Feedback"
                            component={this.renderTextArea}
                        />
                        <Field
                            name="phoneNumber"
                            label="Phone number"
                            component={this.renderInput}
                            normalize={this.normalizeNumbers}
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
                    {(update) ?
                    <Button
                        block
                        danger
                        style={{ marginTop: 15 }}                       
                        onPress= {() => {
                            this.props.deleteIntervention(this.props.current._links.self.href);
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
        current: state.interventions.current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteIntervention: (link) => dispatch(deleteIntervention(link))
    }
}

InterventionEdit = (connect(mapStateToProps, mapDispatchToProps))(InterventionEdit);
InterventionEdit = reduxForm({form: 'interventionDetails', /*validate*/})(InterventionEdit);

export default withNavigation(InterventionEdit);