import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  ListGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { images } from "../constants";
import React, { useState, useEffect } from "react";

import CreateForum from "../components/CreateForum";
import { getMultipleFiles } from "../auth/apiFile";

function App() {
  // Initial User Profile
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // Net เพิ่มส่วน ป๊อบอัพกรอกข้อมูล
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datas, setdatas] = useState({});

  const [multipleFiles, setMultipleFiles] = useState([]);

  // const getMultipleFilesList = async () => {
  //   try {
  //     const fileslist = await getMultipleFiles();
  //     setMultipleFiles(fileslist);
  //     console.log(multipleFiles);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getMultipleFilesList();
  // }, []);

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user) {
      fetch(`http://localhost:5000/users/google/${user.result.googleId}`)
        .then((res) => res.json())
        .then((res) => {
          let _user = user;
          let _result = _user.result;

          _result["userID"] = res.userID;
          _user["result"] = _result;
          //   console.log(_user);
          setUser("User " + _user);
        });
    }

    fetch("http://localhost:5000/forums")
      .then((response) => response.json())
      .then((data) => setdatas(data));
  }, []);

  const mystyle = {
    padding: "20px",
    fontFamily: "RSU",
    border: "2px solid #f8f9fa",
  };
  //

  const test2 = () => {
    return (
      <div>
        {datas.map((item) => (
          <div>
            <Card>
              <Row>
                <Col xs={2} className="app-profile">
                  <img
                    src={images.pro_2}
                    height="30"
                    width="30"
                    className="app-cycle"
                  />
                  <p />
                  {item}
                </Col>
                <Col xs={9} className="app-paddingContent">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.postText}
                  </Card.Subtitle>
                </Col>
              </Row>
            </Card>
            <p />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <body style={{ backgroundColor: "#F3F3F3" }}>
        <br />
        <br />
        <Container>
          <Row>
            <Col>
              {/* <BrowserRouter> */}
              <nav>
                <ul className="app-removeDot">
                  <li>
                    <Link to="/subject/sci">
                      <img
                        src={images.subj_1}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Sciences
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/law">
                      <img
                        src={images.subj_2}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Law
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/sa">
                      <img
                        src={images.subj_3}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Social Administration
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/ps">
                      <img
                        src={images.subj_4}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Political Science
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/eg">
                      <img
                        src={images.subj_5}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Engineering
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/ca">
                      <img
                        src={images.subj_6}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Communication Arts
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/sw">
                      <img
                        src={images.subj_7}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Social Work
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/ed">
                      <img
                        src={images.subj_8}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/caa">
                      <img
                        src={images.subj_9}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Commerce and <br /> Accountancy
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/faa">
                      <img
                        src={images.subj_10}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Fine and Applied Arts
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/art">
                      <img
                        src={images.subj_11}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Arts
                    </Link>
                  </li>
                  <li>
                    <Link to="/subject/psyc">
                      <img
                        src={images.subj_12}
                        height="23"
                        width="23"
                        className="app-cycle"
                      />{" "}
                      Psychology
                    </Link>
                  </li>
                </ul>
              </nav>
              {/*            
            <Switch>
              <Route path="/subject/sci" component={Subject} />
            </Switch>
         
            </BrowserRouter> */}
            </Col>

            <Col xs={7}>
              {user ? (
                <>
                  <Card className="app-padding">
                    <Card.Subtitle className="mb-2 text-muted">
                      <img
                        src={images.pro_1}
                        height="30"
                        width="30"
                        className="app-cycle mr-2"
                      />
                      {/* {user.result.name} */}
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
                  <p />
                </>
              ) : (
                <></>
              )}

              {/* {datas && datas.length > 0 ? test2() : <p>wait</p>} */}
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

export default App;
