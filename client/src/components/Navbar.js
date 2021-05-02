import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import "../App.css";

import * as actionType from "../constants/actionTypes";
import { images, SIZES } from "../constants";

const NavigationBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="Navbar">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          ThaiEggHead
          <img
            src={images.logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="ThaiEggHead"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {user ? (
          <Navbar.Collapse className="justify-content-end">
            <div className="bp3-input-group .modifier">
              <span className="bp3-icon bp3-icon-search"></span>
              <input
                className="bp3-input"
                type="search"
                placeholder="Search input"
                dir="auto"
              />
            </div>
            <div style={{ marginLeft: SIZES.padding }}>{user?.result.name}</div>

            <Button onClick={logout} style={{ marginLeft: SIZES.padding }}>
              Logout
            </Button>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <div className="bp3-input-group .modifier">
              <span className="bp3-icon bp3-icon-search"></span>
              <input
                className="bp3-input"
                type="search"
                placeholder="Search input"
                dir="auto"
              />
            </div>
            <Button
              component={Link}
              to="/Auth"
              style={{ marginLeft: SIZES.padding }}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/Auth"
              style={{ marginLeft: SIZES.padding2 }}
            >
              Join us
            </Button>
          </Navbar.Collapse>
        )}
      </Navbar>
    </div>
  );
};

export default NavigationBar;
