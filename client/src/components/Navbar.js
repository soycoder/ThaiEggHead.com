import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Switch, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

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

  const ProfileOption = () => {
    return(
      <Dropdown style={{marginLeft:20}}>
        <Dropdown.Toggle variant="light" className="btn-morestyle" bsPrefix="p-0">
          <img class="img-user" src={user?.result.imageUrl} />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{width:250}}>
          <Dropdown.Item href="profile/1" className="menu-text">
            <div>
              <img class="img-user2" src={user?.result.imageUrl} />
              {user?.result.name}
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-1" className="menu-text">Bookmark</Dropdown.Item>
          <Dropdown.Item href="#/action-1" className="menu-text">Your content</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-2" className="menu-text">Settings</Dropdown.Item>
          <Dropdown.Item href="#/action-2" className="menu-text">Help</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout} className="menu-text">Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      )
  }

  return (
    <div className="Navbar">
      <Navbar expand="lg" bg="dark" variant="dark" className="Navbar2">
        <Navbar.Brand href="/" style={{marginLeft:250}}>
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
          <Navbar.Collapse className="justify-content-end" style={{marginRight:250}}>
            <div className="bp3-input-group .modifier">
              <span className="bp3-icon bp3-icon-search "></span>
              <input
                className="bp3-input"
                type="search"
                placeholder="Search input"
                dir="auto"
              />
            </div>

            <ProfileOption/>
          
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
