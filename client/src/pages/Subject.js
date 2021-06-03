import "../App.css";
import { images } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  ListGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, } from "react";
import ForumCard from "../components/ForumCard";
import Select from "react-select"

function Sub() {
  let { subject } = useParams();
  // const buttonn = <button>create a custom Filter</button>;
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/forums?subject=${subject}`)
      .then((res) => res.json())
      .then((res) => setForumData(res));
  }, []);

  var [tag, setTag] = useState("");
  const [value, getValue]=useState([]);
  // console.log(forumData)
  var newArray = forumData.filter(function(ele){
    var i, j;
    var n = ele.listTag.length;
    var nn = value.length;
    console.log(tag, value)
    console.log(nn);
    for(i=0; i<=nn; i++){
      for(j=0; j<n; j++){
        // console.log(n);
        if(nn != 0){
          tag=value[i]
        }
        console.log(tag);
        if(ele.listTag[j] === tag){
          return ele.listTag;
        }
        else if (tag === ""){
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
    getValue(Array.isArray(e)?e.map(x=>x.label):[]);
    
  }
  // console.log(value);
  
  return (
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
                        style={{ width: "13rem" }}
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
              <Card style={{ width: "13rem" }}>
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
export default Sub;
