import React from 'react'
import HomeShoe from '../image/HomeShoe'
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'
import Man from '../components/Man'

function Home() {
  // const {data} = useFetch("https://jsonplaceholder.typicode.com/users")
  // console.log(data);
  
  return (
    <div>
      <div>
        <div className='absolute top-64 '>
        <h1 className='text-5xl px-72 text-center text-red-600 font-bold'>Step up your style game with <br/><br/> unbeatable deals today!</h1>
         
        </div>
        <HomeShoe />
        <Man/>
      </div>
   </div>
  )
}

export default Home
