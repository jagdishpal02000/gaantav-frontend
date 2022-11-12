import React, { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {actions} from '../../store';
import './index.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AskQuestion from '../AskQuestion'
import Login from '../login';
import Signup from '../Signup';

const Navbar = () =>{
  const dispatch = useDispatch();
  const [showAskQuestion,setShowAskQuestion]=useState(false);
  const [showLogin,setShowLogin]=useState(false);
  const [showSignup,setShowSignup]=useState(false); 
  const isLogin= useSelector((state)=>state.isLogin);
  const Logout = () => {
    dispatch(actions.Logout());
  };

    return (
      <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand m-2" href="#">GaanTav</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-4 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active wt m-2 link" aria-current="page" href="#">Home</a>
            </li>
             {
               isLogin ? 
            <li className="nav-item">
              <a className="nav-link wt m-2 link" >
                Profile
              </a>
            </li>
              :<>
            <li className="nav-item">
               <a className="nav-link wt m-2 link" onClick={()=>{setShowLogin(!showLogin)}}>
                Login
              </a>
              {showLogin && <Login/>}
              </li>
            <li className="nav-item">
              <a className="nav-link wt m-2 link" onClick={()=>{setShowSignup(!showSignup)}}>
                Signup
              </a>
              {showSignup && <Signup/>}
              </li>
              </> 
              }

            <li>
              <a className="nav-link wt m-2 link" onClick={()=>{isLogin ? setShowAskQuestion(!showAskQuestion) : setShowLogin(!showLogin)}}>Ask A Question</a>
              {showAskQuestion && <AskQuestion/>}
            </li>
            {
              isLogin 
              && 
            <li>
              <a className="nav-link wt m-2" onClick={Logout}>Logout</a>
            </li>

            }
          </ul>
        </div>
      </div>
    </nav>
      );
}




export default Navbar;
