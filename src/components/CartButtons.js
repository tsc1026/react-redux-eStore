import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'

import { useUserContext } from '../context/user_context'
import { ProductsActions } from '../redux/productReducer'
import { cartActions } from '../redux/cartReducer'

const CartButtons = () => {
  const dispatch = useDispatch();
  const total_items = useSelector(s => s.cart.total_items);
  //console.log('total_items', total_items);
  const { loginWithRedirect, myUser, logout } = useUserContext();

  const closeSidebarHandler = () => {
    dispatch(ProductsActions.closeSidebar());
  }

  //cart-btn-wrapper沒有定義在此component的css, 而是定義在 Navbar.js下, 因Navbar.js是此component之父親, 所以一樣可以套用
  //作用就是 992 px 以上 cartButtons 才會出現
  return <Wrapper className='cart-btn-wrapper'>
          {/*購物車按鈕 */}
          <Link to='/cart' className='cart-btn' onClick={closeSidebarHandler}>
            Cart
            <span className='cart-container'>
              <FaShoppingCart/>
              <span className='cart-value'>{total_items}</span>
            </span>
          </Link>
          
        {myUser ? (
          <button
            type='button'
            className='auth-btn'
            onClick={() => {
              dispatch(cartActions.clearCart()); //登出後清空購物車
              localStorage.removeItem('user')
              logout({ returnTo: window.location.origin })
            }}
          >
            Logout <FaUserMinus />
          </button>
        ) : (
          <button type='button' className='auth-btn' onClick={loginWithRedirect}>
            Login <FaUserPlus />
          </button>
        )}

         </Wrapper>
}

const Wrapper = styled.div`
   display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }

  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
