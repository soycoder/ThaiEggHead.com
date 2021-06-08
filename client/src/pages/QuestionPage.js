import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  Spinner
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState,} from "react";
import ForumCard from "../components/ForumCard";

function QuestionPage({isAuthenticated}) {
  let { question } = useParams();
  const [forumData, setForumData] = useState(null);

  useEffect(() => {
      fetch(`http://localhost:5000/forums/${question}`)
        .then((res) => res.json())
        .then((res) => setForumData(res));
    }, []);
  
  const RelateQuestion = () => {
    return(
      <Card style={{ }}>
        <Card.Header>คำถามที่เกี่ยวข้อง</Card.Header>
        <Card.Body>
          <div style={{display:"flex", flexDirection:"column"}}>
            <a id="relate-question">เชื้อราดำใน Chernobyl อาจสามารถปกป้องนักบินอวกาศจากรังสีมรณะบนดาวอังคารได้ไหม</a>
            <a id="relate-question">อะไรที่สามารถนำมาทำผัดกะเพรานอกเหนือเนื้อสัตว์ปกติได้อีกมั้ย?</a>
            <a id="relate-question">กระจกรถยนต์หลุดจากกิ๊บหนีบแก้ปัญหายังไง</a>
            <a id="relate-question">ผู้หญิงจะเพอร์เฟคและมีเสน่ห์ที่สุดช่วงอายุเท่าไหร่?</a>
            <a id="relate-question">ถ้าเราแนะนำเพื่อนให้ไปกู้ถือว่าผิดไหม</a>
          </div>
          <br />
        </Card.Body>
      </Card>
    )
  }
  
  return (
  <div className="App">
      <body style={{backgroundColor:"white"}}>
      <br />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            {forumData?(<ForumCard data={forumData} isReadLong={true} isAuthenticated={isAuthenticated}/>):(<Spinner animation="border"></Spinner>)}
          </Col>
          <Col md={3}>
            <RelateQuestion/>
          </Col>
        </Row>
      </Container>
      </body>
  </div>
  );
}

export default QuestionPage;