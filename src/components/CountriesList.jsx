/* eslint-disable react/prop-types */

import CountryItem from "./CountryItem"
import Message from './Message'
import styles from './CountriesList.module.css'
import Spinner from './Spinner'
import { useCities } from "../contexts/CityContext"
const CountriesList = ()=> {
  const {cities, isLoading} = useCities()
  if(isLoading) return <Spinner/>
  if(!cities.length) return <Message message="Please click on the map to add your city"/>
//   const country1 = [...new Set(cities.map(el=>el.country))]
// console.log(country1)
const country= cities.reduce((arr, city)=>{
  if (!arr.map(el=>el.country).includes(city.country))
  return [...arr, {country: city.country, emoji:city.emoji}]
  else
  return arr
},[])
  return (
    <ul className={styles.countryList}>
      {country.map(country=>(<CountryItem key="1" country={country}/>))}
    </ul>
  )
}

export default CountriesList
