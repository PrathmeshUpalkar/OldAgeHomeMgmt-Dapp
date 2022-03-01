import React from 'react'
import "../App.css";
import NavMenu from './navMenu'
// import NavSecond from './NavSecond';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../utils/load-contract";


const Admin = () => {

  const [data, setData] = useState([]);


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

  const meta = async()=>{
    await window.ethereum.request({
      method:"eth_requestAccounts",
    });
  }

 

    // const BlockInfo= async()=>{
            
    //     const { contract, web3 } = web3Api;
    //     const latest = await web3.eth.getBlockNumber()


    //    let txStr = ''
    //    for(let i = 0; i <= latest; i++ ){
    //     const block = await web3.eth.getBlock(i);
    //     console.log(`Searching block ${ block.number }...`);
    //     if (block && block.transactions){
    //       for (let tx of block.transactions) {
    //         let transaction = await web3.eth.getTransaction(tx);
    //         let amt = web3.utils.hexToAscii('0x' + transaction.input.slice(138, transaction.input.length))
    //         // if (web3Api.account === transaction.from && transaction.to !== null) {
    //         //   txStr += `<li>Block ${i} : `
    //         //   txStr += `To Address: ${transaction.to}, Data: ${data}, Timestamp: ${block.timestamp}</li>`
    //         // }

            

    //     }
    //     // const txULElement = document.getElementsByClassName("tx")[0];
    //     // txULElement.innerHTML = txStr

    //    }
        
    //      }
    //     }
      
      //  useEffect( async()=>{
               
      //   BlockData();
      //  })


       const BlockData= async()=>{
        const {web3,contract}=web3Api;

        var receipt=await web3.eth.getTransactionReceipt('0xfCf7D258FBCA8De323eA1D273C3f8B907966094F')
         receipt= await receipt.json();
         console.log(receipt);

         setData(receipt)

       }
  


  //----------------------------------------------------------------------------------------------------------------------------------------------------
  const myStyle = {
    backgroundImage: "url(./images/wave.svg)",
    // height:'100vh',
    // marginTop:'-70px',
    // fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <>
      <div className='' style={myStyle}>
        <NavMenu />
        <h4 className='mt-3 text-end text-black fm-text-bold' >Contract Balance :{accBalance} ETH </h4>
        <h6 className='mt-1 text-end text-white'>Contract Address:<p className="text-black"> 0x2aE62E1805cb84D6F58dF7AA1A29eAb94F362536 </p></h6>


        <div className='row mt-5'>
          <div className="mt-5 col-sm-6 mt-5 text-center">
            <div className='card'>
              <div className='card-body'>
                <h4>Monthly Expenses</h4>

                Ammount: <input type="text" name="Date" value={amount} onChange={(e)=>setAmount(e.target.value)} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Wender Ammount" /><br></br>
                Wender Address:<input type="text" name="Date" value={add} onChange={(e)=>setAdd(e.target.value)} className="mt-3 px-4 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Wender Adress" /><br></br>


                <br></br><br></br><button onClick={meta} className=' btn btn-success text-left'>Connect to Metamask</button>


                &nbsp; &nbsp; &nbsp;<div onClick={TransferMoney} className='btn btn-primary'>Send</div>

              </div>
            </div>
          </div>
          <div className="mt-5 col-sm-6 mt-5 ">
            <div className='card'>
              <div className='card-body text-center'>
                <h4>Health Expenses</h4>

                &nbsp;&nbsp;&nbsp; Ammount: <input type="text" name="Date" value={amountData} onChange={(e)=>setAmountData(e.target.value)} className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Wender Ammount" /><br></br>
                Wender Address:<input type="text" name="Date" value={addData} onChange={(e)=>setAddData(e.target.value)} className="mt-3 px-4 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Wender Adress" /><br></br>


                <br></br><br></br><button onClick={meta} className=' btn btn-success text-left'>Connect to Metamask</button>


                &nbsp; &nbsp; &nbsp;<div onClick={TransferMoneyData} className='btn btn-primary'>Send</div>



              </div>
            </div>
          </div>
        </div>



        <div>
          <h3 className='text-center mt-4'>Transactions from Admin</h3>
          <div className='card text-center mt-5'>
        <div className='card-body'>
             
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>

  {
                    data.map((item, index) =>

                        <tbody>
                            <tr>
                                <td>{index + 1} </td>
                                <td>{item}</td>
                                <td>data</td>
                                <td>data</td>
                                
                            </tr>

                        </tbody>

                    )}
  </table>
    

        </div>
      </div>
      </div>
      </div>

    </>
  )
}

export default Admin