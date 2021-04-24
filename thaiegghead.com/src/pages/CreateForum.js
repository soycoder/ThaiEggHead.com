import React, { useState } from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ReactHtmlParser from "react-html-parser";

import { Card, Container } from "react-bootstrap";

function CreateForum () {
  const [title, showTitle] = useState(null);
  const [body, showBody] = useState(null);
  const [tag, showtag] = useState(null);
  const [subject, showsubject] = useState(null);
  const [show, setShow] = useState(true);
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


            <button submit={submit} onClick={()=>toggleChecked(!submit)}>Submit</button>
            <button onClick={()=>setShow(!show)}>Preview</button>
            {console.log(submit)}

          </Card.Body>
        </Card>

        {
            !show?
              <div> 
                <h2>เรื่อง</h2>
                <h4>{title}</h4>
                <h2>เนื้อหา</h2>
                <h4>{ReactHtmlParser(body)}</h4>
                <h2>แท็ก</h2>
                <h4>{tag}</h4>
                <h2>หัวข้อ</h2>
                <h4>{subject}</h4>
              </div>  
            :null          
          }

      </Container>
    );
  }


export default CreateForum;