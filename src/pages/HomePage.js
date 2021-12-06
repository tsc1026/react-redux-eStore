import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'

import { FeaturedProducts, Hero, Services, Contact } from '../components'
import { getProducts } from '../redux/productReducer'


const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    }, 
  [])

  return (
    <main>
      <Hero/>
      <FeaturedProducts/>
      <Services/>
      <Contact/>
    </main>  
  )
}

export default HomePage
