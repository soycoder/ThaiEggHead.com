import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { images } from "../constants";
import { Button, Icon } from "@blueprintjs/core";

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <h4>Default usage</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-7">
          <Avatar
            width={390}
            height={295}
            exportSize={390}
            onCrop={onCropDefault}
            onClose={onCloseDefault}
            src={src}
          />
        </div>

        <div className="col-2">
          <h5>Preview</h5>
          <img
            alt=""
            style={{ width: "150px", height: "150px" }}
            src={defaultPreview}
          />
        </div>
      </div>
      <Button onClick="">
        <Icon /> Confirm
      </Button>
    </div>
  );
};

export default ProfileImage;

