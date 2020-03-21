import React, { Component } from 'react';
import './App.css';
import SignInSide from "./SignInSide.js";
import SignUp from "./SignUp.js";
import Dashboard from "./Dashboard.js";

class App extends Component {
  constructor() {
      super();
      var url = window.location.href;
      var s = url.split('/');

      this.state = {
          userId:0,
          page:s[s.length-1]
      };
  }
  changeUserId(id){
    //this.setState({userId:1})
  }
  render(){
    return (
      <div className="App">
      {(this.state.userId===0 && (this.state.page==="signin" || this.state.page==="")) &&
      <SignInSide/>
      }
      {this.state.userId===0 && this.state.page==="signup" &&
      <SignUp/>
      }
      {//this.state.userId!=0 &&
        this.state.page==="dashboard" &&
      <Dashboard/>
      }
      </div>
    );
  }
}


export default App;
