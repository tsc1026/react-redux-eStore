import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { fetchSingleProduct } from '../redux/productReducer';
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'


const SingleProductPage = () => {
  const {id} = useParams(); //從url path 上抓 prod id 值
  const loading = useSelector(state => state.products.single_product_loading);
  const error = useSelector(state => state.products.single_product_error);
  const product = useSelector(state => state.products.single_product);
  const dispatch = useDispatch();
  const history = useHistory();
  const {name, price, description, stock, stars, reviews, id:sku, company, images} = product;

  // 監測 url path prod id 值, 一有改變就傳prod id 給 fetchSingleProduct(), 重新抓單一產品資料
  useEffect(() => {
    dispatch(fetchSingleProduct(`${url}${id}`));
    //eslint-disable-next-line
  }, [id]);

  //監測state error 值, 有錯就跳回首頁
  useEffect(() => {
    if(error){
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
    //eslint-disable-next-line
  }, []);

  if(loading){
    return <Loading/>
  }

  if(error){
    return <Error/>
  }

  return <Wrapper>
     <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className=' product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'> {formatPrice(price)}</h5>
            <p className='desc'> {description}</p>
            <p className='info'>
              <span>Available : </span>
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
