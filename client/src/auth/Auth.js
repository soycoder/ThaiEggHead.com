import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import * as actionType from '../constants/actionTypes';

import useStyles from './styles'
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

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
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.Avatar} elevation={3}>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId="436641540555-2rgolljs71og75k5n1qem3pfvfr8aqiu.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
                    </form> 
            </Paper>
        </Container>
    )
}

export default Auth