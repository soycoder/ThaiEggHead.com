import React, { useState, useEffect, useContext } from "react";

import { Grid } from "@material-ui/core";
import { Col, Container, Button, Row, Modal } from "react-bootstrap";

import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";

import { useDencrypt } from "use-dencrypt-effect";

import { FONTS, SIZES } from "../constants/theme";
import { Icon, Card, Elevation } from "@blueprintjs/core";
import useStyles from "./styles";

import { Player } from "@lottiefiles/react-lottie-player";

import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { theme } from "../constants";
import "./styles.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters.")
    .required("Enter your password."),
});

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email("*Invalid email.").required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must contain at least 8 characters."),
});

const values = ["ชุมชนอุดมปัญญา", "สังคมแห่งการแบ่งปัน", "Thai Egghead.com"];

const TextEffect = () => {
  const { result, dencrypt } = useDencrypt();

  useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(values[i]);

      i = i === values.length - 1 ? 0 : i + 1;
    }, 3000);

    return () => clearInterval(action);
  }, []);

  return (
    <p
      style={{ position: "absolute", fontSize: 40, fontFamily: "supermarket" }}
    >
      "{result}"
    </p>
  );
};

const WelcomeAds = () => {
  return (
    <Container>
      <div>
        <p style={FONTS.body1}>ร่วมเป็นส่วนหนึ่งของ</p>
        <TextEffect></TextEffect>
        <br />
        <br />
      </div>

      <div style={{ margin: 30 }}>
        <Icon
          icon="chat"
          iconSize="20"
          style={{ float: "left", marginRight: 10, margin: 7 }}
        ></Icon>
        <p style={FONTS.body2}>ถาม-ตอบได้อย่างอิสระ</p>

        <Icon
          icon="crown"
          iconSize="20"
          style={{ float: "left", marginRight: 10, margin: 7 }}
        ></Icon>
        <p style={FONTS.body2}>สะสมคะแนน ขิงเพื่อน</p>

        <Icon
          icon="inbox-search"
          iconSize="20"
          style={{ float: "left", marginRight: 10, margin: 7 }}
        ></Icon>
        <p style={FONTS.body2}>ค้นหาด้วยคำสำคัญ และกรองฟอรัมที่สนใจ</p>
      </div>
    </Container>
  );
};

const Signin = (props) => {
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const classes = useStyles;

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/users/signin",
        credentials
      );
      let { user } = data;
      let context = {
        token: user.token,
        userInfo: user.firstName + " " + user.lastName,
        expiresAt: new Date().getTime() / 1000 + user.expiresIn,
      };
      authContext.setAuthState(context);
      setLoginSuccess("Login Success");
      setLoginError(null);

      setTimeout(() => {
        props.setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.errors.global);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={LoginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container>
              {loginSuccess && <div> Login Success {loginSuccess}</div>}
              {loginError && <div> Login Error: {loginError} </div>}
              <br />
              {/* <label>Email</label> */}

              <div className="form-floating mt-3 col-12">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoFocus
                  style={FONTS.body3}
                />
                <label for="floatingInput" style={theme.FONTS.login}>
                  Email address
                </label>
              </div>

              {/*errors.email && touched.email && errors.email */}
              <div
                className="col-12 mb-3 col-12"
                style={{
                  color: "OrangeRed",
                  fontFamily: "supermarket",
                  fontSize: 12,
                }}
              >
                <ErrorMessage name="email" />
              </div>

              <div className="form-floating col-12">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={FONTS.body3}
                />
                <label for="floatingPassword" style={theme.FONTS.login}>
                  Password
                </label>
              </div>

              <div
                className="col-12 mb-3 col-12"
                style={{
                  color: "OrangeRed",
                  fontFamily: "supermarket",
                  fontSize: 12,
                }}
              >
                {errors.password && touched.password && errors.password}
              </div>
            </Grid>

            <div className="d-grid gap-2">
              <Button
                disabled={loginLoading}
                className="col-12 mt-3 mb-3"
                block
                style={{ fontFamily: "supermarket", fontSize: SIZES.h3 }}
                variant="outline-warning"
                size="lg"
                type="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </div>
            {loginLoading && <span>Loading...</span>}
          </form>
        )}
      </Formik>
    </>
  );
};

