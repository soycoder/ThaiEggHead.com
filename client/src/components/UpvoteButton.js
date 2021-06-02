import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
const Upvote = () => {

  return (
    <OverlayTrigger
    key={'top'}
    placement={'top'}
    overlay={
        <Tooltip id={`tooltip-${'top'}`}>
        Upvote
        </Tooltip>
    }
    >
    <Button className="bp3-minimal comment" icon="thumbs-up">
        {10}
    </Button>
    </OverlayTrigger>
  );
};

export default Upvote;
