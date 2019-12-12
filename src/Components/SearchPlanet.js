import React, { createRef, useEffect } from 'react'
import { connect ,Provider  } from 'react-redux'
import searchPlanetCSS from "./searchPlanet.css"

function SearchPlanet({onChange , isAuthenticated}) {
    const inputRef = createRef();
   
    let debounceTimeout = null
    
    useEffect(() => {
      inputRef.current.focus()
    })
  
    function debounceHandleInput({ target }) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        onChange(target.value)
      }, 500)

      }

    return (
      <div className="searchPlanet_container">
         <input
        type="text"
        ref={inputRef}
        className="search-control"
        onInput={debounceHandleInput}
        placeholder="Search Star Wars Planets"
      />
      </div>
     
    )
  }

  SearchPlanet = connect(state => {
    return {isAuthenticated : state.authenticated} 
  })(SearchPlanet);

  export default SearchPlanet