import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import UserService from '../services/user-service.js';
import {
    withRouter
  } from 'react-router-dom'

  
import Lottie from 'react-lottie'
import * as animationData from '../animations/data.json'

class Login extends Component {
    constructor(props){
        super(props);
        this.userService = new UserService();
        this.state={
            username:'',
            password:''
        }
        
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordNameChange = this.handlePasswordNameChange.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordNameChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return (
        <div>
            
            <Lottie options={defaultOptions}
                                height={200}
                                width={200}
                                isStopped={this.state.isStopped}
                                isPaused={this.state.isPaused}/>

            <MuiThemeProvider>
            <div>
            <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                value={this.state.value} onChange={this.handleUserNameChange}
                />
            <br/>
                <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                value={this.state.password} onChange={this.handlePasswordNameChange}
                />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={() => this.login()}/>
            </div>
            <div><h5>{this.state.loggedInStatus}</h5></div>
            </MuiThemeProvider>
        </div>
        );
    }
    
    login() {
        this.userService.login(this.state.username, this.state.password).then(
            (data) => {
                console.log(data);
                this.navigateToBudget(data.status);
          });
    }

    navigateToBudget(status) {
        if (status === "LOGGED_IN") {
            this.props.history.push('/budget/' + this.state.username)
        }
    }

    register() {
        // show item in pop up dialog
    }
}

const style = {
    margin: 15,
};

export default withRouter(Login)