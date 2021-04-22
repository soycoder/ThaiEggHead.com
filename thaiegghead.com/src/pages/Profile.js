import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Icon } from "@blueprintjs/core";

import "../App.css";

const Profile = () => {
  return (
    <div style={{backgroundColor:"#dddddd"}}>
      <Container fluid style={{backgroundColor:"#fff"}}>
        <Image
          src="https://images.freeimages.com/images/large-previews/338/sunset-over-lake-2-1377767.jpg"
          fluid
          className="cover-profile"
        />
        <Container>
          <Row xs={12} md={9} style={{}}>
            <Col xs={12} md={3}>
              <Image
                className="pic-profile"
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                roundedCircle
              />
            </Col>
            <Col xs={12} md={9}>
              <Card.Title>Your Name</Card.Title>
              <Card.Subtitle>@username</Card.Subtitle>
              <Card.Body>Bio - svb46516531sdbvsfb284f4c12e75f</Card.Body>
            </Col>
          </Row>
        </Container>
      </Container>
      <br />

      <Container >
        {/* #1 */}
        <Card>
          <Card.Body>
            <Card.Title>Activity</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle> */}
            <Row>
              <Col className="text-center">
                ตั้งกระทู้คำถาม
                <br />
                {10}
                <br />
                คร้ัง
              </Col>
              <Col className="text-center">
                ตอบคำถาม
                <br />
                {10}
                <br />
                คร้ัง
              </Col>
              <Col className="text-center">
                ได้รับรับรางวัลคำตอบที่ดีที่สุด
                <br />
                {10}
                <br />
                คร้ัง
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />

        {/* #2 */}
        <Card>
          <Card.Body>
            <Row>
              <Col md={11}>
                <Card.Title>Education</Card.Title>
                <Education />
              </Col>
              <Col md={1}>
                <Icon icon="plus" iconSize="20" intent="primary" />
                <br />
                <Icon icon="edit" iconSize="20" intent="primary" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />

        {/* #3 */}
        <Card>
          <Card.Body>
            <Card.Title>Interests</Card.Title>
            <Interests />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

const Education = () => {
  return (
    <>
      <Row className="edu-card">
        <Col md={2} className="edu-logo">
          <Image
            style={{ height: "80px" }}
            src="https://tu.ac.th/uploads/media/logo/logo01.jpg"
          />
        </Col>
        <Col md={10}>
          <Card.Body>
            <Card.Title>Thammasat University</Card.Title>
            <Card.Text>
              {"Bachelor of Science"} - {"BS, Computer Science"}
            </Card.Text>
            <Card.Text className="text-muted">2018 - 2021</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </>
  );
};

const Interests = () => {
  return (
    <>
      <Row className="interest-card">
        <Col md={2} className="interest-logo">
          <Image
            style={{ height: "80px" }}
            src="https://tu.ac.th/uploads/media/logo/logo01.jpg"
          />
        </Col>
        <Col md={10}>
          <Card.Body>
            <Card.Title>{"Thammasat University"}</Card.Title>
            <Card.Text className="text-muted">
            {Math.floor((Math.random() * 10000) + 1) * 100 + " followers"}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Row className="interest-card">
        <Col md={2} className="interest-logo">
          <Image
            style={{ height: "80px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
          />
        </Col>
        <Col md={10}>
          <Card.Body>
            <Card.Title>{"Linkedin Guide to Networking"}</Card.Title>
            <Card.Text className="text-muted">
              {Math.floor((Math.random() * 10000) + 1) * 10 + " followers"}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
