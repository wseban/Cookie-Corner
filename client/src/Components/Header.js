import React from "react";


function Header({ currentPage, changePage }) {


    return (
      <header className='hstack gap-3 fixed-top' style={{backgroundColor: "#504A6D" }}>
      <h1 className='' style={{}}>Cookie Monster's Cookie Corner</h1>
      <ul className="nav border ms-auto" style={{marginRight: "10px"}}>
        <li className="nav-item" style={{fontSize: "36px"}}>
          <a
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
            href="#order"
            onClick={() => changePage('Order')}
            className={currentPage === 'Order' ? 'nav-link active' : 'nav-link'}
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
  