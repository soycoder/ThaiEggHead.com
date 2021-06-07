import React, { useContext, useState } from "react";
import { Navbar, Nav, Dropdown, Form, FormControl } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";
import { theme } from "../constants";
import { images, SIZES } from "../constants";
import { Position, Toaster, Intent, InputGroup } from "@blueprintjs/core";
import Avatar from "react-avatar";

const NavigationBar = ({ isAuthenticated }) => {
  const [toaster, setToaster] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  function addToast() {
    toaster.show({ message: "Sorry! We are under constructed", intent: Intent.WARNING,  icon: "warning-sign" });
  }

  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }
  
  const ProfileOption = (props) => {
    return (
      <Dropdown alignRight style={{ marginLeft: 20 }}>
        <Dropdown.Toggle variant="light" className="btn-morestyle" bsPrefix="p-0">
          {props.user.imgURL ? (
            <Avatar size="40" src={props.user.imgURL} round={true} />
          ) : (
            <Avatar
              size="40"
              name={props.user.firstName + " " + props.user.lastName}
              round={true}
            />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ width: 250 }}>
          <Dropdown.Item className="menu-text">
            <NavLink to={`/profile/${props.user.userID}`}>
              <div class="co-name" style={theme.FONTS.body4}>
                {props.user.imgURL ? (
                  <Avatar size="40" src={props.user.imgURL} round={true} />
                ) : (
                  <Avatar
                    size="40"
                    name={props.user.firstName + " " + props.user.lastName}
                    round={true}
                  />
                )}
                {"  " + props.user.firstName + " " + props.user.lastName}
              </div>
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="menu-text"
            style={theme.FONTS.body4}
            onClick={addToast}
          >
            Bookmark
          </Dropdown.Item>
          <Dropdown.Item
            className="menu-text"
            style={theme.FONTS.body4}
            onClick={addToast}
          >
            Your content
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="menu-text"
            style={theme.FONTS.body4}
            onClick={addToast}
          >
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            className="menu-text"
            style={theme.FONTS.body4}
            onClick={addToast}
          >
            Help
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={props.auth.logout}
            className="menu-text"
            style={theme.FONTS.body4}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const SearchKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  const NavUser = () => {
    return (
      <Navbar.Collapse
        className="justify-content-end navbar-user"
      >
        {/* <div class="bp3-input-group searchbar">
          <span class="bp3-icon bp3-icon-search"></span>
          
          <input value={searchKeyword} type="text" class="bp3-input" placeholder="Search" onChange={SearchKeyword}/>
          {searchKeyword?(<Link to={`/searchforum/${searchKeyword}`} class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"/>):(<></>)}
          
        </div> */}

        <NavLink to="/create/forum" style={{fontFamily: "Krub-Regular", fontSize: SIZES.h4}}>
          <Button
            className="ms-3"
            variant="contained"
            color="secondary"
            size="mediem"
          >
            ตั้งคำถาม
          </Button>
        </NavLink>
        <ProfileOption user={user} auth={auth} />
      </Navbar.Collapse>
    );
  };

  const NavNonUser = () => {
    return (
      <Navbar.Collapse className="justify-content-end">
        <NavLink to="/auth">
          <Button
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
        </NavLink>
      </Navbar.Collapse>
    );
  };

  const BrandLogo = () => {
    return (
      <>
        <Navbar.Brand className="navbar-brand">
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
          <Nav.Link onClick={addToast} style={theme.FONTS.nav}>
            About us
          </Nav.Link>
          <Nav.Link onClick={addToast} style={theme.FONTS.nav}>
            Discovery
          </Nav.Link>
          <Nav.Link onClick={addToast} style={theme.FONTS.nav}>
            Contact us
          </Nav.Link>
        </Nav>
      </>
    );
  };

  return (
    <div className="Navbar">
      <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)}/>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar">
        <BrandLogo />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {user ? <>
          <div class="bp3-input-group searchbar justify-content-end">
            <span class="bp3-icon bp3-icon-search"></span>
            <input value={searchKeyword} type="text" class="bp3-input" placeholder="Search" onChange={SearchKeyword}/>
            {searchKeyword?(<Link to={`/searchforum/${searchKeyword}`} class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"/>):(<></>)}
          </div>
          <NavUser />
        </> : <NavNonUser />}
      </Navbar>
    </div>
  );
};

export default NavigationBar;
