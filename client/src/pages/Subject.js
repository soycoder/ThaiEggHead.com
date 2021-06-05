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
import React, { useEffect, useState, } from "react";
import ForumCard from "../components/ForumCard";
import Select from "react-select"
import { Button as Button2 } from "@blueprintjs/core";
import Avatar from 'react-avatar';
import LeaderBoard from '../components/LeaderBoard';
import Moment from 'react-moment';

import { theme } from "../constants";

function Sub() {
  let { subject } = useParams();
  // const buttonn = <button>create a custom Filter</button>;
  const [forumData, setForumData] = useState([]);

  const SubjectData = new Map();
  SubjectData.set("sci", ["วิทยาศาสตร์ และเทคโนโลยี", "Science and Technology"])


  useEffect(() => {
    fetch(`http://localhost:5000/forums?subject=${subject}`)
      .then((res) => res.json())
      .then((res) => setForumData(res));
  }, []);

  var t = " "
  var i, j
  var arrayTag = []
  var filledArray = []

  function tagData() {
    forumData.map((dataTag) => {
      for (i = 0; i < dataTag.listTag.length; i++) {
        if (dataTag.listTag[i] != " ") {
          t = t + " " + dataTag.listTag[i]
        }
      }
      arrayTag = t.split(" ")
      console.log(arrayTag)
    }
    )
    return (
      arrayTag
    )
  }
  { tagData() }

  const count = {}
  arrayTag.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
  console.log(count);

  var key = [];
  var sumTag = [];
  key = Object.keys(count)
  sumTag = Object.values(count)
  console.log(key)
  console.log(sumTag)

  for (j = 0; j < key.length; j++) {
    // if (key[j] != "") {
    key[j] = { name: key[j], num: sumTag[j] };
    // }

  }

  key.shift()
  console.log(key)

  var [tag, setTag] = useState("");
  const [value, getValue] = useState([]);
  console.log(tag)
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
          tag = value[i]
        }
        console.log(tag);
        if (ele.listTag[j] === tag) {
          return ele.listTag;
        }
        else if (tag === "") {
          return newArray = forumData;
        }
      }
    }
  });
  console.log(newArray)

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
    getValue(Array.isArray(e) ? e.map(x => x.label) : []);
  }

  const HeaderImage = () => {
    return (
      <img className="subject-img-bg" src="http://trumpwallpapers.com/wp-content/uploads/Science-Wallpaper-42-1920x1080-1.jpg" />
    )
  }

  const SubjectHeaderCard = () => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Body>
          <div className="subject-header">
            <Avatar className="subject-img" size="100" round={false} style={{marginRight:20}} />
            <div style={{marginLeft:20}} >
              <h2 style={theme.FONTS.h2}>{SubjectData.get(subject)[0]}</h2>
              <h5 style={theme.FONTS.h5}>{SubjectData.get(subject)[1]}</h5>
            <Avatar className="subject-img" size="100" round={false} style={{ marginRight: 20 }} />
            <div style={{ marginLeft: 20 }}>
              <h2 style={theme.FONTS.h1}>{SubjectData.get(subject)[0]}</h2>
              <h5>{SubjectData.get(subject)[1]}</h5>
              <Button2 className="bp3-minimal bp3-intent-primary bp3-outlined" id="follow" icon="add-to-artifact">
                Follow 123K
                </Button2>
            </div>

          </div>
        </Card.Body>
      </Card>
    )
  }

  const AboutSubjectCard = () => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Body>
          <div className="subject-header">
            <Avatar className="subject-img" size="100" round={false} style={{marginRight:20}} />
            <div style={{marginLeft:20}}>
              <h2 style={theme.FONTS.h2}>{SubjectData.get(subject)[0]}</h2>
              <h5 style={theme.FONTS.h5}>{SubjectData.get(subject)[1]}</h5>
            <Avatar className="subject-img" size="100" round={false} style={{ marginRight: 20 }} />
            <div style={{ marginLeft: 20 }}>
              <h2>{SubjectData.get(subject)[0]}</h2>
              <h5>{SubjectData.get(subject)[1]}</h5>
              <Button2 className="bp3-minimal bp3-intent-primary bp3-outlined" id="follow" icon="add-to-artifact">
                Follow 123K
                </Button2>
            </div>

          </div>
        </Card.Body>
      </Card>
    )
  }

  const TagSum = () => {
    return(
      <Card style={{ width: "13rem" }} style={theme.FONTS.filter}>
    return (
      <Card >
        <Card.Header>
          Watched Tags
            <Card.Link href="#">Edit</Card.Link>
        </Card.Header>
        <Card.Body>
          <div>
            {key.map(item => {
              // console.log(filledArray)
              return (
                <div>
                  <Button variant="outline-info" className="app-fontSizeTag">{item.name}</Button>{" x "}{item.num}
                </div>
              )
            })}
          </div>
        </Card.Body>
      </Card>
    )
  }

  const SpaceRec = () => {
    return (
      <Card>
      <ListGroup variant="flush" style={theme.FONTS.Spacesfollow}>
          <ListGroup.Item style={theme.FONTS.filter}>Spaces to follow</ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }
  // console.log(value);
  return (
    <div>
      <HeaderImage />

      <Container fluid="xl">

        <Row className="justify-content-md-center">

          <Col md={3}>

          <Card>
            <Card.Header className="fontETC" style={{ textAlign: 'center', backgroundColor: "#ffe529", color: "#212529"}}>Leader Board</Card.Header>
            <Card.Body>
              <div className="fontETC">
                <LeaderBoard />
              </div>
            </Card.Body>
            <Card.Footer className="fontETC" style={{ textAlign: 'center', color: "white", backgroundColor: "#494c4f" }}>Latest Update : <Moment format="DD/MM/YYYY" /></Card.Footer>
         </Card>
          
            <Card>
              <Card.Header style={{ textAlign: 'center', backgroundColor: "#ffe529", color: "#212529" }}>Leader Board</Card.Header>
              <Card.Body>
                <div className="leader">
                  <LeaderBoard />
                </div>

              </Card.Body>
              <Card.Footer style={{ textAlign: 'center', color: "white", backgroundColor: "#494c4f" }}>Latest Update : <Moment format="DD/MM/YYYY" /></Card.Footer>
            </Card>

          </Col>

          <Col md={6}>
            <SubjectHeaderCard />
            {newArray.map((forum) => (
              <ForumCard data={forum}></ForumCard>
            ))}

          </Col>

          <Col md={2}>
            {/* <AboutSubjectCard/> */}
            <Card>
              <Card.Header>Custom Filter</Card.Header>
              <Card.Body>
                <div >
                  <Select isMulti options={optionTag} onChange={handle}></Select>
                </div>
              </Card.Body>
            </Card>
            <TagSum />
            {/* <IgnoreTag /> */}
            <SpaceRec />
          </Col>
        </Row>
      </Container>
    </div>

  );

  const old = () => {
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
                        style={{ width: "15rem" }}
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
              {newArray.map((forum) => (
                <ForumCard data={forum}></ForumCard>
              ))}
              {/* {Tag()} */}
            </Col>

            <Col>
              <Card style={{ width: "15rem" }}>
                <Card.Header>Custom Filter</Card.Header>
                <Card.Body>
                  <Card.Link href="#">Create a custom filter</Card.Link>
                  <form>
                    {/* <input name="tag" id="tag" /> */}
                    <input
                      type="tag"
                      onChange={e => setTag(e.target.value)}
                      placeholder="Enter tag"
                    />
                  </form>
                  <br />
                  <div >
                    <Select isMulti options={optionTag} onChange={handle}></Select>
                  </div>

                </Card.Body>
              </Card>
              <br />
              <Card style={{ width: "15rem" }}>
                <Card.Header>
                  Watched Tags
                    <Card.Link href="#">Edit</Card.Link>
                </Card.Header>
                <Card.Body>
                  <div>
                    {key.map(item => {
                      // console.log(filledArray)
                      return (
                        <div>
                          <Button variant="outline-info" className="app-fontSizeTag">{item.name}</Button>{" x "}{item.num}
                        </div>
                      )
                    })}
                  </div>
                </Card.Body>
              </Card>
              <br />
              <Card style={{ width: "15rem" }}>
                <Card.Header>Ignored Tags</Card.Header>
                <Card.Body>
                  <Card.Link href="#">Add an ignored tag</Card.Link>
                </Card.Body>
              </Card>
              <br />
              <Card style={{ width: "15rem" }}>
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
  }
}
export default Sub;


