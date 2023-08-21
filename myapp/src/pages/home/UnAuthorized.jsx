import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const UnauthContainer=styled.div`
width:90%;
margin:1% auto;
font-size:16px;
h1{
  font-size:1.5em;
  color:grey;
}
`

function UnAuthorized() {
  return (
    <UnauthContainer>
    <lottie-player src='https://lottie.host/211607d3-33ac-4a19-9d9f-8da40890bba8/WD4slJIwFr.json' background='#fff' speed='1' style={{width: '60%', height: '100px', margin:'1% auto'}}  autoplay direction='1' mode='normal'></lottie-player>
    <h1>Unauthorized : Access Denied</h1>
    <Link to='/'> Go back to Home</Link>
    </UnauthContainer>
    
  )
}

export default UnAuthorized