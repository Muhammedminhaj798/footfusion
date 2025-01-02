import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const clickToLogout = () => {
    localStorage.removeItem('loginUser')
    navigate('/')
   }
   
   const loggedInUser = JSON.parse(localStorage.getItem('loginUser'))
  //  useEffect(()=>{
  //   if(loggedInUser){
  //     setUser(loggedInUser);
  //     setUser(loggedInUser.email)
      
  //   }
  //  },[setUser])

   


    
  return (
<div>
  {loggedInUser ? (
    <>
      <h1 className="font-bold text-4xl">User name: {loggedInUser.username}</h1>
      <br />
      <br />
      <h1 className="font-bold text-4xl">E-mail: {loggedInUser?.email}</h1>
      <button
        className="w-48 h-10 mt-96 mx-96 bg-gray-600"
        onClick={clickToLogout}
      >
        Logout
      </button>
    </>
  ) : (
    <Link to={'/login'}>
      <h1 className='text-3xl'>please login the website...</h1>
    <button className="w-48 h-10 mt-96 mx-[600px] bg-gray-600">Login</button>
    </Link>
  )}
</div>

  )
}

export default Profile