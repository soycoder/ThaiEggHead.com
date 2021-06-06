import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Modal,
  Nav,
  Badge,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@blueprintjs/core";
import "../App.css";
import Avatar from "react-avatar";
import AvatarCropper from "../components/ProfileImage";

import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import { theme } from "../constants";
import { images, COLORS, FONTS, SIZES } from "../constants";

const Profile = ({ isAuthenticated }) => {
  const dummyUser = {
    firstName: "",
    LastName: "",
  };

  const auth = useContext(AuthContext);

  var { token } = auth?.authState;
  var decoded;
  var user;

  if (isAuthenticated) {
    decoded = jwt_decode(token);
    user = decoded;
  }

  //HANDLE VAL
  const [lgShow, setLgShow] = useState(false);

  //FORUM DATA
  let { id } = useParams();
  const [userData, setUserData] = useState(dummyUser);
  const [forum, setForum] = useState([]);
  const [answer, setAnswer] = useState({});

  //INFO DISPLAY
  // const [displayName, setDisplayName] = useState("PupeePupee");
  // const [userName, setUserName] = useState("Yoskorn Lertratanakham");
  // const [email, setEmail] = useState("yoskon.ler@dome.tu.ac.th");
  const [phone, setPhone] = useState("N/A");
  const [organization, setOrganization] = useState("Thammasat University");
  const [eggHeadScore, setEggHeadScore] = useState(125);
  const [education, setEducation] = useState([
    {
      place: "Thammasat University",
      degree: "Bachelor of Science - BS, Computer Science",
      since: "2018 - 2021",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Emblem_of_Thammasat_University.svg/1024px-Emblem_of_Thammasat_University.svg.png",
    },
    {
      place: "Massachusetts Institute of Technology",
      degree: "Bachelor of Technology - BS, Computer Science",
      since: "2012 - 2017",
      img: "https://upload.wikimedia.org/wikipedia/th/thumb/4/44/MIT_Seal.svg/1200px-MIT_Seal.svg.png",
    },
  ]);

  const [questionHistory, setQuestionHistory] = useState(
    {
      head: "Can you share some screenshots worth of 1243.3k+ upvotes?",
      tag: ["messages", "function "],
    },
    {
      head: "Have you ever come back to your vehicle only to find something quite unexpected?",
      tag: ["messages", "function "],
    }
  );
  const [numQuestion, setNumQuestion] = useState(0);
  const [numAnswer, setNumAnswer] = useState(0);
  const [numComment, setNumComment] = useState(0);

  //UTILITY
  const [currSelectNav, setCurrSelectNav] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((res) => setUserData(res));
    fetch(`http://localhost:5000/forums/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setForum(res);
        setNumQuestion(res.length);
        // console.log(forum);
      });
    //   fetch(`http://localhost:5000/answers?userID=${id}`)
    //     .then((res) => res.json())
    //     .then((res) => setAnswer(res));
  }, []);

  const Interests = () => {
    return (
      <>
        <Row className="interest-card" style={{ fontFamily: "supermarket" }}>
          <Col md={2} className="interest-logo">
            <Image
              style={{ height: "80px" }}
              src="https://tu.ac.th/uploads/media/logo/logo01.jpg"
            />
          </Col>
          <Col md={10}>
            <Card.Body>
              <Card.Title>{"Thammasat University"}</Card.Title>
              <Card.Text className="text-muted">
                {Math.floor(Math.random() * 10000 + 1) * 100 + " followers"}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
        <Row className="interest-card">
          <Col md={2} className="interest-logo">
            <Image
              style={{ height: "80px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
            />
          </Col>
          <Col md={10}>
            <Card.Body>
              <Card.Title>{"Linkedin Guide to Networking"}</Card.Title>
              <Card.Text className="text-muted">
                {Math.floor(Math.random() * 10000 + 1) * 10 + " followers"}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </>
    );
  };

  const handleImage = () => {};

  const NonIdealState = () => {
    return (
      <div class="bp3-non-ideal-state" >
        <div class="bp3-non-ideal-state-visual">
          <span class="bp3-icon bp3-icon-folder-open"></span>
        </div>
        <h4 class="bp3-heading" style={theme.FONTS.detail}>Empty</h4>
        <div style={theme.FONTS.detail}>You haven't answered any questions yet.</div>
      </div>
    );
  };

  const handleNavSelect = (eventKey) => setCurrSelectNav(eventKey);

  const handleImgSelect = () => {
    setLgShow(true);
  };

  const ProfileImg = () => {
    return (
      <div class="profile-img">
        {userData.imgURL ? (
          <Avatar
            size="200"
            src={userData.imgURL}
            round={true}
            onClick={handleImgSelect}
          />
        ) : (
          <Avatar
            size="200"
            name={userData.firstName + " " + userData.lastName}
            round={true}
            onClick={handleImgSelect}
          />
        )}

        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg" style={FONTS.h1}>
              แก้ไข/รูปโปรไฟล์
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AvatarCropper data={user} />
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  const Navs = () => {
    return (
      <Nav variant="tabs" onSelect={handleNavSelect} style={theme.FONTS.nav}>
        <Nav.Item>
          <Nav.Link eventKey={1}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={2}>{numQuestion} Question</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={3}>{numAnswer} Answer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={4}>{numComment} Comment</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  };

  const ProfileHead = () => {
    return (
      <>
        <Col md={4}>
          <ProfileImg />
        </Col>
        <Col md={6}>
          <div class="profile-head">
            <h3 style={theme.FONTS.profile}>{userData.firstName + " " + userData.lastName}</h3>
            {/* <h5>{userName}</h5> */}
            <p class="proile-rating" style={theme.FONTS.score}>
              EggHead Score : <span style={theme.FONTS.score}>{eggHeadScore}</span>
            </p>
            <Navs />
            <ContentDisplay />
          </div>
        </Col>
        {user.userID === id ? (
          <Col md={2} style={theme.FONTS.detail}>
            <input
              type="submit"
              class="profile-edit-btn"
              name="btnAddMore"
              value="Edit Profile"
            />
          </Col>
        ) : null}
      </>
    );
  };

  const HistoryCard = () => {
    const ListTag = (props) => {
      const _list = props.data.listSubject;
      // console.log(_list);

      const subjectTag = _list.map(
        (subject) => {
          
          return (
            <Badge bg="info" style={{ marginLeft: 4 }}>
              {/* <Link to={`/subject/${}`}>{subject}</Link> */}
            </Badge>
          );
        }
        // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
      );
      return <div className="tag">{subjectTag}</div>;
    };
    return (
      <>
        {forum.map((item) => {
          return (
            <Card className="app-padding" style={{ marginBottom: 5 }}>
              <Link to={`/question/${item.forumID}`}>
                <Card.Subtitle  style={theme.FONTS.detail1}>📌{" " + item.title}</Card.Subtitle>
              </Link>
              <ListTag data={item} />
            </Card>
          );
        })}
      </>
    );
  };

  const ContentDisplay = () => {
    const EducationCard = (props) => {
      return (
        <Card.Body style={{ margin: -20 }}>
          <Col md={11}>
            <Row className="edu-card">
              <Col md={2} className="edu-logo">
                <Image style={{ height: "80px" }} src={props.data.img} />
              </Col>
              <Col md={10}>
                <Card.Body>
                  <Card.Title style={theme.FONTS.title1}>{props.data.place}</Card.Title>
                  <Card.Text style={theme.FONTS.title2}>{props.data.degree}</Card.Text>
                  <Card.Text className="text-muted" style={theme.FONTS.title2}>
                    {props.data.since}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Col>
        </Card.Body>
      );
    };

    if (currSelectNav == 1) {
      return (
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Row class="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Email</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>{userData.email}</p>
            </Col>
          </Row>
          <Row class="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Name</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>{userData.firstName + " " + userData.lastName}</p>
            </Col>
          </Row>
          <Row class="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Phone Number</label>
            </Col>
            <Col md={6}>
              <p style={theme.FONTS.detail}>{phone}</p>
            </Col>
          </Row>
          <Row class="row">
            <Col md={6}>
              <label style={theme.FONTS.detail}>Organization</label>
            </Col>
            <Col md={6}>
              <p  style={theme.FONTS.detail}>{organization}</p>
            </Col>
          </Row>
          <Row class="row">
            <Col md={11}>
              <br />
              <label style={theme.FONTS.detail}>Education</label>
            </Col>
            {education.map((item) => (
              <EducationCard data={item} style={theme.FONTS.detail} />
            ))}
          </Row>
        </div>
      );
    } else if (currSelectNav == 2) {
      return (
        <div>
          <HistoryCard />
        </div>
      );
    } else if (currSelectNav == 3) {
      return (
        <div>
          <NonIdealState />
        </div>
      );
    } else {
      return (
        <div>
          <NonIdealState />
        </div>
      );
    }
  };

  return (
    <div class="container emp-profile">
      <Container method="post">
        <Row class="Row">
          <ProfileHead data={forum} />
        </Row>

        <Row class="row">
          <Col md={4}></Col>
          <Col md={8}>
            <div class="tab-content profile-tab" id="myTabContent">
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <Row class="row">
                  <Col md={6}>
                    <label>Experience</label>
                  </Col>
                  <Col md={6}>
                    <p>Expert</p>
                  </Col>
                </Row>
                <Row class="row">
                  <Col md={6}>
                    <label>Hourly Rate</label>
                  </Col>
                  <Col md={6}>
                    <p>10$/hr</p>
                  </Col>
                </Row>
                <Row class="row">
                  <Col md={6}>
                    <label>Total Projects</label>
                  </Col>
                  <Col md={6}>
                    <p>230</p>
                  </Col>
                </Row>
                <Row class="row">
                  <Col md={6}>
                    <label>English Level</label>
                  </Col>
                  <Col md={6}>
                    <p>Expert</p>
                  </Col>
                </Row>
                <Row class="row">
                  <Col md={6}>
                    <label>Availability</label>
                  </Col>
                  <Col md={6}>
                    <p>6 months</p>
                  </Col>
                </Row>
                <Row class="row">
                  <Col md={12}>
                    <label>Your Bio</label>
                    <br />
                    <p>Your detail description</p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <ProfileOld/>            */}
    </div>
  );
};

export default Profile;

// const Profile = () => {
//   let { id } = useParams();
//   const [data, setData] = useState({});
//   const [forum, setForum] = useState({});
//   const [answer, setAnswer] = useState({});

//   // Photo Edit
//   const [lgShow, setLgShow] = useState(false);

//   // Education Edit
//   const [educationShow, setEducationShow] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:5000/users/${id}`)
//       .then((res) => res.json())
//       .then((res) => setData(res));
//     fetch(`http://localhost:5000/forums?userID=${id}`)
//       .then((res) => res.json())
//       .then((res) => setForum(res));
//     fetch(`http://localhost:5000/answers?userID=${id}`)
//       .then((res) => res.json())
//       .then((res) => setAnswer(res));
//   }, []);

//   function dateToString(d) {
//     return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`;
//   }
//   return (
//     <div style={{ backgroundColor: "#dddddd" }}>
//       <Container fluid style={{ backgroundColor: "#fff" }}>
//         {/* <input type="file" id="myfile" name="myfile"  > */}
//         <div className="cover-profile">
//           <Image src={images.pic_cover} fluid className="img-cover-profile" />
//         </div>

//         {/* </input> */}
//         <Container>
//           <Row xs={12} md={9} className="display-flex mt-3">
//             <Col xs={12} md={3}>
//               <button
//                 className="profile-btn profile-photo-edit"
//                 onClick={() => setLgShow(true)}
//               >
//                 <Image
//                   className="pic-profile"
//                   src={userData.imgURL}
//                   roundedCircle
//                 />
//               </button>
//               {/* Modal For Edit Pic */}
//               <Modal
//                 size="lg"
//                 show={lgShow}
//                 onHide={() => setLgShow(false)}
//                 aria-labelledby="example-modal-sizes-title-lg"
//               >
//                 <Modal.Header closeButton>
//                   <Modal.Title
//                     id="example-modal-sizes-title-lg"
//                     style={FONTS.h1}
//                   >
//                     แก้ไข/รูปโปรไฟล์
//                   </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>...</Modal.Body>
//               </Modal>
//               {/* Modal For Edit Pic */}
//             </Col>
//             <Col xs={12} md={9}>
//               <Row>
//                 <Col xs={11} md={11}>
//                   <Card.Title
//                     style={FONTS.h1}
//                   >{`${userData.firstName} ${userData.lastName}`}</Card.Title>
//                   <Card.Subtitle style={FONTS.h2}>
//                     @{userData.userName}
//                   </Card.Subtitle>
//                   <Card.Body style={FONTS.body3}>
//                     {userData.birthDate ? (
//                       <p>{dateToString(userData.birthDate)}</p>
//                     ) : (
//                       <p>{"-"}</p>
//                     )}
//                     {userData.bio && userData.bio.length > 0 ? (
//                       <p>{userData.bio}</p>
//                     ) : (
//                       <p>{"-"}</p>
//                     )}
//                   </Card.Body>
//                 </Col>
//                 <Col xs={1} md={1}>
//                   <button className="icon profile-btn">
//                     <Icon icon="edit" iconSize="20" intent="primary" />
//                   </button>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//       </Container>
//       <br />

//       <Container>
//         {/* #1 */}
//         <Card>
//           <Card.Body>
//             <Card.Title style={FONTS.h2}>Activity</Card.Title>
//             {/* <Card.Subtitle className="mb-2 text-muted">
//               Card Subtitle
//             </Card.Subtitle> */}
//             <Row style={FONTS.h3}>
//               <Col className="text-center">
//                 ตั้งกระทู้คำถาม
//                 <br />
//                 {forum.length}
//                 <br />
//                 คร้ัง
//               </Col>
//               <Col className="text-center">
//                 ตอบคำถาม
//                 <br />
//                 {answer.length}
//                 <br />
//                 คร้ัง
//               </Col>
//               {/* <Col className="text-center">
//                 ได้รับรับรางวัลคำตอบที่ดีที่สุด
//                 <br />
//                 {10}
//                 <br />
//                 คร้ัง
//               </Col> */}
//             </Row>
//           </Card.Body>
//         </Card>
//         <br />
//         {/* #2 */}
//         <Card>
//           <Card.Body>
//             <Row>
//               <Col md={11}>
//                 <Card.Title style={FONTS.h2}>Education</Card.Title>
//                 <Education />
//                 {/* Modal For Edit Education */}
//                 <Modal
//                   size="lg"
//                   show={educationShow}
//                   onHide={() => setEducationShow(false)}
//                   aria-labelledby="example-modal-sizes-title-lg"
//                 >
//                   <Modal.Header closeButton>
//                     <Modal.Title
//                       id="example-modal-sizes-title-lg"
//                       style={FONTS.h1}
//                     >
//                       แก้ไข Education
//                     </Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>...</Modal.Body>
//                 </Modal>
//                 {/* Modal For Edit Education */}
//               </Col>
//               <Col md={1}>
//                 <button className="icon profile-btn">
//                   <Icon icon="plus" iconSize="20" intent="primary" />
//                 </button>
//                 <br />
//                 <button className="icon profile-btn" onClick={() => setEducationShow(true)}>
//                   <Icon icon="edit" iconSize="20" intent="primary" />
//                 </button>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//         <br />
//         {/* #3 */}
//         <Card>
//           <Card.Body>
//             <Card.Title style={FONTS.h2}>Interests</Card.Title>
//             <Interests />
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// const Education = () => {
//   return (
//     <>
//       <Row className="edu-card" style={{ fontFamily: "supermarket" }}>
//         <Col md={2} className="edu-logo">
//           <Image
//             style={{ height: "80px" }}
//             src="https://tu.ac.th/uploads/media/logo/logo01.jpg"
//           />
//         </Col>
//         <Col md={10}>
//           <Card.Body>
//             <Card.Title>Thammasat University</Card.Title>
//             <Card.Text>
//               {"Bachelor of Science"} - {"BS, Computer Science"}
//             </Card.Text>
//             <Card.Text className="text-muted">2018 - 2021</Card.Text>
//           </Card.Body>
//         </Col>
//       </Row>
//     </>
//   );
// };

// const Interests = () => {
//   return (
//     <>
//       <Row className="interest-card" style={{ fontFamily: "supermarket" }}>
//         <Col md={2} className="interest-logo">
//           <Image
//             style={{ height: "80px" }}
//             src="https://tu.ac.th/uploads/media/logo/logo01.jpg"
//           />
//         </Col>
//         <Col md={10}>
//           <Card.Body>
//             <Card.Title>{"Thammasat University"}</Card.Title>
//             <Card.Text className="text-muted">
//               {Math.floor(Math.random() * 10000 + 1) * 100 + " followers"}
//             </Card.Text>
//           </Card.Body>
//         </Col>
//       </Row>
//       <Row className="interest-card">
//         <Col md={2} className="interest-logo">
//           <Image
//             style={{ height: "80px" }}
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
//           />
//         </Col>
//         <Col md={10}>
//           <Card.Body>
//             <Card.Title>{"Linkedin Guide to Networking"}</Card.Title>
//             <Card.Text className="text-muted">
//               {Math.floor(Math.random() * 10000 + 1) * 10 + " followers"}
//             </Card.Text>
//           </Card.Body>
//         </Col>
//       </Row>
//     </>
//   );
// };
// export default Profile;
