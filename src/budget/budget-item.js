import React, { Component } from 'react'
import '../index.css'
import ProfileService from '../services/profile-service.js';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import {teal} from 'material-ui/styles/colors';
import Button from '@material-ui/core/Button';

import Lottie from 'react-lottie'
import * as coinsAnimation from '../animations/moneystack.json'

class BudgetItem extends Component {
    constructor(props) {
      super(props);
      this.profileService = new ProfileService();
      this.state = {
        budgetItem: props.budgetItem,
        itemState: props.budgetItem.state
      };
    }
  
    render() {
      const coinsOption = {
      loop: false,
      autoplay: true, 
      animationData: coinsAnimation.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    if (this.state.itemState === "OPEN") {
        return (
          <MuiThemeProvider theme={getMuiTheme({
            palette: {
              primary: teal,
              secondary: teal,
            },
          })}>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <center>
                    <h3 class="card-title">{this.state.budgetItem.title}</h3>
                    <h4 class="card-title">{this.state.budgetItem.description}</h4>
                  </center>
                </div>  
                <div class="flip-card-back"> 
                  <center>
                    <h3>R{this.state.budgetItem.amount} due on the {this.state.budgetItem.date}</h3>
                    <Button variant="outlined" color="inherit" onClick={() => this.markAsDone()}>Pay now</Button>
                  </center>
                </div>    
              </div>
            </div>
          </MuiThemeProvider>
        );
      } else {
        return (
          <MuiThemeProvider>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front-disabled">
                    <h3 class="card-title">Payed: {this.state.budgetItem.title}</h3>
                    <Lottie options={coinsOption}
                          height={50}
                          width={50}
                          isStopped={this.state.isStopped}
                          isPaused={this.state.isPaused}/>
                </div>  
                <div class="flip-card-back"> 
                    <h2 class="card-title">{this.state.budgetItem.amount}</h2>
                    <h4 class="card-title">{this.state.budgetItem.date}</h4>
                </div>    
              </div>
            </div>
          </MuiThemeProvider>
        );
      }      
    }
  
    openItem() {
        //show item in pop up dialog
    }

    markAsDone() {
      this.profileService.markItemAsPayed(this.state.budgetItem.itemId).then(
        (data) => {
          this.setState({itemState:"PAYED"});
          this.props.updateAmountPaid(this.state.budgetItem.amount);
      });
    }
  }

export default BudgetItem