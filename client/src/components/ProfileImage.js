import React, { useState } from "react";
import { Button, Icon } from "@blueprintjs/core";

import { avatarFileUpload } from "../auth/apiImgUser";

const ProfileImage = (props) => {
  const user = props.data;

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
    window.location.reload()
    await avatarFileUpload(formData, mulitpleFileOptions);
  };

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
        </div>
        <div className="col-2">
          <h5>Preview</h5>
          <img
            alt=""
            style={{ width: "150px", height: "150px" }}
            src={file}
          />
        </div>
      </div>
      <Button onClick={UploadMultipleFiles}>
        <Icon /> Confirm
      </Button>
    </div>
  );
};

export default ProfileImage;
