import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalButton } from '../../StyleApp'

export const HomeContainer = styled.div`
width: 60%;
margin:10% auto;
display:inline-block;
// border:1px solid yellow;

.home-item{
  width:100%;
  // border:1px solid grey;
  min-height:10em;
  display:flex;
  align-items:center;
  justify-content:center;
}



`

function Home() {
  return (
    <HomeContainer>
      <div className='home-item'>
      <lottie-player src='https://lottie.host/42011c14-708c-4a34-9bdd-b3f75fe0fecb/94371KcN2Q.json' background='#fff' speed='1' style={{width: '100%', height: '100px'}}   autoplay direction='1' mode='normal'>
    </lottie-player>
      </div>
    
  <div className='home-item'>
  <Link className='nav-link' to='/login'>Login</Link>
    <Link className='nav-link' to='/register'>Register</Link>

  </div>
    
    
</HomeContainer>
   
    
  )
}

export default Home