const planetsURL = 'https://swapi.co/api/planets';

const peopleURL = "https://swapi.co/api/people";

export const search = async q => {
  const res = await fetch(`${planetsURL}/?search=${q}`)
  const { results = [] } = await res.json();
 window.results = results ;
  return results.sort((a,b)=>a.population - b.population ).map(char => ({
    ...char,
    // For some reason API doesnt return id
    id: char.url.slice(0, -1).split('/planet/')[1],
  }))
}

export async function isValidLogin(input) {
  const res = await fetch(`${peopleURL}/?search=${input}`);
  const { results = [] } = await res.json();
  
  if(results.length ===1){
    //to avoid partial search for user : like "Luke" instead of "Luke Skywalker"
    if(results[0].name !== input){
      return [false,null] ; 
    }
    return [true,results[0].birth_year] ; 
  } 
 
  return [false,null] ;
}


export const getDetails = async name => {
  const res = await fetch(`${planetsURL}/?search=${name}`)
  const { results = [] } = await res.json();
  return results ;
}
