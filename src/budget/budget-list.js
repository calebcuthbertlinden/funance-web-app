import React from 'react'
import '../index.css'
import Category from './budget-categories.js'

const BudgetList = ({ categories }) => {

    return (
    <div>
        <center><h1>Budget</h1></center>
        <div class='hs'>
            {categories.map((budgetCategory) => (
            <div>
                <h2>{budgetCategory.category}</h2>
                <Category budgetList={budgetCategory.budget}/>
            </div>
            ))}
        </div>
    </div>
    )
};

export default BudgetList