const Register = (props) => {
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [signupLoading, setSignupLoading] = useState(false);
  const classes = useStyles;

  const submitCredentials = async (credentials) => {
    try {
      setSignupLoading(true);
      const { data } = await axios.post(
        `http://localhost:5000/users/register`,
        credentials
      );

      setSignupSuccess(data.message);
      setSignupError("");

      setTimeout(() => {
        props.handleShow();
      }, 700);
    } catch (error) {
      let data = {};
      setSignupLoading(false);
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        data = error.response.data.errors.global;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        data = error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        data = error.message;
      }
      setSignupError(JSON.stringify(data));
      setSignupSuccess("");
    }
  };
  return (
    <>
      <section>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => submitCredentials(values)}
          style={FONTS.body3}
          validationSchema={SignupSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container>
                {signupSuccess && (
                  <div style={FONTS.body3}>
                    {" "}
                    Signup Success {signupSuccess}{" "}
                  </div>
                )}
                {signupError && (
                  <div style={FONTS.body3}> Signup Error {signupError} </div>
                )}

                <br />

                <div
                  className="form-floating mt-3 col-12"
                  style={{ fontFamily: "supermarket" }}
                >
                  <input
                    type="firstName"
                    name="firstName"
                    id="floatingInput"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <label for="floatingInput" style={theme.FONTS.login}>
                    First Name
                  </label>
                </div>

                <div
                  className="col-12 mb-3 "
                  style={{
                    color: "OrangeRed",
                    fontFamily: "supermarket",
                    fontSize: 12,
                  }}
                >
                  <ErrorMessage name="firstName" />
                </div>

                <div
                  className="form-floating col-12"
                  style={{ fontFamily: "supermarket" }}
                >
                  <input
                    className="form-control"
                    id="floatingInput"
                    type="lastName"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <label for="floatingInput" style={theme.FONTS.login}>
                    Last Name
                  </label>
                </div>

                <div
                  className="col-12 mb-3 "
                  style={{
                    color: "OrangeRed",
                    fontFamily: "supermarket",
                    fontSize: 12,
                  }}
                >
                  <ErrorMessage name="lastName" />
                </div>

                <div
                  className="form-floating col-12"
                  style={{ fontFamily: "supermarket" }}
                >
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    autoFocus
                  />
                  <label for="floatingInput" style={theme.FONTS.login}>
                    Email address
                  </label>
                </div>

                {/*errors.email && touched.email && errors.email */}
                <div
                  className="col-12 mb-3 "
                  style={{
                    color: "OrangeRed",
                    fontFamily: "supermarket",
                    fontSize: 12,
                  }}
                >
                  <ErrorMessage name="email" />
                </div>

                <div
                  className="form-floating col-12"
                  style={{ fontFamily: "supermarket" }}
                >
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <label for="floatingPassword" style={theme.FONTS.login}>
                    Password
                  </label>
                </div>

                <div
                  className="col-12 mb-3 "
                  style={{
                    color: "OrangeRed",
                    fontFamily: "supermarket",
                    fontSize: 12,
                  }}
                >
                  {errors.password && touched.password && errors.password}
                </div>
              </Grid>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  disabled={signupLoading}
                  className="col-12 mt-3 mb-3"
                  block
                  style={{ fontFamily: "supermarket", fontSize: SIZES.h3 }}
                  variant="outline-warning"
                  size="lg"
                >
                  ลงทะเบียน
                </Button>
              </div>

              {signupLoading && <span>Loading...</span>}
            </form>
          )}
        </Formik>
      </section>
    </>
  );
};

