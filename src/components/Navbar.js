import React from 'react'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import {useDispatch} from 'react-redux'

import logo from '../assets/logo2.svg'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { ProductsActions } from '../redux/productReducer'
import { useUserContext } from '../context/user_context'

const Nav = () => {
   const dispatch = useDispatch();
   const {myUser} = useUserContext();

   const openSidebarHandler = () => {
     dispatch(ProductsActions.openSidebar());
   }

  return (
    <NavContainer>
      <div className='nav-center'>
        
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} alt='estore'></img>
          </Link>
          {/*漢堡按鈕992 px以上就會隱藏 */}
          <button type='button' className='nav-toggle' onClick={openSidebarHandler}>
            <FaBars/>
          </button>
        </div>

        {/*992 px以上才顯示之nav links, links定義在constants.js只需要繞航它, 以後要加新的links比較方便*/}
        <ul className='nav-links'>
          {links.map((link) => {
            const {id, text, url} = link;
            return (
              <li key={id}>
                <Link to={url}>
                  {text}
                </Link>
              </li>
            )
          })}
          {myUser && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        
        {/*購物車按鈕 */}
        <CartButtons/>

      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width); 
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  //992px以下 NavBar 之購物車按鈕隱藏
  .cart-btn-wrapper {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }

    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    //992px以上 NavBar 之購物車按鈕顯示
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav
