import React, { useState, useEffect, useContext } from "react";
import { multipleFilesUpload } from "../auth/apiFile";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Select from "react-select";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import SelectTag from "./SelectTag";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { theme } from "../constants";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

const FileUploadScreen = ({ isAuthenticated }) => {
  let history = useHistory();
  // Initial User Profile
  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
    // alert(JSON.stringify(user));
  }

  const [multipleFiles, setMultipleFiles] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [listTag, setListTag] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [newTag, setNewTag] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleCheckedss = () => {
    if (show) setShow(!show);
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

  const UploadMultipleFiles = async () => {
    if (isAuthenticated) {
      const formData = new FormData();
      formData.append("userID", user.userID);
      formData.append("title", title);
      formData.append("body", body);
      for (let i = 0; i < listTag.length; i++) {
        formData.append("tag", listTag[i]);
      }
      for (let i = 0; i < listSubject.length; i++) {
        formData.append("subject", listSubject[i]);
      }
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append("files", multipleFiles[i]);
      }
      await multipleFilesUpload(formData, mulitpleFileOptions);
    } else {
      alert("กรุณา Log in อีกครั้ง'");
      auth.logout();
    }
  };

  const handleChange = (e, editor) => {
    const body = editor.getData();
    setBody(body);
    // console.log("Body : " + body);
  };

  function onChangeInputTag(tag) {
    let myTag = [];
    let temp_newTag = [];
    tag.map((o) => myTag.push(o.label));
    tag.map((o) => (o.__isNew__ === true ? temp_newTag.push(o.label) : null));
    setNewTag(temp_newTag);
    setListTag(myTag);
  }

  function sentTag() {
    for (let i = 0; i < newTag.length; i++) {
      axios.post("http://localhost:5000/forums/tag", {
        name: newTag[i],
      });
    }
  }

  function onChangeInputSub(subject) {
    let mySubject = [];
    subject.map((o) => mySubject.push(o.label));
    setListSubject(mySubject);
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
      // onConfirm: props.action,
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

  const ListSubjectTag = (props) => {
    let list = props.data;
    let _Subject = list.map((subject) => (
      <Badge bg="primary" style={{ marginLeft: 4 }}>
        {subject}
      </Badge>
    ));
    return <div className="tag">{_Subject}</div>;
  };

  const ListTag = (props) => {
    let list = props.data;
    let _Tag = list.map(
      (tag) => (
        <Badge bg="info" style={{ marginLeft: 4 }}>
          {tag}
        </Badge>
      )
      // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
    );
    return <div className="tag">{_Tag}</div>;
  };

  const editorConfiguration = {
    // plugins: [ ],
    toolbar: [ 
      // 'heading',
      // '|',
      'bold',
      'italic',
      '|',
      // "uploadImage",
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
      'code', 
    ],        
    ckfinder: {
      uploadUrl: "/upload",
      withCredentials: true,
      headers: {
        "X-CSRF-TOKEN": "CSFR-Token",
        Authorization: "Bearer <JSON Web Token>",
      },
    },
    image: {
      // Configure the available styles.
      styles: ["alignLeft", "alignCenter", "alignRight"],
      toolbar: [
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
        "|",
        "resizeImage",
        "|",
        "imageTextAlternative",
      ],
    },
  };
  useEffect(() => {
    // const token = user?.token;
    // setUser(JSON.parse(localStorage.getItem("profile")));
    // if (user) {
    //   let _user = user;
    //   let _result = _user.result;
    //   fetch(`http://localhost:5000/users/google/${_result.googleId}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       _result["userID"] = res.userID;
    //       _user["result"] = _result;
    //       setUser("User " + _user);
    //     });
    // }
  }, []);

  return (
    <Form className="mb-3">
      <Form.Group className="mb-3">
        <Form.Label style={theme.FONTS.h1}>หัวข้อ</Form.Label>
        <br />
        <Form.Text style={theme.FONTS.h4} className="text-muted">
          หัวข้อที่แสดงถึง เนื้อหา ใจความสำคัญ ของปัญหาหรือข้อมูลที่ต้องการแสดง
        </Form.Text>
        <Form.Control
          style={theme.FONTS.body3}
          type="text"
          onChange={getDataTitle}
          placeholder="กรุณาใส่หัวข้อที่ต้องการแสดง"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={theme.FONTS.h1}>เนื้อหา</Form.Label>
        <br />
        <Form.Text style={theme.FONTS.h4} className="text-muted">
          เนื้อหาแสดงถึง ข้อมูล หรือปัญหา
          สาระของเรื่องที่ต้องการอธิบายเพื่อให้เกิดความเข้าใจ
        </Form.Text>
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
          config={editorConfiguration}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={theme.FONTS.h1}>เพิ่มรูป </Form.Label>
        <br />
        <Form.Text style={theme.FONTS.h4} className="text-muted text-end">
          (รองรับแบบหลายรูป)
        </Form.Text>
        <Form.Control
          style={theme.FONTS.body3}
          onChange={(e) => MultipleFileChange(e)}
          type="file"
          id="formFileMultiple"
          multiple
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={theme.FONTS.h1}>แท็ก</Form.Label>
        <br />
        <Form.Text style={theme.FONTS.h4} className="text-muted text-end">
          เพิ่มแท็กเพื่ออธิบายว่าคำถามของคุณเกี่ยวกับอะไร
        </Form.Text>

        <SelectTag style={theme.FONTS.body3} updateTagList={onChangeInputTag} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={theme.FONTS.h1}>สาขาวิชาที่เกี่ยวข้อง </Form.Label>
        <br />
        <Form.Text style={theme.FONTS.h4} className="text-muted text-end">
          เพิ่มแท็กที่อธิบายถึงสาขาวิชา
        </Form.Text>
        <Select
          style={theme.FONTS.body3}
          isMulti={true}
          options={optionsSubject}
          onChange={onChangeInputSub}
          defaultValue={[]}
          placeholder="ตัวอย่าง (วิทยาการคอมพิวเตอร์, ศิลปกรรมศาสตร์, วิศวะกรรมศาสตร์)"
        />
      </Form.Group>

      <Button
        style={theme.FONTS.h3}
        onClick={handleShow}
        className="btn-secondary"
      >
        ดูตัวอย่าง
      </Button>

      <Button
        style={theme.FONTS.h3}
        type="button"
        className="ms-3 btn btn-primary"
        onClick={sweetAlert}
      >
        โพสต์
      </Button>
      <br />

      <div className="form-group">
        <Modal
          show={show}
          onHide={handleClose}
          style={{ padding: "auto" }}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title style={theme.FONTS.h1}>ตัวอย่าง</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={theme.FONTS.h2}>{title}</div>
            <hr />
            <div style={{ fontFamily: "supermarket" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              ></div>
            </div>
            <ListTag data={listTag} />
            <br />
            <ListSubjectTag data={listSubject} />
            <br />
            <div style={theme.FONTS.h2} className="mt-3">
              รูปแนบ
            </div>
            <div className="form-group preview">
              {Array.from(file).map((item, index) => {
                return (
                  <div key={item}>
                    <img src={item} alt="" style={{ width: "400px" }} />
                    <Button
                      type="button"
                      className="btn-danger"
                      onClick={() => deleteFile(index)}
                    >
                      ลบ
                    </Button>
                  </div>
                );
              })}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={theme.FONTS.h3}
              variant="primary"
              onClick={() => {
                toggleCheckedss();
              }}
            >
              ตกลง
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Form>
  );
};

export default FileUploadScreen;
