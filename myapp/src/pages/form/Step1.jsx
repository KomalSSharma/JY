import React from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../StyleApp';

export const StepOneContainer = styled.div`
  width: 100%;
  padding: 1em;

  h2 {
    margin: 1% auto;
    letter-spacing:2px;
  };

  .step-one-item {
    width: 90%;
    margin: 1.5% auto;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span{
      display:flex;
      align-items:center;
      justify-content:flex-start;
      width:45%
    }

    label{
      text-align:left;
      width:45%;
    };

    input {
      width: 45%;
      padding: 8px;
      border-radius:5px;
      border:1px solid lightgrey;
      outline:none;

      &:focus{
        border:1px solid dodgerblue;
      };

      &:hover{
        border:1px solid goldenrod;
      }
    };
  };

 
`;

const Step1 = ({ formData, handleChange, nextStep }) => {
  const { firstName, lastName, email, password } = formData;

  return (
    <StepOneContainer>
      <h2>Step 1: Personal Information</h2>
      <div className='step-one-item'>
        <label htmlFor='firstName'>First Name</label>
        <input
          type='text'
          id='firstName'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
      </div>

      <div className='step-one-item'>
        <label htmlFor='lastName'>Last Name</label>
        <input
          type='text'
          id='lastName'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </div>

      <div className='step-one-item'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className='step-one-item'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          placeholder='Password'
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
      </div>
      <GlobalButton onClick={nextStep}>Next</GlobalButton>
    </StepOneContainer>
  );
};

export default Step1;
