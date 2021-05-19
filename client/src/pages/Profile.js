import React, { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Icon } from "@blueprintjs/core";
import "../App.css";

import { images, COLORS, FONTS, SIZES } from "../constants";

const Profile = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [forum, setForum] = useState({});
  const [answer, setAnswer] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/forums?userID=${id}`)
      .then((res) => res.json())
      .then((res) => setForum(res));
    fetch(`http://localhost:5000/answers?userID=${id}`)
      .then((res) => res.json())
      .then((res) => setAnswer(res));
  }, []);

  return (
    <div style={{ backgroundColor: "#dddddd" }}>
      <h3>ID: {JSON.stringify(data)}</h3>
      <Container fluid style={{ backgroundColor: "#fff" }}>
        <Image src={images.pic_cover} fluid className="cover-profile" />

        <Container>
          <Row xs={12} md={9} style={{}}>
            <Col xs={12} md={3}>
              <Image
                className="pic-profile"
                src={data.imgURL.length > 0 ? data.imgURL : ""}
                roundedCircle
              />
            </Col>
            <Col xs={12} md={9}>
              <Card.Title>{`${data.firstName} ${data.lastName}`}</Card.Title>
              <Card.Subtitle>@{data.userName}</Card.Subtitle>
              <Card.Body>
                {data.birthDate ? data.birthDate : "-"}
                {data.bio && data.bio.length > 0 ? data.bio : "-"}
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Container>
      <br />

      <Container>
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
                {forum.length}
                <br />
                คร้ัง
              </Col>
              <Col className="text-center">
                ตอบคำถาม
                <br />
                {answer.length}
                <br />
                คร้ัง
              </Col>
              {/* <Col className="text-center">
                ได้รับรับรางวัลคำตอบที่ดีที่สุด
                <br />
                {10}
                <br />
                คร้ัง
              </Col> */}
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
              {Math.floor(Math.random() * 10000 + 1) * 100 + " followers"}
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
              {Math.floor(Math.random() * 10000 + 1) * 10 + " followers"}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </>
  );
};
export default Profile;
