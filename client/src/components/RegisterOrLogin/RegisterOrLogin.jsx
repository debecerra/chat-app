/**
 * This file contains the Register or Login Form component.
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Paper, Container, Button, Typography, Box,
} from '@material-ui/core';
import GoogleButton from 'react-google-button';

import { register, login, googleLogin } from '../../actions/auth';

import Input from './Input';
import useStyles from './styles';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterOrLogin = () => {
  // the fields of the register or login form
  const [form, setForm] = useState(initialForm);

  // boolean flag that indicates if the password field should be shown as plain text
  const [showPassword, setShowPassword] = useState(false);

  // boolean flag that indicates if form is being used to register (true) or login (false)
  const [registerMode, setRegisterMode] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerMode) {
      dispatch(register(form, history));
    } else {
      dispatch(login(form, history));
    }
  };

  const switchMode = () => {
    setRegisterMode((prevMode) => !prevMode);
  };

  const handleClickGoogle = () => {
    dispatch(googleLogin(form, history));
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">

      {/* login form */}
      <Paper className={classes.paper} elevation={5}>
        {/* title */}
        <Typography className={classes.title} component="h1" variant="h5">{registerMode ? 'Sign Up' : 'Sign In'}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>

          {/* full name */}
          {registerMode ? (
            <Input name="fullName" label="Full Name" handleChange={handleChange} value={form.fullName} type="text" />
          ) : null}

          {/* email */}
          <Input name="email" label="Email" value={form.email} type="email" autoFocus handleChange={handleChange} />

          {/* password */}
          <Input name="password" label="Password" value={form.password} type={showPassword ? 'text' : 'password'} isPassword handleChange={handleChange} handleClickShowPassword={handleClickShowPassword} />

          {/* confirm password */}
          {registerMode ? (
            <Input name="confirmPassword" label="Confirm Password" value={form.confirmPassword} type={showPassword ? 'text' : 'password'} handleChange={handleChange} isPassword handleClickShowPassword={handleClickShowPassword} />
          ) : null}

          {/* login button */}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {registerMode ? 'Sign Up' : 'Sign In'}
          </Button>

        </form>

        {/* switch mode button */}
        <Button className={classes.switchModeButton} onClick={switchMode} size="small">
          {registerMode ? 'Already have an account? Sign in.' : "Don't have an account? Sign up."}
        </Button>

        {/* google sign in button */}
        <Box className={classes.googleButtonParent}>
          <GoogleButton className={classes.googleButton} onClick={handleClickGoogle}>
            Sign in with Google
          </GoogleButton>
        </Box>

      </Paper>
    </Container>
  );
};

export default RegisterOrLogin;
