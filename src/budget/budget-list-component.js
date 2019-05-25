import React, { Component } from 'react';
import ProfileService from '../services/profile-service.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BudgetList from './budget-list.js';
class Budget extends Component {
  constructor(props) {
    super(props);
    this.profileService = new ProfileService();
    this.state = {
      budgetCategories: [],
      username: this.props.username
    };
  }

  componentDidMount() {
      this.getBudget();
  }

  render() {
    console.log(this.state.budgetCategories)
    return (
      <div>
        <MuiThemeProvider>
        <h5>back</h5>
        <BudgetList categories={this.state.budgetCategories} username={this.state.username} />
        </MuiThemeProvider>
      </div>
    );
  }

  getBudget() {
    this.profileService.getBudget(this.state.username).then(
      (data) => {
        this.setState({ budgetCategories:data.categories })
    });
  }
}

export default Budget;