/* eslint-disable react/prop-types */

import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
const CityContext = React.createContext()

const BASE_URL = "http://localhost:8000"


function ContextProvider({children}) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})  
  
  useEffect(() => {
  const fetchFxn = async() =>{
    setIsloading(true)
    try {
      const res = await fetch(`${BASE_URL}/cities`)
      const data = await res.json()
      setCities(data)
    } catch (error) {
      console.log(error)
    }finally{
      setIsloading(false)
    }
  }
  fetchFxn()
  },[])

async function city(id){
  try {
    
    setIsloading(true)
    
    const res = await fetch(`${BASE_URL}/cities/${id}`)
    const data = await res.json()
    setCurrentCity(data)
  } catch (error) {
    console.log(error)
  }finally{
    setIsloading(false)
  }
}



  return (
    <CityContext.Provider value={{cities, isLoading,currentCity, city}}>
      {children}
    </CityContext.Provider>
  )
}

function useCities() {
  const context = useContext(CityContext)
  if(context===undefined) throw new Error("Cities Context was used outside the cities provider")
  return context
}

export  {ContextProvider, useCities}
