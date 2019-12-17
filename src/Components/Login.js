
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
            errors_uname:EMPTY,
            errors_psw :EMPTY,
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
        let errors_uname =EMPTY;
        let errors_psw = EMPTY ;
        const {value} = event.target ;
        var userExist = await isValidLogin(event.target.value);
        if(!userExist[0]){
          errors_uname = USERINPUT_ERROR ;
          errors_psw = PASSWORD_ERROR ;
        }else{
          errors_uname = EMPTY ;
          errors_psw = PASSWORD_ERROR;

        }

        this.setState({uname :value, DOB : userExist[1],errors_uname,errors_psw });
        
      }


      handlePasswordInput(event) {
        event.preventDefault();
        let errors_psw ;
        const {value} = event.target ;  
        let res = (value === this.state.DOB );    
        errors_psw = 
              res === false 
                ? PASSWORD_ERROR
                : EMPTY;
    
        this.setState({errors_psw,password :value});
        
      }
    
     
      handleSubmit(event){
        event.preventDefault();
        if(this.state.uname === EMPTY || this.state.password === EMPTY){
          return ;
        }
      
        if(this.state.errors_uname === EMPTY && this.state.errors_psw === EMPTY ) {

          let res = (this.state.errors_uname === EMPTY && this.state.errors_psw == EMPTY)
          this.props.dispatch(authenticate(true))  ;
          this.props.history.push("/search")

        }
      }

    
     render(){
        const { errors_psw , errors_uname } = this.state;
         if(this.props.isAuthenticated){
            return <Logout />
         }
        return (<React.Fragment>
            <form className="login-content animate" onSubmit={this.handleSubmit}>
              <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" onBlur={this.handleUserNameInput} />
                    {errors_uname !== EMPTY && (
                      <span className="error">{errors_uname}</span>
                    )}
                    <br></br>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onKeyUp={this.handlePasswordInput} />
                    {errors_psw !==EMPTY  && (
                        <span className="error">{errors_psw}</span>
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
