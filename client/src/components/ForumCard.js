import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ForumCard(props) {
    let forum = props.data;
    var n = forum.postText.length;
      console.log(n, forum.postText)
      if (n > 160){
        var post = forum.postText.substr(0, 150)+"...";
      }
      else{
        var post = forum.postText
      }
    const [user, setUser] = useState({});
    const [pathUser, setPathUser] = useState("");
    useEffect(() => {
      fetch(`http://localhost:5000/users/${forum.userID}`)
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
          setPathUser(`/users/${res.googleID}`);
        });
    }, []);

    return (
      <div>
          <Card>
            <Row>
              <Col xs={2} className="app-profile" ><img src={user.imgURL} height="30" width="30" className="app-cycle"/><p/>
                <Link to={pathUser}>{user.userName}</Link>
              </Col>
              <Col xs={9} className="app-paddingContent">
                <Card.Title >{forum.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> {
                <div dangerouslySetInnerHTML={{
                  __html: post
                  }}>
                </div>
                }</Card.Subtitle>
              </Col>
            </Row>
          </Card>
          <p/>
      </div>  
    );
  }

export default ForumCard;