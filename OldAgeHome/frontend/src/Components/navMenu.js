import React from 'react'
import { Link } from 'react-router-dom'

const navMenu = () => {
  return (
    <> 
    <div className='Navmenu'>
    <nav className="navbar navbar-expand-lg fw-bold fs-5  navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-center" >Blessings<br></br> Oldage Home</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav " style={{'paddingLeft':'80%'}}>
       {/* <Link className='text-white mt-2' to={'/'}>Home</Link> */}
        <a className="nav-link active"><Link className='text-white mt-2' to={'/'}>Home</Link></a>
        <a className="nav-link" ><Link className='text-white mt-2' to={'/admin'}>Admin</Link></a>
        <a className="nav-link" ><Link className='text-white mt-2' to={'/open'}>Donate</Link>
</a>
      </div>
      
    </div>
  </div>
</nav>
</div>
    </>
  )
}

export default navMenu