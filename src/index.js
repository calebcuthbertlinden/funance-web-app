import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom';
import UserService from './services/user-service.js'
import Dashboard from './dashboard-component.js';
  
import Lottie from 'react-lottie'
import * as animationData from './animations/scheme.json'
import * as loaderAnimation from './animations/loader-themed.json'
import * as incorrectAnimation from './animations/incorrect.json'
import * as coinsAnimation from './animations/coins.json'

import { Lock, PermIdentity } from '@material-ui/icons';

import {Helmet} from 'react-helmet';
import './index.css';
import Modal from 'react-modal';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';

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
            newUser:false,
            canRegister:false,
            passwordsMatching:true
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
    }

    handleConfirmPasswordNameChange(event) {
        this.setState({confirmPassword: event.target.value});
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
        this.setState({canRegister: !this.state.checked});
    }
    
    closeModal() {
        this.setState({isIncorrectInfo: false});
    }
    
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Only letters";
           }        
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
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

          const theme = createMuiTheme({
            palette: {
              primary: {
                  main: '#80cbc4'
              },
              secondary: {
                main: '#004d40',
              },
            },
          });

          if (this.state.username == null || this.state.username == undefined) {
              this.setState({loggedIn:false})
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
                        <MuiThemeProvider theme = {theme}>
                            <div id="login-form">
                                <div>
                                    <form>                                        
                                        <br/>

                                        <div class="field">
                                            <Lock id="mirrorInput"/>
                                            <input
                                                type="text"
                                                placeholder="Enter you username here"
                                                value={this.state.value} 
                                                onChange={this.handleUserNameChange}
                                                />
                                        </div>

                                        <div class="field">
                                            <PermIdentity id="mirrorInput"/>
                                            <input
                                                type="password"
                                                placeholder="Enter your password here"
                                                value={this.state.value} 
                                                onChange={this.handlePasswordNameChange}
                                                />
                                        </div>
                                    </form>

                                    <br/>

                                    <Button variant="contained" color="primary" style={style} onClick={() => this.login()}>Login</Button>
                                </div>

                                <div style={{cursor:'pointer'}} onClick={() => this.navigateToRegister()}>
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
          
          else if (this.state.loggedIn === true) {
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
                                    <MuiThemeProvider theme={theme}>
                                        We hope you learn alot.<br/>
                                        We have setup a sample budget item to get you started.<br/>
                                        You've also earned yourself a 100 coins for signing up.<br/><br/>
                                        <Button variant="outlined" color="primary" label="continue" style={style} onClick={() => this.exitOnBoarding()}>
                                            Let's get started!
                                        </Button>
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

                        <MuiThemeProvider theme = { theme }>
                            <div id="register-form">

                                <div class="field">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={this.state.value} 
                                        onChange={this.handleEmailChange}
                                        />

                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.value} 
                                        onChange={this.handleUserNameChange}
                                        />
                                </div>

                                <div class="field">
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={this.state.value} 
                                        onChange={this.handleFirstNameChange}
                                        />

                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={this.state.value} 
                                        onChange={this.handleLastNameChange}
                                        />
                                </div>
                                
                                <div class="field">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.value} 
                                        onChange={this.handlePasswordNameChange}
                                        />

                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        value={this.state.value} 
                                        onChange={this.handleConfirmPasswordNameChange}
                                        />
                                </div>

                                <br/>
                                <br/>
                                { !this.state.passwordsMatching ? <div>The passwords do not match</div> : null }
                                
                                <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
                                Have you read and accepted the <a href="second.html">Terms and conditions?</a>
                                <br/>
                                <br/>
                            </div>
                    
                            <Button variant="outlined" color="secondary" style={style} onClick={() => this.backFromRegister()}>Back</Button>
                            <Button variant="contained" disabled={!this.state.canRegister} color="primary" style={style} onClick={() => this.register()}>Register</Button>
                            
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
                        <MuiThemeProvider theme = {theme}>
                            <div id="login-form">
                                <div>
                                    <form>                                        
                                        <br/>

                                        <div class="field">
                                            <Lock id="mirrorInput"/>
                                            <input
                                                type="text"
                                                placeholder="Enter you username here"
                                                value={this.state.value} 
                                                onChange={this.handleUserNameChange}
                                                />
                                        </div>

                                        <div class="field">
                                            <PermIdentity id="mirrorInput"/>
                                            <input
                                                type="password"
                                                placeholder="Enter your password here"
                                                value={this.state.value} 
                                                onChange={this.handlePasswordNameChange}
                                                />
                                        </div>
                                    </form>

                                    <br/>

                                    <Button variant="contained" color="primary" style={style} onClick={() => this.login()}>Login</Button>
                                </div>

                                <div style={{cursor:'pointer'}} onClick={() => this.navigateToRegister()}>
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
        this.validatePassword();
        if (this.state.canRegister) {
            this.setState({isLoading:true})
            this.userService.register(this.state.username, this.state.password, this.state.firstname, this.state.lastname, "email@email.com").then(
                (data) => {
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
        } else {      
            this.setState({passwordsMatching:false})
        } 
    }

    validatePassword() {
        if (this.state.password != this.state.confirmPassword) {
            this.setState({passwordsMatching:false})
        } else {
            this.setState({passwordsMatching:true})
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
