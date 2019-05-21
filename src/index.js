import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Budget from './budget/budget-list-component.js';
import UserService from './services/user-service.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
  
import Lottie from 'react-lottie'
import * as animationData from './animations/data.json'
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            username:'',
            password:'',
            firstname:'',
            lastname:'',
            loggedIn:false,
            registerView:false
        }
        this.userService = new UserService();
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordNameChange = this.handlePasswordNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handLastNameChange = this.handLastNameChange.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordNameChange(event) {
        this.setState({password: event.target.value});
    }

    handleFirstNameChange(event) {
        this.setState({firstname: event.target.value});
    }

    handLastNameChange(event) {
        this.setState({lastname: event.target.value});
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

        if (this.state.loggedIn === true) {
            console.log("logged in");

            // USER HAS SUCCESSFULLY LOGGED IN

            return (
                <BrowserRouter>
                    <center>
                    <Switch>
                        <Route
                            path={'/'}
                            component={() => <Budget
                                username={this.state.username}
                            />}
                        />
                        <Route
                            path={'/register'}
                            component={() => <Budget
                                username={this.state.username}
                            />}
                        />
                    </Switch>
                    </center>
                </BrowserRouter>
            )
        } else if (this.state.registerView === true) {

            // USER HAS SAID THEY WANT TO REGISTER

            return (
                <div>
                    <center>
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
                        <TextField
                            hintText="Enter your First name"
                            floatingLabelText="First name"
                            value={this.state.value} onChange={this.handleFirstNameChange}
                            />
                        <TextField
                            hintText="Enter your Last name"
                            floatingLabelText="Last name"
                            value={this.state.value} onChange={this.handleLastNameChange}
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
                        </MuiThemeProvider>
                    </center>
                </div>
            )
        } else {
            return (
                <div>
                    <center>
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
                        <div onClick={() => this.register()}><h5>No account? Click here to register.</h5></div>
                        </MuiThemeProvider>
                    </center>
                </div>
            );
        }
    }

    login() {
        this.userService.login(this.state.username, this.state.password).then(
            (data) => {
                console.log(data);
                if (data.status === "LOGGED_IN") {
                    this.setState({loggedIn:true});
                }
          });
    }

    register() {
        this.setState({registerView:true});
    }
}

const style = {
    margin: 15,
};

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
