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
    console.log("this.state.username: " + this.state.username)
    console.log("props.username: " + props.username)
  }

  componentDidMount() {
      this.getBudget();
  }

  render() {
    return (
      <MuiThemeProvider>
      <BudgetList categories={this.state.budgetCategories} />
      </MuiThemeProvider>
    );
  }

  getBudget() {
    console.log(this.state.username)
    this.profileService.getBudget(this.state.username).then(
      (data) => {
        this.setState({ budgetCategories:data.categories })
    });
  }
}

export default Budget;