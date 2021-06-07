import "../App.css";
import { images } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
} from "react-bootstrap";
import { useParams, NavLink, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ForumCard from "../components/ForumCard";
import Select from "react-select";
import { Button as Button2 } from "@blueprintjs/core";
import Avatar from "react-avatar";
import LeaderBoard from "../components/LeaderBoard";
import { Position, Toaster, Intent } from "@blueprintjs/core";
import Moment from "react-moment";
import _ from 'lodash';

import { theme } from "../constants";

function Sub({isAuthenticated}) {
  let { subject } = useParams();
  // const buttonn = <button>create a custom Filter</button>;
  const [forumData, setForumData] = useState([]);
  const [isHasForum, setIsHasForum] = useState(true);

  const [toaster, setToaster] = useState([]);
  const loc = useLocation();

  function addToast() {
    toaster.show({ message: "Sorry! We are under constructed", intent: Intent.WARNING, icon: "warning-sign" });
  }

  const subjectImages = [
    images.subj_1,
    images.subj_2,
    images.subj_3,
    images.subj_4,
    images.subj_5,
    images.subj_6,
    images.subj_7,
    images.subj_8,
    images.subj_9,
    images.subj_10,
    images.subj_11,
    images.subj_12
  ]

  const subjectCover = [
    images.cover_1,
    images.cover_2,
    images.cover_3,
    images.cover_4,
    images.cover_5,
    images.cover_6,
    images.cover_7,
    images.cover_8,
    images.cover_9,
    images.cover_10,
    images.cover_11,
    images.cover_12
  ]

  const SubjectData = new Map();
  SubjectData.set("sci", [
    "วิทยาศาสตร์ และเทคโนโลยี",
    "Science and Technology",
    "0",
    "442K"
  ]);
  SubjectData.set("law", [
    "กฎหมาย",
    "Law",
    "1",
    "125K"
  ]);
  SubjectData.set("sa", [
    "สังคมสงเคราะห์",
    "Social Administration",
    "2",
    "112K"
  ]);
  SubjectData.set("ps", [
    "รัฐศาสตร์",
    "Political Science",
    "3",
    "310K"
  ]);
  SubjectData.set("eg", [
    "วิศวกรรมศาสตร์",
    "Engineering",
    "4",
    "321K"
  ]);
  SubjectData.set("ca", [
    "นิเทศศาสตร์",
    "Communication Arts",
    "5",
    "140K"
  ]);
  SubjectData.set("ms", [
    "แพทยศาสตร์",
    "Medical Science",
    "6",
    "242K"
  ]);
  SubjectData.set("ed", [
    "ศึกษาศาสตร์",
    "Education",
    "7",
    "133K"
  ]);
  SubjectData.set("cca", [
    "พาณิชยศาสตร์ และการบัญชี",
    "Commerce and Accountancy",
    "8",
    "110K"
  ]);
  SubjectData.set("faa", [
    "ศิลปกรรมศาสตร์",
    "Fine and Applied Arts",
    "9",
    "240K"
  ]);
  SubjectData.set("art", [
    "ศิลปะ",
    "Art",
    "10",
    "122K"
  ]);
  SubjectData.set("psyc", [
    "จิตวิทยา",
    "Psychology",
    "11",
    "140K"
  ]);

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
    setIsHasForum(true)
    fetch(`http://localhost:5000/forums?subject=${SubjectData.get(subject)[0]}`)
      .then((res) => res.json())
      .then((res) => {
        if(_.isEmpty(res))setIsHasForum(false)
        setForumData(res)
      })
      
  }, [loc]);

  var t = " ";
  var i, j;
  var arrayTag = [];
  var filledArray = [];

  function tagData() {
    forumData.map((dataTag) => {
      for (i = 0; i < dataTag.listTag.length; i++) {
        if (dataTag.listTag[i] != " ") {
          t = t + " " + dataTag.listTag[i];
        }
      }
      arrayTag = t.split(" ");
      console.log(arrayTag);
    });
    return arrayTag;
  }
  {
    tagData();
  }

  const count = {};
  arrayTag.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });
  console.log(count);

  var key = [];
  var sumTag = [];
  key = Object.keys(count)
  sumTag = Object.values(count)
  console.log(key)
  console.log(sumTag)
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

  var newArray = forumData.filter(function (ele) {
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
        return newArray = forumData
      }
      count = 0
  
    });
  
  console.log(newArray)

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
    return <ul className="ul-navsubject" style={{marginLeft:-20}}>{listSubject}</ul>;
  };

  const HeaderImage = () => {
    return (
      <img
        className="subject-img-bg"
        src={subjectCover[SubjectData.get(subject)[2]]}
      />
    );
  };

  const SubjectHeaderCard = () => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Body>
          <div className="subject-header">
            <img
              className="subject-img2"
              src={subjectImages[SubjectData.get(subject)[2]]}
              style={{ marginRight: 20 }}
            />
            <div style={{ marginLeft: 20 }}>
              <h2 style={theme.FONTS.title}>{SubjectData.get(subject)[0]}</h2>
              <h5 style={theme.FONTS.title2}>{SubjectData.get(subject)[1]}</h5>
              <Button2
                className="bp3-minimal bp3-intent-primary bp3-outlined"
                id="follow"
                icon="add-to-artifact"
                onClick={addToast}
              >
                Follow {SubjectData.get(subject)[3]}
              </Button2>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const AboutSubjectCard = () => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Body>
          <div className="subject-header">
            <Avatar
              className="subject-img"
              size="100"
              round={false}
              style={{ marginRight: 20 }}
            />
            <div style={{ marginLeft: 20 }}>
              <h2 style={theme.FONTS.h1}>{SubjectData.get(subject)[0]}</h2>
              <h5 style={theme.FONTS.h2}>{SubjectData.get(subject)[1]}</h5>
              <Button2
                className="bp3-minimal bp3-intent-primary bp3-outlined"
                id="follow"
                icon="add-to-artifact"
              >
                Follow 123K
              </Button2>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const TagSum = () => {
    return (
      <Card>
        <Card.Header>
          <div style={theme.FONTS.filter}>
          Tags ทั้งหมด
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            {tags.map(item => {
              // console.log(filledArray)
              return (
                <div>
                  <Button variant="outline-info" className="app-fontSizeTag">{item.label}</Button>{" x "}{item.value}
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
    );
  };

  const RenderForum = () => {
    if(isHasForum){
      return(
        <>
        {newArray.map((forum) =><ForumCard data={forum} isAuthenticated={isAuthenticated}/>)}
        </>
      )
      
    }else{
      return(
        <div class="bp3-non-ideal-state" style={theme.FONTS.filter}>
          <div class="bp3-non-ideal-state-visual">
            <span class="bp3-icon bp3-icon-folder-open"></span>
          </div>
          <h4 class="bp3-heading" style={{fontFamily: "Krub-Regular", fontSize: 22}}>ไม่มีคำถามที่คุณกำลังตามหา</h4>
          <div style={{fontFamily: "Krub-Regular", fontSize: 16}}>สร้างคำถามเองเลยสิ</div>
          <NavLink to="/create/forum" style={{fontFamily: "Krub-Regular", fontSize: 12}}>
            <Button
              variant="warning"
            >
              ตั้งคำถาม
            </Button>
          </NavLink>
        </div>
      )
    }
  }


  const RelateQuestion = () => {
    return (
      <Card style={{}}>
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
            <a id="relate-question" onClick={addToast}>กระจกรถยนต์หลุดจากกิ๊บหนีบแก้ปัญหายังไง</a>
            <a id="relate-question" onClick={addToast}>
              ผู้หญิงจะเพอร์เฟคและมีเสน่ห์ที่สุดช่วงอายุเท่าไหร่?
            </a>
            <a id="relate-question" onClick={addToast}>ถ้าเราแนะนำเพื่อนให้ไปกู้ถือว่าผิดไหม</a>
          </div>

          <br />
        </Card.Body>
      </Card>
    );
  };

  // console.log(value);
  return (
    <div>
      <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)}/>
      <HeaderImage />
      <Container fluid="xl">
        <Row className="justify-content-md-center">
          <Col md={3}>
            <Card className="fontETC">
              <Card.Header className="fontETC" style={{ textAlign: 'center', backgroundColor: "#ffe529", color: "#212529", fontWeight: "bold" }}>Best Egg Head</Card.Header>
              <Card.Body>
                <div className="fontETC">
                  <LeaderBoard />
                </div>
              </Card.Body>
              <Card.Footer
                className="fontETC"
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#494c4f",
                }}
              >
                Latest Update : <Moment format="DD/MM/YYYY" />
              </Card.Footer>
            </Card>
            <h5 style={{fontFamily: "Krub-Regular", fontSize: 17, textAlign:"center",fontWeight: "bold", marginTop:30}}>
                สาขาวิชา
              </h5>
            <LeftNavigate data={subjectNavigate}/>
          </Col>

          <Col md={6}>
            <SubjectHeaderCard />
            
            <RenderForum/>
            {/* {newArray.map((forum) => {
                if(isHasForum){
                  return(<ForumCard data={forum} isAuthenticated={isAuthenticated}></ForumCard>)
                }
                  
                else{
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
                  
              
              })} */}

            {/* {newArray.map((forum) => (
              <ForumCard data={forum} isAuthenticated={isAuthenticated}></ForumCard>
            ))} */}
          </Col>

          <Col md={3} style={{paddingRight:40}}>
            {/* <AboutSubjectCard/> */}
            <Card >
              <Card.Header style={theme.FONTS.filter}>คัดกรอง Tags</Card.Header>
              <Card.Body>
                <div>
                <Select isMulti options={tagSelect} onChange={handle}></Select>
                </div>
              </Card.Body>
            </Card>
            <br />
            <TagSum />
            {/* <IgnoreTag /> */}
            <br />
            <RelateQuestion />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Sub;
