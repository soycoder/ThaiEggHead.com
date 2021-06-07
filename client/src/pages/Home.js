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
  Image,
} from "react-bootstrap";
import { Link, NavLink, Redirect } from "react-router-dom";
import { images } from "../constants";
import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@blueprintjs/core";

import CreateForumCard from "../components/CreateForumCard";
import ForumCard from "../components/ForumCard";
import { getMultipleFiles } from "../auth/apiFile";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

import "./styles.css";
import Select from "react-select";
import { theme } from "../constants";
import { Position, Toaster, Intent } from "@blueprintjs/core";

import Avatar from "react-avatar";

function Home({ isAuthenticated }) {
  const [toaster, setToaster] = useState([]);

  function addToast() {
    toaster.show({ message: "Oops! ขออภัยอยู่ระหว่างการปรับปรุง", intent: Intent.WARNING,  icon: "warning-sign" });
  }
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

  const [isShowAnounce, setIsShowAnounce] = useState(true);

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
      subjectName: "แพทย์ศาสตร์",
      link: "/subject/ms",
      img: images.subj_7,
    },
    {
      subjectName: "ศึกษาศาสตร์",
      link: "/subject/ed",
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
    getValue(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

  var i, j;
  var t = " ";
  var arrayTag = [];
  function tagData() {
    datas.map((dataTag) => {
      for (i = 0; i < dataTag.listTag.length; i++) {
        if (dataTag.listTag[i] !== " ") {
          t = t + " " + dataTag.listTag[i];
        }
      }
      arrayTag = t.split(" ");
    });
    return arrayTag;
  }
  {
    tagData();
  }

  const count = {}
  arrayTag.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

  var key = [];
  var sumTag = [];
  key = Object.keys(count)
  sumTag = Object.values(count)
  var tags = []
  var tagSelect = []

  for (j = 0; j < key.length; j++) {
    tags[j] = { label: key[j], value: sumTag[j] };
    tagSelect[j] = { value: j, label: key[j]};
  }

  tags.shift()
  tagSelect.shift()

  var [valueTag, getValueTag] = useState([]);
  var handle = (e) => {
    getValueTag(Array.isArray(e) ? e.map(x => x.label) : []);
    
  }
  console.log(valueTag)
  var newArray = datas.filter(function (ele) {
    var i, j, count = 0, count2 = 0;
    var numDB = ele.listTag.length;
    var numFilter = valueTag.length;

    for (i=0; i<numFilter; i++){
      for (j=0; j<numDB; j++){
        if (valueTag[i] == ele.listTag[j]){
          count += 1
        }
      }
    }
    if (count > 0){
      if (count == numDB){
        count2 += 1
        return ele.listTag
      }
      if (count != 0 && count2 == 0) {
        return ele.listTag
      }  
    }
    if (numFilter == 0){
      return newArray = datas
    }
    count = 0
    // count2 = 0
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
            <div style={theme.FONTS.home4}>{subject.subjectName}</div>
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
            <NavLink className="question-card-username" to={`/profile/${user.userID}`}>
              {/* <img
                class="user-image-small"
                src={user.imgURL ? user.imgURL : images.pic_profile}
              /> */}
              {user.imgURL ? (
                <Avatar size="20" src={user.imgURL} round={true} />
              ) : (
                <Avatar
                  size="20"
                  name={user.firstName + " " + user.lastName}
                  round={true}
                />
              )}
              <div class="user-name-small ms-1" style={{fontFamily: "supermarket", fontSize: 14, lineHeight:1.4, color:"gray"}}>
                {user.firstName ? user.firstName + " " + user.lastName : ""}
              </div>
            </NavLink>
          </Card.Subtitle>

          <Form>
            <Form.Group>
              <Form.Control
                style={theme.FONTS.filter}
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
      <Card style={{ marginBottom: 10 }} className="shadow">
        <Card.Body>
          <Card.Text className="card-title" style={theme.FONTS.home2}>
            ประชาสัมพันธ์ร่วมกิจกรรม "ThaiEggHead CS385 Meetup 2025"
          </Card.Text>
          <Card.Text className="card-subtitle" style={theme.FONTS.home4}>
            สมัครเข้าร่วมได้ตั้งแต่วันที่ 18-25 มิถุนายน
          </Card.Text>
          <Button
            variant="primary"
            className="btn-learnmore"
            style={theme.FONTS.body4}
            onClick={addToast}
          >
            ดูข้อมูลเพิ่มเติม
          </Button>
          <Button className="btn-close btn-close2" onClick={() => setIsShowAnounce(!isShowAnounce)}></Button>
          <br/>
          <img
              src={images.logo_event}
              height="100"
              width="100"
              className="event-img"
            />
        </Card.Body>
      </Card>
    );
  };

  const RelateQuestion = () => {
    return (
      <Card style={theme.FONTS.filter}>
        <Card.Header>คำถามมาแรง 🔥</Card.Header>
        <Card.Body>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a id="relate-question" onClick={addToast}>
              เชื้อราดำใน Chernobyl
              อาจสามารถปกป้องนักบินอวกาศจากรังสีมรณะบนดาวอังคารได้ไหม
            </a>
            <a id="relate-question" onClick={addToast}>
              อะไรที่สามารถนำมาทำผัดกะเพรานอกเหนือเนื้อสัตว์ปกติได้อีกมั้ย?
            </a>
            <a id="relate-question">กระจกรถยนต์หลุดจากกิ๊บหนีบแก้ปัญหายังไง</a>
            <a id="relate-question" onClick={addToast}>
              ผู้หญิงจะเพอร์เฟคและมีเสน่ห์ที่สุดช่วงอายุเท่าไหร่?
            </a>
            <a id="relate-question" onClick={addToast}>
              ถ้าเราแนะนำเพื่อนให้ไปกู้ถือว่าผิดไหม</a>
          </div>

          <br />
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)}/>
      <body style={{ backgroundColor: "#F3F3F3", minHeight:200 }} >
        <br />
        <br />
        <Container fluid="xl">
          <Row xs={1} md={3}>
            <Col md="auto" className="justify-content-md-center">
              <h5 style={{fontFamily: "Krub-Regular", fontSize: 17, textAlign:"center",fontWeight: "bold"}}>
                สาขาวิชา
              </h5>
              <LeftNavigate data={subjectNavigate} />
            </Col>

            <Col md={6}>
              {isShowAnounce ? <AnouncingCard /> : <></>}

              <UserQuestionCard />
                          
              {newArray.map((forum) => {
                if(newArray.length!=0){
                  console.log(newArray.length);
                  return(<ForumCard data={forum} isAuthenticated={isAuthenticated}></ForumCard>)
                }
                  
                else{
                  console.log("qsdqsd");
                  return(
                    <div class="bp3-non-ideal-state" style={theme.FONTS.filter}>
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

              {/* {newArray.map((forum) => (
                <ForumCard data={forum} isAuthenticated={isAuthenticated}></ForumCard>
              ))} */}
            </Col>

            <Col md={3} style={{paddingRight:50}}>
              <Card style={theme.FONTS.filter}>
                <Card.Header>คัดกรอง Tags</Card.Header>
                <Card.Body>
                  <div>
                  <Select isMulti options={tagSelect} onChange={handle}></Select>
                  </div>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Header className="card-header" style={theme.FONTS.filter}>
                  Tags ทั้งหมด 
                </Card.Header>  
                <Card.Body style={theme.FONTS.tag}>
                  <div >
                    {tags.map(item => {
                      return (
                        <div>
                          <Button style={theme.FONTS.tag1} variant="outline-warning" className="app-fontSizeTag">{item.label}</Button>{"  x "}{item.value}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
              <br />
              <RelateQuestion />
            </Col>
          </Row>
        </Container>
      </body>
    </div>
  );
}

export default Home;
