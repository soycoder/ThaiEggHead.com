import React, { useContext } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Switch, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";

import { images, SIZES, COLORS } from "../constants";

const ProfileOption = (props) => {
  const auth = useContext(AuthContext);

  return (
    <Dropdown style={{ marginLeft: 20 }}>
      <Dropdown.Toggle variant="light" className="btn-morestyle" bsPrefix="p-0">
        <Avatar
          src={props.user.imgURL}
          style={{ marginLeft: SIZES.padding, width: 35, height: 35 }}
        ></Avatar>
        <img className="img-user" src={props.user?.imgURL} />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ width: 250 }}>
        <Dropdown.Item href="profile/1" className="menu-text">
          <div>
            <img className="img-user2" src={props.user?.imgURL} />
            {props.user?.firstName + " " + props.user?.lastName}
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-1" className="menu-text">
          Bookmark
        </Dropdown.Item>
        <Dropdown.Item href="#/action-1" className="menu-text">
          Your content
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-2" className="menu-text">
          Settings
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" className="menu-text">
          Help
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={auth.logout()} className="menu-text">
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const NavigationBar = ({ isAuthenticated }) => {
  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }

  return (
    <div className="Navbar">
      <Navbar expand="lg" bg="dark" variant="dark" className="Navbar2">
        <Navbar.Brand style={{ marginLeft: 250 }}>
          {/* <Link to="/"> */}
          <div>
            <img
              className="noselect nodrag"
              src={images.logo}
              width="70"
              height="70"
              alt="ThaiEggHead"
              style={{
                position: "absolute",
                marginTop: -7,
                zIndex: 200,
              }}
            />
            <div
              className="text-logo noselect"
              style={{
                fontFamily: "supermarket",
                fontSize: 30,
                marginLeft: 75,
              }}
            >
              ThaiEggHead
            </div>
          </div>
          {/* </Link> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {user ? (
          <Navbar.Collapse
            className="justify-content-end"
            style={{ marginRight: 250 }}
          >
            <div className="bp3-input-group .modifier">
              <span className="bp3-icon bp3-icon-search "></span>
              <input
                className="bp3-input"
                type="search"
                placeholder="Search input"
                dir="auto"
              />
            </div>

            <ProfileOption user={user}  />
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
              to="/auth"
              style={{
                marginLeft: SIZES.padding2 * 2,
                marginRight: SIZES.padding3 * 4,
                borderRadius: 19,
              }}
              variant="contained"
              color="secondary"
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
