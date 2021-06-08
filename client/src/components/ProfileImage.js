import React, { useState, useContext } from "react";
import Avatar from "react-avatar-edit";
import { images } from "../constants";

import {
  Button,
  Icon,
  Form,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { avatarFileUpload } from "../auth/apiImgUser";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

const ProfileImage = (props) => {
  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (props.isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }

  const _user = props.data;

  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => multipleFiles ? setShow(true):alert("กรุณา เลือกรูป ก่อน");

  const onChangePassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const [preview, setPreview] = useState("");
  const [defaultPreview, setDefaultPreview] = useState("");
  const [src, setSrc] = useState("");

  const onCropDefault = (preview) => {
    setDefaultPreview(preview);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onCloseDefault = () => {
    setDefaultPreview(null);
  };

  const onClose = () => {
    setPreview(null);
  };

  const [PreviewImg, setPreviewImg] = useState("");
  const [imgFile, setimgFile] = useState("");

  const [multipleFiles, setMultipleFiles] = useState(null);
  const [multipleProgress, setMultipleProgress] = useState(0);

  const [file, setFile] = useState([]);
  const [sourceImg, setSelectImg] = useState([]);

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const UploadMultipleFiles = async () => {
    let str = `${_user.firstName}**${_user.lastName}`;
    setConfirmPassword(str);

    const formData = new FormData();
    formData.append("userID", _user.userID);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await avatarFileUpload(formData, mulitpleFileOptions);

    setTimeout(async () => {
      await axios
        .post("http://localhost:5000/users/signin", {
          email: _user.email,
          password: !_user.googleID ? confirmPassword : str,
        })
        .then((res) => {
          let { user } = res.data;
          console.log("login", user);
          let context = {
            token: user.token,
            userInfo: user.firstName + " " + user.lastName,
            expiresAt: new Date().getTime() / 1000 + user.expiresIn,
          };
          auth.setAuthState(context);
          window.location.reload();
        })
        .catch((err) => {
          alert("ลองอีกครั้ง");
          setConfirmPassword("");
        });
    }, 1000);
  };

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    console.log(multipleFiles);
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

  return (
    <div className="container-fluid">
      

      <div className="row">
        <div className="col-7">
          <input
            onChange={(e) => MultipleFileChange(e)}
            type="file"
            id="formFileMultiple"
          />

          {/* <Avatar
            width={390}
            height={295}
            exportSize={390}
            onCrop={onCropDefault}
            onClose={onCloseDefault}
            src={PreviewImg}
          /> */}
        </div>
        {/* props.user.imgURL.indexOf("http") == 0 ? props.user.imgURL : "http://localhost:5000/"+props.user.imgURL */}
        <div className="col-2">
          <h5>Preview</h5>
          <img alt="" style={{ width: "150px", height: "150px" }} src={file} />
        </div>
      </div>
      {/* {console.log(PreviewImg)} */}
      <Button onClick={handleShow}>ต่อไป</Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันรหัสผ่าน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">Email</InputGroup.Text>
            <FormControl value={_user.email} readOnly />
          </InputGroup>
          {!_user.googleID ? (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
              <FormControl
                onChange={onChangePassword}
                type="password"
                value={confirmPassword}
              />
            </InputGroup>
          ) : (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
              <FormControl value={"Log In with Google"} readOnly />
            </InputGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={UploadMultipleFiles}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileImage;
