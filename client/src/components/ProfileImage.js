import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { images } from "../constants";
import { Button, Icon } from "@blueprintjs/core";
import { Form } from "react-bootstrap";

import { avatarFileUpload } from "../auth/apiImgUser";
import axios from "axios";

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

  const [PreviewImg, setPreviewImg] = useState("");
  const [imgFile, setimgFile] = useState("");

  const [multipleFiles, setMultipleFiles] = useState("");
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
    const formData = new FormData();
    formData.append("userID", user.userID);
    formData.append("postText", user.userID);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    // let data = { userID: user.userID, files: multipleFiles };

    await avatarFileUpload(formData, mulitpleFileOptions);
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
        <div className="col-8">
          <h4>Default usage</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-7">
          <input
            onChange={(e) => MultipleFileChange(e)}
            type="file"
            id="formFileMultiple"
            multiple
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
      <Button onClick={UploadMultipleFiles}>
        <Icon /> Confirm
      </Button>
    </div>
  );
};

export default ProfileImage;
