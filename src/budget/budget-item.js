import React, { Component } from 'react'
import '../index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BudgetItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        budgetItem: props.budgetItem
      };
    }
  
    render() {
      return (
        <MuiThemeProvider>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                  <h3 class="card-title">{this.state.budgetItem.title}</h3>
                  <p class="card-title">{this.state.budgetItem.state}</p>
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
  
    openItem() {
        //show item in pop up dialog
    }
  }

export default BudgetItem