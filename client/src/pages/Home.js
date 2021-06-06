import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { images } from "../constants";
import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@blueprintjs/core";

import CreateForumCard from "../components/CreateForumCard";
import ForumCard from "../components/ForumCard";
import { getMultipleFiles } from "../auth/apiFile";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";
import Select from "react-select"
import { theme } from "../constants";

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datas, setdatas] = useState([]);
  const [isArrayEmpty, setIsArrayEmpty] = useState(false);
  const [isShowAnounce, setIsShowAnounce] = useState(true)

  const [multipleFiles, setMultipleFiles] = useState([]);

  const subjectNavigate = [
    {
      subjectName: "วิทยาศาสตร์ และเทคโนโลยี",
      link: "/subject/sci",
      img: images.subj_1,
    },
    {
      subjectName: "กฎหมาย",
      link: "/subject/law",
      img: images.subj_2,
    },
    {
      subjectName: "สังคมสงเคราะห์",
      link: "/subject/sa",
      img: images.subj_3,
    },
    {
      subjectName: "รัฐศาสตร์",
      link: "/subject/ps",
      img: images.subj_4,
    },
    {
      subjectName: "วิศวกรรมศาสตร์",
      link: "/subject/eg",
      img: images.subj_5,
    },
    {
      subjectName: "นิเทศศาสตร์",
      link: "/subject/ca",
      img: images.subj_6,
    },
    {
      subjectName: "สังคมสงเคราะห์",
      link: "/subject/sw",
      img: images.subj_7,
    },
    {
      subjectName: "ศึกษาศาสตร์",
      link: "/subject/law",
      img: images.subj_8,
    },
    {
      subjectName: "พาณิชยศาสตร์ และการบัญชี",
      link: "/subject/cca",
      img: images.subj_9,
    },
    {
      subjectName: "ศิลปกรรมศาสตร์",
      link: "/subject/faa",
      img: images.subj_10,
    },
    {
      subjectName: "ศิลปะ",
      link: "/subject/art",
      img: images.subj_11,
    },
    {
      subjectName: "จิตวิทยา",
      link: "/subject/psyc",
      img: images.subj_12,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/forums")
      .then((res) => res.json())
      .then((res) => setdatas(res));
  }, []);
  
  const [optionTag, setOptionTag] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/forums/tag`)
      .then((res) => res.json())
      .then((res) => {
        // let array = Tag.concat(res);
        let options = res.map((d) => ({
          value: d.tagID,
          label: d.name,
        }));
        // console.log(options);
        setOptionTag(options);
      });
  }, []);

  var [tag, setTag] = useState("");
  const [value, getValue] = useState([]);
  var handle = (e) => {
    getValue(Array.isArray(e) ? e.map(x => x.label) : []);
  }

  var i, j
  var t = " "
  var arrayTag = []
  function tagData() {
    datas.map((dataTag) => {
      for (i = 0; i < dataTag.listTag.length; i++) {
        if (dataTag.listTag[i] !== " ") {
          t = t + " " + dataTag.listTag[i]
        }
      }
      arrayTag = t.split(" ")

    }
    )
    return (
      arrayTag
    )
  }
  { tagData() }

  const count = {}
  arrayTag.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
  // console.log(count);

  var key = [];
  var sumTag = [];
  key = Object.keys(count)
  sumTag = Object.values(count)

  for (j = 0; j < key.length; j++) {
    key[j] = { name: key[j], num: sumTag[j] };
  }

  key.shift()


  var newArray = datas.filter(function (ele) {
    var i, j;
    var n = ele.listTag.length;
    var nn = value.length;

    for (i = 0; i <= nn; i++) {
      for (j = 0; j < n; j++) {
        if (nn != 0) {
          tag = value[i]
        }
        // console.log(tag);
        if (ele.listTag[j] === tag) {
          return ele.listTag;
        }
        else if (tag === "") {
          return newArray = datas;
        }
      }
    }
  });

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
              height="25"
              width="25"
              className="subject-img"
              style={{ marginRight: 5 }}
            />
            <div style={theme.FONTS.home4}>
              {subject.subjectName}
            </div>
            
          </Button>
        </Link>
      </li>
    ));
    return <ul className="ul-navsubject">{listSubject}</ul>;
  };

  const UserQuestionCard = () => {
    if (isAuthenticated) {
      return (
        <Card style={{ marginBottom: 10, padding: 15 }}>
          <Card.Subtitle className="card-username">
            <Link to={`/profile/${user.userID}`}>
              <img
                class="user-image-small"
                src={user.imgURL ? user.imgURL : images.pic_profile}
              />
            </Link>
            <div class="user-name-small">
              <Link to={`/profile/${user.userID}`} style={theme.FONTS.name}>
                {user.firstName ? user.firstName + " " + user.lastName : ""}
              </Link>
            </div>
          </Card.Subtitle>

          <Form>
            <Form.Group>
              <Form.Control style={theme.FONTS.filter}
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
                  {isAuthenticated ? (
                    <CreateForumCard isAuthenticated={auth.isAuthenticated()} />
                  ) : (
                    <Redirect to="/auth" />
                  )}
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
          <Card.Text className="card-title" style={theme.FONTS.home2}>
            ประกาศงานแข่งขัน "ThaiEggHead World Meetup Week 2025"
          </Card.Text>
          <Card.Text className="card-subtitle" style={theme.FONTS.home4}>สมัครเข้าร่วมได้ตั้งแต่วันที่ 18-25 มิถุนายน</Card.Text>
          <Button variant="primary" className="btn-learnmore" style={theme.FONTS.body4}>
            ดูข้อมูลเพิ่มเติม
          </Button>
          <Button className="btn-close btn-close2" onClick={() => setIsShowAnounce(!isShowAnounce)}></Button>
          {/* <img
              src={images.logo_event}
              height="130"
              width="130"
              className="event-img"
            /> */}
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <body style={{ backgroundColor: "#F3F3F3", minHeight:200 }} >
        <br />
        <br />
        <Container fluid="xl">
          <Row xs={1} md={3}>
            <Col md="auto" >
              <h5 style={{ marginLeft: 54 }} style={theme.FONTS.home3}>พื้นที่ความรู้</h5>
              <LeftNavigate data={subjectNavigate} />
            </Col>

            <Col md={6}>

              {isShowAnounce ? (
                <AnouncingCard />
              ) : (<></>)}

              <UserQuestionCard />
                          
              {newArray.map((forum) => {
                if(newArray.length!=0){
                  console.log(newArray.length);
                  return(<ForumCard data={forum}></ForumCard>)
                }
                  
                else{
                  console.log("qsdqsd");
                  return(
                    <div class="bp3-non-ideal-state">
                      <div class="bp3-non-ideal-state-visual">
                        <span class="bp3-icon bp3-icon-folder-open"></span>
                      </div>
                      <h4 class="bp3-heading">ไม่มีคำถามที่คุณกำลังตามหา</h4>
                      <div>สร้างคำถามเองเลยสิ</div>
                      <button class="bp3-button bp3-intent-primary">ตั้งคำถาม</button>
                    </div>
                  )
                }
                  
              
              })}

            </Col>

            <Col md={2}>
              <Card style={theme.FONTS.filter}>
                <Card.Header>Filter</Card.Header>
                <Card.Body>
                  <div >
                    <Select isMulti options={optionTag} onChange={handle}></Select>
                  </div>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Header className="card-header" style={theme.FONTS.tag}>
                  Tags ทั้งหมด 
                </Card.Header>  
                <Card.Body style={theme.FONTS.tag}>
                  <div >
                    {key.map(item => {
                      return (
                        <div>
                          <Button style={theme.FONTS.tag1} variant="outline-warning" className="app-fontSizeTag">{item.name}</Button>{"  x "}{item.num}
                        </div>
                      )
                    })}
                  </div>
                </Card.Body>
              </Card>
              <br />
              {/* <Card style={{ width: "13rem" }} style={theme.FONTS.tag}>
                <div>Hotest Question</div>
              </Card> */}
            </Col>
          </Row>
        </Container>
      </body>
    </div>
  );
}

export default Home;
