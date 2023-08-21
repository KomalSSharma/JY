import Cookies from 'js-cookie'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetUserDataQuery, useLogoutMutation, useUpdateUserDataMutation } from '../../features/api/userApi';
import { GlobalButton } from '../../StyleApp';
import UnAuthorized from '../home/UnAuthorized';
import { Link } from 'react-router-dom';
import UpdateData from './UpdateData';
import { toast } from "react-toastify";
import {BiHome} from 'react-icons/bi'
import Loader from './Loader';




export const ProfileConatiner=styled.div`
width:80%;
// min-height:25em;
margin:5% auto;
// border:1px solid lightgrey;
font-size:16px;
border-radius:1rem;
// position:relative;


.custom-table{
    width:80%;
    margin:3% auto;
    
    overflow: auto;
        border-collapse: collapse;
        

        thead {
            background-color: #f2f2f2;
           
            
          };

          tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          };

          tbody tr:hover {
            background-color: #eaf6ff;
          };

          button {
            padding: 5px 10px;
            background-color: grey;
            color: white;
            border: none;
            cursor: pointer;
            border-radius:4px;
            margin:0.3em ;
            min-width:5em;

            &:hover {
                background-color: #45a049;
              }
          }

        th{
            background-color:dodgerblue;
            color:white;
            text-align:center;
            padding: 10px;
            border: 1px solid #ccc;
        };
         

       .table-cell td{
        padding: 10px;
        border: 1px solid #ccc;
        text-transform:capitalize;
          };
    
}
`

function Profile() {
    const token = Cookies.get('authToken')
    const uidToken = Cookies.get('uid')
    const[logout] = useLogoutMutation()

    const handleDelete=()=>{
      toast("deleted data successfully",
      {
          type:'danger'
      })
    }

    const handleLogout = async () => {
        try {
          await logout();
          console.log('Logged out successfully.');
          toast('Successfully Logged out', {
            type: 'success',
          });
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
      
      
      console.log('UID Token:', uidToken); 
      // const docPath = `user/${uidToken}`;
      // console.log('Document Path:', docPath);


      const { data: userData, error: userDataError, isLoading } = useGetUserDataQuery(uidToken)

      // console.log('userData:', userData)
      // console.log('userDataError:', userDataError)
      // console.log('isLoading:', isLoading)

// const[updateUserData] = useUpdateUserDataMutation(uidToken)
     
const[display , setDisplay] = useState(false)
  return (
    <>
    {token ? (
        <ProfileConatiner>
         
          {isLoading && (
            <Loader/>
          ) }

          {
            userData &&
            <>
            <Link className='main-nav-link' to='/'><BiHome/></Link>
            <Link className='main-nav-link' onClick={handleLogout} style={{right:'3em'}}>Signout</Link>
              <table className="custom-table">
              <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>About</th>
              <th>Location</th>
              <th>Interests</th>
              <th>Actions</th>
            </tr>
          </thead>
                <tbody>
                  
                 
                  <tr key={userData?.id} className="table-cell">
                  <td>{userData?.firstName}</td>
                  <td>{userData?.lastName}</td>
                  <td>{userData?.gender}</td>
                  <td>{userData?.about}</td>
                  <td>{userData?.location}</td>
                  <td>{userData?.interests.join(', ')}</td>
                  <td>
                    <button onClick={()=>setDisplay(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                  </td>
                </tr>
               
                    
                 
                </tbody>
              </table>
              {/* <GlobalButton onClick={handleLogout}>Logout</GlobalButton> */}

              {display && userData && <UpdateData data={userData} setDisplay={setDisplay} />}
            </>
        
           }
        </ProfileConatiner>
      ) : (
        <UnAuthorized />
      )}
</>
   
  )
}

export default Profile