import "../App.css";
import { images } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Card,
  Container,
  Badge,
  Button,
  Spinner
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState,} from "react";
import ForumCard from "../components/ForumCard";
import Select from "react-select"
import { Keys } from "@blueprintjs/core";
import { theme } from "../constants";

function QuestionPage({isAuthenticated}) {
  let { question } = useParams();
  const [forumData, setForumData] = useState(null);

  useEffect(() => {
      fetch(`http://localhost:5000/forums/${question}`)
        .then((res) => res.json())
        .then((res) => setForumData(res));
          console.log("123")
    }, []);

  const ListSubjectTag = (props) => {
    const list = props.data;
    const subjectTag = list.map((subject) => (
      <Button variant="outline-info" id="question-subject-tag">
         {subject}
      </Button>
    ));
    return <div className="tag" style={theme.FONTS.tag}>{subjectTag}</div>;
  };

  const ListTag = (props) => {
    const list = props.data;
    const subjectTag = list.map((subject) => (
        <Button variant="outline-secondary" id="question-tag">
          {subject}
        </Button>
      )
      // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
    );
    return <div className="tag" style={theme.FONTS.subject}>{subjectTag}</div>;
  };
  
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

            {/* {forumData ? (
              <>
                <ListSubjectTag data={forumData.listSubject}/>
                <ListTag data={forumData.listTag}/>
              </>
            ):(
            <Spinner animation="border"></Spinner>
            )} */}

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