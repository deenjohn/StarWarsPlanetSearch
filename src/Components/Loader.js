import React from 'react'

const Loader = ({ isLoading, children }) =>
  isLoading ? (
    <div className="loader">
      <i className="fa fa-1x fa-globe fa-spin" />
    </div>
  ) : (
    children
  )

  export default Loader ;