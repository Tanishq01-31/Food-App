import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  // const [notLogedIn, setLogin] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <Link className="navbar-brand fs-1" to="/">BrandName</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/">Home <span className="sr-only"></span></Link>
            <div style={{display:"flex", justifyContent:"right"}}>
              <Link className="nav-item nav-link" to="/login">Login</Link>
              <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