export const Auth = () => {
  const authContext = useContext(AuthContext);
  // ! useState()
  const [isSignup, setIsSignup] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [toggleMode, setToggleMode] = useState("signin");

  // ? Madal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ! Function
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setToggleMode(toggleMode === "signin" ? "register" : "signin");
  };

  const googleSuccess = async (res) => {
    const result = res.profileObj;
    const _token = `${result.givenName}**${result.familyName}`;

    const userGoogleRegister = {
      googleID: result.googleId,
      imgURL: result.imageUrl,
      email: result.email,
      password: _token,
      firstName: result.givenName,
      lastName: result.familyName,
      role: "user",
    };
    // console.log("userGoogleRegister ", userGoogleRegister);

    const userGoogleSignin = {
      email: result?.email,
      password: _token,
    };

    const __res = await axios
      .get(`http://localhost:5000/users/google/${result.googleId}`)
      .then(async (res) => {
        // console.log(res);
        // console.log("userGoogleSignin ",userGoogleSignin);

        let { data } = await axios.post(
          "http://localhost:5000/users/signin",
          userGoogleSignin
        );
        let _user = data.user;
        // console.log("_user ",_user);
        let context = {
          token: _user.token,
          userInfo: _user.firstName + " " + _user.lastName,
          expiresAt: new Date().getTime() / 1000 + _user.expiresIn,
        };
        // alert(JSON.stringify(context));
        authContext.setAuthState(context);
        setTimeout(() => {
          setRedirectOnLogin(true);
        }, 700);
      })
      .catch(async (error) => {
        let registerState = await axios
          .post("http://localhost:5000/users/register", userGoogleRegister)
          .then(() => {
            setTimeout(() => {
              handleShow();
            }, 700);
          });
      });
  };

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  return (
    <>
      {redirectOnLogin && <Redirect to="/" />}
      <Card interactive={false} elevation={Elevation.TWO}>
        <p
          style={{
            textAlign: "center",
            fontFamily: "supermarket",
            fontSize: SIZES.h1,
          }}
        >
          {isSignup ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
        </p>

        {toggleMode === "register" && (
          <Register
            setRedirectOnLogin={setRedirectOnLogin}
            handleShow={handleShow}
          />
        )}

        {toggleMode === "signin" && (
          <Signin setRedirectOnLogin={setRedirectOnLogin} />
        )}

        <Grid container justify="flex-end">
          <Grid item>
            <span onClick={switchMode}>
              <p className="text-switch">
                {isSignup
                  ? "มีบัญชีอยู่แล้วเหรอ? เข้าสู่ระบบ"
                  : "ยังไม่มีบัญชีเหรอ? ลงทะเบียน"}
              </p>
            </span>
          </Grid>
        </Grid>
      </Card>

      <div style={{ marginTop: 30 }} className="mb-5">
        <GoogleLogin
          clientId="436641540555-2rgolljs71og75k5n1qem3pfvfr8aqiu.apps.googleusercontent.com"
          render={(renderProps) => (
            <GoogleButton
              type="light"
              onClick={renderProps.onClick}
              style={{ width: "100%" }}
            >
              Google Sign In
            </GoogleButton>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />
      </div>

      {/* Register Card */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ fontFamily: "supermarket" }}
      >
        <Modal.Header>
          <Modal.Title>สถานะการสมัคร</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center mt-2 mb-2">
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_oiAkLg.json"
            style={{ height: "200px", width: "300px" }}
            background="transparent"
            speed="0.8"
          ></Player>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              handleClose();
              setToggleMode("signin");
            }}
          >
            เข้าสู่ระบบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AuthPage = () => {
  return (
    <Container style={{ marginTop: 40 }}>
      <Row style={{ alignItems: "center" }}>
        <Col xs="auto" md={8}>
          <Container>
            <Row>
              <Col>
                <WelcomeAds />
              </Col>
            </Row>
          </Container>
        </Col>

        <Col>
          <Auth style={{ width: "70%" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
