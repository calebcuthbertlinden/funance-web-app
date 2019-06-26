import React, { Component } from 'react';
import ProfileService from '../services/profile-service.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Gameboard extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();
        this.state = {
          username: this.props.username,
          coins: 0
        };
      }
    
      componentDidMount() {
          this.getGameboard();
      }

      render() {
        return (
          <div>
            <MuiThemeProvider>

              <h2>{this.state.coins}</h2>

            </MuiThemeProvider>
          </div>
        );
      }
    
      getGameboard() {
        this.profileService.getGameboard(this.state.username).then(
          (data) => {
            this.setState({coins:data.coin})
        });
      }
    }
    
    export default Gameboard;