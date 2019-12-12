import React from 'react'
import Loader  from "./Loader";
import SearchResultCSS from "./SearchResult.css"

var fontSize = 26;
var count = 0 ;

const SearchResult = ({ results =[],isLoading ,handlePlanetLink}) => {
  count = 0 ;
  return (
  <section className="results-section">
    <Loader isLoading={isLoading}>
    <ul>
        {results.map(res => {
          count = count +2 ;
          return (
          <li key={res.name} style={{fontSize:`${fontSize + count}px`}} onClick={()=>handlePlanetLink(res.name)} >
            {res.name}  <i className="fa fa-1x fa-globe fa-spin" />
          </li>
         )
        })}
      </ul> 
    </Loader>
     
  </section>
)}

export default SearchResult
