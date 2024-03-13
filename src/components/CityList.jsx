/* eslint-disable react/prop-types */

import CityItem from './CityItem'
import Message from './Message'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import { useCities } from '../contexts/CityContext'
const CityList = ()=> {

  const {cities, isLoading} = useCities()
  if(isLoading) return <Spinner/>
  if(!cities.length) return <Message message="Please click on the map to add your city"/>
  return (
    <ul className={styles.cityList}>
      {cities.map(city=>(<CityItem key={city.id} city={city}/>))}
    </ul>
  )
}

export default CityList
