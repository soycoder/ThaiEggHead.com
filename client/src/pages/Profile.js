import React, { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Icon } from "@blueprintjs/core";
import "../App.css";

import { images, COLORS, FONTS, SIZES } from "../constants";

const Profile = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [forum, setForum] = useState({});
  const [answer, setAnswer] = useState({});

  // Photo Edit
  const [lgShow, setLgShow] = useState(false);

  // Education Edit
  const [educationShow, setEducationShow] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res));
    fetch(`http://localhost:5000/forums?userID=${id}`)
      .then((res) => res.json())
      .then((res) => setForum(res));
    fetch(`http://localhost:5000/answers?userID=${id}`)
      .then((res) => res.json())
      .then((res) => setAnswer(res));
  }, []);

  function dateToString(d) {
    return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`;
  }
  return (
    <div style={{ backgroundColor: "#dddddd" }}>
      <Container fluid style={{ backgroundColor: "#fff" }}>
        {/* <input type="file" id="myfile" name="myfile"  > */}
        <div className="cover-profile">
          <Image src={images.pic_cover} fluid className="img-cover-profile" />
        </div>

        {/* </input> */}
        <Container>
          <Row xs={12} md={9} className="display-flex mt-3">
            <Col xs={12} md={3}>
              <button
                className="profile-btn profile-photo-edit"
                onClick={() => setLgShow(true)}
              >
                <Image
                  className="pic-profile"
                  src={data.imgURL}
                  roundedCircle
                />
              </button>
              {/* Modal For Edit Pic */}
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title
                    id="example-modal-sizes-title-lg"
                    style={FONTS.h1}
                  >
                    แก้ไข/รูปโปรไฟล์
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
              </Modal>
              {/* Modal For Edit Pic */}
            </Col>
            <Col xs={12} md={9}>
              <Row>
                <Col xs={11} md={11}>
                  <Card.Title
                    style={FONTS.h1}
                  >{`${data.firstName} ${data.lastName}`}</Card.Title>
                  <Card.Subtitle style={FONTS.h2}>
                    @{data.userName}
                  </Card.Subtitle>
                  <Card.Body style={FONTS.body3}>
                    {data.birthDate ? (
                      <p>{dateToString(data.birthDate)}</p>
                    ) : (
                      <p>{"-"}</p>
                    )}
                    {data.bio && data.bio.length > 0 ? (
                      <p>{data.bio}</p>
                    ) : (
                      <p>{"-"}</p>
                    )}
                  </Card.Body>
                </Col>
                <Col xs={1} md={1}>
                  <button className="icon profile-btn">
                    <Icon icon="edit" iconSize="20" intent="primary" />
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <br />

      <Container>
        {/* #1 */}
        <Card>
          <Card.Body>
            <Card.Title style={FONTS.h2}>Activity</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle> */}
            <Row style={FONTS.h3}>
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
                <Card.Title style={FONTS.h2}>Education</Card.Title>
                <Education />
                {/* Modal For Edit Education */}
                <Modal
                  size="lg"
                  show={educationShow}
                  onHide={() => setEducationShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title
                      id="example-modal-sizes-title-lg"
                      style={FONTS.h1}
                    >
                      แก้ไข Education
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>...</Modal.Body>
                </Modal>
                {/* Modal For Edit Education */}
              </Col>
              <Col md={1}>
                <button className="icon profile-btn">
                  <Icon icon="plus" iconSize="20" intent="primary" />
                </button>
                <br />
                <button className="icon profile-btn" onClick={() => setEducationShow(true)}>
                  <Icon icon="edit" iconSize="20" intent="primary" />
                </button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />
        {/* #3 */}
        <Card>
          <Card.Body>
            <Card.Title style={FONTS.h2}>Interests</Card.Title>
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
      <Row className="edu-card" style={{ fontFamily: "supermarket" }}>
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
      <Row className="interest-card" style={{ fontFamily: "supermarket" }}>
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
