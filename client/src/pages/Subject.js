import "../App.css";
import { images } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  ListGroup,
  Button
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState,} from "react";
import ForumCard from "../components/ForumCard";
import Select from "react-select"
import { Keys } from "@blueprintjs/core";

function Sub() {
  let { subject } = useParams();
  // const buttonn = <button>create a custom Filter</button>;
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/forums?subject=${subject}`)
      .then((res) => res.json())
      .then((res) => setForumData(res));
  }, []);

  var t = " "
  var i, j
  var arrayTag = []
  var filledArray = []

  function tagData (){
    forumData.map((dataTag) =>
      // console.log(dataTag.listTag[0])
      // t = dataTag.listTag[0]

      {
        for (i=0; i<dataTag.listTag.length; i++){
          if(dataTag.listTag[i] !== " "){
            t = t +" "+ dataTag.listTag[i]
          }
      }
        arrayTag = t.split(" ")
        // const count = {}
        // const result = []
        // arrayTag.forEach(item =>{
        //   if (count[item]) {
        //     count[item] +=1
        //     return
        //   }
        //   count[item] = 1
        // })

        // for (let prop in count){
        //   if (count[prop] >=2){
        //     result.push(prop)
        //   }
        // }
        // console.log(count)

//////////////////////////////////////////
        // let unique = [];
        // arrayTag.forEach(element => {
        //   if (!unique.includes(element)){
        //       unique.push(element)
        //   }
        // })

        // for (j=0; j<unique.length; j++){
        //   filledArray[j] = {id: j, name: unique[j]};
          
        // }
        // const count = {}
        // arrayTag.forEach(function(i) { count[i] = (count[i]||0) + 1;});
        // console.log(count);

        // console.log(arrayTag)
      }
    )
    return(
      // filledArray
      arrayTag
    )
  }
  {tagData()}
  // console.log(arrayTag)

  const count = {}
  arrayTag.forEach(function(i) { count[i] = (count[i]||0) + 1;});
  console.log(count);

  // let unique = [];
  //   arrayTag.forEach(element => {
  //     if (!unique.includes(element)){
  //         unique.push(element)
  //       }
  //     })

  // for (j=0; j<unique.length; j++){
  //     filledArray[j] = unique[j]; 
  // }
  // console.log(filledArray)

  var key = [];
  var sumTag = [];
  key = Object.keys(count)
  sumTag = Object.values(count)
  console.log(key)
  console.log(sumTag)

  for (j=0; j<key.length; j++){
    key[j] = {name: key[j], num: sumTag[j]};
  }
  console.log(key)
  // var ll = ""
  // ll = filledArray[1].toString()
  // console.log(ll)
  // console.log(count.ll);


  var [tag, setTag] = useState("");
  const [value, getValue]=useState([]);
   console.log(tag)
  var newArray = forumData.filter(function(ele){
    var i, j;
    var n = ele.listTag.length;
    var nn = value.length;
    // console.log(tag, value)
    // console.log(nn);
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
                <Card.Body>                
                  <div>
                    {key.map(item => {
                      // console.log(filledArray)
                      return (
                        <div>
                          <Button variant="outline-info">{item.name}</Button>{" x "}{item.num}
                        </div>
                      )
                    })}           
                  </div>
                </Card.Body>
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
