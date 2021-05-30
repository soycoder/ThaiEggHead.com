import "../App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
  OverlayTrigger,
  Card,
  Badge,
  DropdownButton,
  Dropdown,
  ButtonGroup
} from "react-bootstrap";
import { Button, Icon } from "@blueprintjs/core";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { COLORS, images } from "../constants"

function ForumCard(props) {

    const dummyUser = [
      {
        displayName:"PupeePupee",
        img:images.pro_1,
        date:"Thammasat University - 25 May"
      }
    ]

    let forum = props.data;
    var n = forum.postText.length;
      // console.log(n, forum.postText)
      if (n > 160){
        var post = forum.postText.substr(0, 150)+"...";
      }
      else{
        var post = forum.postText
      }
    const [user, setUser] = useState(dummyUser);
    const [pathUser, setPathUser] = useState("");
    
    useEffect(() => {
      fetch(`http://localhost:5000/profile/${forum.userID}`)
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
          setPathUser(`/profile/${res.googleID}`);
        });
    }, []);

    const ListSubjectTag = (props) => {
      const list = props.data;
      const subjectTag = list.map((subject) =>
          <Badge variant="primary">{subject}</Badge> 
      );
      return(
        <div className="tag">
          {subjectTag}
        </div>
      )
    }

    const ListTag = (props) => {
      const list = props.data;
      const subjectTag = list.map((subject) =>
          <Badge variant="info">{subject}</Badge>
          // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
      );
      return(
        <div className="tag">
          {subjectTag}
        </div>
      )
    }
    
    const ButtomOption = () => {
      return(
        <div style={{marginLeft:10}}>
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
          <OverlayTrigger
            key={'top'}
            placement={'top'}
            overlay={
              <Tooltip id={`tooltip-${'top'}`}>
                Comment
              </Tooltip>
            }
          >
            <Button className="bp3-minimal comment" icon="comment">
              {124}
            </Button>
          </OverlayTrigger>
        </div>
        
      )
    }
    return (
      <div style={{marginBottom:10}}>
          <Card>
            <div>
              <div class="header">
                <div class="options"><i class="fa fa-chevron-down"></i></div>
                <img class="co-logo" src={user[0].img} />
                <div class="co-name"><a href="#">{user[0].displayName}</a></div>
                <div class="time"><a href="#">{user[0].date}</a> · <i class="fa fa-globe"></i></div>
                <div className="btn-more">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" className="btn-morestyle" bsPrefix="p-0">
                      <Icon icon="more"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Report</Dropdown.Item>
                      <Dropdown.Item href="#/action-1">block</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#/action-2">Bookmark</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                
              </div>
              <div class="content">
              <Card.Title >{forum.title}</Card.Title>
                <div dangerouslySetInnerHTML={{
                    __html: post
                    }}>
                  </div>
              </div>
            </div>
            <div className="card-tag">
              <ListSubjectTag data={forum.listSubject}/>
              <ListTag data={forum.listTag}/>
            </div>
            <ButtomOption/>
          </Card>
      </div>  
    );
  }

export default ForumCard;


{/* <Card>
            <Row>
              <Col xs={2} className="app-profile" ><img src={user[0].img} height="30" width="30" className="app-cycle"/><p/>
                <Link to={pathUser}>{user[0].displayName}</Link>
              </Col>
              <Col xs={9} className="app-paddingContent">
                <Card.Title >{forum.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> {
                <div dangerouslySetInnerHTML={{
                  __html: post
                  }}>
                </div>
                }</Card.Subtitle>

                <ListSubjectTag data={forum.listSubject}/>
              </Col>
            </Row>
          </Card> */}