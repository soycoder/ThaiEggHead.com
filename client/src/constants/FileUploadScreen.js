import React, { useState, useEffect } from 'react';
import { multipleFilesUpload } from '../auth/apiFile';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Select from 'react-select'
import { Button } from "@blueprintjs/core";
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'

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
        { label: 'นิติศาสตร์', value: 'นิติศาสตร์' },
        { label: 'ศิลปกรรมศาสตร์', value: 'ศิลปกรรมศาสตร์' },
        { label: 'สังคมสงเคราะห์ศาสตร์', value: 'สังคมสงเคราะห์ศาสตร์' },
        { label: 'วิทยาลัยสหวิทยาการ', value: 'วิทยาลัยสหวิทยาการ' },
        { label: 'สาธารณสุขศาสตร์', value: 'สาธารณสุขศาสตร์' },
        { label: 'วิทยาศาสตร์และเทคโนโลยี', value: 'วิทยาศาสตร์และเทคโนโลยี' },
    ]
    
    const [sourceImg, setSelectImg] = useState([]);
    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
        if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
			setSelectImg((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file)
			);
		}
    }

    const [file, setFile] = useState([]);

    function uploadSingleFile(e) {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setFile((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file)
            );
        }
    }
  
    function deleteFile(e) {
      const s = file.filter((item, index) => index !== e);
      setFile(s);
      console.log("S "+s);
    }

    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }
    function getDataTitle(title) {
        setTitle(title.target.value)
        console.log("Title : " + title.target.value)
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
    function sweetAlert() {
     Swal.fire({
        title: 'Are you sure?',
        text: 'คุณต้องการโพสหรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33', 
        confirmButtonText: 'Yes!'
     })
     .then((result) => {
        if(result.value===true){
                // Swal.fire({
                //     title: "Success!",
                //     text: "Redirecting in 2 seconds.",
                //     type: "success",
                //     timer: 2000,
                //     showConfirmButton: false
                //   }, function(){
                //         window.location.href = "http://localhost:3000/";
                //   });
                UploadMultipleFiles()
            console.log("result Valur "+result.value)
       }
       else{
           result.value=false;
            console.log("result Valur "+result.value)
        }
     })       
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
                />
                
            </div>

            <div className="form-group Input Image">
                <label>Select Multiple Files</label>
                <input onChange={(e) => MultipleFileChange(e)} onChange={uploadSingleFile} class="form-control" type="file" id="formFileMultiple" multiple />
            </div>

            <div className="form-group Preview">
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
                <Button submit={submit}>โพส</Button>     
                {console.log("Submit " + submit)}       
            </a>

            <Button onClick={handleShow}>
                ดูตัวอย่าง
            </Button>
            <br/>
            <Button type="button" onClick={() => UploadMultipleFiles()} className="btn btn-danger" onClick={sweetAlert}>
                Upload
            </Button>
            <br/>
            
            <div className="form-group Preview In Buttom">
                <Modal show={show} onHide={handleClose} style={{ padding: "auto" }} size="lg">

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

                        <div className="form-group preview">
                            {  Array.from(file).map((item, index) => {
                                return (
                                <div key={item}>
                                    <img src={item} alt="" style={{width: "400px" }} />
                                    <Button type="button" onClick={() => deleteFile(index)}>
                                    delete
                                    </Button>
                                </div>
                                );
                            })}
                        </div>

                        <h9>{tag}</h9>
                        <br />
                        <h9>{subject}</h9>
                        <br />                    
                    
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={toggleCheckedss} onChange={() => toggleCheckedss(!save)}>
                            ตกลง
                            {console.log("Save " + save)}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default FileUploadScreen;