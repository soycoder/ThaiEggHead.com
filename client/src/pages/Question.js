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

function Question() {
    let { question } = useParams();
    const [forumData, setForumData] = useState([]);
    var oneForum = []

    useEffect(() => {
        fetch(`http://localhost:5000/forums/=${question}`)
          .then((res) => res.json())
          .then((res) => setForumData(res));
          
      }, []);

    // console.log(question)

    // oneForum[0] = forumData[12]
    // console.log(oneForum)
    console.log(forumData)

    return (
    <div className="App">
        <body>
        <br />
        <Container>
          <Row>
            {/* <Col></Col> */}
            <Col xs lg="8">
                <ForumCard data={forumData} isReadLong={true}></ForumCard>
            </Col>
            <Col >
            
            <Card style={{ width: "13rem" }}>
                <Card.Header>Custom Filter</Card.Header>
                <Card.Body>
                  <Card.Link href="#">Create a custom filter</Card.Link>
      
                  <br />
                </Card.Body>
              </Card>
              <br />
              <Card style={{ width: "13rem" }}>
                <Card.Header>
                  Watched Tags
                <Card.Link href="#">Edit</Card.Link>
                </Card.Header>
                <Card.Body>                
 
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
export default Question;