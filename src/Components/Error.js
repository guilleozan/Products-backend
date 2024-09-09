import React from 'react';
import {Link} from 'react-router-dom'

export const Error = () => {
  return (
    <div style={{ padding: '200px', backgroundColor: '#F3F3F3' }}>
      
      <h3>Error 404 Sorry, we could not find what you where looking for</h3>
     
       <Link to="/inicio" > <h4>Go back home</h4></Link>
    </div>
  )
}
