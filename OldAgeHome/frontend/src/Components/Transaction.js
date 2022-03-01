


import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../utils/load-contract";


const Transaction = () => {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
      });
    
      const [account, setAccount] = useState(null);
      const [amount, setAmount] = useState(null);
      const [add, setAdd] = useState(null);
      const [amountData, setAmountData] = useState(null);
      const [addData, setAddData] = useState(null);
    
      const navigate = useNavigate();
      const [balance, setBalance] = useState(null);
      const [accBalance, setAccBalance] = useState(null);
      const [reload, shouldreload] = useState(null);
      const reloadEffect = () => { shouldreload(!reload) }
    
      useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
          const contract = await loadContract("Donate", provider);
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
    
    
      useEffect(() => {
        const loadBalance = async () => {
          const { contract, web3 } = web3Api;
          const Balance = await web3.eth.getBalance(contract.address);
          setAccBalance(web3.utils.fromWei(Balance, "ether"));
        }
        web3Api.contract && loadBalance()
      }, [web3Api, reload])
    
    
      useEffect(() => {
        const getAccount = async () => {
          const accounts = await web3Api.web3.eth.getAccounts();
          setAccount(accounts[0]);
          const etherValue = await web3Api.web3.eth.getBalance(accounts[0])
          const balance = Web3.utils.fromWei(etherValue, 'ether');
          setBalance(balance)
    
          // navigate('/open')
        };
        web3Api.web3 && getAccount();
      }, [web3Api.web3, reload]);
    
      const DonateAmt = async () => {
    
        const { web3, contract } = web3Api;
        await contract.DonateAmt({
          from: account,
          value: web3.utils.toWei(amount, "ether")
        })
        // setAmount(amount);
        reloadEffect();
      }
      const TransferMoney =async ()=>{
          
        const {web3,contract}=web3Api;
        console.log(add,amount)
        const withdrowAmt= web3.utils.toWei(amount,"ether");
        await contract.TransferMoney(add,withdrowAmt,{
          from:account,
        });
        reloadEffect();
      }
      const TransferMoneyData =async ()=>{
          
        const {web3,contract}=web3Api;
        console.log(add,amount)
        const withdrowAmt= web3.utils.toWei(amountData,"ether");
        await contract.TransferMoney(addData,withdrowAmt,{
          from:account,
        });
        reloadEffect();
      }
    
     useEffect(()=>{

      const BlockInfo= async()=>{
              
          const { contract, web3 } = web3Api;
        const data= await  web3.eth.getBlockUncleCount("0xfCf7D258FBCA8De323eA1D273C3f8B907966094F")
             console.log(data)
           }
    })

  return (


    <>
      <h3 className='text-center mt-5  fw-bold' >Transactions</h3>  
      <div className='card text-center mt-5'>
        <div className='card-body'>
      <table class="table  table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Ammount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    
    
  </tbody>
</table>
      </div>
      </div>

    </>
  )
}

export default Transaction


