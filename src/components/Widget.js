import React from 'react'

const Widget = ({ 
  task, description  
}) => {
  return (
    <div className='widget'>
        <h2>{task}</h2>
        <p>{description}</p>
    </div>
  )
}

export default Widget