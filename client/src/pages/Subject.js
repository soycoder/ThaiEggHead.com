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
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ForumCard from "../components/ForumCard";
import Select from "react-select";
import { Button as Button2 } from "@blueprintjs/core";
import Avatar from "react-avatar";
import LeaderBoard from "../components/LeaderBoard";
import Moment from "react-moment";

import { theme } from "../constants";

function Sub({isAuthenticated}) {
  let { subject } = useParams();
  // const buttonn = <button>create a custom Filter</button>;
  const [forumData, setForumData] = useState([]);

  const subjectImages = [images.subj_1,images.subj_2,images.subj_3,images.subj_4,images.subj_5,images.subj_6,images.subj_7,images.subj_8,images.subj_9,images.subj_10,images.subj_11,images.subj_12]

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
    "ocial Administration",
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
    "แพทย์ศาสตร์",
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


  useEffect(() => {
    fetch(`http://localhost:5000/forums?subject=${SubjectData.get(subject)[0]}`)
      .then((res) => res.json())
      .then((res) => setForumData(res));
  }, []);

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

  for (j = 0; j < key.length; j++) {
    // if (key[j] != "") {
    tags[j] = { label: key[j], value: sumTag[j] };
    // }
  }

  tags.shift()
  // console.log(key)

  var [valueTag, getValueTag] = useState([]);
  var handle = (e) => {
    getValueTag(Array.isArray(e) ? e.map(x => x.label) : []);
  }

  var [tag, setTag] = useState("");
  // console.log(tag)
  // console.log(valueTag)
  var newArray = forumData.filter(function (ele) {
  var i, j;
  var n = ele.listTag.length;
  var nn = valueTag.length;
    console.log(n)

      for (j = 0; j < nn; j++) {
        for (i=0; i<n; i++){
          if (ele.listTag[i] == valueTag[j]) {
 
              return ele.listTag; 
  
          } 
        }
    }
    if (nn == 0) {
      return newArray = forumData;
    }
  });

  console.log(newArray)


  const HeaderImage = () => {
    return (
      <img
        className="subject-img-bg"
        src="http://trumpwallpapers.com/wp-content/uploads/Science-Wallpaper-42-1920x1080-1.jpg"
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


  const RelateQuestion = () => {
    return (
      <Card style={{}}>
        <Card.Header>คำถามมาแรง 🔥</Card.Header>
        <Card.Body>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a id="relate-question">
              เชื้อราดำใน Chernobyl
              อาจสามารถปกป้องนักบินอวกาศจากรังสีมรณะบนดาวอังคารได้ไหม
            </a>
            <a id="relate-question">
              อะไรที่สามารถนำมาทำผัดกะเพรานอกเหนือเนื้อสัตว์ปกติได้อีกมั้ย?
            </a>
            <a id="relate-question">กระจกรถยนต์หลุดจากกิ๊บหนีบแก้ปัญหายังไง</a>
            <a id="relate-question">
              ผู้หญิงจะเพอร์เฟคและมีเสน่ห์ที่สุดช่วงอายุเท่าไหร่?
            </a>
            <a id="relate-question">ถ้าเราแนะนำเพื่อนให้ไปกู้ถือว่าผิดไหม</a>
          </div>

          <br />
        </Card.Body>
      </Card>
    );
  };

  // console.log(value);
  return (
    <div>
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
          </Col>

          <Col md={6}>
            <SubjectHeaderCard />
            {newArray.map((forum) => (
              <ForumCard data={forum} isAuthenticated={isAuthenticated}></ForumCard>
            ))}
          </Col>

          <Col md={3} style={{paddingRight:40}}>
            {/* <AboutSubjectCard/> */}
            <Card >
              <Card.Header style={theme.FONTS.filter}>คัดกรอง Tags</Card.Header>
              <Card.Body>
                <div>
                <Select isMulti options={tags} onChange={handle}></Select>
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
