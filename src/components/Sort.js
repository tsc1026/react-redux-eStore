import React, { useEffect } from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'

import {useDispatch, useSelector} from 'react-redux'
import { filterProductsActions } from '../redux/filterReducer'

const Sort = () => {
  const dispatch = useDispatch();
  const products = useSelector(s => s.filterProducts.filtered_products);
  const grid_view = useSelector(s => s.filterProducts.grid_view);
  const Sort = useSelector(s => s.filterProducts.sort); //sort condition

  useEffect(() => {
    dispatch(filterProductsActions.sortProducts())
  }, [products, Sort])

  //按下GridView btn 改變 filterReducer 下的 grid_view 值
  const setGridViewHandler = () => {
    dispatch(filterProductsActions.setGridView());
  }
  
  //按下ListView btn 改變 filterReducer 下的 grid_view 值
  const setListViewHandler = () => {
    dispatch(filterProductsActions.setListView());
  }

  const sortChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log('name', name);
    //console.log('value', value);
    dispatch(filterProductsActions.updateSort({name, value}));
  }

  return (<Wrapper>
    <div className='btn-container'>
      <button
          type='button'
          className={`${grid_view ? 'active' : null}`}
          onClick={setGridViewHandler}
        >
          <BsFillGridFill />
        </button>
        <button
          type='button'
          className={`${!grid_view ? 'active' : null}`}
          onClick={setListViewHandler}
        >
          <BsList />
        </button>
    </div>
    <p>{products.length} products found</p>
    <hr/>
    <form>
      <label htmlFor='sort'>sort by</label>
      <select name='sort' id='sort' className='sort-input' onChange={sortChangeHandler}>
        <option value='price-lowest'>price(lowest)</option>
        <option value='price-highest'>price(highest)</option>
        <option value='name-a'>name (a-z)</option>
        <option value='name-z'>name (z-a)</option>
      </select>
    </form>
  </Wrapper>)
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
