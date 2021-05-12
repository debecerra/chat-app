import React, { useState } from 'react';
import { Paper, Container, Button } from '@material-ui/core';

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

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input name="email" label="Email" value={form.email} type="email" autoFocus handleChange={handleChange} />
          <Input name="password" label="Password" value={form.password} type={showPassword ? 'text' : 'password'} isPassword handleChange={handleChange} handleClickShowPassword={handleClickShowPassword} />
          <Input name="confirmPassword" label="Confirm Password" value={form.confirmPassword} type={showPassword ? 'text' : 'password'} handleChange={handleChange} isPassword handleClickShowPassword={handleClickShowPassword} />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {true ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
