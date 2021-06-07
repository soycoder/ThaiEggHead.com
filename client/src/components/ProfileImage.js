import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { images } from "../constants";
import { Button, Icon } from "@blueprintjs/core";
import { Form } from "react-bootstrap";

import {imgUserUpload} from '../auth/apiImgUser'
import axios from 'axios';

const ProfileImage = (props) => {
  const user = props.data;

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

  const createFormData = () => {
    const data = new FormData();
    data.append("img", src);
    data.append("email", user.email);
    return data;
  };

  const uploadAvatar = (e) => {
    let option = {
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      data: createFormData(),
      responseType: "arraybuffer",
    };
    axios(`/user/avatar/${user.userID}`, option)
      .then((response) => {
        let image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        return `data:${response.headers[
          "content-type"
        ].toLowerCase()};base64,${image}`;
      })
      .then((avatar) => {
        // setInitAvatarSrc({ img: avatar, mimetype: "" });
      })
      .catch((err) => console.log(err));
  };
  
  const [PreviewImg, setPreviewImg] = useState('');
  const [imgFile, setimgFile] = useState('');
  const FileImg= (e) => {
    setimgFile(e.target.files);
    setMultipleProgress(0);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      setPreviewImg(filesArray);
    }
  };
  const [multipleProgress, setMultipleProgress] = useState(0);

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };
  const uploadFile = async () => {
      let arr = {}
      arr.userID = user.userID;
      arr.imgIRL = imgFile;
      const formData = new FormData();
      // console.log(user.userID)
      formData.append('userID', user.userID)
      // console.log(PreviewImg)
      formData.append('imgURL', imgFile);
      await imgUserUpload(arr,imgFile)
      window.location.href = `http://localhost:3000/profile/${user.userID}`;
  }
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <h4>Default usage</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-7">
        <Form.Control
          onChange={(e) => FileImg(e)}
          type="file"
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

        <div className="col-2">
          <h5>Preview</h5>
          <img
            alt=""
            style={{ width: "150px", height: "150px" }}
            src={PreviewImg}
          />
        </div>
      </div>
      {/* {console.log(PreviewImg)} */}
      <Button onClick={uploadFile}>
        <Icon /> Confirm
      </Button>
    </div>
  );
};

export default ProfileImage;

