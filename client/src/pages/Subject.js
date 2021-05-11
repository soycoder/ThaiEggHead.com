import { ButtonGroup } from "react-bootstrap";
import "../App.css";
import { images } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Row,
  Col,
  Card,
  Container,
  ListGroup,
  Form,
} from "react-bootstrap";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  useLocation,
} from "react-router-dom";
import App from "./Home";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Sub() {
  let { subject } = useParams();
  const buttonn = <button>create a custom Filter</button>;
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/forums?subject=${subject}`)
      .then((res) => res.json())
      .then((res) => setForumData(res));
  }, []);
  return (
    <div className="App">
      {/* <div className="app-content"></div> */}
      <div>
        <Row>
          <Col>
            <Card>
              <Card.Img src={images.bg} height="240" width="30" />
              <Card.ImgOverlay>
                <Row>
                  <Col xs={2}>
                    <div className="app-paddingSubjIMG">
                      <Card.Img
                        src={images.subj_1}
                        height="200"
                        width="50"
                        style={{ width: "13rem" }}
                        className="app-cycleSubject"
                      />
                    </div>
                  </Col>
                  <Col xs={10} className="app-subjectFont">
                    Science and Technology
                    <h4>วิทยาศาสตร์และเทคโนโลยี</h4>
                  </Col>
                </Row>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </div>
      <body style={{ backgroundColor: "#F3F3F3" }}>
        <br />
        <br />
        <Container>
          <Row>
            <Col></Col>
            <Col xs={7}>
              {forumData.map((forum) => (
                <ForumCard data={forum}></ForumCard>
              ))}
            </Col>

            <Col>
              <Card style={{ width: "13rem" }}>
                <Card.Header>Custom Filter</Card.Header>
                <Card.Body>
                  <Card.Link href="#">Create a custom filter</Card.Link>
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

function ForumCard(props) {
  let forum = props.data;

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
  console.log(user);
  return (
    <>
      <Card>
        <Row>
          <Col xs={2} className="app-profile">
            <img
              src={user.imgURL}
              height="30"
              width="30"
              className="app-cycle"
            />
            <p />
            <Link to={pathUser}>{user.userName}</Link>
          </Col>
          <Col xs={10} className="app-paddingContent">
            <Card.Title>{forum.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {forum.postText}
            </Card.Subtitle>
          </Col>
        </Row>
      </Card>
      <p />
    </>
  );
}

export default Sub;
