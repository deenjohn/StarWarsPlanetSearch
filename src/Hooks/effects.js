import { useState } from 'react'
import { search ,getDetails } from '../utils/api'

export function usePlanetSearch() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let canceled = true;
  async function searchPlanets(term) {
    canceled = false ;
    setIsLoading(true)
    const data = await search(term);
    if(!canceled){
      setResults(data)
      setIsLoading(false);
      canceled = true ;
    }
   
  }
   
  return [{ results, isLoading }, searchPlanets]
}

export function getPlanetDetails() {
  const [planet, setPlanet] = useState(null)

  async function getPlanet(name) {
    if (name === null) {
      setPlanet(null);
    } else {
      let res = await getDetails(name);
      setPlanet(res);
    }
  }

  return [planet, getPlanet]
}