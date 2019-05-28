import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserService from './services/user-service.js'
import Dashboard from './dashboard-component.js';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
  
import Lottie from 'react-lottie'
import * as animationData from './animations/scheme.json'
import * as loaderAnimation from './animations/loader-themed.json'
import * as incorrectAnimation from './animations/incorrect.json'
import * as coinsAnimation from './animations/coins.json'


import {Helmet} from 'react-helmet';
import './index.css';
import Modal from 'react-modal';


import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import {teal500, cyan500} from 'material-ui/styles/colors';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            username:'',
            password:'',
            confirmPassword:'',
            firstname:'',
            lastname:'',
            email:'',
            loggedIn:false,
            registerView:false,
            isStopped:false,
            isPaused:false,
            checked:false,
            showOnboarding:false,
            isLoading:false,
            errorMessage:"You have entered incorrect information.",
            newUser:false
        }
        this.userService = new UserService();
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordNameChange = this.handlePasswordNameChange.bind(this);
        this.handleConfirmPasswordNameChange = this.handleConfirmPasswordNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordNameChange(event) {
        this.setState({password: event.target.value});
        this.validatePassword();
    }

    handleConfirmPasswordNameChange(event) {
        this.setState({confirmPassword: event.target.value});
        this.validatePassword();
    }

    handleFirstNameChange(event) {
        this.setState({firstname: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastname: event.target.value});
    }
    
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleCheck() {
        this.setState({checked: !this.state.checked});
    }
    
    closeModal() {
        this.setState({isIncorrectInfo: false});
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

          const loadingOptions = {
            loop: true,
            autoplay: true, 
            animationData: loaderAnimation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

          const incorrect = {
            loop: false,
            autoplay: true, 
            animationData: incorrectAnimation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

          const coinsOption = {
            loop: true,
            autoplay: true, 
            animationData: coinsAnimation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        const theme = getMuiTheme({
            palette: {
              primary: teal500,
              secondary: cyan500,
            },
        });
          
          if (this.state.loggedIn === true) {
            console.log("logged in");
                return (
                    <BrowserRouter>
                        <Modal
                            isOpen={this.state.showOnboarding}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal">
                            <div>
                                <center>
                                    <h3>Welcome to Funance!</h3>
                                    <Helmet>
                                        <style>{'body { background-color: #f8f8f8; }'}</style>
                                    </Helmet><Lottie options={coinsOption}
                                        height={400}
                                        width={400}
                                        isStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}/>
                                    <MuiThemeProvider>
                                        We hope you learn alot.<br/>
                                        We have setup a sample budget item to get you started.<br/>
                                        You've also earned yourself a 100 coins for signing up.<br/><br/>
                                        <RaisedButton label="continue" primary={true} style={style} onClick={() => this.exitOnBoarding()}/>
                                    </MuiThemeProvider>
                                </center>
                            </div>
                        </Modal>
                        <Helmet>
                            <style>{'body { background-color: #f8f8f8; }'}</style>
                        </Helmet>
                        <Switch>
                            <Route
                                path={'/'}
                                component={() => <Dashboard
                                    username={this.state.username}
                                    newUser={this.state.newUser}
                                />}
                            />
                        </Switch>
                    </BrowserRouter>
                )
        } else if (this.state.registerView === true) {

            // USER HAS SAID THEY WANT TO REGISTER
            return (
                <div>
                    <center>
                    <Lottie options={defaultOptions}
                                    height={200}
                                    width={400}
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}/>   

                    <div>     
                        <Helmet>
                            <style>{'body { background-color: #DFDFDF; }'}</style>
                        </Helmet>
                        
                        <h2>Funance</h2>
                        <h4>Join Funance now. The best way to learn how to manage your finances. </h4>
                        <h4>Keep engagement through being rewarded for checking off your payments</h4>

                        <MuiThemeProvider>
                            <div>
                                <TextField
                                    hintText="Enter your email"
                                    floatingLabelText="Email"
                                    value={this.state.value} onChange={this.handleEmailChange}
                                    />
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Username"
                                    value={this.state.value} onChange={this.handleUserNameChange}
                                    />
                                <br/>
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
                                    value={this.state.value} onChange={this.handlePasswordNameChange}
                                    />
                                <TextField
                                    type="password"
                                    hintText="Confirm your Password"
                                    floatingLabelText="Confirm password"
                                    value={this.state.value} onChange={this.handleConfirmPasswordNameChange}
                                    />
                                <br/>
                                <br/>

                                <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
                                Have you read and accepted the <a href="second.html">Terms and conditions?</a>
                                <br/>
                                <br/>
                            </div>
                    
                            <Button style={style} onClick={() => this.backFromRegister()}>Back</Button>
                            <Button style={style} onClick={() => this.register()}>Register</Button>
                        </MuiThemeProvider>
                    </div>
                    
                    <div>
                        <Modal
                            isOpen={this.state.isLoading}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal">
                            <div>
                                <Helmet>
                                    <style>{'body { background-color: #f8f8f8; }'}</style>
                                </Helmet>
                                <center><Lottie options={loadingOptions}
                                    height={100}
                                    width={100}
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}/>
                                </center>`
                            </div>
                        </Modal>

                        {/* Incorrect info modal */}
                        <Modal
                            isOpen={this.state.isIncorrectInfo}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal">
                            <div>
                                <center><Lottie options={incorrect}
                                    height={100}
                                    width={100}
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}/>
                                </center>
                                <h4>{this.state.errorMessage}</h4>
                            </div>
                        </Modal>
                    </div>
                    </center>
                </div>
            )
        } else {
            return (
                <div>
                    <center>
                        <Lottie options={defaultOptions}
                                            height={200}
                                            width={400}
                                            isStopped={this.state.isStopped}
                                            isPaused={this.state.isPaused}/>
    
                        <h2>Funance</h2>

                        <Helmet>
                            <style>{'body { background-color: #DFDFDF; }'}</style>
                        </Helmet>
                        <MuiThemeProvider>
                            <div>
                                <div>
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Username"
                                    value={this.state.value} onChange={this.handleUserNameChange}
                                    />
                                <br/>
                                <TextField
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    value={this.state.value} onChange={this.handlePasswordNameChange}
                                    />
                                <br/>
                                <Button variant="outlined" color="inherit" primary={true} type="outline" style={style} onClick={() => this.login()}>Login</Button>
                                </div>
                                <div onClick={() => this.navigateToRegister()}>
                                    <h5>No account? Click here to register.</h5>
                                </div>
                            
                            </div>
                        </MuiThemeProvider>
                            
                        {/* Loader modal */}
                        <Modal
                            isOpen={this.state.isLoading}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal">
                            <div>
                                <center><Lottie options={loadingOptions}
                                    height={100}
                                    width={100}
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}/>
                                </center>
                            </div>
                        </Modal>

                        {/* Incorrect info modal */}
                        <Modal
                            isOpen={this.state.isIncorrectInfo}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal">
                            <div>
                                <center><Lottie options={incorrect}
                                    height={100}
                                    width={100}
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}/>
                                </center>
                                <h4>{this.state.errorMessage}</h4>
                            </div>
                        </Modal>
                    </center>
                </div> 
            );
        }
    }

    login() {
        this.setState({isLoading:true})
        this.userService.login(this.state.username, this.state.password).then(
            (data) => {
                console.log(data);
                if (data === undefined || data == null) {
                    this.setState({isIncorrectInfo:true})
                    this.setState({errorMessage:"There was an error trying to login. Please try again or contact *** for assistance."})
                } else {
                    if (data.status === "LOGGED_IN") {
                        this.setState({loggedIn:true});
                    } else if (data.status === "NO_ACCOUNT") {
                        this.setState({isIncorrectInfo:true})
                        this.setState({errorMessage:"This account does not exist. Make sure you entered the details correctly."})
                    } else {
                        this.setState({isIncorrectInfo:true})
                        this.setState({errorMessage:"You have entered incorrect login details. Please try again."})
                    }
                }
                
                this.setState({isLoading:false})
          });
    }

    register() {
        this.setState({isLoading:true})
        this.userService.register(this.state.username, this.state.password, this.state.firstname, this.state.lastname, "email@email.com").then(
            (data) => {
                console.log(data.status);
                if (data === undefined || data == null) {
                    this.setState({isIncorrectInfo:true})
                    this.setState({errorMessage:"There was an error trying to register. Please try again or contact *** for assistance."})
                } else if (data.status === "ALREADY_EXISTS") {
                    console.log(data.status);
                    this.setState({isIncorrectInfo:true})
                    this.setState({errorMessage:"The chosen username is already taken. Please choose another."})
                } else if (data.status === "CREATED") {
                    this.setState({loggedIn:true});
                    this.setState({showOnboarding:true});
                }
                this.setState({isLoading:false})
          });
    }

    validatePassword() {
        if (this.state.password != this.state.confirmPassword) {
            this.setState({canRegister:false})
        }
    }

    backFromRegister() {
        this.setState({registerView:false})
    }

    navigateToRegister() {
        this.setState({registerView:true});
    }

    exitOnBoarding() {
        this.setState({showOnboarding:false})
        this.setState({newUser:true})
    }
}

const style = {
    margin: 15,
};

const customStyles = {
    content : {
        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        marginRight : '-50%',
        transform   : 'translate(-50%, -50%)',
        background  : '#f7f6f2'  
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
