import React from 'react';
import {Link} from 'react-router-dom'

export const Error = () => {
  return (
    <div style={{ padding: '200px', backgroundColor: '#F3F3F3' }}>
      
      <h3>Error 404 Esta pagina no existe</h3>
     
       <Link to="/inicio" > <h4>Volver a la pagina principal</h4></Link>
    </div>
  )
}
