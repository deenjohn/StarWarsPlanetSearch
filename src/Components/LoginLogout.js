import React from "react" ;
import { connect ,Provider  } from 'react-redux'
import {authenticate } from "./actionTypes" ;
import Login from "./Login";
import Logout from "./Logout";


class LoginLogout extends React.Component {
     constructor(props){
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.renderForm = this.renderForm.bind(this);
      this.isAuthenticated = false ;
     }
    handleLogin(){
       this.isAuthenticated = true  ;
       this.props.dispatch(authenticate(this.isAuthenticated))
    }
    handleLogout(){
      console.log("clicked logout");
      this.isAuthenticated = false ;
      this.props.dispatch(authenticate(this.isAuthenticated))
   }
    renderForm(){
      if(this.isAuthenticated === false){
        return (<React.Fragment>
                 <Login handleLogin={this.handleLogin}/>
               </React.Fragment>)
      } else{
         return (<React.Fragment>
                 <Logout handleLogout={this.handleLogout} />
               </React.Fragment>) 
      }
    }

    render() {
      console.log(this.props)
      return (
        <React.Fragment>
           { this.renderForm()}    
        </React.Fragment> 
      )

          }
  }
  

  LoginLogout = connect(state => {
    return {isAuthenticated : state.authenticated} 
  })(LoginLogout);

export default LoginLogout ;