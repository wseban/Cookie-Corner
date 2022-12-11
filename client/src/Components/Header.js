import React from "react";
import '../styles/navStyle.css';

function Header({ currentPage, changePage }) {


    return (
      <header className='hstack gap-3' style={{backgroundColor: "#504A6D", height: "15vh", display: "flex", flexWrap: "wrap" }}>
      <h1  style={{color:"#eaded2", paddingLeft: "10px"}}>Cookie Monster's Cookie Corner</h1>
      <ul className="nav border ms-auto" style={{marginRight: "10px"}}>
        <li className="nav-item" style={{fontSize: "36px"}}>
          <a
            // style={{color:"#eaded2"}}
            href="#home"
            onClick={() => changePage('Home')}
            className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </a>
        </li>
        <li className="nav-item" style={{fontSize: "36px"}}>
          <a
            href="#menu"
            onClick={() => changePage('Menu')}
            className={currentPage === 'Menu' ? 'nav-link active' : 'nav-link'}
          >
            Menu
          </a>
        </li>
        <li className="nav-item" style={{fontSize: "36px"}}>
          <a
            href="#signin"
            onClick={() => changePage('Signin')}
            className={currentPage === 'Signin' ? 'nav-link active' : 'nav-link'}
          >
            Order
          </a>
        </li>
        <li className="nav-item" style={{fontSize: "36px"}}>
          <a
            href="#cater"
            onClick={() => changePage('Cater')}
            className={currentPage === 'Cater' ? 'nav-link active' : 'nav-link'}
          >
            Cater
          </a>
        </li>
      </ul>
      </header>
    );
  }
  
  export default Header;
  