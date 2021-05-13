import React, { useState } from 'react';
import {
  Paper, Container, Button, Typography, Box,
} from '@material-ui/core';
import GoogleButton from 'react-google-button';

// import Icon from './Icon';
import Input from './Input';
import useStyles from './styles';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const switchMode = () => {
    setRegisterMode((prevMode) => !prevMode);
  };

  const handleClickGoogle = () => {

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
            <Input name="fullname" label="Full Name" handleChange={handleChange} value={form.fullName} type="text" />
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

export default Auth;
