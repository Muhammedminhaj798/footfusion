import React, { useEffect, useState } from 'react'
import axios from 'axios'


function useFetch(url) {
  const [data,setData] = useState([])
  useEffect(()=>{
    const FetchData = async()=>{
        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            console.error('Your attemt is Failed :', error);
        }
    }
    FetchData()
  },[url])
  return {data}
}

export default useFetch
