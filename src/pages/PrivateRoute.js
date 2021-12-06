import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

//children: 傳入之component(此情況下是Checkout component) ...rest: private routes info
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0(); //從auth0 取得 user info 判斷是否登入
  return (
    /* {...rest} 取用 private routes info like exact path ....*/
    <Route
      {...rest} 
      render={() => {
        //如果myUser有值(表有登入)就 render children(Checkout) component, 否則就回到首頁
        return user ? children : <Redirect to='/'></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute

