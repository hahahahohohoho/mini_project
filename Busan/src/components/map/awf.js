import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
export default function awf() {
    
    const [restaurant, setRestaurant] = useState()
   
    useEffect(async()=>{
        try {
            const resList = await axios.get(`/restaurant`).data
            setRestaurant(resList)
        } catch (error) {
            
        }
    },[])
                                
    return (
    <div>
      
    </div>
  )
}
