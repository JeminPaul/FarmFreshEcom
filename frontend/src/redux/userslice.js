import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Email:"",
    FirstName:"",
    image:"",
    LastName:"",
    _id:"",
}


// export const userSlice=createSlice({
//     name :'user',
//     initialState,
//     reducers:{
//         loginRedux:(state,action)=>{
//             console.log(action.payload.data);
//             // state.user=action.payload.data
//             state._id=action.payload.data._id
//             state.FirstName=action.payload.data.FirstName
//             state.LastName=action.payload.data.LastName
//             state.Email=action.payload.data.Email
//             state.image=action.payload.data.image
//         }
//     }
// })


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginRedux: (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          _id: data._id,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          image: data.image,
        };
      },
      logoutRedux:(state,action)=>{
        // const { data } = action.payload;
        // return {
        //   ...state,
        //   _id:"",
        //   FirstName: "",
        //   LastName: "",
        //   Email: "",
        //   image: "",
        // };
        const data = action.payload?.data || {}; // handle undefined payload.data
        return {
          ...state,
          _id: data._id || "",
          FirstName: data.FirstName || "",
          LastName: data.LastName || "",
          Email: data.Email || "",
          image: data.image || "",
        };
      }
    },
  });
  

export const {loginRedux,logoutRedux}=userSlice.actions


export default userSlice.reducer