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
  Button as Button2
} from "react-bootstrap";
import { Button, Icon, InputGroup, Text } from "@blueprintjs/core";
import React, { useState, useEffect } from "react";
import { images } from "../constants"

function ForumCard(props) {

  let forum = props.data;
  const [isShowComment, setIsShowComment] = useState(false);

  const dummyUser = [
        {
          displayName:"PupeePupee",
          img:images.pro_1,
          date:"Thammasat University - 25 May"
        },
        {
          displayName:"Jendeu is da best",
          img:images.pro_2,
          date:"1h ago"
        }
      ]
    
  const Question = () => {

    const [user, setUser] = useState(dummyUser);
    const [isViewMore, setIsViewMore] = useState(false);
  
    var n = forum.postText.length;
      if (n > 160){
        var post = forum.postText.substr(0, 150)+"...";
      }
      else{
        var post = forum.postText
      }

    useEffect(() => {
      fetch(`http://localhost:5000/profile/${forum.userID}`)
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
          // setPathUser(`/profile/${res.googleID}`);
        });
    }, []);

    const UpvoteBotton = (props) => {
      return(
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
          {props.upvote}
          </Button>
        </OverlayTrigger> 
      ) 
    }

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
          <Badge variant="info" style={{marginLeft:4}}>{subject}</Badge>
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
          <UpvoteBotton upvote={10}/>

          {/* Comment Btn */}
          <OverlayTrigger
            key={'top'}
            placement={'top'}
            overlay={
              <Tooltip id={`tooltip-${'top'}`}>
                Comment
              </Tooltip>
            }
          >
            <Button className="bp3-minimal comment" icon="comment" onClick={() => handleClickComment()}>
              {124}
            </Button>
          </OverlayTrigger>
        </div>
      )
    }

    const MoreButton = () => {
      return(
        <Dropdown>
          <Dropdown.Toggle variant="light" className="btn-morestyle" bsPrefix="p-0">
            <Icon icon="more"/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Report</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Block</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-2">Bookmark</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    }

    const handleClickComment = () => {
      setIsShowComment(!isShowComment)
    }

    const handleClickViewMore = () => {
      setIsViewMore(!isViewMore)
    }

    return (
          <>
            <div>
              <div class="header">
                <div class="options"><i class="fa fa-chevron-down"></i></div>
                <img class="co-logo" src={user[1].img} />
                <div class="co-name"><a href="#">{user[1].displayName}</a></div>
                <div class="time"><a href="#">{user[1].date}</a> · <i class="fa fa-globe"></i></div>
                <div className="btn-more">
                  <MoreButton/>
                </div>
                
              </div>
              <div class="content">
                <Card.Title >{forum.title}</Card.Title>
                <div>
                  {isViewMore?(<>
                    <div dangerouslySetInnerHTML={{
                      __html: forum.postText
                      }}/>
                    <Button className="btn-viewmore bp3-minimal bp3-small" onClick={() => handleClickViewMore()}>(ดูน้อยลง)</Button>
                      </>
                  ):(<>
                    <div dangerouslySetInnerHTML={{__html: post}}/>
                    <Button className="btn-viewmore bp3-minimal bp3-small" onClick={() => handleClickViewMore()}>(ดูเพิ่มเติม)</Button>
                                          
                      </>
                    )}
                
                </div>
                  
                {
                  forum.listImage[0]?.filePath ? (
                  <Image src={"http://localhost:5000/" + forum.listImage[0]?.filePath} fluid className="forum-img" />
                  ) : (<></>)
                }
    
              </div>
            </div>
            <div className="card-tag">
              <ListSubjectTag data={forum.listSubject}/>
              <ListTag data={forum.listTag}/>
            </div>
            <ButtomOption/>
          </> 
    );
  }

  const Answer = () => {

    const dummyComment = [{
      comment:"NOPE"
    }]

    const [isLoadingAnswer, setIsLoadingAnswer] = useState(true);
    const [comment, setComment] = useState(dummyComment)
    const [user, setUser] = useState(JSON.parse(localStorage?.getItem("profile")));
    const [userAnswer, setUserAnswer] = useState(dummyUser);
    
    const UpvoteBotton = (props) => {
      return(
        <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-${'top'}`}>
              Upvote
            </Tooltip>
          }
        >
          <Button className="bp3-minimal comment2" icon="thumbs-up">
            Upvote · {props.upvote}
          </Button>
        </OverlayTrigger> 
      )
    }

    const ReplyBotton = () => {
      return(
        <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-${'top'}`}>
              Upvote
            </Tooltip>
          }
        >
          <Button className="bp3-minimal comment2" icon="chat" style={{marginLeft:5}}>
            Reply
          </Button>
        </OverlayTrigger> 
      )      
    }

    const AnswerForm = () => {
      return(
        <div>
          <div className="answer-box">
            <img class="co-logo2" src={user?.result.imageUrl} />
            <InputGroup
                          onChange={{}}
                          placeholder="Add a answer..."
                          className="input-answer"
                      />
            <Button2 variant="primary" className="btn-answer">Add answer</Button2>
          </div>
        </div>
      )
    }

    const CommentList = () => {
      return(
        <div class="commentlist-content">
            <HeaderUserComment/>
            <div class="commentlist-content-text">
              The first one kind of happened where I live for a couple of weeks.
            </div>
        </div>
      )
    }

    const HeaderUserComment = () => {
      return(
        <div class="header">
          <div class="options"><i class="fa fa-chevron-down"></i></div>
          <img class="co-logo-comment" src={userAnswer[1].img} />
          <div class="co-name"><a href="#">{userAnswer[1].displayName}</a></div>
          <div class="time"><a href="#">{userAnswer[1].date}</a> · <i class="fa fa-globe"></i></div>
          <div className="btn-more">
          </div>
        </div>
      )
    }

    const HeaderUserAnswer = () => {
      return(
        <div class="header">
          <div class="options"><i class="fa fa-chevron-down"></i></div>
          <img class="co-logo" src={userAnswer[0].img} />
          <div class="co-name"><a href="#">{userAnswer[0].displayName}</a></div>
          <div class="time"><a href="#">{userAnswer[0].date}</a> · <i class="fa fa-globe"></i></div>
          <div className="btn-more">
          </div>
        </div>
      )
    }

    const AnswerList = () => {
      return(
        <Card className="answerlist-card">
          <div>
            <HeaderUserAnswer/>
            <div class="answerlist-content">
                <div class="answerlist-content-text">
                  The first one kind of happened where I live for a couple of weeks.
                </div>
                <UpvoteBotton upvote={0}/>
                <ReplyBotton />
            </div>
          </div>

          {comment? (<><CommentList/><CommentList/></>):(<></>)}
        
        </Card>
      )
    }
      
    return (
      <div className="answer-pad">
            <AnswerForm/>
            <AnswerList/>
      </div>  
    ); 
  }

  // Main Render
  return(
      <div style={{marginBottom:10}}>
          <Card className="main-card">
            <Question/>
            { isShowComment? (
            <Answer/>):(<></>)
            }
          </Card>
      </div>     
  )
}

export default ForumCard;