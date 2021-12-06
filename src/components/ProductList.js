import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import GridView from './GridView'
import ListView from './ListView'
import { getProducts } from '../redux/productReducer'

const ProductList = () => {
  const products = useSelector(s => s.filterProducts.filtered_products);
  //console.log('result', products);
  const grid_view = useSelector(s => s.filterProducts.grid_view);
  const dispatch = useDispatch();

  useEffect(() => {
    //初始網頁時載入一次所有產品
    dispatch(getProducts()); 
  }, 
  []);

  if(products.length < 1){
    return(
      <h5 style={{textTransform: 'none'}}>
        Sorry, no produts matched your search.
      </h5>
    )
  }

  if(grid_view === false){
    return(
      <ListView products={products}></ListView>
    )
  }

  return (
    <GridView products={products}>
      product list
    </GridView>
  )
}

export default ProductList
