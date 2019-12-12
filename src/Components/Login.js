
import React from "react" ;
import {isValidLogin} from "../utils/api"
import {authenticate } from "../Actions/actionTypes" ;
import { connect ,Provider  } from 'react-redux'
import {USERINPUT_ERROR ,PASSWORD_ERROR ,EMPTY } from "../Constants/constants";
import nav from "../NavigationCSS/nav.css"
import loginCss from "./Login.css";
import Logout from "./Logout"

import {
  withRouter
} from "react-router-dom";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            uname : EMPTY,
            password :EMPTY,
            errors: {
              uname: EMPTY,
              psw: EMPTY,
            },
            formInvalid : true,
            DOB : null
          };
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.debounceTimeout = null ;
        
    }

    async handleUserNameInput(event) {
        event.preventDefault();
        let errors = this.state.errors;
        const {value} = event.target ;
        var userExist = await isValidLogin(event.target.value);
        if(!userExist[0]){
            errors.uname = USERINPUT_ERROR 
        }else{
            errors.uname = EMPTY
        }
        this.setState({errors ,uname :value, DOB : userExist[1]});
        ;
      }
    
      handlePasswordInput(event) {
        event.preventDefault();
        let errors = this.state.errors; 
        const {value} = event.target ;  
        let res = (value === this.state.DOB );    
        errors.psw = 
              !res
                ? PASSWORD_ERROR
                : EMPTY;
    
        this.setState({errors,password :value});
        
      }
    
     
      handleSubmit(event){
        event.preventDefault();
        if(this.state.uname === EMPTY || this.state.password === EMPTY){
          return ;
        }
      
        if(!(this.state.errors.uname && this.state.errors.psw) ) { 
          this.props.dispatch(authenticate(true))  ;
          this.props.history.push("/search")

        }
      }

    
     render(){
        const { errors } = this.state;
         if(this.props.isAuthenticated){
            return <Logout />
         }
        return (<React.Fragment>
            <form className="login-content animate" onSubmit={this.handleSubmit}>
              <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" onBlur={this.handleUserNameInput} />
                    {errors.uname.length > 0 && (
                      <span className="error">{errors.uname}</span>
                    )}
                    <br></br>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onChange={this.handlePasswordInput} />
                    {errors.psw.length > 0 && (
                        <span className="error">{errors.psw}</span>
                     )}
                       <br></br> 
                    <button type="submit" >Login</button>
                </div>
            </form>
        </React.Fragment>)

     }
     
   
  }

  Login = withRouter(connect(state => {
    return {isAuthenticated : state.authenticated} 
  })(Login));
  
  export default Login ;