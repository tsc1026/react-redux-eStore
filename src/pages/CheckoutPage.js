import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { PageHero, StripeCheckout } from '../components'

const CheckoutPage = () => {
  const cart  = useSelector(s => s.cart.cart);
  return (
    <main>
    <PageHero title='checkout' />
    <Wrapper className='page'>
      {cart.length < 1 ? (
        <div className='empty'>
          <h2>your cart is empty</h2>
          <Link to='/products' className='btn'>
            fill it
          </Link>
        </div>
      ) : (
        <StripeCheckout />
      )}
    </Wrapper>
  </main>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`

export default CheckoutPage
