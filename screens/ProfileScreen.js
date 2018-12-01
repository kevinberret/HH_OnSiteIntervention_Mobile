import React from 'react';
import { connect } from 'react-redux';
import { Container, Text, Spinner, Icon } from 'native-base';
import { View } from 'react-native';

import Colors from '../constants/Colors';

import EmployeeEdit from '../components/employees/EmployeeEdit';

import { updateEmployee, getEmployeeById} from '../actions/employees';

import SERVER_URL from '../config/config';

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Edit your informations",
        headerLeft: <Icon name="menu" style={{marginLeft:30, color:'white'}} onPress={() => navigation.toggleDrawer()} />,
    })

    componentDidMount(){
        this.props.getEmployeeById(`${SERVER_URL}api/employees/${this.props.auth.user.id}`);
    }

    render() {
        if(this.props.employees.current !== null){
            return (
                <Container>
                    <EmployeeEdit
                        onSubmit={(values) => {this.props.updateEmployee(this.props.employees.current._links.self.href, values); this.props.navigation.navigate('Home');}}
                        initialValues={{
                            firstname: this.props.employees.current.firstname,
                            lastname: this.props.employees.current.lastname,
                            workRate: this.props.employees.current.workRate.toString()
                        }}
                    />
                </Container>
            );
        }else{
            return (
                <Container>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Spinner color={Colors.headerBackground} />
                        </View>
                        <View style={{flex:1}}>
                            <Text>Please wait...</Text>
                        </View>
                    </View>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        employees: state.employees,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEmployee : (link, employee) => dispatch(updateEmployee(link, employee)),
        getEmployeeById: (id) => { dispatch(getEmployeeById(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);