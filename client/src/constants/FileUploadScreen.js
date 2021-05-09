import React, { useState, useEffect } from 'react';
import { multipleFilesUpload } from '../auth/apiFile';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Select from 'react-select'
import { Button } from "@blueprintjs/core";
import { Card, Container, Modal } from "react-bootstrap";

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

var count = [];
const FileUploadScreen = (props) => {
    const [multipleFiles, setMultipleFiles] = useState('');

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tag, showTag] = useState('');
    const [subject, showSubject] = useState('');
    const [save, setSave] = useState(false);
    const [submit, setSubmit] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggleCheckedss = () => {
      setSave(value => !value);
      handleClose();
    }


    const [multipleProgress, setMultipleProgress] = useState(0);

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

    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }

    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }

    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('tag', tag);
        formData.append('subject', subject);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);

        }
        // for(var pair of formData.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1]);
        // }

        // console.log("len "+multipleFiles.length);
        // console.log("Text "+JSON.stringify(title));
        // console.log("Body "+JSON.stringify(body));
        await multipleFilesUpload(formData, mulitpleFileOptions);

        props.getMultiple();
    }

    const handleChange = (e, editor) => {
        const body = editor.getData();
        setBody(body);
        console.log("Body : " + body)
    }

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

    function getDataTitle(title) {
        setTitle(title.target.value)
        console.log("Title : " + title.target.value)
    }

    return (
        <div>
            <div className="form-group">
                <label style={{ "font-size": "24px" }}>หัวข้อ</label>
                <br />
                <h8 style={{ lineHeight: "90%" }}>
                    หัวข้อที่แสดงถึง เนื้อหา ใจความสำคัญ
                    ของปัญหาหรือข้อมูลที่ต้องการแสดง
                    </h8>
                <input type="text" onChange={getDataTitle} placeholder="กรุณาใส่หัวข้อที่ต้องการแสดง" className="form-control" />
                {/* {console.log("Title : " + title)} */}
            </div>

            <div className="form-group">
                <label style={{ "font-size": "24px" }}>เนื้อหา</label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                    เนื้อหาแสดงถึง ข้อมูล หรือปัญหา
                    สาระของเรื่องที่ต้องการอธิบายเพื่อให้เกิดความเข้าใจ
                    </h8>
                <CKEditor
                    editor={ClassicEditor}
                    data="  <p>  
                                <br></br>
                            </p>"
                    onInit={(editor) => {
                        editor.editing.view.change(writer => {
                            writer.setStyle(
                              "height",
                              "500px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                     }}
                    config={{
                        // ckfinder: {
                        toolbar: {
                            items: [
                                'heading', '|',
                                'bold', 'italic', '|',
                                'link', '|',
                                'bulletedList', 'numberedList', 'todoList',
                                'insertTable', '|',
                                'outdent', 'indent', '|',
                                'undo', 'redo'
                            ],
                        }
                        
                    }}
                    onChange={handleChange}
                    // style={{ config.height = '800px' }}
                />
                
            </div>

            <div className="form-group">
                <label>Select Multiple Files</label>
                <input onChange={(e) => MultipleFileChange(e)} class="form-control" type="file" id="formFileMultiple" multiple />
            </div>

            <div className="form-group">
                <label style={{ "font-size": "24px" }}>แท็ก</label>
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

            <a href="http://localhost:3000/">
                <Button submit={submit} a href="https://google.com">โพส</Button>     
                {console.log("Submit " + submit)}       
            </a>

            <Button onClick={handleShow}>
                ดูตัวอย่าง
            </Button>
            <br/>
            <Button type="button" onClick={() => UploadMultipleFiles()} className="btn btn-danger">
                Upload
                
            </Button>
    
 

            <Modal show={show} onHide={handleClose} style={{ padding: "auto" }} >

                <Modal.Header closeButton>
                    <Modal.Title>ตัวอย่าง</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>{title}</h5>
                    <h5>
                        <div dangerouslySetInnerHTML={{
                        __html: body
                        }}>
                        </div>
                    </h5>
                    <h9>{tag}</h9>
                    <br />
                    <h9>{subject}</h9>
                    <br />
                    {
                        console.log(multipleFiles)
                    }
                    {/* <img src={mulitpleFileOptions}></img> */}
                
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={toggleCheckedss} onChange={() => toggleCheckedss(!save)}>
                        ตกลง
                        {console.log("Save " + save)}
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>


    );
}

export default FileUploadScreen;