import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Field, reduxForm } from 'redux-form';
import { View } from 'react-native';

import { Container, Content, Button, Text, Form, Item, Input, Label, Icon } from 'native-base';

class InterventionEdit extends Component {
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

    render() {
        const { handleSubmit, update } = this.props;

        return (
            <Container>
                <Content padder style={{flex:1}}>                      
                    <View style={{flex:1}}>
                        <Form>                            
                            <Field
                                name="feedback"
                                label="Feedback"
                                component={this.renderTextArea}
                            />
                        </Form>
                        <Button
                            block 
                            primary
                            style={{ marginTop: 50 }}
                            onPress= { () => {
                                handleSubmit();
                                this.props.navigation.navigate('InterventionsList');
                            }}
                        >
                            {(update) ? <Text>Update</Text> : <Text>Add</Text>}
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

InterventionEdit = reduxForm({form: 'interventionEdit'})(InterventionEdit);

export default withNavigation(InterventionEdit);