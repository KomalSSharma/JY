import React , {useState } from 'react';
import { StepOneContainer } from './Step1';
import { GlobalButton } from '../../StyleApp';
import styled from 'styled-components'
import Preview from './Preview';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/api/userApi';

export const StepTwoContainer=styled.div`
width: 100%;
padding: 1em;
font-size:16px;

h2 {
  margin: 1% auto;
};

.step-two-item{
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 90%;
    margin: 1.5% auto;

    label{
      width:45%;
      text-align:left;
    };

    select{
      width:45%;
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

    textarea{
      width:45%;
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

  p{
    width:45%;
    text-align:left;
  };

  .step-two-middle{
    width:45%;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    flex-wrap:wrap;

    .step-two-inner{
padding:0.3em;

input{
  margin:0.3em;
  
};
    };
  };


}
`

const Step2 = ({ formData, handleChange, prevStep }) => {
  

  const { gender, interests, location, about , firstName, lastName, email, password} = formData;

  const navigate = useNavigate()
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const openPreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  const [register , { isError, error , isLoading }] = useRegisterMutation()


const handleRegister = async () => {
  if (email && password) {
    try {
      const result = await register(formData);
      console.log("Register result:", result);

      if ('data' in result && result.data !== undefined) {
        console.log('Registration successful:', result.data);
        navigate('/profile');
      } else if ('error' in result) {
        console.log('Registration failed:', result.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // alert(error)
    }
  } else {
    console.log('Please fill in all required fields.')
    // alert('Please fill in all required fields.');
  }
};





  return (
    <>
    <StepTwoContainer>
      <h2>Step 2: Additional Information</h2>
      <div className='step-two-item'>
      <p>
        Gender:
      </p>
        <div className='step-two-middle'>
          <div className='step-two-inner'>
          Male<input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={(e) => handleChange('gender', e.target.value)}
        />
          </div>
        <div className='step-two-inner'>
        Female<input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={(e) => handleChange('gender', e.target.value)}
        />
        </div>
        </div>     
      
      </div>
      
      <div className='step-two-item'>
      <p>
        Interests:
      </p>
      <div className='step-two-middle'>
        <div className='step-two-inner'>
          Reading Books
        <input
            type="checkbox"
            value="reading"
            checked={interests.includes('reading')}
            onChange={(e) =>
              handleChange('interests', e.target.checked ? [...interests, 'reading'] : interests.filter(i => i !== 'reading'))
            }
          />
        </div>      
          
      <div className='step-two-inner'>
      Watching Movies
      <input
            type="checkbox"
            value="movies"
            checked={interests.includes('movies')}
            onChange={(e) =>
              handleChange('interests', e.target.checked ? [...interests, 'movies'] : interests.filter(i => i !== 'movies'))
            }
          />
        </div>

        <div className='step-two-inner'>
      Others
      <input
            type="checkbox"
            value="otherss"
            checked={interests.includes('others')}
            onChange={(e) =>
              handleChange('interests', e.target.checked ? [...interests, 'others'] : interests.filter(i => i !== 'others'))
            }
          />
        </div> 
      </div>
      </div>



      <div className='step-two-item'>
        <label>Location</label>
      <select
        value={location}
        onChange={(e) => handleChange('location', e.target.value)}
      >
        <option value="">Select Location</option>
        <option value="city1">City 1</option>
        <option value="city2">City 2</option>
        <option value="city3">City 3</option>
      </select>
      </div>

      <div className='step-two-item'>
        <label>About</label>
      <textarea
        placeholder="About (max 100 characters)"
        value={about}
        onChange={(e) =>
          handleChange('about', e.target.value.slice(0, 100))
        }
      />
      </div>
      <GlobalButton onClick={prevStep} disabled={isLoading}>Back</GlobalButton>
      <GlobalButton onClick={openPreview} disabled={isLoading}>Preview</GlobalButton>
      {/* <Link to='/preview'>Preview</Link> */}
      <GlobalButton onClick={handleRegister}>{isLoading ? 'Wait' : 'Submit'}</GlobalButton>
      {isError && <div>Error: {error.message}</div>}
    </StepTwoContainer>
    

{isPreviewOpen && (
  <Preview formData={formData} prevStep={closePreview} />
)}
</>
  );
};

export default Step2;
