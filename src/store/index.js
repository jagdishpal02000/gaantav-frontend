import {configureStore,createSlice } from '@reduxjs/toolkit';
const loginSlice = createSlice({
    name : 'login',
    initialState : {isLogin : false},
    reducers: {
        Login(state,action){
          return {isLogin : true,token:action.payload.token};
        },
        Logout(state,action){
          return {isLogin : false};
        }
    }
}) 

export const actions = loginSlice.actions;
const store = configureStore({
reducer : loginSlice.reducer,
});

export default store;