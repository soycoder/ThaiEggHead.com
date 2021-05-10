import React, { useState, useEffect } from 'react';
import { Button, FileInput } from "@blueprintjs/core";
import { Card, Container, Modal } from "react-bootstrap";

import FileUploadScreen from "../constants/FileUploadScreen";
import { getMultipleFiles } from '../auth/apiFile';

function CreateForum() {
  const [show, setShow] = useState(false);
  const [save, setSave] = useState(false);

  const [multipleFiles, setMultipleFiles] = useState([]);

  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
      // console.log("Cc "+JSON.stringify(fileslist));
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList();
  }, []);

  const mystyle = {
    padding: "20px",
    borderRadius: "25px",
    fontFamily: "RSU",
    border: "2px solid #f8f9fa",
  };

  return (
    <div>
      <br/>
      <Container style={mystyle}>
        <Card.Title>Create Forum</Card.Title>
          <div className="container">
              <FileUploadScreen getMultiple={() => getMultipleFilesList()} />
          </div>
      </Container>
    </div>
  ); 
}

export default CreateForum;