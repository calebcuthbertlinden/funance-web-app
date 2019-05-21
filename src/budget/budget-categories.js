import BudgetItem from './budget-item.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ProfileService from '../services/profile-service.js';
import React, { Component } from 'react';
import Modal from 'react-modal';

class Category extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();
        this.state = {
            budgetList: props.budgetList,
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    render() {
        console.log(this.state.budgetCategories)
        if (this.state.budgetList != null) {
            return (
                <div>
                    {this.state.budgetList.map((uBudgetItem) => (
                            <BudgetItem budgetItem={uBudgetItem}/>
                        ))}
                    <RaisedButton label="Add another" onClick={this.openModal} primary={true} style={style}/>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">

                        <MuiThemeProvider>
                            <div>
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Username"/>
                                <br/>
                                <TextField
                                    hintText="Enter your First name"
                                    floatingLabelText="First name"/>
                                <br/>
                                <TextField
                                    hintText="Enter your Last name"
                                    floatingLabelText="Last name"/>
                                <br/>
                                <TextField
                                    type="password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"/>
                                <br/>
                                <RaisedButton label="Submit" secondary={true} style={style}/>
                            </div>
                        </MuiThemeProvider>
                    </Modal>
                </div>
            );
        } else {
            return (
                <MuiThemeProvider>
                    <RaisedButton label="Add new" primary={true} type="outline" style={style} onClick={this.openModal}/>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <MuiThemeProvider>
                            <div>
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                />
                            <br/>
                            <TextField
                                hintText="Enter your First name"
                                floatingLabelText="First name"
                                />
                            <br/>
                            <TextField
                                hintText="Enter your Last name"
                                floatingLabelText="Last name"
                                />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                />
                            <br/>
                            <RaisedButton label="Submit" primary={true} style={style}/>
                            </div>
                        </MuiThemeProvider>
                    </Modal>
                </MuiThemeProvider>);
        }
    }

    createaBudgetItem() {
        this.profileService.createaBudgetItem(this.state.username).then(
            (data) => {
            this.setState({ budgetCategories:data.categories })
        });
    }
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


const style = {
    margin: 15,
};

export default Category