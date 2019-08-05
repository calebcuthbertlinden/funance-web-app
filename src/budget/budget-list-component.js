import React, { Component } from 'react';
import ProfileService from '../services/profile-service.js';
import Category from './budget-categories';
import {Helmet} from 'react-helmet';
import Lottie from 'react-lottie'
import * as loaderAnimation from '../animations/loader-themed.json'
import * as coinsAnimation from '../animations/coins.json'
import * as atmCashAnimation from '../animations/atmcash.json';
import Modal from 'react-modal';
import { AccountBalanceWallet, AccountBalance, CheckCircle, CalendarToday } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import { Switch, Route } from 'react-router-dom';

class Budget extends Component {
  constructor(props) {
    super(props);
    this.profileService = new ProfileService();
    this.state = {
      budgetCategories: [],
      username: this.props.username,
      amountPaid: 0,
      amountTotal: 0,
      moneyRemaining: this.props.income,
      timeRemaining: "days left this month",
      isLoading:false,
      outstandingPayments: 0,
      showBudgetOnboarding:this.props.showBudgetOnboarding,
      error:false,
      errorMessage:"",
      updateIncomeValue:0
    };
    
    this.handleUpdatedIncome = this.handleUpdatedIncome.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
      this.getBudget();
  }

  changeView() {
      this.setState({amountTotal:this.state.amountTotal+1})
  }

  updateAmountPaid(amountValue) {
    this.setState({amountPaid:this.state.amountPaid+1});
    this.setState({moneyRemaining:this.state.moneyRemaining-amountValue});
    this.setState({outstandingPayments:this.state.outstandingPayments - parseFloat(amountValue)});
  }

  updateAmountToPay(amountValue) {
    var amount = this.state.outstandingPayments + parseFloat(amountValue);
    this.setState({outstandingPayments:amount});
  } 

  handleUpdatedIncome(event) {
    this.setState({updateIncomeValue: event.target.value});
  }

  setupBudgetState() {
    if (this.state.budgetCategories === undefined || this.state.budgetCategories == null) {
    } else {
      // TODO fix this
    }
  }

  exitOnBoarding() {
      this.setState({showBudgetOnboarding:false})
      this.props.updateOnboardingSeen();
  }

  updateIncome() {
    this.setState({showUpdateIncome:true})
  }

  closeModal() {
    this.setState({showUpdateIncome:false})
  }

  render() {

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

    const loadingOptions = {
      loop: true,
      autoplay: true, 
      animationData: loaderAnimation.default,
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

    const atmCash = {
        loop: true,
        autoplay: true, 
        animationData: atmCashAnimation.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
      <div>
        <div id="headerLayout">
            <h2 id="budgetHeader">My Budget</h2>
            <span className="parent-element"><CheckCircle/><h4>{this.state.amountPaid}/{this.state.amountTotal} items payed</h4></span>
            <span className="parent-element"><AccountBalanceWallet/><h4>R{this.state.outstandingPayments} left to pay</h4></span>
            <span className="parent-element" id="update-income" style={{cursor:'pointer'}} onClick={() => this.updateIncome()}><AccountBalance/><h4>R{this.state.moneyRemaining} left in the bank</h4></span>
            <span className="parent-element"><CalendarToday/><h4>{this.state.timeRemaining}</h4></span>
        </div>

        <Switch>
            <Route
                path={'/'}
            />
        </Switch>
       
        <Modal
            isOpen={this.state.showBudgetOnboarding}
            style={customStyles}
            contentLabel="Example Modal">
            <div>
                <center>
                    <h3>This is your Budget view.</h3>
                    <Helmet>
                        <style>{'body { background-color: #f8f8f8; }'}</style>
                    </Helmet>
                    <Lottie options={coinsOption}
                        height={400}
                        width={400}
                        isStopped={this.state.isStopped}
                        isPaused={this.state.isPaused}/>
                    <MuiThemeProvider theme={theme}>
                        You are able to add and manage all expenses for the month<br/>
                        Each category is for a specific type of payment.<br/>
                        Go ahead and try add an item, it's easy to follow.<br/><br/>
                        <Button variant="contained" color="primary" style={style} onClick={() => this.exitOnBoarding()}>
                            Let's get started!
                        </Button>
                    </MuiThemeProvider>
                </center>
            </div>
        </Modal>

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

        {/* Update income modal */}
        <Modal
            isOpen={this.state.showUpdateIncome}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <div>
                <center>
                  <h3>Update your monthly income</h3>
                  <Lottie options={atmCash}
                    height={100}
                    width={100}
                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}/>

                    <div class="field">
                        <input
                            type="number"
                            placeholder="Income"
                            value={this.state.value} 
                            onChange={this.handleUpdatedIncome}
                            />
                    </div>
                    
                    <br/>
                    <Button variant="outlined" color="primary" label="Submit" onClick={() => this.closeModal()} style={style}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" label="Submit" onClick={() => this.setNewIncome()} style={style}>
                        Complete
                    </Button>

                </center>
            </div>
        </Modal>

        <Helmet>
            <style>{'body { background-color: #DFDFDF; }'}</style>
        </Helmet>

        { !this.state.showBudgetOnboarding ? 
          <MuiThemeProvider>
            <div>
              <center>
                  <Helmet>
                      <style>{'body { background-color: #DFDFDF; }'}</style>
                  </Helmet>
                  <div class='hs'>
                      {      
                        this.state.error ?
                        <div></div> :               
                        this.state.budgetCategories.map((budgetCategory) => (
                        <div>    
                            <div class="category-heading">
                                <center>
                                  <h2>{budgetCategory.category}</h2>
                                </center>
                            </div>
                            <Category view={this.changeView.bind(this)} updateAmountPaid={this.updateAmountPaid.bind(this)} updateAmountToPay={this.updateAmountToPay.bind(this)} budgetList={budgetCategory.budget} category={budgetCategory.category} username={this.state.username}/>
                        </div>
                      ))}
                  </div>
              </center>
            </div>
          </MuiThemeProvider>
          : null
        }
      </div>
    );
  }

  getBudget() {
    this.setState({isLoading:true});
    if (this.state.username !== null || this.state.username !== undefined || this.state.username !== "") {
      this.profileService.getBudget(this.state.username).then(
        (data) => {
          if (data !== null || data !== undefined) {
            this.setState({ budgetCategories:data.categories })
            this.setState({ amountPaid:data.amountComplete })
            this.setState({ amountTotal:data.amountTotal })
            this.setState({ timeRemaining:data.daysLeftThisMonth })
            this.setState({ outstandingPayments:data.outstandingPaymentAmount })
            this.setState({ moneyRemaining:data.income });
            this.setState({ isLoading:false })
            this.setupBudgetState();
          } else {
            this.setState({error:true})
            this.setState({errorMessage:"There was an error trying to register. Please try again or contact *** for assistance."})
          }
      });
    } else {
      this.navigateBackToLogin();
    }
  }

  setNewIncome() {
    this.setState({showUpdateIncome:false});
    this.setState({isLoading:true});
    console.log(this.state.updateIncomeValue);
    if (this.state.updateIncomeValue !== null || this.state.updateIncomeValue !== undefined) {
      this.profileService.updateIncomeOnly(this.state.username, this.state.updateIncomeValue).then(
        (data) => {
          this.setState({isLoading:false});
          this.setState({moneyRemaining:this.state.updateIncomeValue});
      });
    } 
  }
}

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


const style = {
  margin: 15,
};

export default Budget;