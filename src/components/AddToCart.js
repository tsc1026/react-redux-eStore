import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

import AmountButtons from './AmountButtons'
import {cartActions} from '../redux/cartReducer';

const AddToCart = ({product}) => {
  
  const dispatch = useDispatch();
  const {id, stock, colors} = product;
  const [mainColor, SetMainColor] = useState(colors[0]); //產品顏色
  const [amount, setAmount] = useState(1); //產品數量

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1
      //確認庫存
      if (tempAmount > stock) {
        tempAmount = stock
      }
      return tempAmount
    })
  }

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1
      //確認庫存
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
  }

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({id, mainColor, amount, product}));
  }

  {/*遶行colors 去顯示顏色按鈕, 點下顏色按鈕後, 會動態套用 css 到顏色按鈕上 */}
  return (
    <Wrapper>
      <div className='colors'>
        <div>
          {colors.map((color, index) => {
            return(
              <button
                key={index}
                style={{background: color}}
                className={`${mainColor === color ? 'color-btn active' : 'color-btn'}`}
                onClick={() => SetMainColor(color)}
              >
                {mainColor === color ? <FaCheck/> : null}
              </button>
            )
          })}
        </div>
      </div>
      
      <div className='btn-container'>
          {/*將 increase & decrease func ref 傳給 AmountButtons component, AmountButtons component 按下後會觸發回這裡處理*/}
          <AmountButtons 
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
          <Link to='/cart' className='btn' onClick={addToCartHandler}>
            add to cart
          </Link>
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
