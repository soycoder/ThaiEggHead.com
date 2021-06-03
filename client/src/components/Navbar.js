import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";

import { images, SIZES, COLORS } from "../constants";

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
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ marginLeft: 70 }}>
          <Link to="/">
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
          </Link>
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

            <Avatar
              alt={user.firstName}
              src={user.imgURL}
              style={{ marginLeft: SIZES.padding, width: 35, height: 35 }}
            >
              {/* {user?.result.name.charAt(0)} */}
            </Avatar>
            <div style={{ marginLeft: SIZES.padding / 2, color: "white" }}>
              {user.firstName + " " + user.lastName}
            </div>

            <Button
              onClick={() => auth.logout()}
              style={{ marginLeft: SIZES.padding / 2, color: "white" }}
            >
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
