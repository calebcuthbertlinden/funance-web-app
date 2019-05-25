import BudgetItem from './budget-item.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ProfileService from '../services/profile-service.js';
import React, { Component } from 'react';
import Modal from 'react-modal';

import Lottie from 'react-lottie'
import * as animationDebit from '../animations/icon-debit.json'

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            budgetList: props.budgetList,
            modalIsOpen: false,
            category: props.category,
            message:"You have no items in this collumn",
            messageSet:false,
            isStopped:false,
            isPaused:false,
            isLoading:false,
            newItemTitle:"",
            newItemCost:"",
            newItemDate:"",
            newItemOnceOff:false,
        };

        this.profileService = new ProfileService();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handlePaymentDate = this.handlePaymentDate.bind(this);
        this.handleOnceOff = this.handleOnceOff.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleTitleChange(event) {
        this.setState({newItemTitle: event.target.value});
    }
    
    handleCostChange(event) {
        this.setState({newItemCost: event.target.value});
    }
    
    handlePaymentDate(event) {
        this.setState({newItemDate: event.target.value});
    }
    
    handleOnceOff(event) {
        this.setState({newItemOnceOff: true});
    }

    createBudgetItem() {
        this.setState({isLoading:true});
        console.log(this.state.budgetList);
        //username, title, onceoff, category, amount, date
        this.profileService.createBudgetItem(this.state.username, 
            this.state.newItemTitle, 
            this.state.newItemOnceOff, 
            this.state.category,
            this.state.newItemCost,
            this.state.newItemDate).then(
            (data) => {
                if (this.state.budgetList == null) {
                    var newBudgetList = [data];
                    this.setState({budgetList:newBudgetList});
                } else {
                    this.setState(previousState => ({
                        budgetList: [...previousState.budgetList, data]
                    }));
                }

                this.setState({modalIsOpen:false});
           
        });
    }
    
    render() {
        const debitOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationDebit.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        if (this.state.budgetList !== null) {
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
                                    hintText="Enter the title of this item"
                                    floatingLabelText="Title"
                                    value={this.state.value} onChange={this.handleTitleChange}
                                    />
                                <br/>
                                <TextField
                                    hintText="Cost of the item"
                                    floatingLabelText="Cost"
                                    value={this.state.value} onChange={this.handleCostChange}
                                    />
                                <br/>
                                <TextField
                                    hintText="Once off?"
                                    floatingLabelText="True of false"
                                    value={this.state.value} onChange={this.handleOnceOff}
                                    />
                                <br/>
                                <TextField
                                    hintText="Date to be payed"
                                    floatingLabelText="Choose date"
                                    value={this.state.value} onChange={this.handlePaymentDate}
                                    />
                                <br/>
                                <RaisedButton label="Submit" onClick={() => this.createBudgetItem()} primary={true} style={style}/>
                            </div>
                        </MuiThemeProvider>
                    </Modal>
                </div>
            );
        } else {

            if (this.state.messageSet === false) {
                switch (this.state.category) {
                    case "DEBIT_ORDER":
                        this.setState({message:"These are the items that have to be payed every single month, regalrdless of how low the balance is."});
                        break;
                    case "FOOD":
                        this.setState({message:"We've found that outside of the groceries people plan for, this is where alot of the unsupervised spending happens"});
                        break;
                    case "MISC":
                        this.setState({message:"TODO //REFACTOR TO 'DAILY' Anything belonging to daily buys here and there"});
                        break;
                    case "CUSTOM":
                        this.setState({message:"The rarer purchases of valuable items. Something out of the ordinary, but not every day."});
                        break;
                    default:
                        this.setState({message:"WAaaaaahhahahhhaaaaaaaaaaaa"});
                        break;
                }
                
                this.setState({messageSet:true});
            }

            return (
                <MuiThemeProvider>
                    <div class="category-empty-description">
                        <center>
                            <Lottie options={debitOptions}
                                    height={100}
                                    width={100}
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}/>   
                            {this.state.message}
                        </center>
                    </div>
                    <RaisedButton label="Add new" primary={true} type="outline" style={style} onClick={this.openModal}/>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <MuiThemeProvider>
                            <div>
                                <TextField
                                    hintText="Enter the title of this item"
                                    floatingLabelText="Title"
                                    value={this.state.value} onChange={this.handleTitleChange}
                                    />
                                <br/>
                                <TextField
                                    hintText="Cost of the item"
                                    floatingLabelText="Cost"
                                    value={this.state.value} onChange={this.handleCostChange}
                                    />
                                <br/>
                                <TextField
                                    hintText="Once off?"
                                    floatingLabelText="True of false"
                                    value={this.state.value} onChange={this.handleOnceOff}
                                    />
                                <br/>
                                <TextField
                                    hintText="Date to be payed"
                                    floatingLabelText="Choose date"
                                    value={this.state.value} onChange={this.handlePaymentDate}
                                    />
                                <br/>
                                <RaisedButton label="Submit" onClick={() => this.createBudgetItem()} primary={true} style={style}/>
                            </div>
                        </MuiThemeProvider>
                    </Modal>
                </MuiThemeProvider>);
        }
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