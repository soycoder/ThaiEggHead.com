import React, { useState, useEffect } from "react";
import { multipleFilesUpload } from "../auth/apiFile";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import SelectTag from "./SelectTag";
import { useHistory } from "react-router-dom";
import axios from 'axios'

const FileUploadScreen = (props) => {
  let history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [multipleFiles, setMultipleFiles] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [listTag, setListTag] = useState([])
  const [subject, showSubject] = useState("");
  const [listsubject, setListSubject] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleCheckedss = () => {
    if (show)
      setShow(!show);
    // handleClose();
  };

  const [multipleProgress, setMultipleProgress] = useState(0);

  const optionsSubject = [
    { label: "Arts", value: "Arts" },
    { label: "Communication Arts", value: "Communication Arts" },
    { label: "Commerce and Accountancy", value: "Commerce and Accountancy" },
    { label: "Education", value: "Education" },
    { label: "Engineering", value: "Engineering" },
    { label: "Fine and Applied Arts", value: "Fine and Applied Arts" },
    { label: "Law", value: "Law" },
    { label: "Psychology", value: "Psychology" },
    { label: "Political Science", value: "Political Science" },
    { label: "Social Administration", value: "Social Administration" },
    { label: "Social Work", value: "Social Work" },
    { label: "Social Administration", value: "Social Administration" },
  ];

  const [sourceImg, setSelectImg] = useState([]);
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectImg((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      setFile((prevImages) => prevImages.concat(filesArray));
    }
  };

  const [file, setFile] = useState([]);

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    // console.log("S " + s);
  }

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };
  function getDataTitle(title) {
    setTitle(title.target.value);
  }

  const generateList = (str) => {
    return str;
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("userID", user.userID);
    formData.append("title", title);
    formData.append("body", body);
    for (let i = 0; i < listTag.length; i++) {
      formData.append("tag", listTag[i]);
      console.log(listTag)
    }
    for (let i = 0; i < listsubject.length; i++) {
      formData.append("subject", listsubject[i]);
    }
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multipleFilesUpload(formData, mulitpleFileOptions);
  };

  const handleChange = (e, editor) => {
    const body = editor.getData();
    setBody(body);
    console.log("Body : " + body);
  };
  
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState([]);
  function onChangeInputTag(tag) {
    let myTag = [];
    let Tag = [];
    tag.map((o) => (myTag.push(o.label)));
    tag.map((o) => (o.__isNew__) === "true" ? null : (o.__isNew__)? (Tag.push((o.label))) : null);
    setNewTag(Tag)
    setListTag(generateList(myTag));
    setTag(myTag);    
  }

  function sentTag() {
    for (let i = 0; i < newTag.length; i++) {
      axios
        .post("http://localhost:5000/forums/tag", { tagID: "newTag", name: newTag[i] })    
    }
  }

  function onChangeInputSub(subject) {
    let mySubject = [];
    subject.map((o) => (mySubject.push(o.label)));
    setListSubject(generateList(mySubject))
    showSubject(mySubject);
  }

  function sweetAlert() {
    Swal.fire({
      title: "คุณต้องการโพสหรือไม่",
      // text: 'คุณต้องการโพสหรือไม่',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยันยัน",
      cancelButtonText: "แก้ไข",
      onConfirm: props.action
    }).then((result) => {
      if (result.value === true) {
        UploadMultipleFiles();
        sentTag();
        history.push("/");
      } else {
        result.value = false;
      }
    });
  }

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user) {
      let _user = user;
      let _result = _user.result;
      fetch(`http://localhost:5000/users/google/${_result.googleId}`)
        .then((res) => res.json())
        .then((res) => {
          _result["userID"] = res.userID;
          _user["result"] = _result;
          setUser("User " + _user);
        });
    }
  }, []);

  return (
    <div>
      <div className="form-group">
        <label style={{ "font-size": "24px" }}>หัวข้อ</label>
        <br />
        <h8 style={{ lineHeight: "90%" }}>
          หัวข้อที่แสดงถึง เนื้อหา ใจความสำคัญ ของปัญหาหรือข้อมูลที่ต้องการแสดง
        </h8>
        <input
          type="text"
          onChange={getDataTitle}
          placeholder="กรุณาใส่หัวข้อที่ต้องการแสดง"
          className="form-control"
        />
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
          onInit={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "500px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          config={{
            toolbar: {
              items: [
                "heading",
                "|",
                "bold",
                "italic",
                "|",
                "uploadImage",
                "bulletedList",
                "numberedList",
                "todoList",
                "insertTable",
                "|",
                "outdent",
                "indent",
                "|",
                "undo",
                "redo",
              ],
            },
            ckfinder: {
              uploadUrl: '/upload', 
              withCredentials: true,
              headers: {
                  'X-CSRF-TOKEN': 'CSFR-Token',
                  Authorization: 'Bearer <JSON Web Token>'
              }
            },                        
            image: {
               // Configure the available styles.
               styles: [
                   'alignLeft', 'alignCenter', 'alignRight'
               ],            
               toolbar: [
                   'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                   '|',
                   'resizeImage',
                   '|',
                   'imageTextAlternative'
               ]
           }            
            
          }}
          onChange={handleChange}
        />
      </div>

      <div className="form-group Input Image">
        <label>เพิ่มรูป (รองรับแบบหลายรูป)</label>
        <input
          onChange={(e) => MultipleFileChange(e)}
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
        />
      </div>

      <div className="form-group Preview">
        <label style={{ "font-size": "24px" }}>แท็ก</label>
        <br></br>
        <h8 style={{ lineHeight: "90%" }}>
          เพิ่มแท็ก : แท็กเพื่ออธิบายว่าคำถามของคุณเกี่ยวกับอะไร
        </h8>
        <br></br>
        <SelectTag updateTagList={onChangeInputTag} />
      </div>

      <div className="form-group">
        <label style={{ "font-size": "24px" }}>สาขาวิชาที่เกี่ยวข้อง</label>
        <br></br>
        <h8 style={{ lineHeight: "90%" }}>
          เพิ่มแท็ก : แท็กเป็นแท็กที่อธิบายเกี่ยวกับสาขาวิชา
        </h8>
        <br></br>
        <Select
          style={{ width: "600px" }}
          isMulti={true}
          options={optionsSubject}
          onChange={onChangeInputSub}
          defaultValue={[]}
          placeholder="ตัวอย่าง (วิทยาการคอมพิวเตอร์, ศิลปกรรมศาสตร์, วิศวะกรรมศาสตร์)"
        />
      </div>

      <Button onClick={handleShow} className="btn-secondary">
        ดูตัวอย่าง
      </Button>

      <Button
        type="button"
        className="ml-3 btn btn-primary"
        onClick={sweetAlert}
      >
        โพสต์
      </Button>
      <br />

      <div className="form-group Preview In Buttom">
        <Modal
          show={show}
          onHide={handleClose}
          style={{ padding: "auto" }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>ตัวอย่าง</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h5>{title}</h5>
            <h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              ></div>
            </h5>

            <div className="form-group preview">
              {Array.from(file).map((item, index) => {
                return (
                  <div key={item}>
                    <img src={item} alt="" style={{ width: "400px" }} />
                    <Button type="button" onClick={() => deleteFile(index)}>
                      delete
                    </Button>
                  </div>
                );
              })}
            </div>
            <h9>{tag + "  "}</h9>
            <br />
            <h9>{subject}</h9>
            <br />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={()=>{toggleCheckedss()}}>
              ตกลง
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FileUploadScreen;
