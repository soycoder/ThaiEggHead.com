import "../App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
  OverlayTrigger,
  Card,
  Dropdown,
  Image,
  Button as Button2,
} from "react-bootstrap";

import Avatar from "react-avatar";

import { Button, Icon } from "@blueprintjs/core";
import { Position, Toaster, Intent } from "@blueprintjs/core";
import React, { useState, useEffect, useContext } from "react";
import { images } from "../constants";
import { Link } from "react-router-dom";
import { theme } from "../constants";

import Moment from "react-moment";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import axios from "axios";

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
  const [toaster, setToaster] = useState([]);

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

  function addToast(msg) {
    toaster.show({ message: `${msg}`, intent: Intent.WARNING, icon: "edit" });
  }

  const Question = () => {
    const [_user, setUser] = useState(dummyUser);
    const [isUserLoading, setIsUserLoading] = useState(false);
    let whoVoteLike = forum.whoVoteLike;
    let listAnswer = forum.listAnswer;
    const [amountLike, setAmountLike] = useState(whoVoteLike.length);
    const [amountAnswer, setAmountAnswer] = useState(listAnswer.length);
    const [isYouLike, setIsYouLike] = useState(
      props.isAuthenticated
        ? whoVoteLike.indexOf(user.userID) === -1
          ? false
          : true
        : false
    );

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
          setIsUserLoading(true);
        });
    }, []);

    const handleVote = () => {
      if (props.isAuthenticated) {
        let index = whoVoteLike.indexOf(user.userID);
        if (index === -1) {
          setIsYouLike(true);
          whoVoteLike.push(user.userID);
          setAmountLike(amountLike + 1);
          let update = {
            forumID: forum.forumID,
            whoVoteLike: whoVoteLike,
          };
          axios.put(`http://localhost:5000/forums/${forum.forumID}`, update);
        } else {
          setIsYouLike(false);

          let update = {
            forumID: forum.forumID,
            whoVoteLike: whoVoteLike,
          };
          whoVoteLike.splice(index, 1);
          setAmountLike(amountLike - 1);
          axios.put(`http://localhost:5000/forums/${forum.forumID}`, update);
        }
      } else {
        addToast("โปรด Login ก่อน");
      }
    };

    const UpvoteBotton = () => {
      return (
        <OverlayTrigger
          key={"top"}
          placement={"top"}
          overlay={<Tooltip id={`tooltip-${"top"}`}>Upvote</Tooltip>}
        >
          <Button
            className="bp3-minimal comment"
            icon="thumbs-up"
            variant="success"
            onClick={handleVote}
            intent={isYouLike ? Intent.PRIMARY : Intent.NONE}
          >
            {amountLike}
          </Button>
        </OverlayTrigger>
      );
    };

    const ListSubjectTag = (props) => {
      const list = props.data;
      const subjectTag = list.map((subject) => (
        <Button2 key={subject} variant="secondary" id="question-subject-tag">
          {subject}
        </Button2>
      ));
      return (
        <div className="tag" style={theme.FONTS.tag}>
          {subjectTag}
        </div>
      );
    };

    const ListTag = (props) => {
      const list = props.data;
      const subjectTag = list.map(
        (subject) => (
          <Button2 variant="secondary" id="question-tag">
            {subject}
          </Button2>
        )
      );
      return (
        <div className="tag" style={theme.FONTS.tag}>
          {subjectTag}
        </div>
      );
    };

    const ButtomOption = () => {
      return (
        <div style={{ marginLeft: 10, marginBottom: 5 }}>
          <UpvoteBotton amountLike={amountLike} setAmountLike={setAmountLike} />

          {/* Answer Btn */}
          <OverlayTrigger
            key={"top"}
            placement={"top"}
            overlay={<Tooltip id={`tooltip-${"top"}`}>Answer</Tooltip>}
          >
            <Button
              className="bp3-minimal comment"
              icon="comment"
              onClick={() => handleClickComment()}
            >
              {amountAnswer}
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
        {isUserLoading ? (
          <>
            <div>
              <div className="header">
                <div className="options">
                  <i className="fa fa-chevron-down"></i>
                </div>
                <Link to={`/profile/${_user.userID}`}>
                  {_user.imgURL ? (
                    <Avatar size="40" src={_user.imgURL.indexOf("http") === 0 ? _user.imgURL : "http://localhost:5000/" + _user.imgURL} round={true} />
                  ) : (
                    <Avatar
                      size="40"
                      name={_user.firstName + " " + _user.lastName}
                      round={true}
                    />
                  )}
                </Link>
                <div className="ms-1">
                  <div className="co-name">
                    <Link
                      to={`/profile/${_user.userID}`}
                      style={theme.FONTS.name}
                    >
                      {_user.firstName
                        ? _user.firstName + " " + _user.lastName
                        : ""}
                    </Link>
                  </div>
                  <div className="time noselect" style={theme.FONTS.time}>
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
                  </div>
                </div>

                <div className="btn-more">
                  <MoreButton />
                </div>
              </div>
              <div className="content">
                <Link
                  to={`/question/${forum.forumID}`}
                  style={{ textDecoration: "black" }}
                >
                  <Card.Title style={theme.FONTS.body3}>
                    {forum.title}
                  </Card.Title>
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
                            "http://localhost:5000/" +
                            forum.listImage[0]?.filePath
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
        ) : null}
      </>
    );
  };

  const handleCloseComment = () => {
    setIsShowComment(false)
  }

  // Main Render
  return (
    <div style={{ marginBottom: 10 }}>
      <Card className="main-card">
        <Question />
        {isShowComment ? (
          <Answer data={forum} showcomment={handleCloseComment} isAuthenticated={props.isAuthenticated} />
        ) : (
          <></>
        )}
        <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)} />
      </Card>
    </div>
  );
}

export default ForumCard;
