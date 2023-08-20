import Cookies from 'js-cookie'
import React from 'react'
import styled from 'styled-components'
import { useLogoutMutation } from '../../features/api/userApi';
import { GlobalButton } from '../../StyleApp';
import UnAuthorized from '../home/UnAuthorized';


export const ProfileConatiner=styled.div`
width:80%;
// min-height:25em;
margin:5% auto;
border:1px solid lightgrey;
font-size:16px;
border-radius:1rem;


.custom-table{
    width:100%;
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
          };
    
}
`

function Profile() {
    const token = Cookies.get('authToken')
    const[logout] = useLogoutMutation()

    const handleLogout = async () => {
        try {
          await logout();
          console.log('Logged out successfully.');
          // You can navigate to the login page or perform any other action after logout
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

  return (
    <>
    {token ?
     <ProfileConatiner>
     <table className='custom-table'>
<thead>
 <tr>
     <th>ID</th>
     <th>Author</th>
     <th>Title</th>
     <th>Date</th>
     <th>Actions</th>
 </tr>
</thead>
<tbody>

 <tr className='table-cell'   >
     <td>1</td>
     <td>kk</td>
     <td>kmk</td>
     <td>12.0.23</td>
     <td>
        <button >Edit</button>
         <button >Delete</button>
     </td>
 </tr>
   
</tbody>
</table>
<GlobalButton onClick={handleLogout}>Logout</GlobalButton>
 </ProfileConatiner> :
<UnAuthorized/>
}
</>
   
  )
}

export default Profile