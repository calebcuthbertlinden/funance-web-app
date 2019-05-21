import React from 'react'
import BudgetItem from './budget-item.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const Category = ({ budgetList }) => {
    if (budgetList != null) {
        return (
            <div>
                {budgetList.map((uBudgetItem) => (
                        <BudgetItem budgetItem={uBudgetItem}/>
                    ))}
                <RaisedButton class="budget_item_button_add">Add another</RaisedButton>
            </div>
        );
    } else {
        return (
            <MuiThemeProvider>
                <RaisedButton primary={false} class="budget_item_empty_collumn">Add new</RaisedButton>
            </MuiThemeProvider>);
    }
};

export default Category