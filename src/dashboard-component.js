import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProfileService from './services/profile-service.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Budget from './budget/budget-list-component.js';
import Gameboard from './gameboard/gameboard-component.js';

import * as loaderAnimation from './animations/atmcash.json';
import * as incorrectAnimation from './animations/moneystack.json';
import * as coinsAnimation from './animations/coinstack.json';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Lottie from 'react-lottie'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();
        this.state = {
            username: this.props.username,
            newUser: this.props.newUser,
            step: "STEP_ONE",
            income:0,
            savings:0,
            investments:0
        };

        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleSavingsChange = this.handleSavingsChange.bind(this);
        this.handleInvestmentsChange = this.handleInvestmentsChange.bind(this);
    }

    handleIncomeChange(event) {
        this.setState({income: event.target.value});
    }

    handleSavingsChange(event) {
        this.setState({savings: event.target.value});
    }

    handleInvestmentsChange(event) {
        this.setState({investments: event.target.value});
    }

    componentDidMount() {
        this.getDashboard();
    }

    render() {

        const stepOne = {
            loop: true,
            autoplay: true, 
            animationData: loaderAnimation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const stepTwo = {
            loop: true,
            autoplay: true, 
            animationData: incorrectAnimation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const stepThree = {
            loop: true,
            autoplay: true, 
            animationData: coinsAnimation.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        };

        if (this.state.newUser) {

            if (this.state.step == "STEP_ONE") {
                return (
                    <div>
                        <MuiThemeProvider>
                            <div id="nav">
                                <ul>
                                    <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                                    <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                                    <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                                    <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                                </ul>
                            </div>
                           
                                
                            <Route
                                path={'/gameboard'}
                                component={() => <Gameboard
                                    username={this.state.username}
                                />}
                            />
                            <Route
                                path={'/budget'}
                                component={() => <Budget
                                    username={this.state.username}
                                />}
                            />
                            <Route
                                path={'/profile'}
                            />
                        </MuiThemeProvider>
    
                        <center>         
                            <MuiThemeProvider>
                                <div id="onboarding-div">
                                    <Lottie options={stepOne}
                                        height={200}
                                        width={200}
                                        isStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}/>
        
                                    <div>
                                        What is your total income for the month? This includes your salary, any ad-hoc payments.<br/>
                                        Essentially anything coming into your account.<br/>
                                        R<TextField
                                            hintText="Enter total monthly income"
                                            floatingLabelText="Monthly income"
                                            onChange={this.handleIncomeChange}
                                            value={this.state.income}
                                            />
                                        <br/>
                                        <br/>
                                        <RaisedButton label="Submit" onClick={() => this.updateStep("STEP_TWO")} primary={true} style={style}/>
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </center>   
                    </div>
                );
            } else if (this.state.step == "STEP_TWO") {
                return (
                    <div>
                        <MuiThemeProvider>
                            <ul id="nav">
                                <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                                <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                                <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                                <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                            </ul>
                                
                            <Route
                                path={'/gameboard'}
                                component={() => <Gameboard
                                    username={this.state.username}
                                />}
                            />
                            <Route
                                path={'/budget'}
                                component={() => <Budget
                                    username={this.state.username}
                                />}
                            />
                            <Route
                                path={'/profile'}
                            />
                        </MuiThemeProvider>
    
                        <center>         
                            <MuiThemeProvider>
                                <div id="onboarding-div">
                                    <Lottie options={stepTwo}
                                        height={200}
                                        width={200}
                                        isStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}/>
        
                                    <br/>
                                    <br/>  
                                    <div>                                    
                                        How much do you currently have in savings?
                                        <br/>
                                        R<TextField
                                            hintText="Total amount in savings"
                                            floatingLabelText="Savings"
                                            onChange={this.handleSavingsChange}
                                            value={this.state.savings}
                                            />
                                        <br/>
                                        <br/>    
                                        <RaisedButton label="Submit" onClick={() => this.updateStep("STEP_THREE")} primary={true} style={style}/>
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </center>   
                    </div>
                );
            } else if (this.state.step == "STEP_THREE") {
                return (
                    <div>
                        <MuiThemeProvider>
                            <ul id="nav">
                                <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                                <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                                <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                                <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                            </ul>
                                
                            <Route
                                path={'/gameboard'}
                                component={() => <Gameboard
                                    username={this.state.username}
                                />}
                            />
                            <Route
                                path={'/budget'}
                                component={() => <Budget
                                    username={this.state.username}
                                />}
                            />
                            <Route
                                path={'/profile'}
                            />
                        </MuiThemeProvider>
    
                        <center>         
                            <MuiThemeProvider>
                                <div id="onboarding-div">
                                    <Lottie options={stepThree}
                                        height={200}
                                        width={200}
                                        isStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}/>
        
                                    <br/>
                                    <br/>
                                    <div>
                                        What is the total value of all your investments?
                                        <br/>
                                        R<TextField
                                            hintText="Total value of investments"
                                            floatingLabelText="Investments value"
                                            onChange={this.handleInvestmentsChange}
                                            value={this.state.investments}
                                            />
                                        <br/>
                                        <br/>
                                        <RaisedButton label="Submit" onClick={() => this.setBasicInfo()} primary={true} style={style}/>
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </center>   
                    </div>
                );
            }

        } else {
            return (
                <div>
                    <MuiThemeProvider>
                        <ul id="nav">
                            <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                            <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                            <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                            <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                        </ul>
                            
                        <Route
                            path={'/gameboard'}
                            component={() => <Gameboard
                                username={this.state.username}
                            />}
                        />
                        <Route
                            path={'/budget'}
                            component={() => <Budget
                                username={this.state.username} income={this.state.income}
                            />}
                        />
                        <Route
                            path={'/profile'}
                        />
                    </MuiThemeProvider>

                    <div>

                    </div>
                </div>
            );
        }
    }

    getDashboard() {
        this.profileService.getDashboard(this.state.username).then(
            (data) => {
            // TODO something with response
        });
    }

    updateStep(newStep) {
        this.setState({step:newStep})
    }

    setBasicInfo() {
        this.profileService.updateIncome(this.state.username, this.state.income, this.state.savings, this.state.investments).then(
            (data) => {
            console.log("finished with: " + data);
        });
        this.setState({newUser:false})
    }
}

const style = {
    margin: 15,
};

export default Dashboard;
