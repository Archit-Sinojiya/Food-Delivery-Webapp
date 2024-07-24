import React from 'react'
import { useState } from 'react';
import{
  Link, useNavigate
} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {

const [cartView, setCartView] = useState(false)

let data = useCart();
  const navigate = useNavigate();
const handleLogout = ()=>{
  localStorage.removeItem('authToken');
  navigate('/login')
}


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-3 fst-italic" to="#">GoFood</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto  mb-1">
              <Link className="nav-item nav-link active fs-5" to="/">Home </Link>
            </div>

        {(localStorage.getItem('authToken'))?
          <div className="navbar-nav me-auto  mb-1">
          <Link className="nav-item nav-link active fs-5" to="/myOrder">My Orders </Link>
        </div>
        :""}


{(!localStorage.getItem('authToken'))?
            <div className='d-flex'>
              <Link className="nav-item btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="nav-item btn bg-white text-success mx-1" to="/createuser">Signup</Link>
            </div>
            :
            <div className='d-flex'>
            <div>
              <div className='btn bg-white text-success mx-1' onClick={()=>{setCartView(true)}}>
                My Cart{" "}
                <Badge pill bg='danger'>{data.length}</Badge>
              </div>
            </div>

{cartView? <Model onClose={()=>{setCartView(false)}}><Cart/></Model>:null}

            <div>
              <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>Logout</div>
            </div>
            </div>}


        </div>
        </nav>
    </div>
  )
}
