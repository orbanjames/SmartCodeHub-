import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function Navbar() {
  return (
    <nav className='navbar'>
      <h1>SmartCodeHub</h1>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/snippets'> My Snippets</Link>
      </div>
    </nav>
  );
}

export default Navbar;
