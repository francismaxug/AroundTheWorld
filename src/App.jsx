
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import City from "./components/City"
import Pricing from './pages/Pricing'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Product from './pages/Product'
import Form from './components/Form'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountriesList from './components/CountriesList'
import { ContextProvider } from './contexts/CityContext'

function App() {

 

  return (
    <ContextProvider>
   <BrowserRouter>
   <Routes>
    <Route index  element={<Homepage/>}/>
    <Route path='product'  element={<Product/>}/>
    <Route path='price'  element={<Pricing/>}/>
    <Route path='login'  element={<Login/>}/>
    <Route path='app'  element={<AppLayout/>}>
      <Route index element={<Navigate replace to="cities"  />}/>
      <Route path='cities/:id' element={<City/>}/>
      <Route path='cities' element={<CityList />}/>
      <Route path='countries' element={<CountriesList />}/>
      <Route path='form' element={<Form/>}/>
    </Route>
    <Route path='*'  element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
   </ContextProvider>
  )
}

export default App
