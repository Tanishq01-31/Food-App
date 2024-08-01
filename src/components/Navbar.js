import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("authToken");
    console.log("item removed");
    // setIsAuthenticated(false);
    navigate("/login");
  };
  //  useEffect(() => {
  //   setIsAuthenticated(!!localStorage.getItem("authToken"));
  // }, []);
  // const [notLogedIn, setLogin] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navb">
        <Link className="navbar-brand fs-1" to="/">
          BrandName
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active nav-list">
              <Link className="nav-item nav-link fs-5 nav-txt" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item active">
                <Link className="nav-item nav-link fs-5 nav-txt" to="/myOrders">
                  My Orders <span className="sr-only"></span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: "10px",
            }}
          >
            {localStorage.getItem("authToken") ? (
              <div>
                <div
                  className="btn mx-3 nav-txt"
                  onClick={() => setCartView(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length === 0 ? null : data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div className="btn logout-btn" onClick={handleClick}>
                  Logout
                </div>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white nav-txt mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white nav-txt mx-1" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
