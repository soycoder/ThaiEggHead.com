import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ReactHtmlParser from "react-html-parser";

import { Card, Container } from "react-bootstrap";

export default class CreateForum extends React.Component {
  state = {
    title: "",
    tag: "",
    subject: "",
    content: "",
    sent: true,
  };

  handleChanges = (event) => {
    const target = event.target;

    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleChangesState = (event, editor) => {
    const data = editor.getData();
    this.setState({ content: data });
    console.log("STATE", { data });
  };

  operation() {
    this.setState({
      showTitle: !this.state.showTitle,
      showTag: !this.state.showTag,
      showSubjuct: !this.state.showSubjuct,
    });
  }
  operationSent() {
    this.setState({
      sent: !this.state.sent,
    });
    console.log(this.state.sent);
  }
  render() {
    console.log("STATE _", this.state);

    return (
      <Container style={{ "margin-top": "20px" }}>
        <Card>
          <Card.Body>
            <Card.Title>Create Forum</Card.Title>
            <div className="form-group">
              <div className="form-group">
                <label>หัวข้อ</label>
                <h8 style={{ lineHeight: "90%" }}>
                  หัวข้อที่แสดงถึง เนื้อหา ใจความสำคัญ
                  ของปัญหาหรือข้อมูลที่ต้องการแสดง
                </h8>
                <br></br>
                <input
                  type="text"
                  name="title"
                  style={{ width: "670px" }}
                  value={this.state.title}
                  onChange={this.handleChanges}
                  class="ss"
                />
              </div>

              <div className="form-group">
                <label>เนื้อหา</label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                  เนื้อหาแสดงถึง ข้อมูล หรือปัญหา
                  สาระของเรื่องที่ต้องการอธิบายเพื่อให้เกิดความเข้าใจ
                </h8>
                <CKEditor
                  editor={ClassicEditor}
                  onInit={(editor) => {}}
                  config={{
                    ckfinder: {
                      uploadUrl: "/upload",
                    },
                  }}
                  onChange={this.handleChangesState}
                  style={{ width: "670px" }}
                />
              </div>

              <div className="form-group">
                <label>แท็ก</label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                  เพิ่มแท็กได้สูงสุด 5
                  แท็กเพื่ออธิบายว่าคำถามของคุณเกี่ยวกับอะไร
                </h8>
                <input
                  type="tag"
                  name="tag"
                  style={{ width: "670px" }}
                  value={this.state.tag}
                  onChange={this.handleChanges}
                  class="ss"
                  placeholder="ตัวอย่าง (Programing, Database, Law, Art)"
                />
              </div>
              <div className="form-group">
                <label style={{ "font-size": "24px" }}>
                  สาขาวิชาที่เกี่ยวข้อง
                </label>
                <br></br>
                <h8 style={{ lineHeight: "90%" }}>
                  เพิ่มแท็กได้สูงสุด 5 แท็กเป็นแท็กที่อธิบายเกี่ยวกับสาขาวิชา
                </h8>
                <input
                  type="subject"
                  name="subject"
                  style={{
                    width: "670px",
                    "font-size": "12px",
                    height: "30px",
                  }}
                  value={this.state.subject}
                  onChange={this.handleChanges}
                  class="ss"
                  placeholder="ตัวอย่าง (วิทยาการคอมพิวเตอร์, ศิลปกรรมศาสตร์, วิศวะกรรมศาสตร์)"
                />
              </div>
            </div>

            <button onClick={() => this.operationSent()}>Submit</button>
            <button style={{ margin: "10px" }} onClick={() => this.operation()}>
              Preview
            </button>
          </Card.Body>
        </Card>

        {this.state.showTitle ? (
          <div>
            <h2>เรื่อง</h2>
            <h4>{this.state.title}</h4>
            <h2>เนื้อหา</h2>
            <h4>{ReactHtmlParser(this.state.content)}</h4>
          </div>
        ) : null}

        {this.state.showTag ? (
          <div>
            <h2>แท็ก</h2>
            <h4>{this.state.tag}</h4>
          </div>
        ) : null}

        {this.state.showTag ? (
          <div>
            <h2>หัวข้อ</h2>
            <h4>{this.state.subject}</h4>
          </div>
        ) : null}
      </Container>
    );
  }
}
