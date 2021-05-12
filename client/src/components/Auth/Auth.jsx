import React, { useState } from 'react';
import { Paper, Container } from '@material-ui/core';

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
  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Input name="email" label="Email" value={form.email} type="email" autoFocus handleChange={handleChange} />
        <Input name="password" label="Password" value={form.password} type={showPassword ? 'text' : 'password'} isPassword handleChange={handleChange} handleClickShowPassword={handleClickShowPassword} />
        <Input name="confirmPassword" label="Confirm Password" value={form.confirmPassword} type={showPassword ? 'text' : 'password'} handleChange={handleChange} isPassword handleClickShowPassword={handleClickShowPassword} />
      </Paper>
    </Container>
  );
};

export default Auth;
