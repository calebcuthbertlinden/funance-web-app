import React, { Component } from 'react';
import ProfileService from '../services/profile-service.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Category from './budget-categories';
import {Helmet} from 'react-helmet';
import Lottie from 'react-lottie'
import * as loaderAnimation from '../animations/loader-themed.json'
import Modal from 'react-modal';
import { AccountBalanceWallet, AccountBalance, CheckCircle, CalendarToday } from '@material-ui/icons';
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
      outstandingPayments: 0
    };
    var updateAmountPaid = this.updateAmountPaid.bind(this);
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

  setupBudgetState() {
    if (this.state.budgetCategories === undefined || this.state.budgetCategories == null) {
      console.log("error");
    } else {
      // TODO fix this
    }
  }

  render() {

    const loadingOptions = {
      loop: true,
      autoplay: true, 
      animationData: loaderAnimation.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    console.log(this.state.budgetCategories)
    return (
      <div>
        <div id="headerLayout">
            <h2 id="budgetHeader">My Budget</h2>
            <span id="parent-element"><CheckCircle/><h4>{this.state.amountPaid}/{this.state.amountTotal} items payed</h4></span>
            <span id="parent-element"><AccountBalanceWallet/><h4>R{this.state.outstandingPayments} left to pay</h4></span>
            <span id="parent-element"><AccountBalance/><h4>R{this.state.moneyRemaining} left in the bank</h4></span>
            <span id="parent-element"><CalendarToday/><h4>{this.state.timeRemaining}</h4></span>
        </div>
        <Helmet>
            <style>{'body { background-color: #DFDFDF; }'}</style>
        </Helmet>
        <MuiThemeProvider>
          <div>
            <center>
                <Helmet>
                    <style>{'body { background-color: #DFDFDF; }'}</style>
                </Helmet>
                <div class='hs'>
                    {this.state.budgetCategories.map((budgetCategory) => (
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
      </div>
    );
  }

  getBudget() {
    this.setState({isLoading:true});
    this.profileService.getBudget(this.state.username).then(
      (data) => {
        this.setState({ budgetCategories:data.categories })
        this.setState({ isLoading:false })
        this.setState({ amountPaid:data.amountComplete })
        this.setState({ amountTotal:data.amountTotal })
        this.setState({ timeRemaining:data.daysLeftThisMonth })
        this.setState({ outstandingPayments:data.outstandingPaymentAmount })
        this.setState({ moneyRemaining:data.income });
        this.setupBudgetState();
    });
  }
}

export default Budget;