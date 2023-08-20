import React , {useState} from 'react'
import styled from 'styled-components'
import Step1 from './Step1';
import Step2 from './Step2';
import { Link } from 'react-router-dom';
import {BiHome} from 'react-icons/bi'

export const MainFormConatiner=styled.div`
width:50%;
min-height:25em;
margin:5% auto;
// border:1px solid lightgrey;
font-size:16px;
border-radius:1rem;
position:relative;
box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;


`

function MainForm() {
    const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    interests: [],
    location: '',
    about: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <MainFormConatiner>
      {step === 1 && (
        <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Step2 formData={formData} handleChange={handleChange} prevStep={prevStep} />
      )}
      <Link className='main-nav-link' to='/'><BiHome/></Link>
    
    </MainFormConatiner>
  )
}

export default MainForm