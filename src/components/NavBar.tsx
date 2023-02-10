import React from 'react'

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav__header">
        <img className="nav__header-logo" src="favicon-32.png" alt="Logo" />
        <h1 className="nav__header-title">Sales Tax Calculator</h1>
      </div>
      <div className="nav__links">
        <a className="nav__link" href="#">Home</a>
        <a className="nav__link" href="https://www.linkedin.com/in/jorge-engineer/">LinkedIn</a>
        <a className="nav__link" href="https://www.github.com/JDBorges187">Github</a>
      </div>
    </nav>
  )
}

export default NavBar;