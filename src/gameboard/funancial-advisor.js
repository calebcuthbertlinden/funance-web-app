import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Lottie from 'react-lottie'
import QRCode from '../resources/FUNANCIAL_QR_CODE.png';
import * as loaderAnimation from '../animations/robot.json';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import {AddCircleOutline, Sort, TableChart} from '@material-ui/icons';

class FunancialAdvisor extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: this.props.username,
          showQRCode: false,
          showSummary: true
        };
        this.closeModal = this.closeModal.bind(this);
      }

      render() {

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

        const stepOne = {
            loop: true,
            autoplay: true, 
            animationData: loaderAnimation.default,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
          <div>
            <MuiThemeProvider theme={theme}>
                <center>         
                    <div id="onboarding-div">
                        <Lottie options={stepOne}
                            height={200}
                            width={200}
                            isStopped={this.state.isStopped}
                            isPaused={this.state.isPaused}/>
                        <div>         
                            <h2>Your Funancial advisor</h2>
                            <Button variant="outlined" color="secondary" onClick={() => this.showSummary()}>About</Button>  
                            <Button variant="outlined" color="secondary" onClick={() => this.showQRCode()}>Show QR code</Button> 
                            {
                                this.state.showSummary ?
                                    <div>
                                        <h4>Your funancial advisor is there to answer your every need.</h4>
                                        <h4>You can message her to get information about your budget or to add items to it.</h4>
                                        <ul id="funancial-list">
                                            <li className="funancial-list-item"><AddCircleOutline className="padding-right"/>Add item to budget</li>
                                            <li className="funancial-list-item"><Sort className="padding-right"/>Get a summary of your budget</li>
                                            <li className="funancial-list-item"><TableChart className="padding-right"/>Get outstanding items</li>                                          
                                        </ul>
                                    </div>
                                    :<div>
                                        <h4>Scan the code below to add your funancial advisor to your contacts.</h4>      
                                        <h4>Send her a whatsapp with code <span id="accent-color">join moment-chain</span></h4>
                                        <img src={QRCode}/>
                                    </div>
                            }
                        </div>
                    </div>
                </center>   
            </MuiThemeProvider>

            <Modal
                isOpen={this.state.showQRCode}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <div>
                    <center>
                    <img src={QRCode}/>  
                    </center>
                </div>
            </Modal>
          </div>
        );
      }

        showQRCode() {
            // this.setState({showQRCode:true})
            this.setState({showSummary:false})
        }

        showSummary() {
            this.setState({showSummary:true})
            this.setState({showQRCode:false})
        }

        closeModal() {
            this.setState({showQRCode:false})
        }
    }

    const customStyles = {
        content : {
            top         : '50%',
            left        : '50%',
            right       : 'auto',
            bottom      : 'auto',
            marginRight : '-50%',
            transform   : 'translate(-50%, -50%)',
            background  : '#f7f6f2'  
        }
    };
    
export default FunancialAdvisor;