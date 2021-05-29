import React, { useState, useEffect } from 'react'

import { Avatar, Paper, Grid, Typography, colors } from '@material-ui/core';
import { Col, Container, Button, Row } from "react-bootstrap";
import { Icon, IconSize, Intent } from "@blueprintjs/core";

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'

import * as actionType from '../constants/actionTypes';

import { useDencrypt } from "use-dencrypt-effect";

import { FONTS, SIZES } from '../constants/theme'
import { Card, Elevation } from "@blueprintjs/core";
import useStyles from './styles'
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
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

    return <p style={FONTS.largeTitle}>"{result}" </p>;
}

const WelcomeAds = () =>{

    return (
        <Container>
            <p style={FONTS.h1}>ร่วมเป็นส่วนหนึ่งของ</p>
            <TextEffect></TextEffect>
            <div style={{margin:30}}>
                <Icon icon="chat" iconSize='20' style={{float:'left', marginRight:10, margin:7}}></Icon>
                <p style={FONTS.h2}>
                    ถาม-ตอบได้อย่างอิสระ
                </p>

                <Icon icon="crown" iconSize='20' style={{float:'left', marginRight:10, margin:7}}></Icon>
                <p style={FONTS.h2}>
                    สะสมคะแนน และเลื่อนยศ 
                </p>

                <Icon icon="inbox-search" iconSize='20' style={{float:'left', marginRight:10, margin:7}}></Icon>
                <p style={FONTS.h2}>
                    ค้นหาด้วยคำสำคัญ และกรองฟอรัมที่สนใจ
                </p>
            </div>
            
        </Container>
        
    );
}

export const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };

    const handleSubmit = (e) => {

    };

    const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        dispatch({ type: actionType.AUTH, data: { result, token } });

        history.push('/');
        } catch (error) {
            console.log(error);
    }
    };

    const handleChange = (e) => setForm({});

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');


    return (
        <>
            <Card interactive={false} elevation={Elevation.TWO}>
                <p style={{textAlign: 'center', fontFamily: "supermarket", fontSize: SIZES.h1}}>
                    { isSignup ? 'ลงทะเบียน' : 'เข้าสู่ระบบ' }
                    </p>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                        <>
                        <Input name="displayName" label="Display Name" handleChange={handleChange} autoFocus/>
                        </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button variant="outline-warning" size="sm" className={classes.submit} block style={{fontFamily: "supermarket", fontSize: SIZES.h3}}>
                            { isSignup ? 'ลงทะเบียน' : 'เข้าสู่ระบบ' }
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} variant="link" size='sm'>
                                <p className='text-dark' style={{fontFamily: "supermarket", fontSize: SIZES.h3}}>
                                    { isSignup ? 'มีบัญชีอยู่แล้วหรอ? เข้าสู่ระบบ' : "ยังไม่มีบัญชีหรอ? ลงทะเบียน" }   
                                </p>
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
            </Card>
            <div style={{marginTop:30}}>
                <GoogleLogin
                    clientId="436641540555-2rgolljs71og75k5n1qem3pfvfr8aqiu.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <GoogleButton type="light" onClick={renderProps.onClick} style={{width:'100%'}}>
                        Google Sign In
                    </GoogleButton>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />
            </div>
            
        </>
    )
}

const AuthPage = () => {

    return(
        <Container style={{marginTop:40}}>

            <Row style={{alignItems:'center'}}>
                <Col xs="auto" md={8}>

                    <Container >
                        <Row>
                            <Col>
                                <WelcomeAds/>
                            </Col>
                        </Row>
                        
                    </Container>

                </Col>

                <Col>
                    <Auth style={{width:'70%'}}/>
                </Col>
            </Row>
        </Container>
        //        <Container>
        //        <Row>
        //            <Col xs={8} md={6}>
        //                <WelcomeAds/>
        //            </Col>
   
        //            <Col xs={6} md={4}>
        //                <Auth/>
        //            </Col>
        //        </Row>
        //    </Container>
    )
}

export default AuthPage