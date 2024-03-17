import React, { useState, useEffect } from 'react';
import {useNavigate, Link, NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, user,setUser ,setToken} = useAuth();
  const [id, setId] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
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
    setUser(null);
    setToken(null);
    navigate('/');
  };

  const authLinks = (
    <>
      <li className='nav-item'>
        <NavLink className='nav-link' to={`/profiles/${id}`}>Dashboard</NavLink>
      </li>
      <li className='nav-item'>
        <Link className='nav-link btn btn-primary mx-2 fw-bold' onClick={logout} href='#'>Logout</Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className='nav-item'>
        <Link className='nav-link btn btn-primary px-4 text-white mx-2 fw-bold' to='/login'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link btn btn-primary px-4 mx-2 text-white fw-bold' to='/register'>Register</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <Link className="navbar-brand" to="/providers">Providers</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <form className="d-flex mx-5 px-5 justify-content-center" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: '700px' }} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>
          </ul>
          <div className="navbar-nav">
            {authenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
