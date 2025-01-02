import React, { useState } from 'react'
import { UsersContext } from '../context/UserContext';
import { Link } from 'react-router-dom';


function UserDetails() {
  const { datas } = useContext(UsersContext);
  const [state , setState] = useState([])

  useEffect(()=>{
      const filter = datas.filter((filt) => filt.id == id);
      setState(filter)
  }, [datas,id])
  console.log("datas : " , datas);
  
  return (
    <div className='px-96 pt-20'>
      {state.map((item) => (
        <div
        key={item.id}
        >
          <Link >
          <h1>{item.username}</h1>
          </Link>
        </div>
      ))}

      {/* <div>
        <img className='w-28 mx-10' src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Profile" />
        <h1 className='text-xl text-center'>{datas.username}</h1>
      </div> */}
    </div>
  )
}

export default UserDetails
