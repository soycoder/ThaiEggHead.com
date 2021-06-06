import "../App.css";
import { images, FONTS } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  ListGroup,
  Button,
  Tooltip,
  OverlayTrigger,
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

  const SubjectData = new Map();
  SubjectData.set("sci", [
    "วิทยาศาสตร์ และเทคโนโลยี",
    "Science and Technology",
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
  key = Object.keys(count);
  sumTag = Object.values(count);
  console.log(key);
  console.log(sumTag);

  for (j = 0; j < key.length; j++) {
    // if (key[j] != "") {
    key[j] = { name: key[j], num: sumTag[j] };
    // }
  }

  key.shift();
  console.log(key);

  var [tag, setTag] = useState("");
  const [value, getValue] = useState([]);
  console.log(tag);
  var newArray = forumData.filter(function (ele) {
    var i, j;
    var n = ele.listTag.length;
    var nn = value.length;
    // console.log(tag, value)
    // console.log(nn);
    for (i = 0; i <= nn; i++) {
      for (j = 0; j < n; j++) {
        // console.log(n);
        if (nn != 0) {
          tag = value[i];
        }
        console.log(tag);
        if (ele.listTag[j] === tag) {
          return ele.listTag;
        } else if (tag === "") {
          return (newArray = forumData);
        }
      }
    }
  });
  console.log(newArray);

  const Tag = [
    { name: "Art", tagID: "Art" },
    { name: "Database", tagID: "Database" },
    { name: "Science", tagID: "Scienceact" },
    { name: "Law", tagID: "Law" },
  ];

  const [optionTag, setOptionTag] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/forums/tag`)
      .then((res) => res.json())
      .then((res) => {
        let array = Tag.concat(res);
        let options = array.map((d) => ({
          value: d.tagID,
          label: d.name,
        }));
        // console.log(options);
        setOptionTag(options);
      });
  }, []);

  var handle = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

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
              className="subject-img"
              src={images.subj_1}
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
                Follow 123K
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
            {key.map((item) => {
              // console.log(filledArray)
              return (
                <div>
                  <Button variant="outline-info" className="app-fontSizeTag">
                    {item.name}
                  </Button>
                  {" x "}
                  {item.num}
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
              <Card.Header className="fontETC" style={{ textAlign: 'center', backgroundColor: "#ffe529", color: "#212529" }}>Leader Board</Card.Header>
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

          <Col md={2}>
            {/* <AboutSubjectCard/> */}
            <Card >
              <Card.Header style={theme.FONTS.filter}>คัดกรอง Tags</Card.Header>
              <Card.Body>
                <div>
                  <Select
                    isMulti
                    options={optionTag}
                    onChange={handle}
                  ></Select>
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
