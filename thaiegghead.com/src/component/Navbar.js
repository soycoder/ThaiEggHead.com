import React from "react";
import { Navbar } from 'react-bootstrap';
import { Button } from '@blueprintjs/core'
import "../App.css";

import { images, COLORS, FONTS, SIZES } from '../constants';

const NavigationBar = () => {

  return (
    <div className="Navbar">
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">ThaiEggHead
          <img
            src={images.logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="ThaiEggHead"
        /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <div class="bp3-input-group .modifier">
            <span class="bp3-icon bp3-icon-search"></span>
            <input class="bp3-input" type="search" placeholder="Search input" dir="auto" />
          </div>
          <Button style={{marginLeft:SIZES.padding}}>Sign in</Button>
          <Button style={{marginLeft:SIZES.padding2}}>Join us</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;