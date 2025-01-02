import React from 'react'
import Man from './Man'
import Women from './Women'
import Kids from './Kids'

function Colloctions() {
  return (
    <div>
      <h1 className='text-2xl font-serif mt-4 ml-8'>Mens Collections</h1>
      <hr/>
      <Man/>
      <h1 className='text-2xl font-serif mt-4 ml-8'>Womens Collections</h1>
      <hr/>
      <Women/>
      <h1 className='text-2xl font-serif mt-4 ml-8'>Kids Collection</h1>
      <hr/>
      <Kids/>
    </div>
  )
}

export default Colloctions
