import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUpdateUserDataMutation } from '../../features/api/userApi';
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

export const UpdateContainer=styled.div`
width: 70%;
// margin:2% auto;
background-color:white;
color:grey;
position:absolute;
min-height:70%;
top:0;
left:15%;
// border:1px solid grey;
z-index:18;
padding:5% 10%;
border-radius:1em;



`

const FormContainer = styled.div`
 width: 100%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius:1em;
  position:relative;

.close{
    width:4em;
    margin:0 auto;
    // border:1px solid grey;
    position:absolute;
    top:0;
    right:0;
};
button{
    border:1px solid lightgrey;
}
`;

const FormField = styled.div`
  margin-bottom: 10px;

  .check{
    width: 2em
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  select{
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function UpdateData({ setDisplay , data}) {

    const [firstName, setFirstName] = useState(data.firstName || '');
    const [lastName, setLastName] = useState(data.lastName || '');
    // const [contactNumber, setContactNumber] = useState(data.contactNumber || '');
    const [gender, setGender] = useState(data.gender || '');
    const [interests, setInterests] = useState(data.interests || []);
    const [location, setLocation] = useState(data.location || '');
    const [about, setAbout] = useState(data.about || '');
  
    const handleInterestsChange = (event) => {
      const value = event.target.value;
      if (event.target.checked) {
        setInterests([...interests, value]);
      } else {
        setInterests(interests.filter((item) => item !== value));
      }
    };
    const[updateUserData , {isLoading , isError , error}] = useUpdateUserDataMutation(data?.uid)

    
const token = Cookies.get('uid')



const handleUpdate = async (e) => {
    e.preventDefault();
    debugger;
    if (firstName && lastName && gender && location && interests && about) {
      try {
        const updatedData = {
            uid: data?.uid,
          firstName,
          lastName,
          gender,
          location,
          interests,
          about
        };
  
        const response = await updateUserData(updatedData).unwrap();
        console.log(response); 
        toast('user data updated successfully', {
            type: 'success',
          });
          setDisplay(false);
      } catch (error) {
        toast('updation failed', {
            type: 'danger',
          });
        console.log(error); 
      }
    }
  };
  
 
  
  
    return (
        <UpdateContainer>
      <FormContainer>
        <button className='close' onClick={()=>setDisplay(false)}>Close</button>
        <h2>Update Personal Info</h2>
        <form>
          <FormField>
            <FormLabel>First Name</FormLabel>
            <FormInput type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormField>
          <FormField>
            <FormLabel>Last Name</FormLabel>
            <FormInput type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormField>
          <FormField>
            <FormLabel>Gender</FormLabel>
            <FormInput type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'} /> Male
            <FormInput type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} /> Female
          </FormField>
          <FormField>
            <FormLabel>Interests</FormLabel>
            <label>
              <input className='check' type="checkbox" value="Reading Books" onChange={handleInterestsChange} checked={interests.includes('Reading Books')} /> Reading Books
            </label>
            <label>
              <input className='check' type="checkbox" value="Watching Movies" onChange={handleInterestsChange} checked={interests.includes('Watching Movies')} /> Watching Movies
            </label>
            <label>
              <input className='check' type="checkbox" value="Others" onChange={handleInterestsChange} checked={interests.includes('Others')} /> Others
            </label>
          </FormField>
          <FormField>
            <FormLabel>Location</FormLabel>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select Location</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
            </select>
          </FormField>
          <FormField>
            <FormLabel>About</FormLabel>
            <FormTextArea value={about} onChange={(e) => setAbout(e.target.value)} maxLength={100} />
            <div>Characters remaining: {100 - about.length}</div>
          </FormField>
          <FormField>
            <button type="submit"  onClick={handleUpdate} disabled={isLoading}>{isLoading ?'updating' : 'Update'}</button>
          </FormField>
        </form>
      </FormContainer>
      </UpdateContainer>
    );
  };
  
export default UpdateData
