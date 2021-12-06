import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { cartActions } from '../redux/cartReducer'
import { CartContent, PageHero } from '../components'

const CartPage = () => {
  const cart  = useSelector(s => s.cart.cart);
  const dispatch = useDispatch();

  //偵測購物車內容變化
  useEffect(() => {
    //console.log('create a cart', JSON.stringify(cart));
    dispatch(cartActions.countCartTotlas()); //cart有變化就重新計算總價
    localStorage.setItem('cart', JSON.stringify(cart)) //把購物車內容放物 localStorage
  }, [cart])

  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/products' className='btn'>
            fill it
          </Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <main>
      <PageHero title='cart' />
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
