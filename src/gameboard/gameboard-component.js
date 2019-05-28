import React, { Component } from 'react';
import ProfileService from '../services/profile-service.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Gameboard extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();
        this.state = {
          username: this.props.username
        };
      }
    
      componentDidMount() {
          this.getGameboard();
      }

      render() {
        return (
          <div>
            <MuiThemeProvider>
            <h5>back</h5>
            </MuiThemeProvider>
          </div>
        );
      }
    
      getGameboard() {
        this.profileService.getGameboard(this.state.username).then(
          (data) => {
            // TODO something with response
        });
      }
    }
    
    export default Gameboard;