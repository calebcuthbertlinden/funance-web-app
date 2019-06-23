import React, { Component } from 'react';
import { Route, Link, withRouter} from 'react-router-dom';
import ProfileService from '../services/profile-service.js';
import Budget from '../budget/budget-list-component.js';
import Gameboard from '../gameboard/gameboard-component.js';
import FunancialAdvisor from '../gameboard/funancial-advisor.js';

import * as loaderAnimation from '../animations/atmcash.json';
import * as incorrectAnimation from '../animations/moneystack.json';
import * as coinsAnimation from '../animations/coinstack.json';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Lottie from 'react-lottie'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();
        this.state = {
            username: this.props.username,
            newUser: this.props.newUser,
            showBudgetOnboarding: false,
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

    updateOnboardingSeen() {
        this.setState({showBudgetOnboarding:false});
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

        if (this.state.newUser) {

            if (this.state.step === "STEP_ONE") {
                return (
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <ul id="nav">
                                <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                                <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                                <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                                <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                                <li id="nav-right"><Link to="/funancial-advisor"><h3>Funancial Advisor</h3></Link></li>
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
                                    newUser={this.state.showBudgetOnboarding}
                                    updateOnboardingSeen={this.updateOnboardingSeen.bind(this)} 
                                />}
                            />
                            <Route
                                path={'/profile'}
                            />

                            <Route
                                path={'/funancial-advisor'}
                                component={() => <FunancialAdvisor/>}
                            />
    
                            <center>         
                                <div id="onboarding-div">
                                    <Lottie options={stepOne}
                                        height={200}
                                        width={200}
                                        isStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}/>
        
                                    <div>
                                        What is your total income for the month? This includes your salary, any ad-hoc payments.<br/>
                                        Essentially anything coming into your account.
                                        <br/>
                                        <br/>
                                        <div class="field">
                                            R<input
                                                type="number"
                                                placeholder="Monthly income"
                                                value={this.state.income} 
                                                onChange={this.handleIncomeChange}
                                                />
                                        </div>
                                        <br/>
                                        <br/>
                                        <Button variant="contained" color="primary" label="Submit" onClick={() => this.updateStep("STEP_TWO")} style={style}>
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </center>   
                        </MuiThemeProvider>
                    </div>
                );
            } else if (this.state.step === "STEP_TWO") {
                return (
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <ul id="nav">
                                <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                                <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                                <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                                <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                                <li id="nav-right"><Link to="/funancial-advisor"><h3>Funancial Advisor</h3></Link></li>
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
                                    newUser={this.state.showBudgetOnboarding}
                                    updateOnboardingSeen={this.updateOnboardingSeen.bind(this)} 
                                />}
                            />
                            <Route
                                path={'/profile'}
                            />
                            
                            <Route
                                path={'/funancial-advisor'}
                                component={() => <FunancialAdvisor/>}
                            />
    
                            <center>         
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
                                        <br/>
                                        <div class="field">
                                            R<input
                                                type="number"
                                                placeholder="Savings"
                                                value={this.state.savings} 
                                                onChange={this.handleSavingsChange}
                                                />
                                        </div>
                                        <br/>
                                        <br/>    
                                        <Button variant="contained" color="primary"  label="Submit" onClick={() => this.updateStep("STEP_THREE")} style={style}>
                                        Next
                                        </Button>
                                    </div>
                                </div>
                            </center>   
                        </MuiThemeProvider>
                    </div>
                );
            } else if (this.state.step === "STEP_THREE") {
                return (
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <ul id="nav">
                                <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                                <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                                <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                                <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                                <li id="nav-right"><Link to="/funancial-advisor"><h3>Funancial Advisor</h3></Link></li>
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
                                    newUser={this.state.showBudgetOnboarding}
                                    updateOnboardingSeen={this.updateOnboardingSeen.bind(this)} 
                                />}
                            />
                            <Route
                                path={'/profile'}
                            />

                            <Route
                                path={'/funancial-advisor'}
                                component={() => <FunancialAdvisor/>}
                            />
    
                            <center>         
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
                                        <br/>
                                        <div class="field">
                                            R<input
                                                type="number"
                                                placeholder="Investments value"
                                                value={this.state.investments} 
                                                onChange={this.handleInvestmentsChange}
                                                />
                                        </div>
                                        <br/>
                                        <br/>
                                        <Button variant="contained" color="primary" label="Submit" onClick={() => this.setBasicInfo()} style={style}>
                                            Complete
                                        </Button>
                                    </div>
                                </div>
                            </center>   
                        </MuiThemeProvider>
                    </div>
                );
            }

        } else {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <ul id="nav">
                            <li id="nav-left"><Link to="/"><h3>back</h3></Link></li>
                            <li id="nav-right"><Link to="/profile"><h3>Profile</h3></Link></li>
                            <li id="nav-right"><Link to="/gameboard"><h3>Gameboard</h3></Link></li>
                            <li id="nav-right"><Link to="/budget"><h3>Budget</h3></Link></li>
                            <li id="nav-right"><Link to="/funancial-advisor"><h3>Funancial Advisor</h3></Link></li>
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
                                showBudgetOnboarding={this.state.showBudgetOnboarding}
                                updateOnboardingSeen={this.updateOnboardingSeen.bind(this)} 
                            />}
                        />
                        <Route
                            path={'/profile'}
                        />
                        
                        <Route
                            path={'/funancial-advisor'}
                            component={() => <FunancialAdvisor/>}
                        />
                    </MuiThemeProvider>
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
        });
        this.setState({newUser:false});
        this.setState({showBudgetOnboarding:true})
        this.props.history.push('/budget');
    }
}

const style = {
    margin: 15,
};

export default withRouter(Dashboard);
