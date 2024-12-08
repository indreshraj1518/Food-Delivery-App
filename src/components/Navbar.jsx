import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Model from "../Model";
import Cart from "../screens/Cart";
import { useCard } from "./contextReducer";

export default function Navbar() {
  let data = useCard();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
          <div className="container-fluid fs-4 fst-italic">
            <Link className="navbar-brand fs-3 mx-4" to="/">
              GoFood
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-4"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {localStorage.getItem("authtoken") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-4"
                      aria-current="page"
                      to="/myOrder"
                    >
                      Myorder
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {!localStorage.getItem("authtoken") ? (
                <div className="d-flex">
                  <Link
                    className="btn bg-white text-success fs-5 mx-1"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success fs-5 mx-1"
                    to="/createuser"
                  >
                    signUp
                  </Link>
                </div>
              ) : (
                <div>
                  <div
                    className="btn bg-white text-success mx-2"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    My Card{" "}
                    {
                      <Badge pill bg="danger">
                        {data.length}
                      </Badge>
                    }
                  </div>
                  {cartView ? (
                    <Model onClose={() => setCartView(false)}>
                      <Cart />
                    </Model>
                  ) : null}
                  <div
                    className="btn bg-white text-danger mx-2"
                    onClick={handleLogout}
                  >
                    logOut
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
