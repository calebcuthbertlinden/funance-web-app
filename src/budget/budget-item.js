import React, { Component } from 'react'
import '../index.css'
import ProfileService from '../services/profile-service.js';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import {teal} from 'material-ui/styles/colors';
import Button from '@material-ui/core/Button';

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
                    <h3 class="card-title">{this.state.budgetItem.title}</h3>
                    <p class="card-title">{this.state.itemState}</p>
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
          console.log("Item marked as payed");
          this.setState({itemState:"PAYED"});
          this.props.updateAmountPaid(this.state.budgetItem.amount);
      });
    }
  }

export default BudgetItem