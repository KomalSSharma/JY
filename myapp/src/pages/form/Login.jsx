import React, { useState } from 'react';
import { HomeContainer } from '../home/Home';
import { GlobalButton } from '../../StyleApp';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/api/userApi';
import { StepOneContainer } from './Step1';
import styled from 'styled-components'
import {BiHome} from 'react-icons/bi'
import Cookies from 'js-cookie'

export const LoginContainer=styled.div`
width: 60%;
margin:10% auto;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
position:relative;
`


function Login() {

    const [login, { isError, error }] = useLoginMutation();
    const navigate = useNavigate()
   


  const initialState = {
    email: '',
    password: ''
  };

  const [formValue, setFormValue] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value
    }));
  };


//   const handleSubmit = async(e) => {
//     // debugger;
//     e.preventDefault();
//     const{email , password} = formValue
//     if(email && password){
//         await login(formValue)
//         console.log(formValue)
//         navigate('/profile')
//     }
//     setFormValue(initialState);
    
//   };





const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    if (email && password) {
      await login(formValue)
        .unwrap() 
        .then(() => {
          console.log('Login successful');
          navigate('/profile');
        })
        .catch((err) => {
          console.error('Login error:', err);
        });
    }
    setFormValue(initialState);
  };



  const token = Cookies.get('authToken')

  return (
    <>
    {token ? <Link  to='/profile'> You are Already Logged in . GoTo Profile</Link> 
    :
    <LoginContainer>
    <Link className='main-nav-link' to='/'><BiHome/></Link>
<StepOneContainer>

    <h2>Login</h2>
  <form onSubmit={handleSubmit}>

  <div className='step-one-item'>
    <label htmlFor='email'>Email Address</label>
    <input
          type='email'
          id='email'
          name='email' 
          placeholder='Email Address'
          value={formValue.email}
          onChange={handleChange}
        />
    </div>

    <div className='step-one-item'>
    <label htmlFor='password'>Password</label>
    <input
type='password'
id='password'
name='password' 
required
placeholder='Password'
value={formValue.password}
onChange={handleChange} 
/>

    </div>

    <GlobalButton type='submit'>Submit</GlobalButton>
    

  </form>
  {isError && <div>Error: {error.message}</div>}
</StepOneContainer>
</LoginContainer>
    }
    </>
  
  );
}

export default Login;
