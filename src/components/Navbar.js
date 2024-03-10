import React, { useState, useEffect, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { token ,user} = useAuth();
  const [id, setId] = useState();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if(token){
            setAuthenticated(true);
            setId(user.id);
          } else {
            setAuthenticated(false);
          }
       
          console.log('Token:', token);
        
        }, [token]);


  
  
 


  const logout = () => {
   setAuthenticated(false);
   localStorage.removeItem('authToken');
  };

  const authLinks = (
    <>
      <li className='nav-item'>
        <NavLink className='nav-link' to={`/profiles/${id}`}>Dashboard</NavLink>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' onClick={logout} href='#'>Logout</Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>Register</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <Link className="navbar-brand" to="/providers">Providers</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-8 mb-lg-0">
            <li className="nav-item">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>
          </ul>
          {authenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
