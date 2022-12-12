import React from "react";
import { Link } from 'react-router-dom';

import '../styles/navStyle.css';
import AuthService from '../utils/auth';

function Header() {
  function showNavBar() {
    /* if user is not logged in, show Home, Menu, Order, Cater */
    /* is user is logged in, show Home, Menu, Sign out, Cater */
    if(!AuthService.isLoggedIn()){
      return (
        <ul className="nav border ms-auto" style={{marginRight: "10px"}}>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </li>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/menu" style={{ textDecoration: 'none' }}>Menu</Link>
          </li>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/signin" style={{ textDecoration: 'none' }}>Order</Link>
          </li>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/cater" style={{ textDecoration: 'none' }}>Cater</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav border ms-auto" style={{marginRight: "10px"}}>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </li>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/menu" style={{ textDecoration: 'none' }}>Menu</Link>
          </li>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
          </li>
          <li className="nav-item m-2" style={{fontSize: "36px"}}>
            <Link to="/signout" style={{ textDecoration: 'none' }}>Sign out</Link>
          </li>
        </ul>
      );
    };  
  }
  return (
    <header className='hstack gap-3' style={{backgroundColor: "#504A6D", height: "15vh", display: "flex", flexWrap: "wrap" }}>
    <h1  style={{color:"#eaded2", paddingLeft: "10px"}}>Cookie Monster's Cookie Corner</h1>
    <nav className="ml-50">
      {showNavBar()}
    </nav>
    </header>
  );
}

export default Header;