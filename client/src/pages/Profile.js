import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Modal,
  Nav,
  Badge,
  Button
} from "react-bootstrap";
import { useParams, Link, useLocation } from "react-router-dom";
import { Icon } from "@blueprintjs/core";
import "../App.css";
import Avatar from "react-avatar";
import AvatarCropper from "../components/ProfileImage";
import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import { theme } from "../constants";
import { FONTS } from "../constants";

const Profile = ({ isAuthenticated }) => {
  const loc = useLocation();
  const dummyUser = {
    firstName: "",
    LastName: "",
  };

  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }

  //HANDLE VAL
  const [lgShow, setLgShow] = useState(false);

  //FORUM DATA
  let { id } = useParams();
  const [userData, setUserData] = useState(dummyUser);
  const [forum, setForum] = useState([]);

  //INFO DISPLAY
  const [phone, setPhone] = useState("N/A");
  const [organization, setOrganization] = useState("Thammasat University");
  const [eggHeadScore, setEggHeadScore] = useState(125);
  const [education, setEducation] = useState([
    {
      place: "Thammasat University",
      degree: "Bachelor of Science - BS, Computer Science",
      since: "2018 - 2021",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Emblem_of_Thammasat_University.svg/1024px-Emblem_of_Thammasat_University.svg.png",
    },
    {
      place: "Massachusetts Institute of Technology",
      degree: "Bachelor of Technology - BS, Computer Science",
      since: "2012 - 2017",
      img: "https://upload.wikimedia.org/wikipedia/th/thumb/4/44/MIT_Seal.svg/1200px-MIT_Seal.svg.png",
    },
  ]);

  const [numQuestion, setNumQuestion] = useState(0);
  const [numAnswer, setNumAnswer] = useState(0);
  const [numComment, setNumComment] = useState(0);

  const [isEditMode, setIsEditMode] = useState(false);

  //UTILITY
  const [currSelectNav, setCurrSelectNav] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((res) => setUserData(res));
    fetch(`http://localhost:5000/forums/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setForum(res);
        setNumQuestion(res.length);
      });
  }, [loc]);

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
  }

  const NonIdealState = () => {
    return (
      <div className="bp3-non-ideal-state">
        <div className="bp3-non-ideal-state-visual">
          <span className="bp3-icon bp3-icon-folder-open"></span>
        </div>
        <h4 className="bp3-heading" style={theme.FONTS.detail}>
          Empty
        </h4>
        <div style={theme.FONTS.detail}>
          You haven't answered any questions yet.
        </div>
      </div>
    );
  };

  const handleNavSelect = (eventKey) => setCurrSelectNav(eventKey);

  const handleImgSelect = () => {
    setLgShow(true);
  };

  const ProfileImg = () => {
    if (isEditMode) {
      return (
        <div className="profile-img">
          {userData.imgURL ? (
            <>
              <Avatar
                size="200"
                src={userData.imgURL.indexOf("http")===0 ? userData.imgURL : "http://localhost:5000/" + userData.imgURL}
                round={true}
                onClick={handleImgSelect}
                className="img-edit"
              />
              <Icon onClick={handleImgSelect} icon="edit" iconSize={70} style={{ position: "absolute", marginLeft: -130, marginTop: 60, color: "white" }} />
            </>
          ) : (
            <>
              <Avatar
                size="200"
                name={userData.firstName + " " + userData.lastName}
                round={true}
                onClick={handleImgSelect}
                className="img-edit"
              />
              <Icon onClick={handleImgSelect} icon="edit" iconSize={70} style={{ position: "absolute", marginLeft: -130, marginTop: 60, color: "white" }} />
            </>
          )}

          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg" style={FONTS.h1}>
                แก้ไข/รูปโปรไฟล์
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="/profile" method="post" enctype="multipart/form-data">
              </form>
              <AvatarCropper data={userData} isAuthenticated={isAuthenticated}/>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className="profile-img">
          {userData.imgURL ? (
            <Avatar
              size="200"
              src={userData.imgURL.indexOf("http")===0 ? userData.imgURL : "http://localhost:5000/" + userData.imgURL}
              round={true}
            />
          ) : (
            <Avatar
              size="200"
              name={userData.firstName + " " + userData.lastName}
              round={true}
            />
          )}
        </div>
      );
    }
  };

  const Navs = () => {
    return (
      <Nav variant="tabs" onSelect={handleNavSelect} style={theme.FONTS.nav}>
        <Nav.Item>
          <Nav.Link eventKey={1}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={2}>{numQuestion} Question</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={3}>{numAnswer} Answer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={4}>{numComment} Comment</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  };

  const ProfileHead = () => {
    return (
      <>
        <Col md={4}>
          <ProfileImg />
        </Col>
        <Col md={6}>
          <div className="profile-head">
            <h3 style={theme.FONTS.profile}>
              {userData.firstName + " " + userData.lastName}
            </h3>
            <p className="proile-rating" style={theme.FONTS.score}>
              EggHead Score :{" "}
              <span style={theme.FONTS.score}>{eggHeadScore}</span>
            </p>
            <Navs />
            <ContentDisplay />
          </div>
        </Col>
        {user.userID === id ? (
          <Col md={2} style={theme.FONTS.detail}>
            <Button
              variant="secondary"
              className="profile-edit-btn"
              onClick={handleEdit}
            >Edit Profile</Button>
          </Col>
        ) : null}
      </>
    );
  };

  const HistoryCard = () => {
    const ListTag = (props) => {
      const _list = props.data.listSubject;
      const subjectTag = _list.map(
        (subject) => {
          return (
            <Badge bg="info" style={{ marginLeft: 4 }}>
            </Badge>
          );
        }
      );
      return <div className="tag">{subjectTag}</div>;
    };
    return (
      <>
        {forum.map((item) => {
          return (
            <Card className="app-padding" style={{ marginBottom: 5 }}>
              <Link to={`/question/${item.forumID}`}>
                <Card.Subtitle style={theme.FONTS.detail1}>
                  📌{" " + item.title}
                </Card.Subtitle>
              </Link>
              <ListTag data={item} />
            </Card>
          );
        })}
      </>
    );
  };

  const ContentDisplay = () => {
    const EducationCard = (props) => {
      return (
        <Card.Body style={{ margin: -20 }}>
          <Col md={11}>
            <Row className="edu-card">
              <Col md={2} className="edu-logo">
                <Image style={{ height: "80px" }} src={props.data.img} />
              </Col>
              <Col md={10}>
                <Card.Body>
                  <Card.Title style={theme.FONTS.title1}>
                    {props.data.place}
                  </Card.Title>
                  <Card.Text style={theme.FONTS.title2}>
                    {props.data.degree}
                  </Card.Text>
                  <Card.Text className="text-muted" style={theme.FONTS.title2}>
                    {props.data.since}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Col>
        </Card.Body>
      );
    };

    if (currSelectNav===1) {
      return (
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Row className="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Email</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>{userData.email}</p>
            </Col>
          </Row>
          <Row className="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Name</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>
                {userData.firstName + " " + userData.lastName}
              </p>
            </Col>
          </Row>
          <Row className="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Phone Number</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>{phone}</p>
            </Col>
          </Row>
          <Row className="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Organization</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>{organization}</p>
            </Col>
          </Row>
          <Row className="row">
            <Col md={11}>
              <br />
              <label style={theme.FONTS.detail}>Education</label>
            </Col>
            {education.map((item) => (
              <EducationCard data={item} style={theme.FONTS.detail} />
            ))}
          </Row>
        </div>
      );
    } else if (currSelectNav===2) {
      return (
        <div>
          <HistoryCard />
        </div>
      );
    } else if (currSelectNav===3) {
      return (
        <div>
          <NonIdealState />
        </div>
      );
    } else {
      return (
        <div>
          <NonIdealState />
        </div>
      );
    }
  };

  return (
    <div className="container emp-profile">
      <Container method="post">
        <Row className="Row">
          <ProfileHead data={forum} />
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
