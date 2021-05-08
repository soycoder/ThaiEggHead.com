import React, { useState, useEffect } from 'react';
import { Button, FileInput } from "@blueprintjs/core";
import { Card, Container, Modal } from "react-bootstrap";

import FileUploadScreen from "../constants/FileUploadScreen";
import { getMultipleFiles } from '../auth/apiFile';

var count = [];
var max = 0;
function CreateForum() {
  const [show, setShow] = useState(false);
  const [save, setSave] = useState(false);
  const [submit, setSubmit] = useState(false);

  // const toggleChecked = () => setSubmit(value => !value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleCheckedss = () => {
    setSave(value => !value);
    handleClose();
  }

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

  return (
    <Container style={{ "margin-top": "20px" }}>
      <Card>
        <Card.Body>
          <Card.Title>Create Forum</Card.Title>

          <div className="container">
            <br />
            <FileUploadScreen getMultiple={() => getMultipleFilesList()} />
          </div>
          <br />
          
          <a href="http://localhost:3000/">
            <Button submit={submit} a href="https://google.com">โพส</Button>            
          </a>

          <Button variant="primary" onClick={handleShow}>
            ดูตัวอย่าง
          </Button>

          {console.log("Submit " + submit)}
        </Card.Body>
      </Card>

      {/* Show Preview */}
      <Modal show={show} onHide={handleClose} style={{ padding: "auto" }} >
        <Modal.Header closeButton>
          <Modal.Title>ตัวอย่าง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
          {multipleFiles.map((element, index) =>
            <div>
              <h0 style={{visibility: "hidden"}}>
                {
                  count.push(index+1)
                }
              </h0>

              {/* <h1>
                {
                  // console.log(element, index.value(1))
                  // console.log(Math.max(...count))
                  // if(index==Math.max(...count)){}
                }
              </h1> */}
              
              <h3>{element.title}</h3>
              <h5>
                <div dangerouslySetInnerHTML={{
                  __html: element.body
                }}>
                </div>
              </h5>
              <h9>{element.tag}</h9>
              <br />
              <h9>{element.subject}</h9>
              <div>
                {element.files.map((file, index) =>
                  <img src={`http://localhost:8080/${file.filePath}`} height="auto" className="card-img-top img-responsive" alt="img" />
                )}
              </div>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggleCheckedss} onChange={() => toggleCheckedss(!save)}>
            ตกลง
            {console.log("Save " + save)}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CreateForum;