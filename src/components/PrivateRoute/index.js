import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isValid : null};
    }
    render(){
        console.log(window.location.href);
        console.log("isValid:" + this.state.isValid);
        if(this.state.isValid === null)
            return(null);
        return(
            this.props.goToLogin && this.state.isValid ?
                this.props.children
            :
            this.props.goToLogin && !this.state.isValid ?
                <Redirect to='/login' />
            :
            !this.props.goToLogin && this.state.isValid ?
                <Redirect to='/'/>
            :
                this.props.children
        );
    }

    async checkJwt(){
        const jwtToken = window.localStorage.getItem('jwtToken') || '';
        const response = await fetch('http://localhost:8080/jwtValidation',  { 
                                    method: 'GET', 
                                    headers: new Headers({
                                    'Authorization': jwtToken
                                    })
                                });
        if(response.ok){
            this.setState(prevState => ({isValid: true}));
        }
        else{
            this.setState(prevState => ({isValid: false}));
        }
    }

    componentDidMount() {
        this.checkJwt();
    }
}

export default PrivateRoute;