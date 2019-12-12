import React from "react" ;
import ReactDom from "react-dom" ;
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink 
} from "react-router-dom";
import { Provider ,connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import Login from "./Components/Login" ;
import LoginRedirect from "./Components/LoginRedirect";
import Search from "./Components/Search";
import navCss from "./NavigationCSS/nav.css"
import rootReducer from "./ReduxStore/auth";
const createStoreWithMiddleware = applyMiddleware()(createStore);
export default function App(props) {
    function handleOut(){
      props.dispatch(authenticate(false))
    }
    return (
      <Router>
        <React.Fragment>
          <ul>
            {props.isAuthenticated ? 
            <li>
              <NavLink  to="/logout">Logout</NavLink>
            </li> :
            <li>
              <NavLink  to="/">Login</NavLink>
            </li>}
            <li>
              <NavLink  to="/search" activeClassName="active">Search</NavLink>
            </li>
          </ul>
  
          <Switch>
            <Route exact path="/">
              <Login/>
            </Route>
            <Route exact path="/logout">
               <LoginRedirect/>   
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
          </React.Fragment>
      </Router>
    );
  }
  
  App = connect(state => {
    return {isAuthenticated : state.authenticated} 
  })(App);

  ReactDom.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <Router>
        <Route path="/" component={App} />     
      </Router>
    </Provider>
    ,
document.getElementById("root")
);
