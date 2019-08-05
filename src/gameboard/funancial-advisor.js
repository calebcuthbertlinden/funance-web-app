import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Lottie from 'react-lottie'
import QRCode from '../resources/FUNANCIAL_QR_CODE.png';
import * as loaderAnimation from '../animations/robot.json';
import Button from '@material-ui/core/Button';
import {AddCircleOutline, Sort, TableChart} from '@material-ui/icons';
import UserService from '../services/user-service';

class FunancialAdvisor extends Component {

    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state = {
          username: this.props.username,
          showQRCode: false,
          showSummary: true,
          linkNumber: false,
          whatsappNumber:0,
          hasWhatsappNumber:false
        };
        this.handleWhatsauppNumberChange = this.handleWhatsauppNumberChange.bind(this);
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
                            <Button variant="outlined" color="secondary" onClick={() => this.showQRCode()}>Linking details</Button> 
                            <Button variant="outlined" color="secondary" onClick={() => this.showLinkWhatsapp()}>Add whatsapp number</Button> 
                            {
                                this.state.showSummary ?
                                    <div>
                                        <h4>Your funancial advisor is there to answer your every need.</h4>
                                        <h4>She is just one Whatsapp message away.</h4>
                                        <h4>You can message her to get information about your budget or to add items to it wherever you are.</h4>
                                        <ul id="funancial-list">
                                            <li className="funancial-list-item"><AddCircleOutline className="padding-right"/>Add item to budget</li>
                                            <li className="funancial-list-item"><Sort className="padding-right"/>Get a summary of your budget</li>
                                            <li className="funancial-list-item"><TableChart className="padding-right"/>Get outstanding items</li>                                          
                                        </ul>
                                    </div>
                                    :null
                            }
                            {
                                this.state.showQRCode ?
                                    <div>
                                        <h4>Scan the code below to add your funancial advisor to your contacts.</h4>
                                        <h4>Send her a whatsapp with code <span id="accent-color">join moment-chain</span></h4>
                                        <img src={QRCode}/>
                                    </div>
                                    :null
                            }
                            {
                                this.state.linkNumber ?
                                    this.state.hasWhatsappNumber ?
                                        <div>
                                            <h4>Your phone is linked!</h4>
                                        </div>
                                        :<div>
                                            <h4>Link your whatsapp number so your Funancial advisor can recognise you</h4>
                                            <MuiThemeProvider theme = { theme }>
                                                <div class="field">
                                                    <input
                                                        type="text"
                                                        placeholder="+27 64 752 0016"
                                                        value={this.state.value} 
                                                        onChange={this.handleWhatsauppNumberChange}
                                                        />
                                                </div>
                                                <br/>
                                                <br/>
                                                <Button variant="contained" color="primary" onClick={() => this.setProfileContact()} >Submit</Button>
                                            </MuiThemeProvider>
                                        </div>
                                    :null
                            }
                        </div>
                    </div>
                </center>   
            </MuiThemeProvider>
          </div>
        );
      }

        showQRCode() {
            this.setState({showQRCode:true})
            this.setState({showSummary:false})
            this.setState({linkNumber:false})
        }

        showSummary() {
            this.setState({showQRCode:false})
            this.setState({showSummary:true})
            this.setState({linkNumber:false})
        }

        showLinkWhatsapp() {
            this.setState({showQRCode:false})
            this.setState({showSummary:false})
            this.setState({linkNumber:true})
        }

        handleWhatsauppNumberChange(event) {
            this.setState({whatsappNumber: event.target.value});
          }

        setProfileContact() {
            this.userService.updateContactNumber(this.state.username, this.state.whatsappNumber).then(
                () => {
                    this.setState({hasWhatsappNumber:true})
              });
        }
    }
    
export default FunancialAdvisor;