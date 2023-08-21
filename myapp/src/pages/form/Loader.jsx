import React from 'react'
import { Rings } from  'react-loader-spinner'
import styled from 'styled-components'

export const LoaderContainer=styled.div`
width:40%;
margin:5% auto;
text-align:center;
display:flex;
align-items:center;
justify-content:center;
`

function Loader() {
  return (
    <LoaderContainer>
    <Rings
  height="150"
  width="150"
  color="#4fa94d"
  radius="30"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="rings-loading"
/>
</LoaderContainer>
  )
}

export default Loader