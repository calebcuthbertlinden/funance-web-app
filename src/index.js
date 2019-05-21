import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Navigation, Router, Switch, Route } from 'react-router-dom';

import Login from './user-portal/login.js';
import Budget from './budget/budget-list-component.js';

import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            username: '',
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // onNameCapture = () => {
    //     this.setState(prevState => ({ username:prevState.username }));
    //   };

    render() {
        return (
            <Router>
                <div>
                    <center>   
                        <h2>funance</h2>     
                        <Switch>

                            <Route
                            path={'/login'}
                            component={() => <Login
                                username={this.props.username} />}
                            />
                            <Route
                            path={'/budget'}
                            component={() => <Budget
                                username={this.props.username}
                            />}
                            />

                        </Switch>
                    </center>
                </div> 
            </Router>
        );
    }
    
    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.text.length) {
            return;
        }
        const newItem = {
            id: Date.now(),
            text: this.state.text,
        }
        this.setState(prev => ({
            items: prev.items.concat(newItem),
            text: ''
        }));
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
