import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from 'react-bootstrap';
import { Card, Elevation, Toast, Toaster, Position, Intent } from "@blueprintjs/core";
import { Button } from '@blueprintjs/core'
import getFirebase from "../provider/firebaseAuth";
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import "../App.css";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXztE2lnsh-_1N4HCnHgLkVLdP85wavkM",
  authDomain: "thaiegghead.firebaseapp.com",
  projectId: "thaiegghead",
  storageBucket: "thaiegghead.appspot.com",
  messagingSenderId: "1051873838017",
  appId: "1:1051873838017:web:192f6608befc02033da540"
};

// Instantiate a Firebase app.
firebase.initializeApp(firebaseConfig);

const Header = () => {
    return (
      <div style = {{color:'blue', fontSize: 50, textAlign:'center', marginTop:30}}>
        {/* ThaiEggHead.com */}
      </div>
    )
}

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toaster, setToaster] = useState([]);
  const [isSignedIn, setisSignedIn] = useState(false) 

  function addToast(userName) {
    toaster.show({ message: "Welcome back! " + firebase.auth().currentUser.displayName, intent: Intent.SUCCESS });
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };

  useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                setisSignedIn(!!user)
            }
        );
      return () => {
        unregisterAuthObserver();
      }
  })
  if (!isSignedIn) {
    return (
      <Container>
        <Row>
          <Col sm={8}>
            <img src = "https://img.online-station.net/_content/2019/0619/gallery/1560920701.jpg" style ={{width:'100%', height:'100%'}}>
            </img>
          </Col>
          <Col sm={4}>
            <div className="Login">

              {/* Firebase UI */}
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

              <Button icon="manual">
                  Sign up via your insitution
                  </Button>
              <Card interactive={true} elevation={Elevation.TWO}>  
                <Form onSubmit={handleSubmit}>
                  <Form.Group size="lg" controlId="email">
                      <Form.Label>Display name</Form.Label>
                      <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button rightIcon="arrow-right" intent="success" disabled={!validateForm()} onClick={{}}>
                    Sign Up
                  </Button>
                  <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)} />
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }else{
    addToast();
    return (
      <div className="container">
          <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)} />
          <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

const SignUp = () => {
  return (
    <div>
      <Header/>
      <SignUpForm/>
    </div>
  )
}

export default SignUp;

// const SignUpForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [currentUser, setCurrenUser] = useState(null);
//   const [toaster, setToaster] = useState([]);
//   const firebaseInstance = getFirebase();

//   const uiConfig = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//       // Avoid redirects after sign-in.
//       signInSuccess: () => false
//     }
//   };

//   function addToast(userName) {
//     toaster.show({ message: "Welcome back! " + userName, intent: Intent.SUCCESS });
//   }


//   const SignUpFirebase = async (event) => {
//     event.preventDefault();

//     try {
//       if (firebaseInstance) {
//         const user = await firebaseInstance
//           .auth()
//           .signInWithEmailAndPassword(email, password);
//         console.log("user", user.user.email);
//         addToast(user.user.email)
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   function validateForm() {
//     return email.length > 0 && password.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   return (
//     <Container>
//       <Row>
//         <Col sm={8}>
//           <img src = "https://img.online-station.net/_content/2019/0619/gallery/1560920701.jpg" style ={{width:'100%', height:'100%'}}>
//           </img>
//         </Col>
//         <Col sm={4}>
//           <div className="Login">
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
//             <Button icon="manual">
//                 Sign up via your insitution
//                 </Button>
//             <Card interactive={true} elevation={Elevation.TWO}>  
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group size="lg" controlId="email">
//                     <Form.Label>Display name</Form.Label>
//                     <Form.Control
//                       autoFocus
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </Form.Group>
//                 <Form.Group size="lg" controlId="email">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     autoFocus
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group size="lg" controlId="password">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Button rightIcon="arrow-right" intent="success" disabled={!validateForm()} onClick={SignUpFirebase}>
//                   Login
//                 </Button>
//                 <Toaster position={Position.TOP} ref={(ref) => setToaster(ref)} />
//               </Form>
//             </Card>
//           </div>
//         </Col>
//       </Row>
      
//     </Container>
    
//   );
// }

// const SignUp = () => {
//   return (
//     <div>
//       <Header/>
//       <SignUpForm/>
//     </div>
//   )
// }

// export default SignUp;