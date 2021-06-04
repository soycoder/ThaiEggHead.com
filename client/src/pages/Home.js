import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { images } from "../constants";
import React, { useState, useEffect, useContext } from "react";

import CreateForum from "../components/CreateForum";
import ForumCard from "../components/ForumCard";
import { getMultipleFiles } from "../auth/apiFile";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";

function Home({ isAuthenticated }) {
  // Initial User Profile
  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }

  // Net เพิ่มส่วน ป๊อบอัพกรอกข้อมูล
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datas, setdatas] = useState([]);

  const [multipleFiles, setMultipleFiles] = useState([]);
  const [tag, setTag] = useState("");

  var newArray = datas.filter(function (ele) {
    var i;
    var n = ele.listTag.length;
    for (i = 0; i < n; i++) {
      if (ele.listTag[i] === tag) {
        return ele.listTag;
      } else if (tag === "") {
        return (newArray = datas);
      }
    }
  });

  const subjectNavigate = [
    {
      subjectName: "Sciences",
      link: "/subject/sci",
      img: images.subj_1,
    },
    {
      subjectName: "Law",
      link: "/subject/law",
      img: images.subj_2,
    },
    {
      subjectName: "Social Administration",
      link: "/subject/sa",
      img: images.subj_3,
    },
    {
      subjectName: "Political Science",
      link: "/subject/ps",
      img: images.subj_4,
    },
    {
      subjectName: "Engineering",
      link: "/subject/eg",
      img: images.subj_5,
    },
    {
      subjectName: "Communication Arts",
      link: "/subject/ca",
      img: images.subj_6,
    },
    {
      subjectName: "Social Work",
      link: "/subject/sw",
      img: images.subj_7,
    },
    {
      subjectName: "Education",
      link: "/subject/law",
      img: images.subj_8,
    },
    {
      subjectName: "Commerce and Accountancy",
      link: "/subject/cca",
      img: images.subj_9,
    },
    {
      subjectName: "Fine and Applied Arts",
      link: "/subject/faa",
      img: images.subj_10,
    },
    {
      subjectName: "Arts",
      link: "/subject/art",
      img: images.subj_11,
    },
    {
      subjectName: "Psychology",
      link: "/subject/psyc",
      img: images.subj_12,
    },
  ];

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("profile")));
    // if (user) {
    //   fetch(`http://localhost:5000/users/google/${user.result.googleId}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       let _user = user;
    //       let _result = _user.result;

    //       _result["userID"] = res.userID;
    //       _user["result"] = _result;
    //       //   console.log(_user);
    //       setUser("User " + _user);
    //     });
    // }

    fetch("http://localhost:5000/forums")
      .then((res) => res.json())
      .then((res) => setdatas(res));
  }, []);

  const mystyle = {
    padding: "20px",
    fontFamily: "RSU",
    border: "2px solid #f8f9fa",
  };

  const LeftNavigate = (props) => {
    const data = props.data;
    const listSubject = data.map((subject) => (
      <li>
        <Link to={subject.link} style={{ textDecoration: "black" }}>
          <Button className="btn-subjectnav" variant="light" block>
            <img
              src={subject.img}
              height="23"
              width="23"
              className="app-cycle"
              style={{ marginRight: 5 }}
            />
            {subject.subjectName}
          </Button>
        </Link>
      </li>
    ));
    return <ul className="ul-navsubject">{listSubject}</ul>;
  };

  const UserQuestionCard = () => {
    if (isAuthenticated) {
      return (
        <Card className="app-padding" style={{ marginBottom: 10 }}>
          <Card.Subtitle className="card-username">
            <img
              src={user?.imgURL}
              height="20"
              width="20"
              className="app-cycle mr-2"
            />
            {user.firstName+" "+user.lastName}
          </Card.Subtitle>

          <Form>
            <Form.Group>
              <Form.Control
                placeholder="คุณกำลังติดปัญหาอะไรรึเปล่า ? ถามมาสิ"
                onClick={handleShow}
              />
              <Modal
                show={show}
                onHide={handleClose}
                style={{ padding: "auto", width: "100%" }}
                size="lg"
              >
                <Container style={mystyle}>
                  {/* <Card.Title>Create Forum</Card.Title> */}
                  <CreateForum />
                </Container>
              </Modal>
            </Form.Group>
          </Form>
        </Card>
      );
    } else {
      return <div>Please Login</div>;
    }
  };

  const AnouncingCard = () => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Body>
          <Card.Text className="card-title">
            Announcing ThaiEggHead World Meetup Week 2021
          </Card.Text>
          <Card.Text className="card-subtitle">Join us June 18-25</Card.Text>
          <Button variant="primary" className="btn-learnmore">
            Learn more
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <body style={{ backgroundColor: "#F3F3F3" }}>
        <br />
        <br />
        <Container fluid="xl">
          <Row xs={1} md={3}>
            <Col md="auto">
              <h5 style={{ marginLeft: 54 }}>Space</h5>
              <LeftNavigate data={subjectNavigate} />
            </Col>

            <Col md={6}>
              <AnouncingCard />
              <UserQuestionCard />

              {newArray.map((forum) => (
                <ForumCard data={forum}></ForumCard>
              ))}
            </Col>

            <Col md="auto">
              <Card style={{ width: "13rem" }}>
                <Card.Header>Custom Filter</Card.Header>
                <Card.Body>
                  <Card.Link href="#">Create a custom filter</Card.Link>
                  <form>
                    <input
                      type="tag"
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="Enter tag"
                    />
                  </form>
                </Card.Body>
              </Card>
              <br />
              <Card style={{ width: "13rem" }}>
                <Card.Header>
                  Watched Tags
                  <Card.Link href="#">Edit</Card.Link>
                </Card.Header>
                <Card.Body></Card.Body>
              </Card>
              <br />
              <Card style={{ width: "13rem" }}>
                <Card.Header>Ignored Tags</Card.Header>
                <Card.Body>
                  <Card.Link href="#">Add an ignored tag</Card.Link>
                </Card.Body>
              </Card>
              <br />
              <Card style={{ width: "13rem" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Spaces to follow</ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </body>
    </div>
  );
}

export default Home;
