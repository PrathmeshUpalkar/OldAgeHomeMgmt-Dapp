import React from 'react'

import { useNavigate } from 'react-router-dom'
import Admin from './Admin'
import NavMenu from './navMenu'
const Home = () => {

    const Navigate=useNavigate()
    const bookNow=()=>{
         Navigate("/open");   
    }


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
         <div className='row mt-5'>
         <div className="mt-5 col-sm-6 mt-5 text-center">
         <h1 className=' mt-5 text-center fw-bold ' style={ {paddingTop : "180px"}}>We are on mission to save old age orphanage.</h1>
                         <h4 className='text-center '>Lets Contribute here</h4> 
                 
                    <button className= "py-3"  onClick={bookNow} className=' mt-3  px-4 py-3 rounded-pill fw-bold fs-5 btn btn-warning text-white'>Donate now</button>    
                       


         </div>

         <div className="col-sm-6 mt-5">
          
          <div className='py-3'>
         <img  src='./images/fund3.png' style={{'height':'600px'}}/>
         </div> 


         </div>

         </div>
         </div>
    </>
  )
}

export default Home