
import React from "react" ;
import {
    withRouter
  } from "react-router-dom";
  
import { connect } from 'react-redux'
import {authenticate } from "../Actions/actionTypes" ;

function LogOut(props) {
 

  props.history.push("/");
  console.log("props ",props.dispatch(authenticate(false)))
  
  return null ;
 
}



LogOut = withRouter(connect(state => {
  return {isAuthenticated : state.authenticated} 
})(LogOut));

export default LogOut ;