import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Icon } from 'native-base';

import InterventionEdit from '../../components/interventions/InterventionEdit';
import { updateIntervention, deleteIntervention } from '../../actions/interventions';

class InterventionEditScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Edit intervention informations",
        headerRight: <Icon name="trash" style={{marginRight:30, color:'white'}} onPress={() => navigation.state.params.deleteIntervention()} />,
    })

    componentDidMount() {
        this.props.navigation.setParams({
            deleteIntervention: () => this.props.deleteIntervention(this.props.current._links.self.href)
        });
    }

    render() {
        return (
            <Container>
                <InterventionEdit
                    onSubmit={(values) => {console.log(values);this.props.updateIntervention(this.props.current._links.self.href, values);}}
                    initialValues={{
                        date: this.props.current.date,
                        description: this.props.current.description,
                        done: this.props.current.done,
                        duration: this.props.current.duration,
                        feedback: this.props.current.feedback,
                        materialNeeded: this.props.current.materialNeeded,
                        phoneNumber: this.props.current.phoneNumber,
                        signature: this.props.current.signature,
                        time: this.props.current.time                        
                    }}
                    update={true}
                />
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
        updateIntervention : (link, intervention) => dispatch(updateIntervention(link, intervention)),
        deleteIntervention : (link) => dispatch(deleteIntervention(link))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterventionEditScreen);