import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Card, Container, ListGroup, Form } from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch, Router} from 'react-router-dom'
import { images } from '../constants';
import React, { Component, useState } from 'react';

function App() {
  const [datas, setdatas] = useState({})
  const [comp, setcomp] = useState("คอมพิวเตอร์")

  const test = () => {
    fetch('http://localhost:5000/forums')
    .then(response => response.json())
    .then(data => setdatas(data))
    /*.then(() => {console.log(datas)})*/
  };

  /*const test2 = () => {
    return (
      <div>
        {datas.map((subject) => (
          <div>
            {subject.title}
          </div>
        ))}
      </div>
    )
  }*/

  const test2 = () => {
    return (
      <div>
        {datas.map((subject) => (
         
          <div>
              <Card >
                <Row>
                  <Col xs={2} className="app-profile" ><img src={images.pro_2} height="30" width="30" className="app-cycle"/><p/>Urisa</Col>
                  <Col xs={9} className="app-paddingContent">
                    <Card.Title >{subject.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> {subject.postText}</Card.Subtitle>
                  </Col>
                </Row>
              </Card>
              <p/>
          </div>    
           
        ))}
      </div>
    )
  }

  return (
    <div>
      <button onClick={test}>request</button>
      <div>{console.log(datas)}</div>
      <body style={{backgroundColor: "#F3F3F3"}}>
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <BrowserRouter>
            <nav>
              <ul className="app-removeDot">
                <li><Link to='/subject/sci'><img src={images.subj_1} height="23" width="23" className="app-cycle" /> Sciences</Link></li>
                <li><Link to='/subject/law'><img src={images.subj_2} height="23" width="23" className="app-cycle"/> Law</Link></li>
                <li><Link to='/subject/sa'><img src={images.subj_3} height="23" width="23" className="app-cycle"/> Social Administration</Link></li>
                <li><Link to='/subject/ps'><img src={images.subj_4} height="23" width="23" className="app-cycle"/> Political Science</Link></li>
                <li><Link to='/subject/eg'><img src={images.subj_5} height="23" width="23" className="app-cycle"/> Engineering</Link></li>
                <li><Link to='/subject/ca'><img src={images.subj_6} height="23" width="23" className="app-cycle"/> Communication Arts</Link></li>
                <li><Link to='/subject/sw'><img src={images.subj_7} height="23" width="23" className="app-cycle"/> Social Work</Link></li>
                <li><Link to='/subject/ed'><img src={images.subj_8} height="23" width="23" className="app-cycle"/> Education</Link></li>
                <li><Link to='/subject/caa'><img src={images.subj_9} height="23" width="23" className="app-cycle"/> Commerce and <br/> Accountancy</Link></li>
                <li><Link to='/subject/faa'><img src={images.subj_10} height="23" width="23" className="app-cycle"/> Fine and Applied Arts</Link></li>
                <li><Link to='/subject/art'><img src={images.subj_11} height="23" width="23" className="app-cycle"/> Arts</Link></li>
                <li><Link to='/subject/psyc'><img src={images.subj_12} height="23" width="23" className="app-cycle"/> Psychology</Link></li>
                <Link to={{ pathname: '/Subject'}}>test</Link>
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
        
              {(datas && datas.length>0)?
                test2()
                : <p>wait</p>
              }
            
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
