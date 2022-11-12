import {configureStore,createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name : 'login',
    initialState : localStorage.getItem('token') ? {isLogin:true,token:localStorage.getItem('token')}: {isLogin : false,token:""},
    reducers: {
        Login(state,action){
          localStorage.setItem('token',action.payload.token);
          return {isLogin : true,token:action.payload.token};
        },
        Logout(state,action){
          localStorage.removeItem('token');
          return {isLogin : false,token:""};
        }
    }
}) 

export const actions = loginSlice.actions;
const store = configureStore({
reducer : loginSlice.reducer,
});

export default store;