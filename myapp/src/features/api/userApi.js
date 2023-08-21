import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  onSnapshot, orderBy , query,
  getDocs,
  where,
  Timestamp,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  
} from "firebase/auth";
import { auth , db } from "../../firebase.config";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes : ['user'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    

    getUserData: builder.query({
      async queryFn(uid) {
        // debugger;
        try {
          console.log('Querying Firestore with uid:', uid);
    
          const q = query(collection(db, 'user'), where('uid', '==', uid));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            
            const userDocument = querySnapshot.docs[0].data();
    
            
            if (userDocument.timestamp instanceof Timestamp) {
              userDocument.timestamp = userDocument?.timestamp?.toDate();
            }
    
            // console.log('User Document:', userDocument);
            return { data: userDocument };
          } else {
            
            // console.log('No user found with the specified UID.');
            return { data: null }; 
          }
        } catch (error) {
          // console.error('Error fetching user document:', error);
          return { error: 'An error occurred while fetching user data.' };
        }
      },
      providesTags: ['user'],
    }),
    
    


    deletUserInfo : builder.mutation({
    async queryFn(id){
      try
      {
        await deleteDoc(doc(db , 'user' , id))
        return{data:'deleted OK'}

      } catch(err){
        console.log(err)
      }
    },
    invalidatesTags : ['user'],

    }),



    updateUserData: builder.mutation({
      async queryFn(data) {
        try {
          debugger;

          const userQuery = query(collection(db, 'user'), where('uid', '==', data.uid));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;

            await updateDoc(userDocRef, {
              ...data,
              timestamp: serverTimestamp(),
              // Other fields you want to update
            });

            const updatedUserDocument = (await getDoc(userDocRef)).data();
            console.log('Updated User Document:', updatedUserDocument);

            return { data: updatedUserDocument };
          } else {
            console.log('No user found with the specified UID.');
            return { data: null };
          }
        } catch (error) {
          console.error('Error updating or fetching user document:', error);
          return { error: 'An error occurred while updating user data.' };
        }
      },
      invalidatesTags: ['user'],
    }),


    



    

    register: builder.mutation({
        async queryFn(data) {
          try {
            let result; 
      
            await createUserWithEmailAndPassword(auth, data.email, data.password)
              .then(async (userCredential) => {
                console.log(userCredential);
      
                try {
                  const docref = await addDoc(collection(db, "user"), {
                    ...data,
                    timestamp: serverTimestamp(),
                    uid:userCredential.user.uid,
                  });
      
                  result = { id: docref.id, uid: userCredential.user.uid }; 
                  console.log('User result after registration:', result);
                  console.log("document created with id: " + docref.id);
                  const docid = docref.id;
                  Cookies.set('id', docid , { expires: 1 })
                  const token = userCredential.user.accessToken;
                  Cookies.set("authToken", token, { expires: 1 });

                  const uid = userCredential.user.uid
                  Cookies.set("uid", uid, { expires: 1 });
                }
                catch (error) {
                    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                      
                      alert("Sorry, You are not a registered user or the password is incorrect.");
                    } 
                    else if(error.code === "auth/email-already-in-use"){
                      alert("Sorry, email is in use try again.");
                    }
                    else {
                     
                      console.error("Error logging in:", error);
                    }
              
                    throw error;
                  }
              })
              .catch((err) => {
                alert(err)
                console.log(err)});
            
            return { data: result }; 
          } catch (error) {
            console.error("Error signing up:", error);
            throw error;
          }
        },
      }),
      

    login: builder.mutation({
        async queryFn(data) {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log(userCredential);
      
            const token = userCredential?.user?.accessToken;
            Cookies.set("authToken", token, { expires: 1 });

            const uid = userCredential.user.uid
                  Cookies.set("uid", uid, { expires: 1 });
      
            return userCredential.user; 
          } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
              
              console.log("Sorry, You are not a registered user or the password is incorrect.");
            } 
            else if(error.code === "auth/email-already-in-use"){
              console.log("Sorry, email is in use try again.");
            }
            else {
             
              console.error("Error logging in:", error);
            }
      
            throw error;
          }
        },
      }),
      


      logout: builder.mutation({
        queryFn: async () => {
          try {
            await auth.signOut();
            Cookies.remove('authToken');
            return { success: true };
          } catch (error) {
            console.error('Error logging out:', error);
            throw error;
          }
        },
      }),


      
  }),
});

export const { useGetUserDataQuery, useRegisterMutation , useLoginMutation , useLogoutMutation ,  useDeletUserInfoMutation , useUpdateUserDataMutation } = userApi;
