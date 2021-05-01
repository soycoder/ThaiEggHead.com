import React, { useState } from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Select from 'react-select'
import { Button } from "@blueprintjs/core";

import { Card, Container, Modal } from "react-bootstrap";

function CreateForum() {
  const [title, showTitle] = useState(null);
  const [body, showBody] = useState(null);
  const [tag, showTag] = useState(null);
  const [subject, showSubject] = useState(null);
  const [show, setShow] = useState(false);
  const [save, setSave] = useState(false);
  const [submit, setSubmit] = useState(false);

  const toggleChecked = () => setSubmit(value => !value);

  function getDataTitle(title) {
    showTitle(title.target.value)
    console.log("Title : " + title.target.value)
  }
  const handleChange = (e, editor) => {
    const body = editor.getData();
    showBody(body);
    console.log("Body : " + body)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleCheckedss = () => {
    setSave(value => !value);
    handleClose();
  }

  const optionsTag = [
    { label: 'Science', value: 'Scienceact' },
    { label: 'Law', value: 'Law' },
    { label: 'Database', value: 'Database' },
    { label: 'DataTeat', value: 'DataTeat' },
    { label: 'Art', value: 'Art' },
  ]

  const optionsSubject = [
    { label: 'วิทยาการคอมพิวเตอร์', value: 'วิทยาการคอมพิวเตอร์' },
    { label: 'ศิลปกรรมศาสตร์', value: 'ศิลปกรรมศาสตร์' },
    { label: 'วิศวะกรรมศาสตร์', value: 'วิศวะกรรมศาสตร์' },
  ]
  var myTag = "";
  function onChangeInputTag(tag) {
    myTag = "";
    tag.map(o => myTag += o.label + " ");
    console.log("myTag : " + myTag)
    showTag(myTag);
  }
  var mySub = "";
  function onChangeInputSub(subject) {
    subject.map(o => mySub += o.label + " ");
    console.log("Subject : " + mySub)
    showSubject(mySub);
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
            <input type="text" name="name" style={{ width: '600px' }}
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
              onInit={(editor) => { }}
              config={{
                ckfinder: {

                  uploadUrl : "./images",
                  
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
            <Select style={{ width: '600px' }} isMulti={true} options={optionsTag}
              onChange={onChangeInputTag} defaultValue={[]}
              placeholder="ตัวอย่าง (Programing, Database, Law, Art)" />
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
            <Select style={{ width: '600px' }} isMulti={true} options={optionsSubject}
              onChange={onChangeInputSub} defaultValue={[]}
              placeholder="ตัวอย่าง (วิทยาการคอมพิวเตอร์, ศิลปกรรมศาสตร์, วิศวะกรรมศาสตร์)" />
          </div>

          <Button submit={submit} onClick={() => toggleChecked(!submit)}>Submit</Button>
          <Button variant="primary" onClick={handleShow}>
            Preview
          </Button>

          {console.log("Submit " + submit)}

        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>ตัวอย่าง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{title}</h4>
          <h5>
            <div dangerouslySetInnerHTML={{
              __html: body
            }}>
            </div>
          </h5>
          <h9>{tag}</h9>
          <br />
          <h9>{subject}</h9>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={toggleCheckedss} onChange={() => toggleCheckedss(!save)}>
            Save
              {console.log("Save " + save)}
          </Button>
        </Modal.Footer>
      </Modal>


    </Container>
  );
}


export default CreateForum;