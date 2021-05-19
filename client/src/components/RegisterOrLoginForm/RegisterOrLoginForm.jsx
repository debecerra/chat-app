/**
 * Contains the RegisterOrLoginForm component which allows users to register a new account
 * or sign in using an existing account.
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Paper from '@material-ui/core/Paper';
import {
  // eslint-disable-next-line no-unused-vars
  Paper, Container, Button, Typography, Box, Link,
} from '@material-ui/core';
import GoogleButton from 'react-google-button';

// eslint-disable-next-line no-unused-vars
import { register, login } from '../../actions/auth';

import Input from './Input';
import useStyles from './styles';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterOrLoginForm = () => {
  // the fields of the register or login form
  const [form, setForm] = useState(initialForm);

  // boolean flag that indicates if the password field should be shown as plain text
  const [showPassword, setShowPassword] = useState(false);

  // boolean flag that indicates if form is being used to register (true) or login (false)
  const [registerMode, setRegisterMode] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  /**
   * Updates the fields of the form when a change occurs.
   * @param e the event that was detected
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Toggles the visibility of the password field.
   */
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Submits the contents of the form to either login or register depending on the mode.
   * @param e the event that was detected
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerMode) {
      dispatch(register(form, history));
    } else {
      dispatch(login(form, history));
    }
  };

  /**
   * Toggles the mode of the form between register and login.
   */
  const switchMode = () => {
    setRegisterMode((prevMode) => !prevMode);
  };

  return (
    <Container component="main" maxWidth="xs">

      {/* form */}
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
        <Link href="http://localhost:5000/auth/google" className={classes.googleButtonParent}>
          <GoogleButton className={classes.googleButton}>
            Sign in with Google
          </GoogleButton>
        </Link>

      </Paper>
    </Container>
  );
};

export default RegisterOrLoginForm;
