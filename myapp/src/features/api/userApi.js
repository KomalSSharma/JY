import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  onSnapshot, orderBy , query
  
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  
} from "firebase/auth";
import { auth , db } from "../../firebase.config";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserData: builder.query({
      async queryFn() {
        const blogsRef = collection(db, "user");
    const q = query(blogsRef, orderBy("email"));
    const querySnapshot = await getDocs(q);

    const userData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return userData;
  },
    }),

    editUserData : builder.mutation({

      async queryFn(data) {
        const { id, ...updatedData } = data;
    
        try {
          await updateDoc(doc(db, "user", id), updatedData);
          return { success: true };
        } catch (error) {
          console.error("Error editing user data:", error);
          throw error;
        }
      },

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
                  });
      
                  result = docref.id; 
                  console.log('User result after registration:', result);
                  console.log("document created with id: " + docref.id);
                  const token = userCredential.user.accessToken;
                  Cookies.set("authToken", token, { expires: 1 });
                } catch (error) {
                  console.log(error);
                  throw error;
                }
              })
              .catch((err) => console.log(err));
            
            return { data: result }; // Return the result object
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
      
            const token = userCredential.user.accessToken;
            Cookies.set("authToken", token, { expires: 1 });
      
            return userCredential.user; // Return the user data if needed
          } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
              // Handle specific login error cases
              alert("Sorry, You are not a registered user or the password is incorrect.");
            } else {
              // Handle other login errors
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

export const { useGetUserDataQuery, useRegisterMutation , useLoginMutation , useLogoutMutation } = userApi;
