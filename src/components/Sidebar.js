import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'

import logo from '../assets/logo2.svg'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useUserContext } from '../context/user_context' 
import { ProductsActions } from '../redux/productReducer'


const Sidebar = () => {
  const dispatch = useDispatch();
  //從store 取出 isSidebarOpen 變數判斷 sidebar 是否有打開
  const isSidebarOpen = useSelector(state => state.products.isSidebarOpen);
  const {myUser} = useUserContext();

  const closeSidebarHandler = () => {
    dispatch(ProductsActions.closeSidebar())
  }

  return (
    <SidebarContainer>
      <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        
        <div className='sidebar-header'>
          <img src={logo} className='logo' alt='eStore'/>
          <button className='close-btn' type='button' onClick={closeSidebarHandler}>
            <FaTimes/>
          </button>
        </div>

        <ul className='links'>
          {links.map(({id, text, url}) => {
            return(
              <li key={id}>
                <Link to={url} onClick={closeSidebarHandler}>
                  {text}
                </Link>
              </li>
            )
          })}
          {myUser && (
            <Link to='/checkout' onClick={closeSidebarHandler}>
              checkout
            </Link>
          )}
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  text-align: center;

  .sidebar-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }

  .close-btn{
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  
  .logo {
    justify-self: center;
    height: 45px;
  }

  .links{
    margin-bottom: 2rem;
  }

  .links a{
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }

  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }

   //cart-btn-wrapper沒有定義在此component的css, 而是定義在 Navbar.js下, 
   //因 Navbar.js 是 CartButtons component 之父親, 而此component又使用了CartButtons component, 所以一樣可以套用到此 css
  //作用就是 992 px 以上 cartButtons(購物車按鈕) 才會出現在 nav bar, 而sidebar之購物車按鈕則隱藏
  .cart-btn-wrapper {
    margin: 2rem auto;
  }

  //992px以上不顯示sidebar
  @media screen and (min-width: 992px){
    .sidebar{
      display: none;
    }
  }

`

export default Sidebar
