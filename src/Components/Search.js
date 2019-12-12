import React from 'react'
import SearchPlanet from "./SearchPlanet" ;
import SearchResult from "./SearchResult" ;
import { usePlanetSearch ,getPlanetDetails } from '../Hooks/effects'

import {
    withRouter
  } from "react-router-dom";
  
import { connect } from 'react-redux'
import PlanetDetails from './planetDetails';

let Search = (props) => {
  const [{ results, isLoading }, searchPlanets] = usePlanetSearch();
  const [planet, getPlanet] = getPlanetDetails();
  const [planetLink,setIfUsingPlanetLink] =  React.useState(false)

  function onClosePlanetLink(){
    setIfUsingPlanetLink(false);
  }
  async function handlePlanetLink(name){
    await getPlanet(name);
    setIfUsingPlanetLink(true);
  }
  if(!props.isAuthenticated){
      setTimeout (()=>{props.history.push("/")} , 3000);
      return (<React.Fragment>
        <div>Please Login first.</div>
        <div>Redirecting to Login Page</div>
      </React.Fragment>)
  }
  return (
    <div className="search">
      <SearchPlanet
        onChange={searchPlanets}
      />
      {planetLink ? 
      <PlanetDetails planet = {planet} onClose={onClosePlanetLink}/>:
      <SearchResult
        results={results}
        isLoading={isLoading}
        handlePlanetLink = {handlePlanetLink}
      />}
    </div>
  )
}

Search = withRouter(connect(state => {
  return {isAuthenticated : state.authenticated} 
})(Search));

export default Search
