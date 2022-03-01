import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Components/Home';
import Open from './Components/Open';
import Admin from './Components/Admin';
import NavMenu from './Components/navMenu';
import Transaction from './Components/Transaction';
// import NavSecond from './Components/NavSecond';


import { useState,useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from "./utils/load-contract";


function App() {

  

  return (
    <>
     
      

      
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element ={<Home />}></Route>
          <Route path="/open" element ={<Open />}></Route>
          <Route path="/admin" element ={<Admin />}></Route>
          <Route path='/transaction' element={<Transaction/>}></Route> 
          <Route path="/navbar" element ={<NavMenu />}></Route>


        </Routes>
      </BrowserRouter>   

    </>
    
  );
}

export default App;
