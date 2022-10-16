import { useState } from 'react';
import './App.css';
import Navbar  from '../navbar';
import MainBar from '../MainBar';
import RightBar from '../RightBar';
import LeftBar from '../LeftBar';
function App() {
  return (
    <>
        <Navbar/>
        <div className="row justify-content-center align-items-center g-2 mt-5">
        <div className="col-md-3">
        <LeftBar/>
        </div>
        <div className="col-md-6">
        <MainBar/>
        </div>
        <div className="col-md-3 ">
        <RightBar/>
        </div>
      </div>
    </>
  );
}

export default App;
