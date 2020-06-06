 
import React, { Component } from 'react';
import Directory from './components/Directory';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { AUTHORS } from './shared/campsites';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          authors: AUTHORS
      };
  }

    render() {
        return (
            <div className="App">
                <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">Stress Less</NavbarBrand>
                </div>
                </Navbar>
                <Directory authors={this.state.authors} />
            </div>
        );
    }
}

export default App;
