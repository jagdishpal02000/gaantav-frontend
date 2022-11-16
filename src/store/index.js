import {configureStore,createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name : 'login',
    initialState : localStorage.getItem('gaantavToken') && localStorage.getItem('gaantavEmail') ? {isLogin:true,token:localStorage.getItem('gaantavToken'),email:localStorage.getItem('gaantaEmail')}: {isLogin : false,token:""},
    reducers: {
        Login(state,action){
          localStorage.setItem('gaantavToken',action.payload.token);
          localStorage.setItem('gaantavEmail',action.payload.email);
          return {isLogin : true,token:action.payload.token,email:action.payload.email};
        },
        Logout(state,action){
          localStorage.removeItem('gaantavToken');
          localStorage.removeItem('gaantavEmail');
          return {isLogin : false,token:"",email:""};
        }
    }
}) 

export const actions = loginSlice.actions;
const store = configureStore({
reducer : loginSlice.reducer,
});

export default store;