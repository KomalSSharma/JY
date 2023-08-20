import React from 'react';
import styled from 'styled-components'
import { GlobalButton } from '../../StyleApp';

export const PreviewContainer=styled.div`
width:100%;
// margin:1% auto;
position: absolute;
top:0;
left:0;
z-index:18;
background-color:black;
color:white;
min-height:30rem;
text-align:left;
padding:5% 30%;


`

const Preview = ({ formData, prevStep }) => {
  const { firstName, lastName, email, password, gender, interests, location, about } = formData;

  return (
   
<PreviewContainer>
  {/* <div className="content"> */}
   

  <h2>Form Preview</h2>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
      <p>Gender: {gender}</p>
      <p>Interests: {interests.join(', ')}</p>
      <p>Location: {location}</p>
      <p>About: {about}</p>
      <GlobalButton onClick={prevStep}>Close</GlobalButton>
      {/* <GlobalButton>Submit</GlobalButton> */}
  {/* </div> */}
</PreviewContainer>
  );
};

export default Preview;
