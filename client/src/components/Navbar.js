import React, { useContext } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";
import { theme } from "../constants";
import { images, SIZES, COLORS } from "../constants";

const ProfileOption = (props) => {
  return (
    <Dropdown style={{ marginLeft: 20 }}>
      <Dropdown.Toggle variant="light" className="btn-morestyle" bsPrefix="p-0">
        {/* <Avatar
          src={props.user.imgURL}
          style={{ marginLeft: SIZES.padding, width: 35, height: 35 }}
        ></Avatar> */}
        <img
          className="img-user"
          src={props.user.imgURL ? props.user.imgURL : images.pic_profile}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ width: 250 }}>
        <Dropdown.Item className="menu-text">
          <Link to={`/profile/${props.user.userID}`}>
            <div class="co-name">
              <img
                className="img-user2"
                src={props.user.imgURL ? props.user.imgURL : images.pic_profile}
              />
              {props.user.firstName + " " + props.user.lastName}
            </div>
          </Link>
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
        <Dropdown.Item onClick={props.auth.logout} className="menu-text">
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

  const NavUser = () => {
    return(
      <Navbar.Collapse
        className="justify-content-end"
        style={{ marginRight: 250 }}
      >
        <div class="bp3-input-group searchbar">
          <span class="bp3-icon bp3-icon-search"></span>
          <input type="text" class="bp3-input" placeholder="Search" />
          <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" ></button>
        </div>

        <ProfileOption user={user} auth={auth} />
      </Navbar.Collapse>
    )
  }

  const NavNonUser = () => {
    return(
      <Navbar.Collapse className="justify-content-end">
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
    )
  }

  const BrandLogo = () => {
    return(
      <>
        <Navbar.Brand style={{ marginLeft: 250 }}>
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
        <Nav className="mr-auto" style={theme.FONTS.nav}>
          <Nav.Link href="#features">About us</Nav.Link>
          <Nav.Link href="#features">Home</Nav.Link>
          <Nav.Link href="#features">Discovery</Nav.Link>
          <Nav.Link href="#features">Context</Nav.Link>
        </Nav>
      </>
    )
  }
  return (
    <div className="Navbar">
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar">
        <BrandLogo/>
          
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {user ? (
            <NavUser/>
          ) : (
            <NavNonUser/>
          )}
      </Navbar>
    </div>
  );
};

export default NavigationBar;
