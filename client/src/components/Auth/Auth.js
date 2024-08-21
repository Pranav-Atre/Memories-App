import React, { useState } from 'react'
import useStyles from "./styles"
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, signUp } from '../../actions/user';

const initialState = { firstName:"" , lastName:"", email:"", password:"", confirmPassword:""}
const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const handleSuccess = async(res) => {
        console.log(res)
        const result = jwt_decode(res?.credential);
        const token = res?.credential;
        try {
            dispatch({type: "AUTH", data : {result,token}});
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const handleError = ()=> {
        console.log('Login Failed');
    }
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (isSignUp) {
            try {
                await dispatch(signUp(formData, history));
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await dispatch(signIn(formData, history));
            } catch (error) {
                console.log(error);
            }
        }

        setIsLoading(false);
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email ID" handleChange={handleChange} type='email' />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="ConFirm Password" handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' disabled={isLoading} fullWidth variant='contained' color='primary' className={classes.submit}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                    {isSignUp ? (
                        <div></div>
                    ) : <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />}
                    <Button onClick={switchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
