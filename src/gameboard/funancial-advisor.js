import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Lottie from 'react-lottie'
import * as loaderAnimation from '../animations/robot.json';

class FunancialAdvisor extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: this.props.username
        };
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

        const style = {
            margin: 15,
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

                    <br/>
                    <br/>  
                    <div>                         
                        <h3>Send a whatsapp to +1 415 523 8886 with code join moment-chain</h3>
                        <h5>Your funancial advisor is there to answer your every need.</h5>
                        <h5>Just send it a whatsapp and it'll help you out!</h5>
                    </div>
                </div>
            </center>   

            </MuiThemeProvider>
          </div>
        );
      }
    }
    
export default FunancialAdvisor;