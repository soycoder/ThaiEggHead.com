import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Card, Container, ListGroup, Form } from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import { images } from '../constants';

function App() {
  return (
    <div>
      <body style={{backgroundColor: "#F3F3F3"}}>
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <BrowserRouter>
            <nav>
              <ul>
                <li><Link to='' ><img src={images.subj_1} height="23" width="23" className="app-cycle" /> Sciences</Link></li>
                <li><Link to=''><img src={images.subj_2} height="23" width="23" className="app-cycle"/> Law</Link></li>
                <li><Link to=''><img src={images.subj_3} height="23" width="23" className="app-cycle"/> Social Administration</Link></li>
                <li><Link to=''><img src={images.subj_4} height="23" width="23" className="app-cycle"/> Political Science</Link></li>
                <li><Link to=''><img src={images.subj_5} height="23" width="23" className="app-cycle"/> Engineering</Link></li>
                <li><Link to=''><img src={images.subj_6} height="23" width="23" className="app-cycle"/> Communication Arts</Link></li>
                <li><Link to=''><img src={images.subj_7} height="23" width="23" className="app-cycle"/> Social Work</Link></li>
                <li><Link to=''><img src={images.subj_8} height="23" width="23" className="app-cycle"/> Education</Link></li>
                <li><Link to=''><img src={images.subj_9} height="23" width="23" className="app-cycle"/> Commerce and <br/> Accountancy</Link></li>
                <li><Link to=''><img src={images.subj_10} height="23" width="23" className="app-cycle"/> Fine and Applied Arts</Link></li>
                <li><Link to=''><img src={images.subj_11} height="23" width="23" className="app-cycle"/> Arts</Link></li>
                <li><Link to=''><img src={images.subj_12} height="23" width="23" className="app-cycle"/> Psychology</Link></li>
              </ul>
            </nav>
            <Switch>

            </Switch>
            </BrowserRouter>
          </Col>

          <Col xs={7}>
            <Card className="app-padding">
              <Card.Subtitle className="mb-2 text-muted"><img src={images.pro_1} height="30" width="30" className="app-cycle"/> pop fever</Card.Subtitle>
              <Form>
                <Form.Group>
                  <Form.Control placeholder= "คุณกำลังติดปัญหาอะไรรึเปล่า ? ถามมาสิ" />
                </Form.Group>
              </Form>
            </Card>
            <p/>
            <Card className="app-padding">
              <Card.Title><img src={images.pro_2} height="30" width="30" className="app-cycle"/> Compile error: Multiple definitions in int main</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">ฉันกำลังทำการบ้านและได้รับข้อผิดพลาดนี้ในเว็บไซต์ทดสอบของอาจารย์: /tmp/ccNzBwVD,o; ในฟัง์ชัน 'factorial (int)';myFunctions.cpp:(, text + 0x0); คำจำกัดความหลายคำ ...</Card.Subtitle>
            </Card>
            <p/>
            <Card className="app-padding">
              <Card.Title><img src={images.pro_3} height="30" width="30" className="app-cycle"/> หากคุณสร้างภาษาใหม่และต้องการเขียนคอมไพเลอร์ในภาษาเดียวกัน (เช่น C, Go และ Rust) คุณจะรวบรวมคอมไพเลอร์เป็นครั้งแรกโดยไม่มีคอมไพเลอร์ ได้อย่างไร?</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">ฉันกำลังทำการบ้านและได้รับข้อผิดพลาดนี้ในเว็บไซต์ทดสอบของอาจารย์: /tmp/ccNzBwVD,o; ในฟัง์ชัน 'factorial (int)';myFunctions.cpp:(, text + 0x0); คำจำกัดความหลายคำ ...</Card.Subtitle>
              <img src={images.bina}/>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '13rem' }}>
              <Card.Header>Custom Filter</Card.Header>
              <Card.Body>
                <Card.Link href="#">Create a custom filter</Card.Link>
              </Card.Body>
            </Card>
            <br />
            <Card style={{ width: '13rem' }}>
              <Card.Header>
                Watched Tags
                <Card.Link href="#">Edit</Card.Link>
              </Card.Header>
              <Card.Body>
                
              </Card.Body>
            </Card>
            <br />
            <Card style={{ width: '13rem' }}>
              <Card.Header>Ignored Tags</Card.Header>
              <Card.Body>
                <Card.Link href="#">Add an ignored tag</Card.Link>
              </Card.Body>
            </Card>
            <br />
            <Card style={{ width: '13rem' }}>
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

export default App;
