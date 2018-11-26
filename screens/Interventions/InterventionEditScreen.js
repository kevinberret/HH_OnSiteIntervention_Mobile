import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import InterventionEdit from '../../components/interventions/InterventionEdit';
import { updateIntervention } from '../../actions/interventions';

class InterventionEditScreen extends Component {
    componentDidMount(){console.log(this.props.current)}
    render() {
        return (
            <Container>
                <Content>
                    <InterventionEdit
                        onSubmit={(values) => {this.props.updateIntervention(this.props.current._links.self.href, values); this.props.navigation.navigate('Home');}}
                        initialValues={{
                            description: this.props.current.description,
                            materialNeeded: this.props.current.materialNeeded,
                            phoneNumber: this.props.current.phoneNumber,
                            feedback: this.props.current.feedback
                        }}
                        update={true}
                    />
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
        updateIntervention : (link, intervention) => dispatch(updateIntervention(link, intervention))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterventionEditScreen);