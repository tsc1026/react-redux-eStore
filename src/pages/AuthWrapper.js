import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

//因為App.js 用 AuthWrapper 包住所有 components, 所以這裡的 childern === AuthWrapper 包住的所有 components
const AuthWrapper = ({children}) => {
  const {isLoading, error} = useAuth0(); //直接使用 useAuth0 取得 user login state

  //如果useAuth0 的 user login state is loading 
  if(isLoading){
    <Wrapper>
      <h1>Loading . . .</h1>
    </Wrapper>
  }

  //如果useAuth0 的 user login state is error 
  if(error){
    <Wrapper>
      <h1>{error.message}</h1>
    </Wrapper>
  }

  //如果useAuth0 的 user login state is successful, 就會顯示所有 components ex. home page ...etc
  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`
export default AuthWrapper
