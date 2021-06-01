import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import "./styles.css";

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
      <Navbar expand="lg" bg="dark" variant="dark" >
        <Navbar.Brand href="/" style={{marginLeft:70}}>
          <div>
            <img
              src={images.logo}
              width="70"
              height="70"
              alt="ThaiEggHead"
              style={{position:'absolute',marginTop:-7,zIndex:200}}
            />
            <div style={{fontFamily: "supermarket", fontSize: 30, marginLeft:75}}>
              ThaiEggHead
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {user ? (
          <Navbar.Collapse className="justify-content-end">
            <div className="bp3-input-group .modifier">
              <span className="bp3-icon bp3-icon-search "></span>
              <input
                className="bp3-input"
                type="search"
                placeholder="Search input"
                dir="auto"
              />
            </div>

            <Avatar alt={user?.result.name} src={user?.result.imageUrl} style={{ marginLeft: SIZES.padding, width: 35, height: 35 }}>{user?.result.name.charAt(0)}</Avatar>
            <div style={{ marginLeft: SIZES.padding/2, color: "white" }}>{user?.result.name}</div>

            <Button onClick={logout} style={{ marginLeft: SIZES.padding/2, color:"white" }}>
              Logout
            </Button>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link href="#features">About us</Nav.Link>
            </Nav>
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
              style={{ marginLeft: SIZES.padding2*2, marginRight: SIZES.padding3*4, borderRadius: 19}}
              variant="contained" color="secondary"
              size="mediem"
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
