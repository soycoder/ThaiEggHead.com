import React, { useState } from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { Button } from "@blueprintjs/core";


import { Card, Container, Modal } from "react-bootstrap";

function CreateForum () {
  const [title, showTitle] = useState(null);
  const [body, showBody] = useState(null);
  const [tag, showtag] = useState(null);
  const [subject, showsubject] = useState(null);
  const [show, setShow] = useState(false);
  const [save, setSave] = useState(false);
  const [submit, setSubmit] = useState(false);
  
  const toggleChecked = () => setSubmit(value => !value);

  function getDataTitle(title){
    showTitle(title.target.value)
    console.log("Title : "+title.target.value)
  }
  const handleChange = (e, editor) => {
    const body = editor.getData();
    showBody(body);
    console.log("Body : "+body)
  }

  function getDataTag(tag){
    showtag(tag.target.value)
    console.log("Tag : "+tag.target.value)
  }
  function getDataSub(subject){
    showsubject(subject.target.value)
    console.log("Subject : "+subject.target.value)
  }
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleCheckedss = () => {
    setSave(value => !value);
    handleClose();
  }
    return (
      <Container style={{ "margin-top": "20px" }}>
        <Card>
          <Card.Body>
            <Card.Title>Create Forum</Card.Title>

              <div className="form-group">
                <label>หัวข้อ</label>
                <h8 style={{ lineHeight: "90%" }}>
                  หัวข้อที่แสดงถึง เนื้อหา ใจความสำคัญ
                  ของปัญหาหรือข้อมูลที่ต้องการแสดง
                </h8>
                <br></br>
                <input type="text" name="name" style={{width: '600px'}} 
                  onChange={getDataTitle} 
                  style={{
                    width: "100%",
                    "font-size": "12px",
                    height: "25px",
                  }} />
              </div>

              <div className="form-group">
                <label>เนื้อหา</label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                  เนื้อหาแสดงถึง ข้อมูล หรือปัญหา
                  สาระของเรื่องที่ต้องการอธิบายเพื่อให้เกิดความเข้าใจ
                </h8>
                <CKEditor
                  editor={ClassicEditor}
                  onInit={(editor) => {}}
                  config={{
                    ckfinder: {
                      uploadUrl: "/upload",
                    },
                  }}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>

              <div className="form-group">
                <label>แท็ก</label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                  เพิ่มแท็กได้สูงสุด 5
                  แท็กเพื่ออธิบายว่าคำถามของคุณเกี่ยวกับอะไร
                </h8>
                <br></br>
                <input type="text" name="tag" style={{width: '600px'}} placeholder="ตัวอย่าง (Programing, Database, Law, Art)" onChange={getDataTag} 
                  style={{
                    width: "100%",
                    "font-size": "12px",
                    height: "25px",
                  }} 
                />
              </div>

              <div className="form-group">
                <label style={{ "font-size": "24px" }}>
                  สาขาวิชาที่เกี่ยวข้อง
                </label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                  เพิ่มแท็กได้สูงสุด 5 แท็กเป็นแท็กที่อธิบายเกี่ยวกับสาขาวิชา
                </h8>
                <br></br>
                <input type="text" name="subject" style={{width: '600px'}} placeholder="ตัวอย่าง (วิทยาการคอมพิวเตอร์, ศิลปกรรมศาสตร์, วิศวะกรรมศาสตร์)" onChange={getDataSub} 
                  style={{
                    width: "100%",
                    "font-size": "12px",
                    height: "25px",
                  }}
                />

              </div>

            <Button submit={submit} onClick={()=>toggleChecked(!submit)}>Submit</Button>
            <Button variant="primary" onClick={handleShow}>
              Preview
            </Button>

            
            {console.log("Submit "+submit)}

          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>ตัวอย่าง</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{title}</h4>
              <div dangerouslySetInnerHTML={{
                __html: body
                }}>
              </div>
            <h8>{tag}</h8>
            <br/> 
            <h8>{subject}</h8>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={toggleCheckedss} onChange={()=> toggleCheckedss(!save)}>
              Save
              {console.log("Save "+ save)}     
            </Button>
          </Modal.Footer>
        </Modal>
         
      </Container>
    );
  }


export default CreateForum;