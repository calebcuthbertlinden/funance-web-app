import React from 'react'
import '../index.css'
import Category from './budget-categories.js'
import {Helmet} from 'react-helmet';

const BudgetList = ({ categories, username }) => {

    return (
    <div>
        <center>
            <h1>Budget</h1>
            <Helmet>
                <style>{'body { background-color: #DFDFDF; }'}</style>
            </Helmet>
            <div class='hs'>
                {categories.map((budgetCategory) => (
                <div>    
                    <div class="category-heading">
                        <center>
                        <h2>{budgetCategory.category}</h2>
                        </center>
                    </div>
                    <Category budgetList={budgetCategory.budget} category={budgetCategory.category} username={username}/>
                </div>
                ))}
            </div>
        </center>
    </div>
    )
};

export default BudgetList