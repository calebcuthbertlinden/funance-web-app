import BudgetItem from './budget-item.js'
import ProfileService from '../services/profile-service.js';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as loaderAnimation from '../animations/loader-themed.json'
import { AddCircle } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

import Lottie from 'react-lottie'
import * as animationDebit from '../animations/attachement.json'

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
            newItemCost:0,
            newItemDate:"",
            startDate: new Date(),
            newItemOnceOff:false,
            newItemDescription:false
        };

        this.profileService = new ProfileService();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handlePaymentDate = this.handlePaymentDate.bind(this);
        this.handleOnceOff = this.handleOnceOff.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        this.setState({newItemOnceOff: !this.state.newItemOnceOff});
    }

    handleDescriptionChange(event) {
        this.setState({newItemDescription: event.target.value});
    }
    
    updateAmountPaid(amount) {
        this.props.updateAmountPaid(amount);
    }

    handleChange(date) {
        this.setState({
          startDate: date
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

        const loadingOptions = {
            loop: true,
            autoplay: true, 
            animationData: loaderAnimation.default,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const theme = createMuiTheme({
            palette: {
              primary: {
                  main: '#80cbc4'
              },
              secondary: {
                main: '#004d40',
              },
            },
          });

        if (this.state.budgetList !== null) {
            return (
                
                <MuiThemeProvider theme = { theme }>
                    <div id="outer">  
                        <Fab id="additem" variant="extended" type="outline" onClick={this.openModal}>
                            <AddCircle />
                            Add another
                        </Fab>
                        {/* <NoteAdd/><Button variant="outlined" onClick={this.openModal} primary={true} style={style}>Add another</Button> */}
                        <div id="inner">
                            {this.state.budgetList.map((uBudgetItem) => (
                                <BudgetItem updateAmountPaid={this.updateAmountPaid.bind(this)} budgetItem={uBudgetItem}/>
                            ))}
                        </div>
                        
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">

                    <center>
                        <h3>Add another item</h3>
                        <div>

                            <div class="field">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.value} onChange={this.handleTitleChange}
                                    />
                            </div>

                            <div class="field">
                                <input
                                    type="number"
                                    placeholder="Cost"
                                    value={this.state.value} onChange={this.handleCostChange}
                                    />
                            </div>

                            <div class="field">
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                        />
                            </div>

                            <div class="field">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={this.state.value} onChange={this.handleDescriptionChange}
                                    />
                            </div>

                            <br/>
                            <input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleOnceOff}/>
                            Is this a recurring item?
                            <br/>
                            <br/>
                        </div>
                        <Button variant="outlined" color="secondary" style={style} onClick={() => this.createBudgetItem()}>Add item</Button>
                        </center>
                    </Modal>

                     {/* Loader modal */}
                    <Modal
                        isOpen={this.state.isLoading}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <div>
                            <center><Lottie options={loadingOptions}
                                height={100}
                                width={100}
                                isStopped={this.state.isStopped}
                                isPaused={this.state.isPaused}/>
                            </center>
                        </div>
                    </Modal>
                </MuiThemeProvider>
            );
        } else {

            if (this.state.messageSet === false) {
                switch (this.state.category) {
                    case "RECURRING":
                        this.setState({message:"These are the items that have to be payed every single month, regalrdless of how low the balance is."});
                        break;
                    case "FOOD":
                        this.setState({message:"We've found that outside of the groceries people plan for, this is where alot of the unsupervised spending happens"});
                        break;
                    case "DAILY":
                        this.setState({message:"Anything belonging to daily buys here and there"});
                        break;
                    case "CUSTOM":
                        this.setState({message:"The rarer purchases of valuable items. Something out of the ordinary, but not every day."});
                        break;
                    default:
                        this.setState({message:"Unknown category"});
                        break;
                }
                
                this.setState({messageSet:true});
            }

            return (
                
                <MuiThemeProvider theme = { theme }>
                    <div id="outer">
                        <Fab id="additem" variant="extended" type="outline" onClick={this.openModal}>
                            <AddCircle className="padding-right" />
                            Add new
                        </Fab>
                        {/* <NoteAdd/><Button variant="outlined" label="Add new" primary={true} type="outline" style={style} onClick={this.openModal}>Add new</Button> */}
                        <div class="category-empty-description">
                            <center>
                                <span className="parent-element">
                                    <Lottie id="animation-lottie" options={debitOptions}
                                        height={150}
                                        width={150}
                                        isStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}/>   
                                    {this.state.message}
                                </span>
                            </center>
                        </div>
                    </div>

                    <Modal
                     isOpen={this.state.modalIsOpen}
                     onRequestClose={this.closeModal}
                     style={customStyles}
                     contentLabel="Example Modal">
                    
                    <center>
                        <h3>Add new item</h3>
                        <div>

                            <div class="field">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.value} onChange={this.handleTitleChange}
                                    />
                            </div>

                            <div class="field">
                                <input
                                    type="number"
                                    placeholder="Cost"
                                    value={this.state.value} onChange={this.handleCostChange}
                                    />
                            </div>

                            <div class="field">
                                <DatePicker                         
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                        />
                            </div>

                            <div class="field">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={this.state.value} onChange={this.handleDescriptionChange}
                                    />
                            </div>
                            <br/>
                            <br/>
                        </div>
                
                        <Button variant="outlined" color="secondary" style={style} onClick={() => this.createBudgetItem()}>Add item</Button>
                        </center>
                        
                    </Modal>

                     {/* Loader modal */}
                     <Modal
                        isOpen={this.state.isLoading}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <div>
                            <center><Lottie options={loadingOptions}
                                height={100}
                                width={100}
                                isStopped={this.state.isStopped}
                                isPaused={this.state.isPaused}/>
                            </center>
                        </div>
                    </Modal>
                </MuiThemeProvider>
            );
        }
    }

    createBudgetItem() {
        this.setState({isLoading:true});
        var dateString = this.state.startDate.toDateString()

        if (this.state.newItemTitle !== null && this.state.newItemCost !== null) {
            this.profileService.createBudgetItem(this.state.username, 
                this.state.newItemTitle, 
                this.state.newItemOnceOff, 
                this.state.category,
                this.state.newItemCost,
                dateString,
                this.state.newItemDescription).then(
                (data) => {
                    if (this.state.budgetList == null) {
                        var newBudgetList = [data];
                        this.setState({budgetList:newBudgetList});
                    } else {
                        this.setState(previousState => ({
                            budgetList: [...previousState.budgetList, data]
                        }));
                    }
    
                    this.props.updateAmountToPay(this.state.newItemCost);
                    this.setState({modalIsOpen:false});
                    this.props.view();  
                    this.setState({isLoading:false});
               
            });
            this.setState({newItemOnceOff:false})
        } else {
            this.setState({newItemOnceOff:false})
            this.setState({newItemTitle:"Fill in all the fields goddamit"})
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
        transform             : 'translate(-50%, -50%)',
        background            : '#f7f6f2' ,
        width                 : '30%'
    }
};

const style = {
    margin: 15,
};

export default Category