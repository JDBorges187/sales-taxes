import React from 'react'

const NavBar = () => {
  return (
    <nav className ="nav">
      <h1 className="nav__title">Sales Tax Calculator</h1>
      <div>
        <a className="nav__link" href="#">Home</a>
        <a className="nav__link">LinkedIn</a>
        <a className="nav__link">Github</a>
      </div>
    </nav>
  )
}

export default NavBar;