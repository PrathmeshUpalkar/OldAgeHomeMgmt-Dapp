import React from 'react'
// import Emergency from './NavSecond'
import NavMenu from './navMenu'
import { useNavigate } from 'react-router-dom';
import {useState,useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from "../utils/load-contract";

const Open = () => {


  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract:null,
  });

  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState(null);
  const navigate=useNavigate();
  const [balance, setBalance] = useState(null);
  const [ accBalance ,setAccBalance]= useState(null);
  const [reload,shouldreload]=useState(null);
  const reloadEffect=()=>{shouldreload(!reload)}

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract= await loadContract("Donate",provider);
      console.log(contract)

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  
  useEffect(()=>{
    const loadBalance = async()=>{
      const {contract,web3}=web3Api;
      const Balance = await web3.eth.getBalance(contract.address);
      setAccBalance(web3.utils.fromWei(Balance,"ether"));
    }
    web3Api.contract && loadBalance()
  },[web3Api,reload])


  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      const etherValue = await web3Api.web3.eth.getBalance(accounts[0])
      const balance = Web3.utils.fromWei(etherValue, 'ether');
      setBalance(balance)

      navigate('/open')
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3,reload]); 
 
  const DonateAmt= async()=>{

    const {web3,contract}=web3Api;
    await contract.DonateAmt({
      from:account,
      value:web3.utils.toWei(amount,"ether")
    })
    // setAmount(amount);
    reloadEffect();
  }
  
 


// -------------------------------------------------------------------------------------------------------------------------------------
   const myStyle={
    backgroundImage: "url(./images/wave.svg)",
    // height:'100vh',
    // marginTop:'-70px',
    // fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (

    
    <>

    <div style={myStyle}>
    <NavMenu/>

      <h4 className='mt-3 text-end text-white' >Contract Balance :{accBalance} ETH </h4>
      {/* <p className='mt-1' style={{'paddingLeft':'80%'}}>Time Remaining : </p> */}

    
    <div className='row mt-3'>
         <div className="mt-5 col-sm-6 mt-5 text-center">
          <div className='card'>
            <div className='card-body'>
              <h4>Donate Money Here</h4>

              Ammount: &nbsp; <input type="text" name="Date" value={amount} onChange={(e)=>setAmount(e.target.value)} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Wender Ammount" /><br></br><br></br>

              <button className=' btn btn-success text-left'>Connect to Metamask</button> 


              &nbsp; &nbsp; &nbsp;<div  onClick={DonateAmt} className='btn btn-primary'>Donate</div>

            </div>
          </div>
         </div>
         <div className="mt-5 col-sm-6 mt-5 ">
         <div className='card'>
            <div className='card-body'>
              <h4 className='text-center'>Details.</h4>
              <h5 className='mt-4 text-left'> Your Acc Number :{account ? account :"please install metamask"}</h5>
              <h5 className='text-left'> Your Acc Balance : {balance}ETH</h5>


            </div>
          </div>
         </div>
         </div>
         </div>

         <div className='mt-5'></div>
        
     </>
  )
}

export default Open