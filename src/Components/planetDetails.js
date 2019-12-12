import React from 'react'
import PropTypes from 'prop-types'
import planetDetailsCSS from './planetDetails.css'

const PlanetDetails = ({ planet =[], onClose }) => (
  <section className="planet-details">
    <h2 className="planet-details__header">Planet : {planet[0].name}</h2>
    <div className="planet-details__clear" onClick={onClose}>
      X
    </div>
    <div className="character-details__sections">
      <div className="character-details__detail">
        Climate: {planet[0].climate}
      </div>
      <div className="character-details__detail">
        Diameter: {planet[0].diameter}
      </div>
      <div className="character-details__detail">
        Population: {planet[0].population}
      </div>
      <div className="character-details__detail">
      Rotation_period: {planet[0].rotation_period}
      </div>
    </div>
    <div className="character-details__sections">
      <div className="character-details__detail">
        Terrain: {planet[0].terrain}
      </div>
    </div>
  </section>
)

export default PlanetDetails ;
