import "../App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
  OverlayTrigger,
  Card,
  Badge,
  Spinner,
  Dropdown,
  Image,
  Form,
  Button as Button2,
} from "react-bootstrap";

import Avatar from "react-avatar";

import { Button, Icon, InputGroup } from "@blueprintjs/core";
import React, { useState, useEffect, useContext } from "react";
import { images } from "../constants";
import { Link, NavLink } from "react-router-dom";
import { theme } from "../constants";

import Moment from "react-moment";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import Answer from "./Answer";

function ForumCard(props) {
  let forum = props.data;

  // Initial User Profile
  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (props.isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }

  const [isShowComment, setIsShowComment] = useState(false);
  const [isViewMore, setIsViewMore] = useState(false);

  const handleClickComment = () => {
    setIsShowComment(!isShowComment);
  };

  const dummyUser = [
    {
      displayName: "PupeePupee",
      img: images.pro_1,
      date: "Thammasat University - 25 May",
    },
    {
      displayName: "Jendeu is da best",
      img: images.pro_2,
      date: "1h ago",
    },
  ];

  const Question = () => {
    const [user, setUser] = useState(dummyUser);
    let whoVoteLike = forum.whoVoteLike

    console.log("whoVoteLike : ", whoVoteLike);

    if (!props.isReadLong) {
      var n = forum.postText.length;
      if (n > 160) {
        var post = forum.postText.substr(0, 150) + "...";
      } else {
        var post = forum.postText;
      }
    } else {
      post = forum.postText;
    }

    useEffect(() => {
      fetch(`http://localhost:5000/users/${forum.userID}`)
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
        });
    }, []);

    const UpvoteBotton = (props) => {
      return (
        <OverlayTrigger
          key={"top"}
          placement={"top"}
          overlay={<Tooltip id={`tooltip-${"top"}`}>Upvote</Tooltip>}
        >
          <Button className="bp3-minimal comment" icon="thumbs-up">
            {props.upvote}
          </Button>
        </OverlayTrigger>
      );
    };

  const ListSubjectTag = (props) => {
    const list = props.data;
    const subjectTag = list.map((subject) => (
      <Button2 variant="secondary" id="question-subject-tag">
         {subject}
      </Button2>
    ));
    return <div className="tag" style={theme.FONTS.tag}>{subjectTag}</div>;
  };

  const ListTag = (props) => {
    const list = props.data;
    const subjectTag = list.map((subject) => (
        <Button2 variant="secondary" id="question-tag">
          {subject}
        </Button2>
      )
      // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
    );
    return <div className="tag" style={theme.FONTS.tag}>{subjectTag}</div>;
  };

    // const ListSubjectTag = (props) => {
    //   const list = props.data;
    //   const subjectTag = list.map((subject) => (
    //     <Badge bg="primary" style={{ marginLeft: 4 }}>
    //       {subject}
    //     </Badge>
    //   ));
    //   return (
    //     <div className="tag" style={theme.FONTS.tag}>
    //       {subjectTag}
    //     </div>
    //   );
    // };

    // const ListTag = (props) => {
    //   const list = props.data;
    //   const subjectTag = list.map((subject) => (
    //     <Badge bg="warning" style={{ marginLeft: 4 }}>
    //       {subject}
    //     </Badge>
    //     )
    //     // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
    //   );
    //   return <div className="tag" style={theme.FONTS.subject}>{subjectTag}</div>;
    // };

    const ButtomOption = () => {
      return (
        <div style={{ marginLeft: 10, marginBottom: 5 }}>
          <UpvoteBotton upvote={whoVoteLike.length} />

          {/* Comment Btn */}
          <OverlayTrigger
            key={"top"}
            placement={"top"}
            overlay={<Tooltip id={`tooltip-${"top"}`}>Comment</Tooltip>}
          >
            <Button
              className="bp3-minimal comment"
              icon="comment"
              onClick={() => handleClickComment()}
            >
              {Math.floor(Math.random() * 10 + 1)}
            </Button>
          </OverlayTrigger>
        </div>
      );
    };

    const MoreButton = () => {
      return (
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="btn-morestyle"
            bsPrefix="p-0"
          >
            <Icon icon="more" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Report</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Block</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-2">Bookmark</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    const handleClickViewMore = () => {
      setIsViewMore(!isViewMore);
    };

    return (
      <>
        <div>
          <div class="header">
            <div class="options">
              <i class="fa fa-chevron-down"></i>
            </div>
            <Link to={`/profile/${user.userID}`}>
              {user.imgURL ? (
                <Avatar size="40" src={user.imgURL} round={true} />
              ) : (
                <Avatar
                  size="40"
                  name={user.firstName + " " + user.lastName}
                  round={true}
                />
              )}
            </Link>
            <div className="ms-1">
              <div class="co-name">
                <Link to={`/profile/${user.userID}`} style={theme.FONTS.name}>
                  {user.firstName ? user.firstName + " " + user.lastName : ""}
                </Link>
              </div>
              <div class="time noselect" style={theme.FONTS.time}>
                <div>
                  <Moment
                    element="span"
                    data={forum.createdAt}
                    locale="th"
                    format="DD/MM/YYYY"
                  />{" "}
                  ·{" "}
                  <Moment fromNow locale="th">
                    {forum.createdAt}
                  </Moment>
                </div>
                {/* <i class="fa fa-globe"></i> */}
              </div>
            </div>
            
            <div className="btn-more">
              <MoreButton />
            </div>
          </div>
          <div class="content">
            {/* <Card.Title>{forum.title}</Card.Title> */}
            <Link
              to={`/question/${forum.forumID}`}
              style={{ textDecoration: "black" }}
            >
              <Card.Title style={theme.FONTS.body3}>{forum.title}</Card.Title>
            </Link>

            <div style={{ marginBottom: 5 }}>
              {isViewMore ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: forum.postText,
                    }}
                    id="body-forum-text"
                  />

                  {!props.isReadLong ? (
                    <Button
                      className="btn-viewmore bp3-minimal bp3-small bp3-fill bp3-intent-primary"
                      onClick={() => handleClickViewMore()}
                    >
                      <div style={theme.FONTS.h4}>(แสดงน้อยลง)</div>
                    </Button>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {!props.isReadLong ? (
                    <div
                      id="body-forum-text"
                      onClick={() => handleClickViewMore()}
                      dangerouslySetInnerHTML={{ __html: post }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: forum.postText,
                      }}
                      id="body-forum-text"
                    />
                  )}
                </>
              )}
            </div>
            <>
              {!props.isReadLong ? (
                <>
                  {forum.listImage[0]?.filePath ? (
                    <Image
                      src={
                        "http://localhost:5000/" + forum.listImage[0]?.filePath
                      }
                      fluid
                      className="forum-img"
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {forum.listImage ? (
                    <>
                      {forum.listImage.map((item) => {
                        return (
                          <>
                            <Image
                              src={"http://localhost:5000/" + item.filePath}
                              fluid
                              className="forum-img mt-3 noselect nodrag img-thumbnail"
                            />
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          </div>
        </div>
        <div className="card-tag">
          <ListSubjectTag data={forum.listSubject} />
          <ListTag data={forum.listTag} />
        </div>
        <ButtomOption />
      </>
    );
  };

  // Main Render
  return (
    <div style={{ marginBottom: 10 }}>
      <Card className="main-card">
        
        <Question />
        {isShowComment ? <Answer data={forum} isAuthenticated={props.isAuthenticated}/> : <></>}
      </Card>
    </div>
  );
}

export default ForumCard;
